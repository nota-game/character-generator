import type { MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen, LebensabschnittDefinition_lebewesen, StaticheDefinition_lebewesen, ReiheDefinition_lebewesen, FormelDefintion_lebewesen, PunktDefintion_lebewesen, _Reihe, _Schwelle, _Lokalisirung, _Besonderheit, Schutzwert_kampf_ausstattung } from "../data/nota.g";
import StoreManager, { UNINITILEZED, type Key, type KeyData } from "../misc/StoreManager2";
import type { Readable, Writable } from "svelte/store";
// import { derivedLazy } from "../lazyDerivied";
import * as mathjs from 'mathjs'

import { Data } from "./Data";
import { distinct, getLast, groupBy, notUndefined, toObjectKey } from "../misc/misc";
import { index, isResultSet, xgcd } from "mathjs";

export type EigenschaftTypes = 'bereich' | 'reihe' | 'punkt' | 'berechnung';
export type EigenschaftTypesLevel = 'morph' | 'art' | 'gattung' | 'organismus';

export type MissingRequirements = { type: 'tag', id: string }
    | { type: 'Fertigkeit', id: string, Stufe: number }
    | { type: 'Besonderheit', id: string, Stufe: number }
    | { type: 'Talent', id: string, Stufe: number, Kind: 'Basis' | 'Effektiv' | 'Unterstützung' }
    | { type: 'Not', sub: MissingRequirements }
    | { type: 'And', sub: MissingRequirements[] }
    | { type: 'Or', sub: MissingRequirements[] }


    ;

type MapKeyPropertys<T> = {
    [e in keyof T]: T[e] extends Key<any, any> ? TypeOfKey<T[e]> : never;
}

type FertigkeitKeys<id extends string = string> = {
    Effective: FertigkeitEffectiveKey<id>,
    Unbeschränkt: FertigkeitUnbeschränktKey<id>,
    Fixed: FertigkeitFixedKey<id>,
    Purchased: FertigkeitPurchasedKey<id>,
    Missing: FertigkeitMissingKey<id>,
}

type FertigkeitEffectiveKey<id extends string = string> = Key<`/fertigkeit/${id}/Stufe`, number>;
type FertigkeitUnbeschränktKey<id extends string = string> = Key<`/fertigkeit/${id}/StufeUnbeschränkt`, number>;
type FertigkeitFixedKey<id extends string = string> = Key<`/fertigkeit/${id}/fixed`, number>;
type FertigkeitPurchasedKey<id extends string = string> = Key<`/fertigkeit/${id}/purchased`, number>;
type FertigkeitMissingKey<id extends string = string> = Key<`/fertigkeit/${id}/Missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;



type BesonderheitKeys<id extends string = string> = {
    Effective: BesonderheitEffectiveKey<id>,
    Unbeschränkt: BesonderheitUnbeschränktKey<id>,
    Fixed: BesonderheitFixedKey<id>,
    Purchased: BesonderheitPurchasedKey<id>,
    Missing: BesonderheitMissingKey<id>,
}

type BesonderheitPurchasedKey<id extends string = string> = Key<`/besonderheit/${id}/purchased`, number>;
type BesonderheitFixedKey<id extends string = string> = Key<`/besonderheit/${id}/fixed`, number>;
type BesonderheitUnbeschränktKey<id extends string = string> = Key<`/besonderheit/${id}/StufeUnbeschränkt`, number>;
type BesonderheitEffectiveKey<id extends string = string> = Key<`/besonderheit/${id}/Stufe`, number>;
type BesonderheitMissingKey<id extends string = string> = Key<`/besonderheit/${id}/Missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;



export type EigenschaftKeys<id extends string = string> = {
    Effective: EigenschaftEffective<id>,
    Raw: EigenschaftRawKey<id>,
    Type: EigenschaftTypeKey<id>,
    Meta: EigenschaftMetaKey<id>,
}

export type EigenschaftMetaKey<id extends string = string> = Key<`/eigenschaften/${id}/meta`, StaticheDefinition_lebewesen & { type: 'bereich' } | (ReiheDefinition_lebewesen & {
    quantileForAge: Quantile[];
    schwellenForAge: Schwelle[];
    currentSchwelle?: Schwelle;
    type: 'reihe'
}) | FormelDefintion_lebewesen & { type: 'berechnung' } | PunktDefintion_lebewesen & { type: 'punkt' } | undefined>;
export type EigenschaftTypeKey<id extends string = string> = Key<`/eigenschaften/${id}/type`, EigenschaftTypes | undefined>;
export type EigenschaftEffective<id extends string = string> = Key<`/eigenschaften/${id}/effektiv`, number | undefined>;
export type EigenschaftRawKey<id extends string = string> = Key<`/eigenschaften/${id}/raw`, number | undefined>;

export type TypeOfKey<T extends Key<string, any>> = T extends Key<string, infer U>
    ? U
    : never;


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
        meta: Readable<TypeOfKey<EigenschaftMetaKey>>,
    }> = {};

    public readonly besonderheiten: Record<string, {
        effective: Readable<number>,
        unconditionally: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,

    }> = {};


    public readonly lebensAbschnitteStore: Readable<{
        gattung: LebensabschnittDefinition_lebewesen | undefined;
        art: LebensabschnittDefinition_lebewesen | undefined;
        morph: LebensabschnittDefinition_lebewesen | undefined;
    }>;


    public readonly stammdaten: Data;
    private readonly id: string;

    private readonly storeManager;

    private getBesonterheitKeys<id extends string>(Id: id) {//: { keyPurchased: BesonderheitPurchasedKey<id>; keyFixed: BesonderheitFixedKey<id>; keyUnbeschränkt: BesonderheitUnbeschränktKey<id>; keyMissing: BesonderheitMissingKey<id>; keyEffectiv: BesonderheitEffectiveKey<id>; } {
        const keyPurchased = this.storeManager.key(`/besonderheit/${Id}/purchased`).of<TypeOfKey<BesonderheitPurchasedKey<id>>>();
        const keyFixed = this.storeManager.key(`/besonderheit/${Id}/fixed`).of<TypeOfKey<BesonderheitFixedKey<id>>>();
        const keyUnbeschränkt = this.storeManager.key(`/besonderheit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<BesonderheitUnbeschränktKey<id>>>();
        const keyMissing = this.storeManager.key(`/besonderheit/${Id}/Missing`).of<TypeOfKey<BesonderheitMissingKey<id>>>();
        const keyEffectiv = this.storeManager.key(`/besonderheit/${Id}/Stufe`).of<TypeOfKey<BesonderheitEffectiveKey<id>>>();

        return {
            keyPurchased,
            keyFixed,
            keyUnbeschränkt,
            keyMissing,
            keyEffectiv
        }
    }


    private getIdFromBesonterheitkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'Missing' | 'Stufe' } | undefined
    private getIdFromBesonterheitkeitKey<id extends string>(key: BesonderheitPurchasedKey<id> | BesonderheitFixedKey<id> | BesonderheitUnbeschränktKey<id> | BesonderheitMissingKey<id> | BesonderheitEffectiveKey<id>) {
        const reg = /\/besonderheit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'Missing' | 'Stufe' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getFertigkeitenKeys<id extends string>(Id: id) {
        const keyPurchased = this.storeManager.key(`/fertigkeit/${Id}/purchased`).of<TypeOfKey<FertigkeitPurchasedKey<id>>>();
        const keyFixed = this.storeManager.key(`/fertigkeit/${Id}/fixed`).of<TypeOfKey<FertigkeitFixedKey<id>>>();
        const keyUnbeschränkt = this.storeManager.key(`/fertigkeit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<FertigkeitUnbeschränktKey<id>>>();
        const keyMissing = this.storeManager.key(`/fertigkeit/${Id}/Missing`).of<TypeOfKey<FertigkeitMissingKey>>();
        const keyEffectiv = this.storeManager.key(`/fertigkeit/${Id}/Stufe`).of<TypeOfKey<FertigkeitEffectiveKey<id>>>();

        return { keyPurchased, keyFixed, keyUnbeschränkt, keyMissing, keyEffectiv };
    }



    private getIdFromFertigkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'Missing' | 'Stufe' } | undefined
    private getIdFromFertigkeitKey<id extends string>(key: FertigkeitPurchasedKey<id> | FertigkeitFixedKey<id> | FertigkeitUnbeschränktKey<id> | FertigkeitMissingKey<id> | FertigkeitEffectiveKey<id>) {
        const reg = /\/fertigkeit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'Missing' | 'Stufe' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }

    private getPropertieKeys<id extends string>(prop: id) {
        return {
            raw: this.storeManager.key(`/eigenschaften/${prop}/raw`).of<TypeOfKey<EigenschaftRawKey<id>>>(),
            effective: this.storeManager.key(`/eigenschaften/${prop}/effektiv`).of<TypeOfKey<EigenschaftEffective<id>>>(),
            type: this.storeManager.key(`/eigenschaften/${prop}/type`).of<TypeOfKey<EigenschaftTypeKey<id>>>(),
            meta: this.storeManager.key(`/eigenschaften/${prop}/meta`).of<TypeOfKey<EigenschaftMetaKey<id>>>()
        }
    }

    private getIdFromPropertieKeys(key: Key<string, any>): { id: string, type: 'raw' | 'effektiv' | 'type' | 'meta' } | undefined
    private getIdFromPropertieKeys<id extends string>(key: EigenschaftRawKey<id>
        | EigenschaftEffective<id>
        | EigenschaftTypeKey<id>
        | EigenschaftMetaKey<id>
    ) {
        const reg = /\/eigenschaften\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'raw' | 'effektiv' | 'type' | 'meta' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
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
            const selectedGattung = data.Instance.Daten.Organismen.Gattung.filter(x => x.Id == gattungsId.newValue)[0];
            return selectedGattung;
        });

        this.artIdStore = this.storeManager.writable(artIdKey, undefined);
        this.possibleArtStore = this.storeManager.derived(artPossibleKey, gattungsInstanceKey, function (_data, selectedGattung) {
            if (selectedGattung === undefined) {
                return [];
            }
            return selectedGattung.newValue?.Art.map(x => x.Id) ?? [];
        });
        this.artStore = this.storeManager.derived(artInstanceKey, [artIdKey, gattungsInstanceKey], function (data, [artId, gattung]) {
            if (gattung.newValue === undefined || artId.newValue === undefined) {
                return undefined;
            }
            const selectedGattung = gattung.newValue.Art.filter(x => x.Id == artId.newValue)[0];
            return selectedGattung;
        });

        this.morphIdStore = this.storeManager.writable(morphIdKey, undefined);
        this.possibleMorphStore = this.storeManager.derived(morphPossibleKey, artInstanceKey, function (_data, selectedArt) {
            if (selectedArt === undefined) {
                return [];
            }
            return selectedArt.newValue?.Morphe.Morph.map(x => x.Id) ?? [];
        });
        this.morphStore = this.storeManager.derived(morphInstanceKey, [morphIdKey, artInstanceKey], function (data, [artId, art]) {
            if (art.newValue === undefined || artId.newValue === undefined) {
                return undefined;
            }
            const selectedGattung = art.newValue.Morphe.Morph.filter(x => x.Id == artId.newValue)[0];
            return selectedGattung;
        });

        const lebensabschnittGattungKey = this.storeManager.key('/organism/gattung/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittArtKey = this.storeManager.key('/organism/art/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittMorphKey = this.storeManager.key('/organism/morph/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittKey = this.storeManager.key('/organism/*/lebensabschnitt').of<{ gattung: LebensabschnittDefinition_lebewesen | undefined, art: LebensabschnittDefinition_lebewesen | undefined, morph: LebensabschnittDefinition_lebewesen | undefined }>()

        this.lebensAbschnitteStore = this.storeManager.readable(lebensabschnittKey);

        this.storeManager.derived(lebensabschnittGattungKey, [ageKey, gattungsInstanceKey], (data, [age, gattung]) => {
            return getLast(gattung.newValue?.Lebensabschnitte?.Lebensabschnitt.filter(m => age.newValue >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age.newValue)));
        })
        this.storeManager.derived(lebensabschnittArtKey, [ageKey, artInstanceKey], (data, [age, art]) => {
            return getLast(art.newValue?.Lebensabschnitte?.Lebensabschnitt.filter(m => age.newValue >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age.newValue)));
        })
        this.storeManager.derived(lebensabschnittMorphKey, [ageKey, morphInstanceKey], (data, [age, morph],) => {
            return getLast(morph.newValue?.Lebensabschnitte?.Lebensabschnitt.filter(m => age.newValue >= m.startAlter && (m.endAlter == undefined || m.endAlter <= age.newValue)));
        })





        for (const key of this.stammdaten.allEigenschaftKeys) {

            const { raw: rawKey, effective: effectiveKey, type: typeKey, meta: metaKey } = this.getPropertieKeys(key);

            const tmpKey = this.storeManager.key(`/tmp/eigenschaft/${key}`).of<{ entry: StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen, type: EigenschaftTypes, level: EigenschaftTypesLevel, morphId?: string, artId?: string, gattungId?: string, } | undefined>();
            // const effectiveKey = this.storeManager.key(`/eigenschaft/${key}/effektiv`).of<number | undefined>();
            // const writablStore = this.storeManager.writable(rawKey, undefined);

            this.eigenschaften[key] = {
                effective: this.storeManager.readable(effectiveKey),
                raw: this.storeManager.writable(rawKey, undefined),
                type: this.storeManager.readable(typeKey),
                meta: this.storeManager.readable(metaKey),
            };
            const dependentData = this.stammdaten.eigenschaftenDependencys.filter(x => x.Eigenschaft == key).map(x => x.Typ);



            const dependentBesonderheiten = dependentData.filter(x => x.startsWith('besonderheit-'))
                .map(x => x.substring('besonderheit-'.length))
                .flatMap(x => Object.values(this.getBesonterheitKeys(x)));
            const dependentFertigkeiten = dependentData.filter(x => x.startsWith('fertigkeit-'))
                .map(x => x.substring('fertigkeit-'.length))
                .flatMap(x => Object.values(this.getFertigkeitenKeys(x)));

            const dependentEigenschaften = dependentData.filter(x => x.startsWith('eigenschaft-'))
                .map(x => x.substring('eigenschaft-'.length))
                .flatMap(x => Object.values(this.getPropertieKeys(x)));

            const dependentAge: Key<string, number>[] = dependentData.filter(x => x.startsWith('Alter'))
                .map(x => ageKey);

            const dependentGattung: Key<string, number>[] = dependentData.filter(x => x.startsWith('Gattung'))
                .map(x => gattungsInstanceKey);
            const dependentArt: Key<string, number>[] = dependentData.filter(x => x.startsWith('Art'))
                .map(x => artInstanceKey);
            const dependentMorph: Key<string, number>[] = dependentData.filter(x => x.startsWith('Morph'))
                .map(x => morphInstanceKey);

            const dependentLebensabschnittGattung: Key<string, LebensabschnittDefinition_lebewesen>[] = dependentData.filter(x => x.startsWith('Lebensabschnitt-Gattung')).map(x => lebensabschnittGattungKey);
            const dependentLebensabschnittArt: Key<string, LebensabschnittDefinition_lebewesen>[] = dependentData.filter(x => x.startsWith('Lebensabschnitt-Art')).map(x => lebensabschnittArtKey);
            const dependentLebensabschnittMorph: Key<string, LebensabschnittDefinition_lebewesen>[] = dependentData.filter(x => x.startsWith('Lebensabschnitt-Morph')).map(x => lebensabschnittMorphKey);


            this.storeManager.derived(tmpKey, [morphInstanceKey, artInstanceKey, gattungsInstanceKey], (data, [{ newValue: morph }, { newValue: art }, { newValue: gattung }]) => {
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
                // console.log('morph', morph?.Id);
                return base == undefined ? undefined : { ...base, morphId: morph?.Id, gattungId: gattung?.Id, artId: art?.Id };
            }, (a, b) => {
                if (a === UNINITILEZED) {
                    return b === UNINITILEZED;
                } else if (b === UNINITILEZED) {
                    return false;
                } else if (a === undefined) {
                    return b === undefined;
                } else if (b === undefined) {
                    return false;
                } else {
                    return a?.entry.id === b?.entry.id && a?.type === b?.type && b?.level === a?.level && a.gattungId == b.gattungId && a.artId == b.artId && a.morphId == b.morphId;
                }
            });


            if (key == 'GL') {
                console.log('nom');
            }

            this.storeManager.derived(effectiveKey, [ageKey, tmpKey, rawKey, metaKey, ...dependentBesonderheiten, ...dependentFertigkeiten, ...dependentEigenschaften, ...dependentAge, ...dependentGattung, ...dependentArt, ...dependentMorph, ...dependentLebensabschnittGattung, ...dependentLebensabschnittArt, ...dependentLebensabschnittMorph], (data, [{ newValue: age }, { newValue: base }, { newValue: setValue }, { newValue: meta }, ...dependent], oldValue) => {
                let resultreturn: number;
                if (base === undefined) {
                    return undefined;
                }


                if (base.type === 'bereich') {
                    const entry = base.entry as StaticheDefinition_lebewesen;


                    if (setValue === undefined) {
                        resultreturn = entry.default;
                    } else if (setValue > entry.maxInklusiv) {
                        resultreturn = entry.maxInklusiv;
                    } else if (setValue < entry.minInklusiv) {
                        resultreturn = entry.minInklusiv;
                    } else {
                        resultreturn = setValue;
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
                    const reihe = meta as ReiheDefinition_lebewesen & { quantileForAge: Quantile[], schwellenForAge: Schwelle[], currentSchwelle?: Schwelle };
                    // const reihe = currentEntwicklung.Reihe?.filter(x => x.id == currentProperty.id)[0];
                    if (reihe == undefined) {
                        return undefined;
                    }
                    const quantile = reihe.quantileForAge;


                    const min = Math.min(...quantile.map(x => x.Wert))
                    const max = Math.max(...quantile.map(x => x.Wert))


                    if (setValue == undefined)
                        resultreturn = min;
                    else
                        resultreturn = Math.min(max, Math.max(min, setValue));

                } else if (base.type == 'berechnung') {

                    const lookup: { type: 'eigenschaft' | 'fertigkeit' | 'besonderheit', key: string, name: string, index: number }[] = [];

                    for (let i = 0; i < dependentBesonderheiten.length; i++) {
                        const element = dependentBesonderheiten[i];
                        lookup.push({ type: 'besonderheit', key: element.Key, name: '', index: i });
                    }
                    for (let i = 0; i < dependentFertigkeiten.length; i++) {
                        const element = dependentFertigkeiten[i];
                        lookup.push({ type: 'fertigkeit', key: element.Key, name: '', index: i + dependentBesonderheiten.length });
                    }
                    for (let i = 0; i < dependentEigenschaften.length; i++) {
                        const element = dependentEigenschaften[i];
                        const reg = /\/eigenschaften\/(?<name>[^/]+)\/effektiv/;
                        const match = element.Key.match(reg);
                        const name = match?.groups?.['name'] as string;
                        if (name)
                            lookup.push({ type: 'eigenschaft' as const, key: element.Key, name: name, index: i + dependentFertigkeiten.length + dependentBesonderheiten.length });
                    }


                    const calculation = meta as FormelDefintion_lebewesen;
                    if (calculation == undefined) {
                        return undefined;
                    }


                    const scope: any = {};


                    for (const { type, key, name, index } of lookup) {
                        scope[name] = dependent[index].newValue;
                        if (scope[name] === undefined) {
                            return undefined;
                        }
                    }

                    try {
                        const result = mathjs.evaluate(calculation.Formel, scope);
                        if (isResultSet(result)) {
                            const entries = (result as { entries: any }).entries;
                            resultreturn = Array.isArray(entries) ? entries[entries.length - 1] : entries;
                        }
                        else {
                            resultreturn = Array.isArray(result) ? result[result.length - 1] : result;
                        }
                    } catch (error) {
                        console.error(`Faild formle ${calculation.Formel} of ${calculation.id}`, error);
                        return undefined;
                    }

                } else {
                    return undefined;
                }



                // check besonderheiten
                // const newAge = dependent.filter(x => x.key == ageKey).map(x => x.newValue)[0] as number | undefined;


                const enrich = Object.entries(groupBy(dependent.map(e => {
                    const prop = this.getIdFromPropertieKeys(e.key);
                    if (prop) {

                        if (prop.type == 'effektiv') {
                            return {
                                kind: 'property' as const,
                                entry: e as KeyData<EigenschaftEffective>,
                                id: prop.id,
                                type: prop.type,
                            }
                        } else if (prop.type == 'meta') {
                            return {
                                kind: 'property' as const,
                                entry: e as KeyData<EigenschaftMetaKey>,
                                id: prop.id,
                                type: prop.type,
                            }
                        } else if (prop.type == 'raw') {
                            return {
                                kind: 'property' as const,
                                entry: e as KeyData<EigenschaftRawKey>,
                                id: prop.id,
                                type: prop.type,
                            }
                        } else if (prop.type == 'type') {
                            return {
                                kind: 'property' as const,
                                entry: e as KeyData<EigenschaftTypeKey>,
                                id: prop.id,
                                type: prop.type,
                            }
                        }
                    }

                    const fertigkeit = this.getIdFromFertigkeitKey(e.key);
                    if (fertigkeit) {
                        if (fertigkeit.type == 'Stufe') {
                            return {
                                kind: 'fertigkeit' as const,

                                entry: e as KeyData<FertigkeitEffectiveKey>,
                                id: fertigkeit.id,
                                type: fertigkeit.type
                            }
                        } else if (fertigkeit.type == 'Missing') {
                            return {
                                kind: 'fertigkeit' as const,
                                entry: e as KeyData<FertigkeitMissingKey>,
                                id: fertigkeit.id,
                                type: fertigkeit.type
                            }
                        } else if (fertigkeit.type == 'StufeUnbeschränkt') {
                            return {
                                kind: 'fertigkeit' as const,
                                entry: e as KeyData<FertigkeitUnbeschränktKey>,
                                id: fertigkeit.id,
                                type: fertigkeit.type
                            }
                        } else if (fertigkeit.type == 'fixed') {
                            return {
                                kind: 'fertigkeit' as const,
                                entry: e as KeyData<FertigkeitFixedKey>,
                                id: fertigkeit.id,
                                type: fertigkeit.type
                            }
                        } else if (fertigkeit.type == 'purchased') {
                            return {
                                kind: 'fertigkeit' as const,
                                entry: e as KeyData<FertigkeitPurchasedKey>,
                                id: fertigkeit.id,
                                type: fertigkeit.type
                            }
                        }
                    }
                    const besonderheit = this.getIdFromBesonterheitkeitKey(e.key);
                    if (besonderheit) {
                        if (besonderheit.type == 'Stufe') {
                            return {
                                kind: 'besonderheit' as const,
                                entry: e as KeyData<BesonderheitEffectiveKey>,
                                id: besonderheit.id,
                                type: besonderheit.type,
                            }
                        } else if (besonderheit.type == 'Missing') {
                            return {
                                kind: 'besonderheit' as const,
                                entry: e as KeyData<BesonderheitMissingKey>,
                                id: besonderheit.id,
                                type: besonderheit.type,
                            }
                        } else if (besonderheit.type == 'StufeUnbeschränkt') {
                            return {
                                kind: 'besonderheit' as const,
                                entry: e as KeyData<BesonderheitUnbeschränktKey>,
                                id: besonderheit.id,
                                type: besonderheit.type,
                            }
                        } else if (besonderheit.type == 'fixed') {
                            return {
                                kind: 'besonderheit' as const,
                                entry: e as KeyData<BesonderheitFixedKey>,
                                id: besonderheit.id,
                                type: besonderheit.type,
                            }
                        } else if (besonderheit.type == 'purchased') {
                            return {
                                kind: 'besonderheit' as const,
                                entry: e as KeyData<BesonderheitPurchasedKey>,
                                id: besonderheit.id,
                                type: besonderheit.type,


                            }
                        }
                    }

                    return {
                        kind: 'other' as const,
                        entry: e as KeyData<Key<string, unknown>>,
                        id: 'other',
                        type: 'other' as const,
                    }
                        ;
                }), e => e.id));



                type MapKeyData<K> = {
                    [e in keyof K]: KeyData<K[e]>;
                }

                const fertigkeitDependency = notUndefined(enrich
                    .map(([key, value]) => {
                        const erg = {
                            kind: 'fertigkeit',
                            id: key,
                        } as Partial<MapKeyData<FertigkeitKeys>> & { kind: 'fertigkeit', id: string };
                        if (value[0]?.kind != erg.kind) {
                            return undefined;
                        }
                        for (const v of value) {
                            if (v.kind === erg.kind) {
                                if (v.type == 'Stufe') {
                                    erg.Effective = v.entry;
                                } else if (v.type == 'Missing') {
                                    erg.Missing = v.entry;
                                } else if (v.type == 'StufeUnbeschränkt') {
                                    erg.Unbeschränkt = v.entry;
                                } else if (v.type == 'fixed') {
                                    erg.Fixed = v.entry;
                                } else if (v.type == 'purchased') {
                                    erg.Purchased = v.entry;
                                }
                            }
                        }
                        return erg as MapKeyData<FertigkeitKeys> & { kind: 'fertigkeit', id: string };
                    }));


                const besonderheitDependency = notUndefined(enrich
                    .map(([key, value]) => {
                        const erg = {
                            kind: 'besonderheit',
                            id: key,
                        } as Partial<MapKeyData<BesonderheitKeys>> & { kind: 'besonderheit', id: string };
                        if (value[0]?.kind != erg.kind) {
                            return undefined;
                        }
                        for (const v of value) {
                            if (v.kind === erg.kind) {
                                if (v.type == 'Stufe') {
                                    erg.Effective = v.entry;
                                } else if (v.type == 'Missing') {
                                    erg.Missing = v.entry;
                                } else if (v.type == 'StufeUnbeschränkt') {
                                    erg.Unbeschränkt = v.entry;
                                } else if (v.type == 'fixed') {
                                    erg.Fixed = v.entry;
                                } else if (v.type == 'purchased') {
                                    erg.Purchased = v.entry;
                                }
                            }
                        }
                        return erg as MapKeyData<BesonderheitKeys> & { kind: 'besonderheit', id: string };
                    }));
                const eigenschaftDependency = notUndefined(enrich
                    .map(([key, value]) => {
                        const erg = {
                            kind: 'property',
                            id: key,
                        } as Partial<MapKeyData<EigenschaftKeys>> & { kind: 'property', id: string };
                        if (value[0]?.kind != erg.kind) {
                            return undefined;
                        }
                        for (const v of value) {
                            if (v.kind === erg.kind) {
                                if (v.type == 'effektiv') {
                                    erg.Effective = v.entry;
                                } else if (v.type == 'meta') {
                                    erg.Meta = v.entry;
                                } else if (v.type == 'raw') {
                                    erg.Raw = v.entry;
                                } else if (v.type == 'type') {
                                    erg.Type = v.entry;
                                }
                            }
                        }
                        return erg as MapKeyData<EigenschaftKeys> & { kind: 'property', id: string };
                    }));



                const otherDependency = notUndefined(enrich
                    .flatMap(([key, value]) => {
                        if (value[0]?.kind === 'other') {
                            return notUndefined(value.map(x => {
                                if (x.kind === 'other') {
                                    return { type: x.type, ...x.entry };
                                }
                                return undefined;
                            }))
                        } else {
                            return undefined;
                        }
                    }));







                const mods =
                    fertigkeitDependency.flatMap(x => {
                        const instance = data.fertigkeitenMap[x.id];
                        return instance.Stufe.filter((y, i) => x.Effective.newValue > i).flatMap(y =>
                            notUndefined(y.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                        )
                    }).concat(
                        besonderheitDependency.flatMap(x => {
                            const instance = data.besonderheitenMap[x.id];
                            return instance.Stufe.filter((y, i) => x.Effective.newValue > i).flatMap(y =>
                                notUndefined(y.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                            )
                        }))
                        .concat(
                            dependent
                                .filter((x): x is KeyData<Key<string, LebensabschnittDefinition_lebewesen>> => x.key.Key.endsWith('/lebensabschnitt'))
                                .flatMap(x =>
                                    notUndefined(x.newValue?.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? []))
                        ).concat(
                            eigenschaftDependency
                                .flatMap((x) => {
                                    if (x.Meta.newValue?.type == 'punkt' && x.Effective.newValue == 1) {
                                        return (x.Meta.newValue.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                                    }
                                    else if (x.Meta.newValue?.type == 'reihe') {
                                        return x.Meta.newValue.currentSchwelle?.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [];
                                    }
                                    return [];
                                })
                        )
                    ;




                const addMod = mods.filter(x => x.Type == 'additiv').reduce((p, c) => p + c.Mod, 0);
                const multiMod = mods.filter(x => x.Type == 'multiplikativ').reduce((p, c) => p + (c.Mod - 1), 1);





                return resultreturn * multiMod + addMod;

            })
            this.storeManager.derived(typeKey, tmpKey, (data, base) => {
                return base.newValue?.type;
            })







            this.storeManager.derived(metaKey, [ageKey, tmpKey, rawKey], (data, [{ newValue: age }, { newValue: base }, { newValue: raw }]) => {
                if (base === undefined) {
                    return undefined;
                }
                if (base.type === 'bereich') {
                    const entry = base.entry as StaticheDefinition_lebewesen;
                    return { type: base.type, ...entry };
                } else if (base.type == 'punkt') {
                    const punkt = base.entry as PunktDefintion_lebewesen;
                    return { type: base.type, ...punkt };

                } else if (base.type == 'berechnung') {
                    const formel = base.entry as FormelDefintion_lebewesen;
                    return { type: base.type, ...formel };

                } else if (base.type == 'reihe') {
                    const reihe = base.entry as ReiheDefinition_lebewesen;

                    // const reihe = currentEntwicklung.Reihe?.filter(x => x.id == currentProperty.id)[0];
                    if (reihe == undefined) {
                        return undefined;
                    }
                    const result = raw
                        ? { ...reihe, ...Charakter.applyAge(age, reihe, raw) }
                        : { ...reihe, ...Charakter.applyAge(age, reihe) };
                    // if (raw) {
                    //     const { quantile, schwellen, currentSchwelle } = Charakter.applyAge(age, reihe, raw);
                    //     return { ...reihe, quantile, schwellen, currentSchwelle };
                    // } else {
                    //     const { quantile, schwellen } = Charakter.applyAge(age, reihe);
                    //     return { ...reihe, quantile, schwellen };
                    // }
                    return { type: base.type, ...result };

                } else {
                    return undefined;
                }
            })
        }


        for (const besonderheit of this.stammdaten.Instance.Daten.Besonderheiten.flatMap(x => x.Besonderheit)) {


            const keys = this.getBesonterheitKeys(besonderheit.Id);

            this.besonderheiten[besonderheit.Id] = {
                effective: this.storeManager.readable(keys.keyEffectiv),
                unconditionally: this.storeManager.readable(keys.keyUnbeschränkt),
                purchased: this.storeManager.writable(keys.keyPurchased, 0),
                fixed: this.storeManager.readable(keys.keyFixed),
                missing: this.storeManager.readable(keys.keyMissing),
            };


            this.storeManager.derived(keys.keyEffectiv, [keys.keyUnbeschränkt, keys.keyMissing], (data, [unconditionally, missing]) => {
                return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
            });
            this.storeManager.derived(keys.keyUnbeschränkt, [keys.keyPurchased, keys.keyFixed], (data, [purchased, fixed]) => {
                return Math.max(purchased.newValue, fixed.newValue);
            });

            const dependentData = this.stammdaten.eigenschaftenDependencys.filter(x => x.Eigenschaft == besonderheit.Id).map(x => x.Typ);


            const dependentBesonderheiten: Key<string, number>[] = dependentData.filter(x => x.startsWith('besonderheit-'))
                .map(x => x.substring('besonderheit-'.length))
                .map(x => this.getBesonterheitKeys(x).keyEffectiv);
            const dependentFertigkeiten: Key<string, number>[] = dependentData.filter(x => x.startsWith('fertigkeit-'))
                .map(x => x.substring('fertigkeit-'.length))
                .map(x => this.getFertigkeitenKeys(x).keyEffectiv);

            const dependentEigenschaften: Key<string, number>[] = dependentData.filter(x => x.startsWith('eigenschaft-'))
                .map(x => x.substring('eigenschaft-'.length))
                .map(x => this.getPropertieKeys(x).effective);

            const dependentAge: Key<string, number>[] = dependentData.filter(x => x.startsWith('Alter'))
                .map(x => ageKey);

            const dependentGattung: Key<string, number>[] = dependentData.filter(x => x.startsWith('Gattung'))
                .map(x => ageKey);

            const dependentArt: Key<string, number>[] = dependentData.filter(x => x.startsWith('Art'))
                .map(x => ageKey);
            const dependentMorph: Key<string, number>[] = dependentData.filter(x => x.startsWith('Morph'))
                .map(x => ageKey);


            this.storeManager.derived(keys.keyFixed, [...dependentBesonderheiten, ...dependentFertigkeiten, ...dependentEigenschaften, ...dependentAge, ...dependentGattung, ...dependentArt, ...dependentMorph], (data, dependencys) => {
                // todo get fixed besonderheiten
                return 0;
            });

            this.storeManager.derived(keys.keyMissing, [...dependentBesonderheiten, ...dependentFertigkeiten, ...dependentEigenschaften, ...dependentAge, ...dependentGattung, ...dependentArt, ...dependentMorph], (data, dependencys) => {
                // todo get Missing stuff
                return [];
            });





        }





    }

















    public static applyAge(age: number, reihe: _Reihe): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; };
    public static applyAge(age: number, reihe: _Reihe, currentValue: number): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; currentSchwelle: Schwelle; };
    public static applyAge(age: number, reihe: _Reihe, currentValue?: number): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; currentSchwelle?: Schwelle; } {
        const a = age;
        const tempIndex = Math.round(
            (a - (reihe?.startAlter ?? 0)) / (reihe?.step ?? 1) + (reihe?.startAlter ?? 0)
        );

        const index = Math.min((reihe?.Schwelle?.[0]?.Wert?.length ?? 0) - 1, Math.max(tempIndex, 0));
        const indexVerteilung = Math.min(
            (reihe?.Verteilung?.length ?? 0) - 1,
            Math.max(tempIndex, 0)
        );



        const schwellenForAge =
            reihe?.Schwelle?.map((x) => ({
                ...x,
                Wert: x.Wert[index]
            }))
                .sort((a, b) => a.Wert - b.Wert)
                .filter((x) => x.Wert !== undefined) ?? [];


        const quantileForAge =
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

            const filtert = schwellenForAge.filter(x => x.Wert <= currentValue);
            const currentSchwelle = filtert.length > 0 ? filtert.reverse()[0] : undefined;

            return { schwellenForAge, quantileForAge, currentSchwelle };
        } else {

            return { schwellenForAge, quantileForAge };
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