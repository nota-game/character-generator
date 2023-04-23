import * as signalR from "@microsoft/signalr";
import { Charakter, type PersistanceData } from "src/models/Character";
import { Data } from "src/models/Data";
import { readable, writable, type Readable, type Writable, derived } from "svelte/store";


export class ConnectionGM {
    public readonly url: string;
    public readonly group: string;

    private users: Record<string, { id: string, playerName?: string, char?: Charakter }> = {};
    public readonly usersStore: Writable<Record<string, { id: string, playerName?: string, char?: Charakter }>>;
    public readonly Users: Readable<Record<string, { id: string, playerName?: string, char?: Charakter }>>;

    private connection: signalR.HubConnection;
    private connectionPromise: Promise<void>;

    constructor(url: string, id: string, group: string) {
        this.url = url;
        this.group = group;
        this.usersStore = writable({});
        this.Users = derived(this.usersStore, x => x);


        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url + "/hub", {
                headers: {
                    user: id,
                    group
                },
                accessTokenFactory: () => {
                    return `${group}:${id}`
                },
                // httpClient: new AuthenticationHttpClient(undefined!),
                withCredentials: true,
            })
            .build();


        this.connection.on("updatedUser", async (user: { id: string, playerName: string, characterData: string }, stammData?: string) => {
            console.log("called updateUser", { user, stammData })
            const currentChar = JSON.parse(user.characterData) as PersistanceData | undefined;
            if (currentChar) {



                const data = stammData ? await Data.fromJson(JSON.parse(stammData)) : await Data.init(false, currentChar?.stammdatenId);
                let char: Charakter | undefined;
                if (data) {
                    char = new Charakter(data, currentChar);
                    console.log("character loadede")
                } else {
                    // request stamdaten from client
                    await this.SendToPlayer(user.id, { 'type': 'requestChar', 'withStammdaten': true });
                }

                if (char) {
                    this.users[user.id] = { ...user, char }
                    this.usersStore.set(this.users);
                }
            }
        });
        this.connection.on("reciveData", async (user: string, data: string) => {
            console.log("called reciveData", data)

            const message = JSON.parse(data) as message;


        });

        this.connectionPromise = this.connection.start().catch((err) => console.error(err));
    }

    /**
     * AddPlayer
     */
    public async AddPlayer() {
        await this.connectionPromise;
        const result = await this.connection.invoke("AddUser");
        if (typeof result === 'string' && result.length > 0) {
            this.users[result] = { id: result };
            this.usersStore.set(this.users);
        }
    }


    public async SendToPlayer(user: string, data: message) {
        await this.connectionPromise;
        await this.connection.send("SendToPlayer", user, JSON.stringify(data));
    }
    public async SendToAll(data: message) {
        await this.connectionPromise;
        await this.connection.send("SendToAll", JSON.stringify(data));
    }
}

export class ConnectionPlayer {
    private readonly url: string;

    private connection: signalR.HubConnection;

    private playerName: string | undefined;
    private char: PersistanceData | undefined;
    private connectionPromise: Promise<void>;

    constructor(url: string, id: string, group: string) {
        this.url = url;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(url + "/hub", {
                headers: {
                    user: id,
                    group
                },
                accessTokenFactory: () => {
                    return `${group}:${id}`
                },
                // httpClient: new AuthenticationHttpClient(undefined!),
                withCredentials: true,
            })
            .build();

        this.connection.on("reciveData", async (data: string) => {
            console.log("called reciveData", data)

            const message = JSON.parse(data) as message;

            if (message.type == 'requestChar') {
                console.log("calling", message.withStammdaten)
                if (message.withStammdaten) {
                    this.UpdateSelf(true);
                } else {
                    this.UpdateSelf(false);
                }
            }


        });


        this.connectionPromise = this.connection.start().catch((err) => console.error(err));
    }

    public async InitPlayerData(playerName: string, char: PersistanceData) {
        await this.connectionPromise;
        this.playerName = playerName;
        this.char = char;
        await this.UpdateSelf();
    }

    public async UpdateSelf(sendStammdaten = false) {
        await this.connectionPromise;
        console.log("using stadmmdaten", sendStammdaten)
        if (sendStammdaten) {
            const data = await Data.init(false, this.char?.stammdatenId);
            console.log("sending stammdaten", data)
            if (data) {
                await this.connection.send("InitUser", this.playerName, JSON.stringify(this.char), JSON.stringify(data.Instance));
            }
            else {
                console.error("Faild to load stammdaten", this.char?.stammdatenId)
            }
        } else {
            await this.connection.send("InitUser", this.playerName, JSON.stringify(this.char), null);
        }
    }

    public async SendToGm(data: message) {
        await this.connectionPromise;
        await this.connection.send("SendToGm", JSON.stringify(data));
    }
}


type message = {
    type: 'requestChar',
    withStammdaten?: boolean
}

