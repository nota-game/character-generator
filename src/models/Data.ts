import * as base64 from 'base64-uint8';
import * as mathjs from 'mathjs'
import { Parser } from 'xsd-ts';
import nota from './../data/nota.g.xml?raw';
import notaStructure from './../data/nota-structure.g.json';
import { deserialize } from '@ungap/structured-clone';
import type { SerializedRecord } from '@ungap/structured-clone';
import type { element } from 'xsd-ts/dist/xsd';
import type { ArtDefinition_lebewesen, Art_lebewesen, AusrüstungEigengchaftDefinition_kampf_ausstattung, BesonderheitDefinition_besonderheit, Daten_nota as Daten, FernkampfwaffenDafinition_kampf_ausstattung, FertigkeitDefinition_fertigkeit, GattungDefinition_lebewesen, Gattung_lebewesen, LebensabschnittDefinition_lebewesen, Lebensabschnitt_lebewesen, Level_misc, Lokalisierungen_misc, MorphDefinition_lebewesen, Morph_lebewesen, NahkampfWaffenDefinition_kampf_ausstattung, PfadDefinition_pfad, RüstungDefinition_kampf_ausstattung, TagDefinition_misc, TalentDefinition_talent, _Talent4 } from 'src/data/nota.g';
import { distinct } from '../misc/misc';

// type lebensabschnittData =
//     | {
//         l: LebensabschnittDefinition_lebewesen;
//         m: MorphDefinition_lebewesen;
//         a: ArtDefinition_lebewesen;
//         g: GattungDefinition_lebewesen;
//     }


type OrganismEigenschaftChanges = {
    Eigenschaft: string,
    Effecting: 'value' | 'cost' | 'requirements'
    Typ: 'Alter' | 'Gattung' | 'Art' | 'Morph' | `eigenschaft-${string}` | `besonderheit-${string}` | `fertigkeit-${string}`
    | 'Lebensabschnitt-Gattung' | 'Lebensabschnitt-Art' | 'Lebensabschnitt-Morph'
}

export class Data {


    private instance: Daten
    public readonly id: string

    public static readonly MAX_TALENT = 130;

    public readonly talentMap: Record<string, Readonly<TalentDefinition_talent & { Kategorie: string }>>;
    public readonly talentCategoryMap: Record<string, Record<string, Readonly<TalentDefinition_talent>>>;

    public readonly talentCostTabel: readonly (readonly { readonly Kosten: { readonly Id: string; readonly Wert: number; }; }[])[];

    public readonly besonderheitenMap: Record<string, Readonly<BesonderheitDefinition_besonderheit & { Kategorie: string }>>;
    public readonly besonderheitenCategoryMap: Record<string, Record<string, Readonly<BesonderheitDefinition_besonderheit>>>;

    public readonly pfadMap: Record<string, Readonly<PfadDefinition_pfad & { Kategorie: string }>>;
    public readonly pfadCategoryMap: Record<string, { Name: Lokalisierungen_misc, Beschreibung: Lokalisierungen_misc } & Record<string, Readonly<PfadDefinition_pfad>>>;

    public readonly tagMap: Record<string, Readonly<TagDefinition_misc>>;

    public readonly fertigkeitenMap: Record<string, Readonly<FertigkeitDefinition_fertigkeit & { Kategorie: string }>>;
    public readonly fertigkeitenCategoryMap: Record<string, Record<string, Readonly<FertigkeitDefinition_fertigkeit>>>;
    public readonly StandardKosten: string;
    // public readonly lebensabschnittLookup: { [key: string]: lebensabschnittData };
    public readonly morphLookup: {
        [key: string]: {
            morph: MorphDefinition_lebewesen,
            art: ArtDefinition_lebewesen,
            gattung: GattungDefinition_lebewesen
        }
    };

    public readonly eigenschaftenDependencys: OrganismEigenschaftChanges[];
    public readonly besonderheitDependencys: OrganismEigenschaftChanges[];
    public readonly allEigenschaftKeys: string[];

    public readonly AusrüstungsEigenschaftMap: Record<string, Readonly<AusrüstungEigengchaftDefinition_kampf_ausstattung>>;

    public readonly nahkampfMap: Record<string, Readonly<NahkampfWaffenDefinition_kampf_ausstattung>>;
    public readonly fernkampfMap: Record<string, Readonly<FernkampfwaffenDafinition_kampf_ausstattung>>;
    public readonly RüstungMap: Record<string, Readonly<RüstungDefinition_kampf_ausstattung>>;
    //talentCostTabel: readonly { Kosten: { Wert: number; Id: string; }[]; }[][];
    /**
     *
     */
    constructor(data: Daten, digest: string) {
        this.id = digest;
        this.instance = data;

        window.localStorage.setItem('s' + digest, JSON.stringify(data));



        this.morphLookup = Object.fromEntries(
            data.Daten.Organismen.Gattung.flatMap((x) =>
                x.Art.flatMap((y) =>
                    y.Morphe.Morph.map((z) =>
                        [z.Id, {
                            morph: z,
                            art: y,
                            gattung: x
                        }]
                    )
                )
            )
        );


        // this.instance.Daten.Organismen.Gattung.flatMap(x => [{ mod: x.Mods?.Eigenschaften?.Mod.map(xx=>xx.), type: 'Gattung', id: x.Id }, ...x.Art.flatMap(y => [{ mod: y.Mods, type: 'Art', id: y.Id }, ...y.Morphe.Morph.flatMap(z => [{ mod: z.Mods, type: 'Morph', id: z.Id }, z.Lebensabschnitte.Lebensabschnitt.map(xx => ({ mod: xx.Mods, type: 'Morph-Lebensabschnitt', id: z.Id }))])])])

        // this.instance.Daten.Organismen.Gattung.flatMap(x => [{ mod: x.Mods?.Eigenschaften?.Mod.map(xx=>xx.), type: 'Gattung', id: x.Id }, ...x.Art.flatMap(y => [{ mod: y.Mods, type: 'Art', id: y.Id }, ...y.Morphe.Morph.flatMap(z => [{ mod: z.Mods, type: 'Morph', id: z.Id }, z.Lebensabschnitte.Lebensabschnitt.map(xx => ({ mod: xx.Mods, type: 'Morph-Lebensabschnitt', id: z.Id }))])])])


        this.allEigenschaftKeys = distinct([
            ...(this.instance.Daten.Organismen.Entwiklung?.Bereich ?? []).map(x => x.id),
            ...(this.instance.Daten.Organismen.Entwiklung?.Berechnung ?? []).map(x => x.id),
            ...(this.instance.Daten.Organismen.Entwiklung?.Punkt ?? []).map(x => x.id),
            ...(this.instance.Daten.Organismen.Entwiklung?.Reihe ?? []).map(x => x.id),
            ...(this.instance.Daten.Organismen.Gattung ?? []).flatMap(gattung => [
                ...(gattung.Entwiklung?.Bereich ?? []).map(x => x.id),
                ...(gattung.Entwiklung?.Berechnung ?? []).map(x => x.id),
                ...(gattung.Entwiklung?.Punkt ?? []).map(x => x.id),
                ...(gattung.Entwiklung?.Reihe ?? []).map(x => x.id),
                ...(gattung.Art ?? []).flatMap(art => [
                    ...(art.Entwiklung?.Bereich ?? []).map(x => x.id),
                    ...(art.Entwiklung?.Berechnung ?? []).map(x => x.id),
                    ...(art.Entwiklung?.Punkt ?? []).map(x => x.id),
                    ...(art.Entwiklung?.Reihe ?? []).map(x => x.id),
                    ...(art.Morphe.Morph ?? []).flatMap(morph => [
                        ...(morph.Entwiklung?.Bereich ?? []).map(x => x.id),
                        ...(morph.Entwiklung?.Berechnung ?? []).map(x => x.id),
                        ...(morph.Entwiklung?.Punkt ?? []).map(x => x.id),
                        ...(morph.Entwiklung?.Reihe ?? []).map(x => x.id),
                    ]),
                ]),
            ]),
        ]);

        const getKeysFrom = (params: string) => {
            return this.allEigenschaftKeys.filter(key => {
                let index: number | undefined = undefined;
                while (index !== -1) {

                    index = params.indexOf(key, index === undefined ? undefined : index + 1);
                    if (index == -1) {
                        continue;
                    }


                    const reg = /[a-zA-Z0-9]/;

                    if (index > 0 && reg.test(params[index - 1])) {
                        continue;
                    }
                    if ((index + key.length) < params.length - 1 && reg.test(params[index + key.length])) {
                        continue;
                    }
                    return true;
                }
                return false;
            })
        }


        this.eigenschaftenDependencys = distinct([
            ...(this.instance.Daten.Besonderheiten ?? []).flatMap(besonderheitGruppe =>
                [
                    ...(besonderheitGruppe.Besonderheit ?? []).flatMap(besonderheit => besonderheit.Stufe.flatMap(stufe => [
                        ...(stufe.Mods?.Eigenschaften?.Mod ?? []).map(x => ({ Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `besonderheit-${besonderheit.Id}` }  satisfies OrganismEigenschaftChanges))
                    ]))
                ]),
            ...(this.instance.Daten.Fertigkeiten ?? []).flatMap(fertigkeitenGruppe =>
                [
                    ...(fertigkeitenGruppe.Fertigkeit ?? []).flatMap(fertigkeit => fertigkeit.Stufe.flatMap(stufe => [
                        ...(stufe.Mods?.Eigenschaften?.Mod ?? []).map(x => ({ Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `fertigkeit-${fertigkeit.Id}` }  satisfies OrganismEigenschaftChanges))
                    ]))
                ]),
            ...(this.instance.Daten.Organismen.Entwiklung?.Berechnung ?? []).flatMap(berechnung => getKeysFrom(berechnung.Formel).map(id => ({ Effecting: 'value', Eigenschaft: berechnung.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))),

            ...(this.instance.Daten.Organismen.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                ...(punkt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                    { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                    { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                ]),
                ...(punkt.Kosten ?? []).flatMap(x => [
                    ...getKeysFrom(x.Berechnung).flatMap(id => [
                        { Effecting: 'cost', Eigenschaft: punkt.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                    ])

                ]),
            ]),
            ...(this.instance.Daten.Organismen.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                ...(reihe.Schwelle.flatMap(schwelle => ([
                    ... (schwelle.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                    ]),
                    ...(reihe.Schwelle.flatMap(schwelle => ([
                        ...(schwelle.Kosten ?? []).flatMap(x => [
                            ...getKeysFrom(x.Berechnung).flatMap(id => [
                                { Effecting: 'cost', Eigenschaft: reihe.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'cost', Eigenschaft: reihe.id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                            ])
                        ])
                    ])))
                ])))
            ]),
            ...(this.instance.Daten.Organismen.Entwiklung?.Bereich ?? []).flatMap(bereich => (bereich.Kosten ?? []).flatMap(x => [
                ...getKeysFrom(x.Berechnung).flatMap(id => [
                    { Effecting: 'cost', Eigenschaft: bereich.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                ])
            ])),
            ...this.instance.Daten.Organismen.Gattung.flatMap(gattung => [
                ...(gattung.Mods?.Eigenschaften?.Mod ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.Eigenschaft, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges)),
                ...(gattung.Entwiklung?.Berechnung ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges)),
                ...(gattung.Entwiklung?.Berechnung ?? []).flatMap(berechnung => getKeysFrom(berechnung.Formel).map(id => ({ Effecting: 'value', Eigenschaft: berechnung.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))),
                ...(gattung.Entwiklung?.Bereich ?? []).flatMap(bereich => (bereich.Kosten ?? []).flatMap(x => [
                    ...getKeysFrom(x.Berechnung).flatMap(id => [
                        { Effecting: 'cost', Eigenschaft: bereich.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                    ])
                ])),
                ...(gattung.Entwiklung?.Punkt ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges)),
                ...(gattung.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                    ...(punkt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                    ]),
                    ...(punkt.Kosten ?? []).flatMap(x => [
                        ...getKeysFrom(x.Berechnung).flatMap(id => [
                            { Effecting: 'cost', Eigenschaft: punkt.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                        ])
                    ]),
                ]),
                ...(gattung.Entwiklung?.Reihe ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges)),
                ...(gattung.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                    ...(reihe.Schwelle.flatMap(schwelle => ([
                        ... (schwelle.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                        ]),
                        ...(reihe.Schwelle.flatMap(schwelle => ([
                            ...(schwelle.Kosten ?? []).flatMap(x => [
                                ...getKeysFrom(x.Berechnung).flatMap(id => [
                                    { Effecting: 'cost', Eigenschaft: reihe.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'cost', Eigenschaft: reihe.id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                ])
                            ])
                        ])))

                    ])))
                ]),
                ...(gattung.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                    ...(lebensabschnitt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => ([
                        { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Lebensabschnitt-Gattung' }  satisfies OrganismEigenschaftChanges]))
                ]),
                ...(gattung.Art.flatMap(art => [
                    ...(art.Mods?.Eigenschaften?.Mod ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.Eigenschaft, Typ: 'Art' }  satisfies OrganismEigenschaftChanges)),
                    ...(art.Entwiklung?.Berechnung ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges)),
                    ...(art.Entwiklung?.Berechnung ?? []).flatMap(berechnung => getKeysFrom(berechnung.Formel).map(id => ({ Effecting: 'value', Eigenschaft: berechnung.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))),
                    ...(art.Entwiklung?.Bereich ?? []).flatMap(bereich => (bereich.Kosten ?? []).flatMap(x => [
                        ...getKeysFrom(x.Berechnung).map(id => ({ Effecting: 'cost', Eigenschaft: bereich.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))
                    ])),
                    ...(art.Entwiklung?.Punkt ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges)),
                    ...(art.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                        ...(punkt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Art' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                        ]),
                        ...(punkt.Kosten ?? []).flatMap(x => [
                            ...getKeysFrom(x.Berechnung).flatMap(id => [
                                { Effecting: 'cost', Eigenschaft: punkt.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                            ])
                        ]),
                    ]),
                    ...(art.Entwiklung?.Reihe ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges)),
                    ...(art.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                        ...(reihe.Schwelle.flatMap(schwelle => ({
                            ...(schwelle.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Art' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                            ])
                        }))),
                        ...(reihe.Schwelle.flatMap(schwelle => ([
                            ...(schwelle.Kosten ?? []).flatMap(x => [
                                ...getKeysFrom(x.Berechnung).flatMap(id => [
                                    { Effecting: 'cost', Eigenschaft: reihe.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'cost', Eigenschaft: reihe.id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                ])
                            ])
                        ])))
                    ]),
                    ...(art.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                        ...(lebensabschnitt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => ([
                            { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Lebensabschnitt-Art' }  satisfies OrganismEigenschaftChanges]))
                    ]),
                    ...(art.Morphe.Morph.flatMap(morph => [
                        ...(morph.Mods?.Eigenschaften?.Mod ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.Eigenschaft, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges)),
                        ...(morph.Entwiklung?.Berechnung ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges)),
                        ...(morph.Entwiklung?.Berechnung ?? []).flatMap(berechnung => getKeysFrom(berechnung.Formel).map(id => ({ Effecting: 'value', Eigenschaft: berechnung.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))),
                        ...(morph.Entwiklung?.Bereich ?? []).flatMap(bereich => (bereich.Kosten ?? []).flatMap(x => [
                            ...getKeysFrom(x.Berechnung).map(id => ({ Effecting: 'cost', Eigenschaft: bereich.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))
                        ])),
                        ...(morph.Entwiklung?.Punkt ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges)),
                        ...(morph.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                            ...(punkt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                            ]),
                            ...(punkt.Kosten ?? []).flatMap(x => [
                                ...getKeysFrom(x.Berechnung).flatMap(id => [
                                    { Effecting: 'cost', Eigenschaft: punkt.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                                ])
                            ]),
                        ]),
                        ...(morph.Entwiklung?.Reihe ?? []).map(y => ({ Effecting: 'value', Eigenschaft: y.id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges)),
                        ...(morph.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                            ...(reihe.Schwelle.flatMap(schwelle => ([
                                ...(schwelle.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => [
                                    { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                                ])
                            ]))),
                            ...(reihe.Schwelle.flatMap(schwelle => ([
                                ...(schwelle.Kosten ?? []).flatMap(x => [
                                    ...getKeysFrom(x.Berechnung).flatMap(id => [
                                        { Effecting: 'cost', Eigenschaft: reihe.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges,
                                        { Effecting: 'cost', Eigenschaft: reihe.id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                    ])
                                ])
                            ])))
                        ]),
                        ...(morph.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                            ...(lebensabschnitt.Mods?.Eigenschaften?.Mod ?? []).flatMap(x => ([
                                { Effecting: 'value', Eigenschaft: x.Eigenschaft, Typ: 'Lebensabschnitt-Morph' }  satisfies OrganismEigenschaftChanges]))
                        ]),
                    ])),
                ])),
            ]),
        ], e => `${e.Eigenschaft}δ${e.Typ}δ${e.Effecting}`);

        this.besonderheitDependencys = distinct([
            ...(this.instance.Daten.Besonderheiten ?? []).flatMap(besonderheitGruppe =>
                [
                    ...(besonderheitGruppe.Besonderheit ?? []).flatMap(besonderheit => besonderheit.Stufe.flatMap(stufe => [
                        ...(stufe.Mods?.Besonderheiten?.Besonderheit ?? []).map(x => ({ Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `besonderheit-${besonderheit.Id}` }  satisfies OrganismEigenschaftChanges))
                    ]))
                ]),
            ...(this.instance.Daten.Fertigkeiten ?? []).flatMap(fertigkeitenGruppe =>
                [
                    ...(fertigkeitenGruppe.Fertigkeit ?? []).flatMap(fertigkeit => fertigkeit.Stufe.flatMap(stufe => [
                        ...(stufe.Mods?.Besonderheiten?.Besonderheit ?? []).map(x => ({ Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `fertigkeit-${fertigkeit.Id}` }  satisfies OrganismEigenschaftChanges))
                    ]))
                ]),
            ...(this.instance.Daten.Organismen.Entwiklung?.Berechnung ?? []).flatMap(berechnung => getKeysFrom(berechnung.Formel).map(id => ({ Effecting: 'value' as const, Eigenschaft: berechnung.id, Typ: `eigenschaft-${id}` }  satisfies OrganismEigenschaftChanges))),

            ...(this.instance.Daten.Organismen.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                ...(punkt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                    { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' } satisfies OrganismEigenschaftChanges,
                    { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${punkt.id}` } satisfies OrganismEigenschaftChanges,
                ])
            ]),
            ...(this.instance.Daten.Organismen.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                ...(reihe.Schwelle.flatMap(schwelle => ([
                    ... (schwelle.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                    ])
                ])))
            ]),
            ...this.instance.Daten.Organismen.Gattung.flatMap(gattung => [
                ...(gattung.Mods?.Besonderheiten?.Besonderheit ?? []).map(y => ({ Effecting: 'value' as const, Eigenschaft: y.Id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges)),
                ...(gattung.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                    ...(punkt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                    ])
                ]),
                ...(gattung.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                    ...(reihe.Schwelle.flatMap(schwelle => ([
                        ... (schwelle.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                        ])
                    ])))
                ]),
                ...(gattung.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                    ...(lebensabschnitt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => ([
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Gattung' }  satisfies OrganismEigenschaftChanges,
                        { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges]))
                ]),
                ...(gattung.Art.flatMap(art => [
                    ...(art.Mods?.Besonderheiten?.Besonderheit ?? []).map(y => ({ Effecting: 'value' as const, Eigenschaft: y.Id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges)),
                    ...(art.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                        ...(punkt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                        ])
                    ]),
                    ...(art.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                        ...(reihe.Schwelle.flatMap(schwelle => ({
                            ...(schwelle.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                            ])
                        })))
                    ]),
                    ...(art.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                        ...(lebensabschnitt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => ([
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Art' }  satisfies OrganismEigenschaftChanges,
                            { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges]))
                    ]),
                    ...(art.Morphe.Morph.flatMap(morph => [
                        ...(morph.Mods?.Besonderheiten?.Besonderheit ?? []).map(y => ({ Effecting: 'value' as const, Eigenschaft: y.Id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges)),
                        ...(art.Entwiklung?.Punkt ?? []).flatMap(punkt => [
                            ...(punkt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${punkt.id}` }  satisfies OrganismEigenschaftChanges,
                            ])
                        ]),
                        ...(morph.Entwiklung?.Reihe ?? []).flatMap(reihe => [
                            ...(reihe.Schwelle.flatMap(schwelle => ([
                                ...(schwelle.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => [
                                    { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges,
                                    { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: `eigenschaft-${reihe.id}` }  satisfies OrganismEigenschaftChanges,
                                ])
                            ])))
                        ]),
                        ...(morph.Lebensabschnitte?.Lebensabschnitt ?? []).flatMap(lebensabschnitt => [
                            ...(lebensabschnitt.Mods?.Besonderheiten?.Besonderheit ?? []).flatMap(x => ([
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Morph' }  satisfies OrganismEigenschaftChanges,
                                { Effecting: 'value' as const, Eigenschaft: x.Id, Typ: 'Alter' }  satisfies OrganismEigenschaftChanges]))
                        ]),
                    ])),
                ])),
            ]),
        ], e => `${e.Eigenschaft}δ${e.Typ}`);




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
        this.pfadCategoryMap = data.Daten.Pfade.map(x => ({
            Name: x.Name,
            Beschreibung: x.Beschreibung,
            ...x.Pfad
                .map(y => ({ ...y, Kategorie: x.Id })).reduce((p, c) => { p.t[c.Id] = c; return p; }, { id: x.Id, t: {} } as { id: string, t: Record<string, PfadDefinition_pfad> })
        })
        )
            .reduce((p, c) => { p[c.id] = { ...c.t, Beschreibung: c.Beschreibung, Name: c.Name } as any; return p; }, {} as Record<string, { Name: Lokalisierungen_misc, Beschreibung: Lokalisierungen_misc } & Record<string, PfadDefinition_pfad>>);


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
    public static async init(local: boolean, id?: string) {
        const { notaData, digest } = id && window.localStorage.getItem('s' + id)
            ? { notaData: JSON.parse(window.localStorage.getItem('s' + id)!), digest: id }
            : await download(local);

        return notaData ? new Data(notaData, digest) : undefined;

        async function download(local: boolean) {
            // const data = local ?
            //     nota
            //         .replace(/http:\/\/nota.org\/schema\//g, 'https://nota-game.github.io/schema/vNext/')
            //     : await (await fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')).text()
            let data: string;
            try {
                throw "err";
                data = await (await fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')).text();

            } catch (error) {
                data = nota
                    .replace(/http:\/\/nota.org\/schema\//g, 'https://nota-game.github.io/schema/vNext/')
                    ;
            }




            // the result will be a replica of the original object
            const deserialized = deserialize(notaStructure as SerializedRecord) as Array<element>;
            const dat = deserialized.filter((x) => x.name.local === 'Daten')[0];
            const parser = new Parser<Daten>(dat);
            const notaData = parser.parse(data);

            const enc = new TextEncoder(); // always utf-8
            const digest = base64.encode(new Uint8Array((await window.crypto.subtle.digest('SHA-256', enc.encode(JSON.stringify(notaData))))));
            return { notaData, digest };
        }
    }


    public static age2Lebensabschnitte(
        age: number | undefined,
        morph?: MorphDefinition_lebewesen | undefined,
        art?: ArtDefinition_lebewesen | undefined,
        gattung?: GattungDefinition_lebewesen | undefined
    ): LebensabschnittDefinition_lebewesen[] | undefined {
        if (!age) return undefined;

        function getLast<T>(array?: T[]) {
            if (array == undefined) return undefined;
            return array.length == 0 ? undefined : array[array.length - 1];
        }

        function notUndefined<T>(array: (T | undefined)[]): T[] {
            return array.filter(x => x !== undefined) as T[];
        }

        return notUndefined([getLast(morph?.Lebensabschnitte.Lebensabschnitt.filter(m => age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age))),
        getLast(art?.Lebensabschnitte?.Lebensabschnitt.filter(m => !(morph?.Lebensabschnitte.IgnoriereHöhere ?? false) && age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age))),
        getLast(gattung?.Lebensabschnitte?.Lebensabschnitt.filter(m => !(morph?.Lebensabschnitte.IgnoriereHöhere ?? false) && !(art?.Lebensabschnitte?.IgnoriereHöhere ?? false) && age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age)))]);
    }




    public get Instance(): Daten {
        if (!this.instance) {
            throw Error('Not initilize');
        }
        return this.instance;
    }


}