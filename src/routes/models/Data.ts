
import * as mathjs from 'mathjs'
import { Parser } from 'xsd-ts';
import nota from './../../data/nota.g.xml?raw';
import notaStructure from './../../data/nota-structure.g.json';
import { deserialize } from '@ungap/structured-clone';
import type { SerializedRecord } from '@ungap/structured-clone';
import type { element } from 'xsd-ts/dist/xsd';
import type { BesonderheitDefinition_besonderheit, Daten_nota as Daten, FertigkeitDefinition_fertigkeit, TalentDefinition_talent, _Talent4 } from 'src/data/nota.g';



export class Data {


    private instance: Daten | undefined
    public readonly talentMap: Record<string, TalentDefinition_talent & { Kategorie: string }>;
    public readonly talentCategoryMap: Record<string, Record<string, TalentDefinition_talent>>;

    public readonly talentCostTabel: readonly (readonly { readonly Kosten: { readonly Id: string; readonly Wert: number; }; }[])[];

    public readonly besonderheitenMap: Record<string, Readonly<BesonderheitDefinition_besonderheit & { Kategorie: string }>>;
    public readonly besonderheitenCategoryMap: Record<string, Record<string, Readonly<BesonderheitDefinition_besonderheit>>>;

    public readonly fertigkeitenMap: Record<string, Readonly<FertigkeitDefinition_fertigkeit & { Kategorie: string }>>;
    public readonly fertigkeitenCategoryMap: Record<string, Record<string, Readonly<FertigkeitDefinition_fertigkeit>>>;
    //talentCostTabel: readonly { Kosten: { Wert: number; Id: string; }[]; }[][];
    /**
     *
     */
    constructor(data: Daten) {
        this.instance = data;

        this.talentMap = data.Daten.Talente.flatMap(x => x.Talent.map(y => ({ ...y, Kategorie: x.KategorieId }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, TalentDefinition_talent & { Kategorie: string }>);
        this.talentCategoryMap = data.Daten.Talente.map(x => x.Talent
            .map(y => ({ ...y, Kategorie: x.KategorieId })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.KategorieId, t: {} } as { id: string, t: Record<string, TalentDefinition_talent> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, TalentDefinition_talent>>);


        this.besonderheitenMap = data.Daten.Besonderheiten.flatMap(x => x.Besonderheit.map(y => ({ ...y, Kategorie: x.Kategorie }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, BesonderheitDefinition_besonderheit & { Kategorie: string }>)
        this.besonderheitenCategoryMap = data.Daten.Besonderheiten.map(x => x.Besonderheit
            .map(y => ({ ...y, Kategorie: x.KategorieId })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.KategorieId, t: {} } as { id: string, t: Record<string, BesonderheitDefinition_besonderheit> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, BesonderheitDefinition_besonderheit>>);

        this.fertigkeitenMap = data.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit.map(y => ({ ...y, Kategorie: x.Kategorie }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, FertigkeitDefinition_fertigkeit & { Kategorie: string }>)
        this.fertigkeitenCategoryMap = data.Daten.Fertigkeiten.map(x => x.Fertigkeit
            .map(y => ({ ...y, Kategorie: x.KategorieId })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.KategorieId, t: {} } as { id: string, t: Record<string, FertigkeitDefinition_fertigkeit> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, FertigkeitDefinition_fertigkeit>>);


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
        
        this.talentCostTabel = [...Array.from({ length: 37 }, (_, k) => {
            
            const levels: {
                Kosten: {
                    Wert: number;
                    Id: string;
                    ResultType: "differenz" | "total";
                }
            }[] = Array.from({ length: 131 }, (_, i) => {
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