
import * as mathjs from 'mathjs'
import { Parser } from 'xsd-ts';
import nota from './../../data/nota.g.xml?raw';
import notaStructure from './../../data/nota-structure.g.json';
import { deserialize } from '@ungap/structured-clone';
import type { SerializedRecord } from '@ungap/structured-clone';
import type { element } from 'xsd-ts/dist/xsd';
import type { Daten_nota as Daten, _Talent4 } from 'src/data/nota.g';



export class Data {


    private instance: Daten | undefined
    public readonly talentMap: Record<string, _Talent4>;
    public readonly talentCostTabel: readonly (readonly { readonly Kosten: { readonly Id: string; readonly Wert: number; }; }[])[];
    //talentCostTabel: readonly { Kosten: { Wert: number; Id: string; }[]; }[][];
    /**
     *
     */
    constructor(data: Daten) {
        this.instance = data;

        this.talentMap = data.Daten.Talente.Talent.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, _Talent4>)


        const mappedTalentFunction = (() => {
            const f = (level: number, conplexity: number) => level == 0 || conplexity == 0
                ? 0
                : mathjs.compile(this.Instance.Daten.KostenDefinitionen.TalentKostenFunktion.value).evaluate({
                    KOMPLEXITÄT: String.fromCharCode('a'.charCodeAt(0) + conplexity - 1),
                    KOMPLEXITÄT_NUM: conplexity,
                    LEVEL: level
                }) as number;
            return {
                f,
                ...this.Instance.Daten.KostenDefinitionen.TalentKostenFunktion.meta
            };
        })()
        this.talentCostTabel = [...new Array(37).map((_, k) => {
            const levels: {
                Kosten: {
                    Wert: number;
                    Id: string;
                    ResultType: "differenz" | "total";
                }
            }[] = new Array(131).map((_, i) => {
                return {
                    Kosten: {
                        Wert: mappedTalentFunction.f(i, k),
                        Id: mappedTalentFunction.KostenArt,
                        ResultType: mappedTalentFunction.ResultType
                    }

                };
            });
            if (levels[0].Kosten.ResultType == 'differenz') {
                for (let levelIndex = 1; levelIndex < levels.length; levelIndex++) {
                    levels[levelIndex].Kosten.Wert += levels[levelIndex - 1].Kosten.Wert;
                }
            }
            return [...levels.map(x => ({ Kosten: { Id: x.Kosten.Id, Wert: x.Kosten.Wert } as const } as const))] as const;
        })] as const;
    }
    /**
     * init
     */
    public static async init() {
        // const data = fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')
        const data = nota
            .replace(/http:\/\/nota.org\/schema\//g, 'https://nota-game.github.io/schema/vNext/');



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