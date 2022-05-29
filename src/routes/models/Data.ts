
import * as mathjs from 'mathjs'
import { Parser } from 'xsd-ts';
import nota from './../../data/nota.g.xml?raw';
import notaStructure from './../../data/nota-structure.g.json';
import { deserialize } from '@ungap/structured-clone';
import type { SerializedRecord } from '@ungap/structured-clone';
import type { element } from 'xsd-ts/dist/xsd';
import type { ArtDefinition_lebewesen, Art_lebewesen, AusrüstungEigengchaftDefinition_kampf_ausstattung, BesonderheitDefinition_besonderheit, Daten_nota as Daten, FernkampfwaffenDafinition_kampf_ausstattung, FertigkeitDefinition_fertigkeit, GattungDefinition_lebewesen, Gattung_lebewesen, LebensabschnittDefinition_lebewesen, Lebensabschnitt_lebewesen, Level_misc, MorphDefinition_lebewesen, Morph_lebewesen, NahkampfWaffenDefinition_kampf_ausstattung, PfadDefinition_pfad, RüstungDefinition_kampf_ausstattung, TagDefinition_misc, TalentDefinition_talent, _Talent4 } from 'src/data/nota.g';

type lebensabschnittData =
    | {
        l: LebensabschnittDefinition_lebewesen;
        m: MorphDefinition_lebewesen;
        a: ArtDefinition_lebewesen;
        g: GattungDefinition_lebewesen;
    }

export class Data {


    private instance: Daten | undefined

    public static readonly MAX_TALENT = 130;

    public readonly talentMap: Record<string, Readonly<TalentDefinition_talent & { Kategorie: string }>>;
    public readonly talentCategoryMap: Record<string, Record<string, Readonly<TalentDefinition_talent>>>;

    public readonly talentCostTabel: readonly (readonly { readonly Kosten: { readonly Id: string; readonly Wert: number; }; }[])[];

    public readonly besonderheitenMap: Record<string, Readonly<BesonderheitDefinition_besonderheit & { Kategorie: string }>>;
    public readonly besonderheitenCategoryMap: Record<string, Record<string, Readonly<BesonderheitDefinition_besonderheit>>>;

    public readonly pfadMap: Record<string, Readonly<PfadDefinition_pfad & { Kategorie: string }>>;
    public readonly pfadCategoryMap: Record<string, Record<string, Readonly<PfadDefinition_pfad>>>;

    public readonly tagMap: Record<string, Readonly<TagDefinition_misc>>;

    public readonly fertigkeitenMap: Record<string, Readonly<FertigkeitDefinition_fertigkeit & { Kategorie: string }>>;
    public readonly fertigkeitenCategoryMap: Record<string, Record<string, Readonly<FertigkeitDefinition_fertigkeit>>>;
    public readonly StandardKosten: string;
    public readonly lebensabschnittLookup: { [key: string]: lebensabschnittData };


    public readonly AusrüstungsEigenschaftMap: Record<string, Readonly<AusrüstungEigengchaftDefinition_kampf_ausstattung>>;

    public readonly nahkampfMap: Record<string, Readonly<NahkampfWaffenDefinition_kampf_ausstattung>>;
    public readonly fernkampfMap: Record<string, Readonly<FernkampfwaffenDafinition_kampf_ausstattung>>;
    public readonly RüstungMap: Record<string, Readonly<RüstungDefinition_kampf_ausstattung>>;
    //talentCostTabel: readonly { Kosten: { Wert: number; Id: string; }[]; }[][];
    /**
     *
     */
    constructor(data: Daten) {
        this.instance = data;

        this.lebensabschnittLookup = Object.fromEntries(
            data.Daten.Organismen.Gattung.flatMap((x) =>
                x.Art.flatMap((y) =>
                    y.Morphe.Morph.flatMap((z) =>
                        z.Lebensabschnitte.Lebensabschnitt.filter((l) => l.Spielbar).map((l) => {
                            const newLocal: lebensabschnittData = {
                                l: l,
                                m: z,
                                a: y,
                                g: x
                            };

                            return [l.Id, newLocal];
                        })
                    )
                )
            )
        );

        this.AusrüstungsEigenschaftMap = data.Daten.Ausstattung.Eigenschaften.Eigenschaft.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, AusrüstungEigengchaftDefinition_kampf_ausstattung>)
        this.nahkampfMap = data.Daten.Ausstattung.Waffen.Nahkampfwaffe.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, NahkampfWaffenDefinition_kampf_ausstattung>)
        this.fernkampfMap = data.Daten.Ausstattung.Waffen.Fernkampfwaffe.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, FernkampfwaffenDafinition_kampf_ausstattung>)
        this.RüstungMap = data.Daten.Ausstattung.Rüstungen.Rüstung.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, RüstungDefinition_kampf_ausstattung>)

        this.StandardKosten = data.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten === true)[0].Id
        this.talentMap = data.Daten.Talente.flatMap(x => x.Talent.map(y => ({ ...y, Kategorie: x.KategorieId }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, TalentDefinition_talent & { Kategorie: string }>);
        this.talentCategoryMap = data.Daten.Talente.map(x => x.Talent
            .map(y => ({ ...y, Kategorie: x.KategorieId })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.KategorieId, t: {} } as { id: string, t: Record<string, TalentDefinition_talent> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, TalentDefinition_talent>>);


        this.tagMap = data.Daten.Tags.Tag.reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, TagDefinition_misc>)

        this.pfadMap = data.Daten.Pfade.flatMap(x => x.Pfad.map(y => ({ ...y, Kategorie: x.Id }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, PfadDefinition_pfad & { Kategorie: string }>)
        this.pfadCategoryMap = data.Daten.Pfade.map(x => x.Pfad
            .map(y => ({ ...y, Kategorie: x.Id })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.Id, t: {} } as { id: string, t: Record<string, PfadDefinition_pfad> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, PfadDefinition_pfad>>);


        this.besonderheitenMap = data.Daten.Besonderheiten.flatMap(x => x.Besonderheit.map(y => ({ ...y, Kategorie: x.KategorieId }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, BesonderheitDefinition_besonderheit & { Kategorie: string }>)
        this.besonderheitenCategoryMap = data.Daten.Besonderheiten.map(x => x.Besonderheit
            .map(y => ({ ...y, Kategorie: x.KategorieId })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.KategorieId, t: {} } as { id: string, t: Record<string, BesonderheitDefinition_besonderheit> })
        )
            .reduce((p, c) => { p[c.id] = c.t; return p; }, {} as Record<string, Record<string, BesonderheitDefinition_besonderheit>>);

        this.fertigkeitenMap = data.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit.map(y => ({ ...y, Kategorie: x.KategorieId }))).reduce((p, c) => { p[c.Id] = c; return p; }, {} as Record<string, FertigkeitDefinition_fertigkeit & { Kategorie: string }>)
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
            }[] = Array.from({ length: Data.MAX_TALENT + 1 }, (_, i) => {
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