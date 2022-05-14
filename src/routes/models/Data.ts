
import { Parser } from 'xsd-ts';
import nota from './../../data/nota.g.xml?raw';
import notaStructure from './../../data/nota-structure.g.json';
import { deserialize } from '@ungap/structured-clone';
import type { SerializedRecord } from '@ungap/structured-clone';
import type { element } from 'xsd-ts/dist/xsd';
import type { Daten } from 'src/data/nota.g';



export class Data {
    
    
    private instance: Daten | undefined
    /**
     *
     */
    constructor(data: Daten) {
        this.instance = data;
    }
    /**
     * init
     */
    public static async init() {
        // const data = fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')
        const data = nota
        .replace(/http:\/\/nota.org\/schema\//g,'https://nota-game.github.io/schema/vNext/');



        // the result will be a replica of the original object
        const deserialized = deserialize(notaStructure as SerializedRecord) as Array<element>;
        const dat = deserialized.filter((x) => x.name.local === 'Daten')[0];
        const parser = new Parser<Daten>(dat);
        const notaData = parser.parse(data);

        return notaData ? new Data(notaData) : undefined;
    }


    public get Instance(): Daten {
        if (!this.instance) {
            throw Error('Not initilize');
        }
        return this.instance;
    }


}