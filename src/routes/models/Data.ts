import type { Daten } from "src/data/nota.g";


export class Data {

    /**
     * init
     */
    public static init(instance: Daten) {
        Data.instance = instance;
    }

    public static get IsInitilized(): boolean {
        return this.Instance == undefined;
    }

    private static instance: Daten | undefined
    public static get Instance(): Daten {
        if (!this.instance) {
            throw Error('Not initilize');
        }
        return this.Instance;
    }


}