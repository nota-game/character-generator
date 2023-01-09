import type { MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen, LebensabschnittDefinition_lebewesen, StaticheDefinition_lebewesen, ReiheDefinition_lebewesen, FormelDefintion_lebewesen, PunktDefintion_lebewesen, _Reihe, _Schwelle, _Lokalisirung, _Besonderheit } from "../data/nota.g";
import StoreManager, { UNINITILEZED, type Key } from "../misc/StoreManager2";
import type { Readable, Writable } from "svelte/store";
// import { derivedLazy } from "../lazyDerivied";

import { Data } from "./Data";
import { getLast } from "../misc/misc";
import { end_hydrating } from "svelte/internal";

export type EigenschaftTypes = 'bereich' | 'reihe' | 'punkt' | 'berechnung';
export type EigenschaftTypesLevel = 'morph' | 'art' | 'gattung' | 'organismus';

export type MissingRequirements = { type: 'tag', id: string }
    | { type: 'Fertigkeit', id: string, Stufe: number }
    | { type: 'Besonderheit', id: string, Stufe: number }
    | { type: 'Talent', id: string, Stufe: number, Kind: 'Basis' | 'Effektiv' | 'Unterstützung' }
    | { type: 'Not', sub: MissingRequirements }
    | { type: 'And', sub: MissingRequirements[] }
    | { type: 'Or', sub: MissingRequirements[] }


export class Charakter {

    public readonly ageStore: Writable<number>;

    public readonly gattungsIdStore: Writable<string | undefined>;
    public readonly gattungsStore: Readable<GattungDefinition_lebewesen | undefined>;
    public readonly possibleGattungStore: Readable<string[]>;

    public readonly artIdStore: Writable<string | undefined>;
    public readonly artStore: Readable<ArtDefinition_lebewesen | undefined>;
    public readonly possibleArtStore: Readable<string[]>;

    public readonly morphIdStore: Writable<string | undefined>;
    public readonly morphStore: Readable<MorphDefinition_lebewesen | undefined>;
    public readonly possibleMorphStore: Readable<string[]>;


    public readonly eigenschaften: Record<string, {
        effective: Readable<number | undefined>,
        type: Readable<EigenschaftTypes | undefined>,
        raw: Writable<number | undefined>,
        meta: Readable<StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen | undefined>,
    }> = {};


    public readonly lebensAbschnitteStore: Readable<{
        gattung: LebensabschnittDefinition_lebewesen | undefined;
        art: LebensabschnittDefinition_lebewesen | undefined;
        morph: LebensabschnittDefinition_lebewesen | undefined;
    }>;


    public readonly stammdaten: Data;
    private readonly id: string;

    private readonly storeManager;

    private getBesonterheitKeys<id extends string>(Id: id): { keyPurchased: Key<`/besonderheit/${id}/purchased`, number>; keyFixed: Key<`/besonderheit/${id}/fixed`, number>; keyUnbeschränkt: Key<`/besonderheit/${id}/StufeUnbeschränkt`, number>; keyMissing: Key<`/besonderheit/${id}/Missing`, { wert: number; missing: MissingRequirements; }[]>; keyEffectiv: Key<`/besonderheit/${id}/Stufe`, number>; } {
        const keyPurchased = this.storeManager.key(`/besonderheit/${Id}/purchased`).of<number>();
        const keyFixed = this.storeManager.key(`/besonderheit/${Id}/fixed`).of<number>();
        const keyUnbeschränkt = this.storeManager.key(`/besonderheit/${Id}/StufeUnbeschränkt`).of<number>();
        const keyMissing = this.storeManager.key(`/besonderheit/${Id}/Missing`).of<{ wert: number, missing: MissingRequirements }[]>();
        const keyEffectiv = this.storeManager.key(`/besonderheit/${Id}/Stufe`).of<number>();

        return {
            keyPurchased,
            keyFixed,
            keyUnbeschränkt,
            keyMissing,
            keyEffectiv
        }
    }

    private getFertigkeitenKeys<id extends string>(Id: id): { keyPurchased: Key<`/fertigkeit/${id}/purchased`, number>; keyFixed: Key<`/fertigkeit/${id}/fixed`, number>; keyUnbeschränkt: Key<`/fertigkeit/${id}/StufeUnbeschränkt`, number>; keyMissing: Key<`/fertigkeit/${id}/Missing`, { wert: number; missing: MissingRequirements; }[]>; keyEffectiv: Key<`/fertigkeit/${id}/Stufe`, number>; } {
        const keyPurchased = this.storeManager.key(`/fertigkeit/${Id}/purchased`).of<number>();
        const keyFixed = this.storeManager.key(`/fertigkeit/${Id}/fixed`).of<number>();
        const keyUnbeschränkt = this.storeManager.key(`/fertigkeit/${Id}/StufeUnbeschränkt`).of<number>();
        const keyMissing = this.storeManager.key(`/fertigkeit/${Id}/Missing`).of<{ wert: number, missing: MissingRequirements }[]>();
        const keyEffectiv = this.storeManager.key(`/fertigkeit/${Id}/Stufe`).of<number>();

        return { keyPurchased, keyFixed, keyUnbeschränkt, keyMissing, keyEffectiv };
    }

    private getPropertieKeys(prop: string) {


        return {
            raw: this.storeManager.key(`/eigenschaften/${prop}/raw`).of<number | undefined>(),
            effective: this.storeManager.key(`/eigenschaften/${prop}/effektiv`).of<number | undefined>(),
            type: this.storeManager.key(`/eigenschaften/${prop}/type`).of<EigenschaftTypes | undefined>(),
            meta: this.storeManager.key(`/eigenschaften/${prop}/meta`).of<StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen | undefined>()
        }
    }


    /**
     *
     */
    constructor(stammdaten: Data, id: string) {
        this.stammdaten = stammdaten;
        this.id = id;
        this.storeManager = new StoreManager(stammdaten);

        const gattungsIdKey = this.storeManager.key('/organism/gattung/selected').of<string | undefined>();
        const artIdKey = this.storeManager.key('/organism/art/selected').of<string | undefined>();
        const morphIdKey = this.storeManager.key('/organism/morph/selected').of<string | undefined>();

        const gattungsInstanceKey = this.storeManager.key('/organism/gattung/instance').of<GattungDefinition_lebewesen | undefined>();
        const artInstanceKey = this.storeManager.key('/organism/art/instance').of<ArtDefinition_lebewesen | undefined>();
        const morphInstanceKey = this.storeManager.key('/organism/morph/instance').of<MorphDefinition_lebewesen | undefined>();

        const gattungPossibleKey = this.storeManager.key('/organism/gattung/possible').of<string[]>();
        const artPossibleKey = this.storeManager.key('/organism/art/possible').of<string[]>();
        const morphPossibleKey = this.storeManager.key('/organism/morph/possible').of<string[]>();

        const ageKey = this.storeManager.key('/organism/age').of<number>();




        this.ageStore = this.storeManager.writable(ageKey, 1);

        this.gattungsIdStore = this.storeManager.writable(gattungsIdKey, undefined);
        this.possibleGattungStore = this.storeManager.derived(gattungPossibleKey, [], function (data) {
            return data.Instance.Daten.Organismen.Gattung.map(x => x.Id);
        });
        this.gattungsStore = this.storeManager.derived(gattungsInstanceKey, gattungsIdKey, function (data, gattungsId) {
            if (gattungsId === undefined) {
                return undefined;
            }
            const selectedGattung = data.Instance.Daten.Organismen.Gattung.filter(x => x.Id == gattungsId)[0];
            return selectedGattung;
        });

        this.artIdStore = this.storeManager.writable(artIdKey, undefined);
        this.possibleArtStore = this.storeManager.derived(artPossibleKey, gattungsInstanceKey, function (_data, selectedGattung) {
            if (selectedGattung === undefined) {
                return [];
            }
            return selectedGattung?.Art.map(x => x.Id) ?? [];
        });
        this.artStore = this.storeManager.derived(artInstanceKey, [artIdKey, gattungsInstanceKey], function (data, [artId, gattung]) {
            if (gattung === undefined || artId === undefined) {
                return undefined;
            }
            const selectedGattung = gattung.Art.filter(x => x.Id == artId)[0];
            return selectedGattung;
        });

        this.morphIdStore = this.storeManager.writable(morphIdKey, undefined);
        this.possibleMorphStore = this.storeManager.derived(morphPossibleKey, artInstanceKey, function (_data, selectedArt) {
            if (selectedArt === undefined) {
                return [];
            }
            return selectedArt?.Morphe.Morph.map(x => x.Id) ?? [];
        });
        this.morphStore = this.storeManager.derived(morphInstanceKey, [morphIdKey, artInstanceKey], function (data, [artId, art]) {
            if (art === undefined || artId === undefined) {
                return undefined;
            }
            const selectedGattung = art.Morphe.Morph.filter(x => x.Id == artId)[0];
            return selectedGattung;
        });

        const lebensabschnittGattungKey = this.storeManager.key('/organism/gattung/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittArtKey = this.storeManager.key('/organism/art/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittMorphKey = this.storeManager.key('/organism/morph/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittKey = this.storeManager.key('/organism/*/lebensabschnitt').of<{ gattung: LebensabschnittDefinition_lebewesen | undefined, art: LebensabschnittDefinition_lebewesen | undefined, morph: LebensabschnittDefinition_lebewesen | undefined }>()

        this.lebensAbschnitteStore = this.storeManager.readable(lebensabschnittKey);

        this.storeManager.derived(lebensabschnittGattungKey, [ageKey, gattungsInstanceKey], (data, [age, gattung]) => {
            return getLast(gattung?.Lebensabschnitte?.Lebensabschnitt.filter(m => age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age)));
        })
        this.storeManager.derived(lebensabschnittArtKey, [ageKey, artInstanceKey], (data, [age, art]) => {
            return getLast(art?.Lebensabschnitte?.Lebensabschnitt.filter(m => age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age)));
        })
        this.storeManager.derived(lebensabschnittMorphKey, [ageKey, morphInstanceKey], (data, [age, morph],) => {
            return getLast(morph?.Lebensabschnitte?.Lebensabschnitt.filter(m => age >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age)));
        })





        for (const key of this.stammdaten.allEigenschaftKeys) {

            const { raw: rawKey, effective: effectiveKey, type: typeKey, meta: metaKey } = this.getPropertieKeys(key);

            const tmpKey = this.storeManager.key(`/tmp/eigenschaft/${key}`).of<{ entry: StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen, type: EigenschaftTypes, level: EigenschaftTypesLevel } | undefined>();
            // const effectiveKey = this.storeManager.key(`/eigenschaft/${key}/effektiv`).of<number | undefined>();
            // const writablStore = this.storeManager.writable(rawKey, undefined);

            this.eigenschaften[key] = {
                effective: this.storeManager.readable(effectiveKey),
                raw: this.storeManager.writable(rawKey, undefined),
                type: this.storeManager.readable(typeKey),
                meta: this.storeManager.readable(metaKey),
            };
            const dependentData = this.stammdaten.eigenschaftenDependencys.filter(x => x.Eigenschaft == key).map(x => x.Typ);


            const dependentBesonderheiten: Key<string, number>[] = dependentData.filter(x => x.startsWith('besonderheit-'))
                .map(x => x.substring('besonderheit-'.length))
                .map(x => this.getBesonterheitKeys(x).keyEffectiv);
            const dependentFertigkeiten: Key<string, number>[] = dependentData.filter(x => x.startsWith('fertigkeit-'))
                .map(x => x.substring('fertigkeit-'.length))
                .map(x => this.getFertigkeitenKeys(x).keyEffectiv);

            const dependentEigenschaften: Key<string, number>[] = dependentData.filter(x => x.startsWith('eigenschaft-'))
                .map(x => x.substring('eigenschaft-'.length))
                .map(x => this.getPropertieKeys(x).effective);

            this.storeManager.derived(tmpKey, [morphInstanceKey, artInstanceKey, gattungsInstanceKey], (data, [morph, art, gattung]) => {
                const base = morph?.Entwiklung?.Berechnung?.filter(x => x.id == key).map(x => ({ entry: x, type: 'berechnung' as const, level: 'morph' as const }))[0]
                    ?? morph?.Entwiklung?.Bereich?.filter(x => x.id == key).map(x => ({ entry: x, type: 'bereich' as const, level: 'morph' as const }))[0]
                    ?? morph?.Entwiklung?.Punkt?.filter(x => x.id == key).map(x => ({ entry: x, type: 'punkt' as const, level: 'morph' as const }))[0]
                    ?? morph?.Entwiklung?.Reihe?.filter(x => x.id == key).map(x => ({ entry: x, type: 'reihe' as const, level: 'morph' as const }))[0]
                    ?? art?.Entwiklung?.Berechnung?.filter(x => x.id == key).map(x => ({ entry: x, type: 'berechnung' as const, level: 'art' as const }))[0]
                    ?? art?.Entwiklung?.Bereich?.filter(x => x.id == key).map(x => ({ entry: x, type: 'bereich' as const, level: 'art' as const }))[0]
                    ?? art?.Entwiklung?.Punkt?.filter(x => x.id == key).map(x => ({ entry: x, type: 'punkt' as const, level: 'art' as const }))[0]
                    ?? art?.Entwiklung?.Reihe?.filter(x => x.id == key).map(x => ({ entry: x, type: 'reihe' as const, level: 'art' as const }))[0]
                    ?? gattung?.Entwiklung?.Berechnung?.filter(x => x.id == key).map(x => ({ entry: x, type: 'berechnung' as const, level: 'gattung' as const }))[0]
                    ?? gattung?.Entwiklung?.Bereich?.filter(x => x.id == key).map(x => ({ entry: x, type: 'bereich' as const, level: 'gattung' as const }))[0]
                    ?? gattung?.Entwiklung?.Punkt?.filter(x => x.id == key).map(x => ({ entry: x, type: 'punkt' as const, level: 'gattung' as const }))[0]
                    ?? gattung?.Entwiklung?.Reihe?.filter(x => x.id == key).map(x => ({ entry: x, type: 'reihe' as const, level: 'gattung' as const }))[0]
                    ?? data.Instance.Daten.Organismen.Entwiklung?.Berechnung?.filter(x => x.id == key).map(x => ({ entry: x, type: 'berechnung' as const, level: 'organismus' as const }))[0]
                    ?? data.Instance.Daten.Organismen.Entwiklung?.Bereich?.filter(x => x.id == key).map(x => ({ entry: x, type: 'bereich' as const, level: 'organismus' as const }))[0]
                    ?? data.Instance.Daten.Organismen.Entwiklung?.Punkt?.filter(x => x.id == key).map(x => ({ entry: x, type: 'punkt' as const, level: 'organismus' as const }))[0]
                    ?? data.Instance.Daten.Organismen.Entwiklung?.Reihe?.filter(x => x.id == key).map(x => ({ entry: x, type: 'reihe' as const, level: 'organismus' as const }))[0]
                    ;
                return base;
            }, (a, b) => {
                if (a === UNINITILEZED) {
                    return b === UNINITILEZED;
                } else if (b === UNINITILEZED) {
                    return false;
                } else
                    return a?.entry.id === b?.entry.id && a?.type === b?.type && b?.level === a?.level;
            });


            this.storeManager.derived(effectiveKey, [ageKey, tmpKey, rawKey, ...[...dependentBesonderheiten, ...dependentFertigkeiten, ...dependentEigenschaften]], (data, [age, base, setValue, ...dependent], [ageChanged, tmpChanged, setChanges, ...changes], oldValue) => {

                let resultreturn: number;



                if (base === undefined) {
                    return undefined;
                }

                if (base.type === 'bereich') {
                    const entry = base.entry as StaticheDefinition_lebewesen;
                    if (setValue === undefined) {
                        return entry.default;
                    } else if (setValue > entry.maxInklusiv) {
                        return entry.maxInklusiv;
                    } else if (setValue < entry.minInklusiv) {
                        return entry.minInklusiv;
                    } else {
                        return setValue;
                    }
                } else if (base.type == 'punkt') {
                    const punkt = base.entry as PunktDefintion_lebewesen;
                    const start = punkt.Zeitpunkt[0].alter ?? 0;
                    const end = punkt.Zeitpunkt[1]?.alter;
                    if (age < start) {
                        resultreturn = 0;
                    } else if (end !== undefined && age < end) {
                        resultreturn = setValue != 0 && setValue != undefined ? 1 : 0;
                    } else {
                        resultreturn = 1;
                    }


                } else if (base.type == 'reihe') {
                    const reihe = base.entry as ReiheDefinition_lebewesen;

                    // const reihe = currentEntwicklung.Reihe?.filter(x => x.id == currentProperty.id)[0];
                    if (reihe == undefined) {
                        return undefined;
                    }
                    const { quantile, schwellen } = Charakter.applyAge(age, reihe)

                    const min = Math.min(...quantile.map(x => x.Quantil))
                    const max = Math.max(...quantile.map(x => x.Quantil))

                    if (setValue == undefined)
                        resultreturn = min;
                    else
                        resultreturn = Math.min(max, Math.max(min, setValue));

                } else {
                    return undefined;
                }

                return undefined;



                // check if it is active
                if (!propertyKeys.map(x => x.id).includes(key)) {
                    return undefined;
                }

                // if only keys changed we can use the old value
                if (!setChanges && !changes.some(x => x)) {
                    return oldValue;
                }

                const propertyOrder = { 'organismus': 4, 'gattung': 3, 'art': 2, 'morph': 1 };
                const currentProperty = propertyKeys.filter(x => x.id == key).sort((a, b) => propertyOrder[a.definition] - propertyOrder[b.definition])[0];

                const currentEntwicklung = currentProperty.definition == 'morph'
                    ? morph?.Entwiklung
                    : currentProperty.definition == 'art'
                        ? art?.Entwiklung
                        : currentProperty.definition == 'gattung'
                            ? gattung?.Entwiklung
                            : currentProperty.definition == 'organismus'
                                ? this.stammdaten.Instance.Daten.Organismen.Entwiklung
                                : undefined;


                if (currentEntwicklung == undefined) {
                    return undefined;
                }

                if (currentProperty.type == 'berechnung') {

                    const calculation = currentEntwicklung.Berechnung?.filter(x => x.id == currentProperty.id)[0];
                    if (calculation == undefined) {
                        return undefined;
                    }

                    const formalRaw = calculation.Formel;
                    const reg = /:(?<path>[\w\d]+):/g;

                    const matches = [...formalRaw.matchAll(reg)].map(x => x.groups?.['path'] as string).filter(x => !x);

                    let counter = 0;
                    const randomName = () => {
                        counter++;
                        return `foo${counter};`
                    }

                    const ids = distinct(matches).map(x => ({ path: x, name: randomName() }));

                    const scope: any = {};


                    for (const { path, name } of ids) {

                        const foundEigenschaft = dependentEigenschaften.map((x, i) => [x, i] as const).filter(([x, i]) => x.Key == `${path}/effektiv`)[0]

                        if (foundEigenschaft == undefined) {
                            console.warn("Did not find eigeschft", path)
                            continue;
                        }

                        const index = dependentBesonderheiten.length + dependentFertigkeiten.length + foundEigenschaft[1];

                        scope[name] = () => dependent[index];
                    }
                    const formal = ids.reduce((p, c) => p.replace(`:${c.path}:`, c.name), formalRaw);

                    const result = mathjs.evaluate(formal, scope);
                    resultreturn = Array.isArray(result) ? result[result.length - 1] : result;

                } else if (currentProperty.type == 'punkt') {

                    const start = currentEntwicklung.Punkt?.filter(x => x.id == currentProperty.id)[0].Zeitpunkt[0].alter ?? 0;
                    const end = currentEntwicklung.Punkt?.filter(x => x.id == currentProperty.id)[0].Zeitpunkt[1]?.alter;
                    if (age < start) {
                        resultreturn = 0;
                    } else if (end !== undefined && age < end) {
                        resultreturn = setValue != 0 && setValue != undefined ? 1 : 0;
                    } else {
                        resultreturn = 1;
                    }


                } else if (currentProperty.type == 'reihe') {

                    const reihe = currentEntwicklung.Reihe?.filter(x => x.id == currentProperty.id)[0];
                    if (reihe == undefined) {
                        return undefined;
                    }
                    const { quantile, schwellen } = Charakter.applyAge(age, reihe)

                    const min = Math.min(...quantile.map(x => x.Quantil))
                    const max = Math.max(...quantile.map(x => x.Quantil))

                    if (setValue == undefined)
                        resultreturn = min;
                    else
                        resultreturn = Math.min(max, Math.max(min, setValue));

                } else {
                    throw new Error('Not implemented');
                }

                // TODO: chek mods… inkluding schwellen… ¬_¬



                // check if only property keys changed

                return resultreturn;
            })
            this.storeManager.derived(typeKey, tmpKey, (data, base) => {


                return base?.type;

            })
            this.storeManager.derived(metaKey, [ageKey, tmpKey, rawKey], (data, [age, base, raw]) => {




                if (base === undefined) {
                    return undefined;
                }

                if (base.type === 'bereich') {
                    const entry = base.entry as StaticheDefinition_lebewesen;
                    return entry;
                } else if (base.type == 'punkt') {
                    const punkt = base.entry as PunktDefintion_lebewesen;
                    return punkt;


                } else if (base.type == 'reihe') {
                    const reihe = base.entry as ReiheDefinition_lebewesen;

                    // const reihe = currentEntwicklung.Reihe?.filter(x => x.id == currentProperty.id)[0];
                    if (reihe == undefined) {
                        return undefined;
                    }
                    if (raw) {
                        const { quantile, schwellen, currentSchwelle } = Charakter.applyAge(age, reihe, raw);
                    }else{
                        const { quantile, schwellen, currentSchwelle } = Charakter.applyAge(age, reihe, raw);
                        
                    }

                    const min = Math.min(...quantile.map(x => x.Quantil))
                    const max = Math.max(...quantile.map(x => x.Quantil))


                    // if (raw == undefined)
                    //     resultreturn = min;
                    // else
                    //     resultreturn = Math.min(max, Math.max(min, raw));

                } else {
                    return undefined;
                }
                return base?.entry;

            })




        }
    }

















    public static applyAge(age: number, reihe: _Reihe): { schwellen: Schwelle[]; quantile: Quantile[]; };
    public static applyAge(age: number, reihe: _Reihe, currentValue: number): { schwellen: Schwelle[]; quantile: Quantile[]; currentSchwelle: Schwelle; };
    public static applyAge(age: number, reihe: _Reihe, currentValue?: number): { schwellen: Schwelle[]; quantile: Quantile[]; currentSchwelle?: Schwelle; } {
        const a = age;
        const tempIndex = Math.round(
            (a - (reihe?.startAlter ?? 0)) / (reihe?.step ?? 1) + (reihe?.startAlter ?? 0)
        );

        const index = Math.min((reihe?.Schwelle?.[0]?.Wert?.length ?? 0) - 1, Math.max(tempIndex, 0));
        const indexVerteilung = Math.min(
            (reihe?.Verteilung?.length ?? 0) - 1,
            Math.max(tempIndex, 0)
        );



        const schwellen =
            reihe?.Schwelle?.map((x) => ({
                ...x,
                Wert: x.Wert[index]
            }))
                .sort((a, b) => a.Wert - b.Wert)
                .filter((x) => x.Wert !== undefined) ?? [];


        const quantile =
            reihe?.Verteilung[indexVerteilung]?.Wert
                ?.sort((a, b) => a.meta.Quantil - b.meta.Quantil)
                .map(x => ({ Wert: x.value, Quantil: x.meta.Quantil }))
            ?? [];



        // const quantile =
        //     reihe?.Verteilung?.map((x) => ({
        //         ...x,
        //         Wert: x.Wert[indexVerteilung]
        //     }))
        //         .sort((a, b) => a.Wert - b.Wert)
        //         .filter((x) => x.Wert !== undefined) ?? [];

        if (currentValue !== undefined) {

            const filtert = schwellen.filter(x => x.Wert <= currentValue);
            const currentSchwelle = filtert.length > 0 ? filtert.reverse()[0] : undefined;

            return { schwellen, quantile, currentSchwelle };
        } else {

            return { schwellen, quantile };
        }

    }




}



type Schwelle = {
    Wert: number;
    Name: {
        Lokalisirung: _Lokalisirung[];
    } | undefined;
    Beschreibung: {
        Lokalisirung: _Lokalisirung[];
    } | undefined;
    Kosten: ({
        Berechnung: string;
    } & {
        Id: string;
    })[];
    Mods: ({
        Eigenschaften: {
            Mod: ({
                Eigenschaft: string;
            } & {
                Mod: number;
            } & {
                Type: "additiv" | "multiplikativ";
            })[];
        } | undefined;
    } & {
        Besonderheiten: {
            Besonderheit: _Besonderheit[];
        } | undefined;
    } & {
        Tags: {
            Tag: {
                Id: string;
            }[];
        } | undefined;
    }) | undefined;
};

type Quantile = {
    Wert: number;
    Quantil: number;
};