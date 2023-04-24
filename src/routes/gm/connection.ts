import * as signalR from "@microsoft/signalr";
import { Charakter, type PersistanceData } from "src/models/Character";
import { CharacterState, Syncronizer } from "src/models/CharacterState";
import { Data } from "src/models/Data";
import { readable, writable, type Readable, type Writable, derived, get } from "svelte/store";


export type userHolder = { id: string, sendToUsers: (data: message) => Promise<void> } & ({ playerName?: undefined } | { playerName: string, char: Charakter, state: CharacterState, charStateSyncronizer: Syncronizer });
export type userHolderWithChar = userHolder & { playerName: string };

export class ConnectionGM {
    public readonly url: string;
    public readonly group: string;

    public readonly isConected: Readable<boolean>;
    private readonly _isConected: Writable<boolean>;

    private users: Record<string, userHolder> = {};
    public readonly usersStore: Writable<Record<string, userHolder>>;
    public readonly Users: Readable<Record<string, userHolder>>;

    private connection: signalR.HubConnection;
    private connectionPromise: Promise<void>;

    constructor(url: string, id: string, group: string) {
        this.url = url;
        this.group = group;
        this.usersStore = writable({});
        this.Users = derived(this.usersStore, x => x);

        this._isConected = writable(false);
        this.isConected = derived(this._isConected, x => x);


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

                const prev = this.users[user.id];
                if (prev?.playerName) {
                    prev.charStateSyncronizer.unsubscribe();
                    prev.charStateSyncronizer.RemoveEventListener(this.transmitStateChange.bind(this, user.id));

                }

                if (char) {
                    const state = new CharacterState(char);
                    const syncronizer = new Syncronizer(state);
                    this.users[user.id] = { ...user, char, state, charStateSyncronizer: syncronizer, sendToUsers: this.SendToPlayer.bind(this, user.id) };
                    this.usersStore.set(this.users);
                    syncronizer.subscribe();
                    syncronizer.AddEventListener(this.transmitStateChange.bind(this, user.id));


                    this.SendToPlayer(id, { type: 'requestStats' });

                }
            }
        });
        this.connection.on("reciveData", async (user: string, data: string) => {
            console.log("called reciveData", data)

            const message = JSON.parse(data) as message;

            if (message.type == 'updateStat') {
                const userData = this.users[user];
                if (userData.playerName !== undefined) {
                    const { charStateSyncronizer } = userData;
                    charStateSyncronizer.set(message.path, message.value);
                }
            } else {
                console.warn("unknown message", message);
            }




        });


        this.connection.onreconnecting(() => this._isConected.set(false));
        this.connection.onreconnected(() => this._isConected.set(false));
        this.connectionPromise = this.connection.start().catch((err) => console.error(err)).then(() => this._isConected.set(true));

    }

    private async transmitStateChange(playerId: string, path: readonly PropertyKey[], value: unknown) {
        console.info(`send to ${playerId}`, { path, value })
        await this.SendToPlayer(playerId, { type: 'updateStat', path, value });
    }


    public async Close() {
        this._isConected.set(false);
        await this.connection.stop();
    }

    /**
     * AddPlayer
     */
    public async AddPlayer() {
        await this.connectionPromise;
        const result = await this.connection.invoke("AddUser");
        if (typeof result === 'string' && result.length > 0) {
            this.users[result] = { id: result, sendToUsers: this.SendToPlayer.bind(this, result) };
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
    private charState: CharacterState | undefined;
    private charStateSyncronizer: Syncronizer | undefined;
    private connectionPromise: Promise<void>;

    public readonly isConected: Readable<boolean>;
    private readonly _isConected: Writable<boolean>;


    constructor(url: string, id: string, group: string) {
        this.url = url;

        this._isConected = writable(false);
        this.isConected = derived(this._isConected, x => x);
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
            } else if (message.type == 'updateStat') {
                this.charStateSyncronizer?.set(message.path, message.value);
            } else if (message.type == 'requestStats') {

                if (this.charStateSyncronizer) {
                    const allValues = this.charStateSyncronizer.get();
                    await Promise.all(allValues.map(([path, value]) =>
                        this.transmitStateChange(path, value)
                    ));
                }

            } else {
                console.warn("unknown message", message);
            }


        });


        this.connection.onreconnecting(() => this._isConected.set(false));
        this.connection.onreconnected(() => this._isConected.set(false));
        this.connectionPromise = this.connection.start().catch((err) => console.error(err)).then(() => this._isConected.set(true));
    }

    public async Close() {
        this._isConected.set(false);
        await this.connection.stop();
    }


    private async transmitStateChange(path: readonly PropertyKey[], value: unknown) {
        console.info('send to GM', { path, value })
        await this.SendToGm({ type: 'updateStat', path, value });
    }

    public async InitPlayerData(playerName: string, char: PersistanceData | CharacterState) {
        await this.connectionPromise;
        this.playerName = playerName;
        if (this.charStateSyncronizer) {
            this.charStateSyncronizer.RemoveEventListener(this.transmitStateChange.bind(this));
            this.charStateSyncronizer.unsubscribe();
        }
        if (char instanceof CharacterState) {
            this.charState = char;
            this.charStateSyncronizer = new Syncronizer(this.charState);
            this.char = get(char.char.persistanceStore);
            this.charStateSyncronizer.subscribe();
            this.charStateSyncronizer.AddEventListener(this.transmitStateChange.bind(this));
        } else {
            this.char = char;
        }
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
} | {
    type: 'requestStats',
    path?: readonly PropertyKey[],
} | {
    type: 'updateStat',
    path: readonly PropertyKey[],
    value: unknown,
};

