import type { MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen, LebensabschnittDefinition_lebewesen, StaticheDefinition_lebewesen, ReiheDefinition_lebewesen, FormelDefintion_lebewesen, PunktDefintion_lebewesen, _Reihe, _Schwelle, _Lokalisirung, _Besonderheit, Schutzwert_kampf_ausstattung, _Anzahl, _ActionType, BedingungsAuswahl_misc, BedingungsAuswahl_besonderheit, BedingungsAuswahlen_misc, BedingungsAuswahlen_besonderheit, _Ableitung, _Max } from "../data/nota.g";
import StoreManager, { UNINITILEZED, type Key, type KeyData } from "../misc/StoreManager2";
import type { Readable, Writable } from "svelte/store";
// import { derivedLazy } from "../lazyDerivied";
import * as mathjs from 'mathjs'

import { Data, type DependencyData } from "./Data";
import { distinct, filterNull, getLast, groupBy, notUndefined, toObjectKey } from "../misc/misc";
import { cos, fix, index, isResultSet, meanTransformDependencies, xgcd } from "mathjs";

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

type MapKeyData<K> = {
    [e in keyof K]: KeyData<K[e]>;
}


type PropValues<T> = T[keyof T]
    ;


type Cost = Record<string, number>;
export type CostKey<kind extends 'eigenschaft' | 'fertigkeit' | 'besonderheit' | 'talent', id extends string = string> =
    kind extends 'eigenschaft'
    ? Key<`/eigenschaften/${id}/cost`, Cost>
    : kind extends 'fertigkeit'
    ? Key<`/fertigkeit/${id}/cost`, Cost>
    : kind extends 'besonderheit'
    ? Key<`/besonderheit/${id}/cost`, Cost>
    : kind extends 'talent'
    ? Key<`/talent/${id}/cost`, Cost>
    : never
    ;

export type EigenschaftKeys<id extends string = string> = {
    Effective: EigenschaftEffective<id>,
    Raw: EigenschaftRawKey<id>,
    Type: EigenschaftTypeKey<id>,
    Meta: EigenschaftMetaKey<id>,
    Cost: CostKey<'eigenschaft', id>,
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


type TagKeys<id extends string = string> = {
    Effective: TagEffectiveKey<id>,

}
type TagEffectiveKey<id extends string = string> = Key<`/tag/${id}`, number>;


type TalentKeys<id extends string = string> = {
    Effective: TalentEffectiveKey<id>,
    Base: TalentBaseKey<id>,
    Support: TalentSupportKey<id>,
    Fixed: TalentFixedKey<id>,
    Purchased: TalentPurchasedKey<id>,
    Missing: TalentMissingKey<id>,
    Cost: CostKey<'talent', id>,
}

type TalentEffectiveKey<id extends string = string> = Key<`/talent/${id}/effective`, number>;
type TalentBaseKey<id extends string = string> = Key<`/talent/${id}/base`, number>;
type TalentSupportKey<id extends string = string> = Key<`/talent/${id}/support`, number>;
type TalentFixedKey<id extends string = string> = Key<`/talent/${id}/fixed`, number>;
type TalentPurchasedKey<id extends string = string> = Key<`/talent/${id}/purchased`, number>;
type TalentMissingKey<id extends string = string> = Key<`/talent/${id}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;

type FertigkeitKeys<id extends string = string> = {
    Effective: FertigkeitEffectiveKey<id>,
    Unbeschränkt: FertigkeitUnbeschränktKey<id>,
    Fixed: FertigkeitFixedKey<id>,
    Purchased: FertigkeitPurchasedKey<id>,
    Missing: FertigkeitMissingKey<id>,
    Cost: CostKey<'fertigkeit', id>,
}

type FertigkeitEffectiveKey<id extends string = string> = Key<`/fertigkeit/${id}/Stufe`, number>;
type FertigkeitUnbeschränktKey<id extends string = string> = Key<`/fertigkeit/${id}/StufeUnbeschränkt`, number>;
type FertigkeitFixedKey<id extends string = string> = Key<`/fertigkeit/${id}/fixed`, number>;
type FertigkeitPurchasedKey<id extends string = string> = Key<`/fertigkeit/${id}/purchased`, number>;
type FertigkeitMissingKey<id extends string = string> = Key<`/fertigkeit/${id}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;



type BesonderheitKeys<id extends string = string> = {
    Effective: BesonderheitEffectiveKey<id>,
    Unbeschränkt: BesonderheitUnbeschränktKey<id>,
    Fixed: BesonderheitFixedKey<id>,
    Purchased: BesonderheitPurchasedKey<id>,
    Missing: BesonderheitMissingKey<id>,
    Cost: CostKey<'besonderheit', id>,
}

type BesonderheitPurchasedKey<id extends string = string> = Key<`/besonderheit/${id}/purchased`, number>;
type BesonderheitFixedKey<id extends string = string> = Key<`/besonderheit/${id}/fixed`, number>;
type BesonderheitUnbeschränktKey<id extends string = string> = Key<`/besonderheit/${id}/StufeUnbeschränkt`, number>;
type BesonderheitEffectiveKey<id extends string = string> = Key<`/besonderheit/${id}/Stufe`, number>;
type BesonderheitMissingKey<id extends string = string> = Key<`/besonderheit/${id}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;



type LebensabschittGattungKey = Key<'/organism/gattung/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;
type LebensabschittArtKey = Key<'/organism/art/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;
type LebensabschittMorphKey = Key<'/organism/morph/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;

function toCost<T>(entries: T[], fn: ((value: T) => ((readonly [string, number]) | undefined))): Cost {
    return entriesToCost(notUndefined(entries.map(fn)));
}
function entriesToCost(entries?: (readonly [string, number])[]): Cost {
    const erg = {} as Cost;
    if (entries == undefined) {
        return erg;
    }
    entries.reduce((p, [key, value]) => {
        if (erg[key] == undefined) {
            erg[key] = value
        } else {
            erg[key] += value
        }
        return erg;
    }, erg)
    return erg;
}




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
    public readonly costStore: Readable<Cost>;


    public readonly eigenschaften: Record<string, {
        effective: Readable<number | undefined>,
        type: Readable<EigenschaftTypes | undefined>,
        raw: Writable<number | undefined>,
        meta: Readable<TypeOfKey<EigenschaftMetaKey>>,
        cost: Readable<TypeOfKey<CostKey<'eigenschaft'>>>,
    }> = {};

    public readonly besonderheiten: Record<string, {
        effective: Readable<number>,
        unconditionally: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'besonderheit'>>>,
    }> = {};

    public readonly fertigkeiten: Record<string, {
        effective: Readable<number>,
        unconditionally: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'fertigkeit'>>>,
    }> = {};

    public readonly talente: Record<string, {
        effective: Readable<number>,
        base: Readable<number>,
        support: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'talent'>>>,
    }> = {};

    public readonly tag: Record<string, {
        effective: Readable<number>,
    }> = {};


    public readonly lebensAbschnitteStore: Readable<{
        gattung: LebensabschnittDefinition_lebewesen | undefined;
        art: LebensabschnittDefinition_lebewesen | undefined;
        morph: LebensabschnittDefinition_lebewesen | undefined;
    }>;


    public readonly stammdaten: Data;
    private readonly id: string;

    private readonly storeManager;





    private groupDependencyData(dependent: KeyData<Key<any, any>>[]) {
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
                } else if (fertigkeit.type == 'missing') {
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
                } else if (besonderheit.type == 'missing') {
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
            const talent = this.getIdFromTalentKey(e.key);
            if (talent) {
                if (talent.type == 'effective') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentEffectiveKey>,
                        id: talent.id,
                        type: talent.type,
                    }
                } else if (talent.type == 'base') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentBaseKey>,
                        id: talent.id,
                        type: talent.type,
                    }
                } else if (talent.type == 'support') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentSupportKey>,
                        id: talent.id,
                        type: talent.type,
                    }
                } else if (talent.type == 'missing') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentMissingKey>,
                        id: talent.id,
                        type: talent.type,
                    }
                } else if (talent.type == 'fixed') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentFixedKey>,
                        id: talent.id,
                        type: talent.type,
                    }
                } else if (talent.type == 'purchased') {
                    return {
                        kind: 'talent' as const,
                        entry: e as KeyData<TalentPurchasedKey>,
                        id: talent.id,
                        type: talent.type,


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

        const talentDependency = notUndefined(enrich
            .map(([key, value]) => {
                const erg = {
                    kind: 'talent',
                    id: key,
                } as Partial<MapKeyData<TalentKeys>> & { kind: 'talent', id: string };
                if (value[0]?.kind != erg.kind) {
                    return undefined;
                }
                for (const v of value) {
                    if (v.kind === erg.kind) {
                        if (v.type == 'effective') {
                            erg.Effective = v.entry;
                        } else if (v.type == 'base') {
                            erg.Base = v.entry;
                        } else if (v.type == 'support') {
                            erg.Support = v.entry;
                        } else if (v.type == 'missing') {
                            erg.Missing = v.entry;
                        } else if (v.type == 'fixed') {
                            erg.Fixed = v.entry;
                        } else if (v.type == 'purchased') {
                            erg.Purchased = v.entry;
                        }
                    }
                }
                return erg as MapKeyData<TalentKeys> & { kind: 'talent', id: string };
            }));


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
                        } else if (v.type == 'missing') {
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
                        } else if (v.type == 'missing') {
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
            .flatMap(([, value]) => {
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
        return { fertigkeitDependency, besonderheitDependency, eigenschaftDependency, talentDependency, otherDependency };
    }




    private getBesonterheitKeys<id extends string>(Id: id): BesonderheitKeys {
        return {
            Purchased: this.storeManager.key(`/besonderheit/${Id}/purchased`).of<TypeOfKey<BesonderheitPurchasedKey<id>>>(),
            Effective: this.storeManager.key(`/besonderheit/${Id}/Stufe`).of<TypeOfKey<BesonderheitEffectiveKey<id>>>(),
            Fixed: this.storeManager.key(`/besonderheit/${Id}/fixed`).of<TypeOfKey<BesonderheitFixedKey<id>>>(),
            Missing: this.storeManager.key(`/besonderheit/${Id}/missing`).of<TypeOfKey<BesonderheitMissingKey<id>>>(),
            Unbeschränkt: this.storeManager.key(`/besonderheit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<BesonderheitUnbeschränktKey<id>>>(),
            Cost: this.storeManager.key(`/besonderheit/${Id}/cost`).of<TypeOfKey<CostKey<'besonderheit', id>>>(),
        }
    }


    private getIdFromBesonterheitkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'Stufe' | 'cost' } | undefined
    private getIdFromBesonterheitkeitKey<id extends string>(key: BesonderheitPurchasedKey<id> | BesonderheitFixedKey<id> | BesonderheitUnbeschränktKey<id> | BesonderheitMissingKey<id> | BesonderheitEffectiveKey<id>) {
        const reg = /\/besonderheit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'Stufe' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getFertigkeitenKeys<id extends string>(Id: id): FertigkeitKeys<id> {
        return {
            Purchased: this.storeManager.key(`/fertigkeit/${Id}/purchased`).of<TypeOfKey<FertigkeitPurchasedKey<id>>>(),
            Effective: this.storeManager.key(`/fertigkeit/${Id}/Stufe`).of<TypeOfKey<FertigkeitEffectiveKey<id>>>(),
            Fixed: this.storeManager.key(`/fertigkeit/${Id}/fixed`).of<TypeOfKey<FertigkeitFixedKey<id>>>(),
            Missing: this.storeManager.key(`/fertigkeit/${Id}/missing`).of<TypeOfKey<FertigkeitMissingKey>>(),
            Unbeschränkt: this.storeManager.key(`/fertigkeit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<FertigkeitUnbeschränktKey<id>>>(),
            Cost: this.storeManager.key(`/fertigkeit/${Id}/cost`).of<TypeOfKey<CostKey<'fertigkeit', id>>>(),
        };
    }

    private getIdFromFertigkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'Stufe' | 'cost' } | undefined
    private getIdFromFertigkeitKey<id extends string>(key: FertigkeitPurchasedKey<id> | FertigkeitFixedKey<id> | FertigkeitUnbeschränktKey<id> | FertigkeitMissingKey<id> | FertigkeitEffectiveKey<id>) {
        const reg = /\/fertigkeit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'Stufe' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getTagKeys<id extends string>(Id: id): TagKeys<id> {
        return {
            Effective: this.storeManager.key(`/tag/${Id}`).of<TypeOfKey<TagEffectiveKey<id>>>(),
        };
    }

    private getIdFromTagKey(key: Key<string, any>): { id: string, type: 'effective' } | undefined
    private getIdFromTagKey<id extends string>(key: TagEffectiveKey<id>) {
        const reg = /\/tag\/(?<name>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = 'effective';
        return (erg == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getTalentKeys<id extends string>(Id: id): TalentKeys<id> {
        return {
            Effective: this.storeManager.key(`/talent/${Id}/effective`).of<TypeOfKey<TalentEffectiveKey<id>>>(),
            Base: this.storeManager.key(`/talent/${Id}/base`).of<TypeOfKey<TalentBaseKey<id>>>(),
            Support: this.storeManager.key(`/talent/${Id}/support`).of<TypeOfKey<TalentSupportKey<id>>>(),
            Purchased: this.storeManager.key(`/talent/${Id}/purchased`).of<TypeOfKey<TalentPurchasedKey<id>>>(),
            Fixed: this.storeManager.key(`/talent/${Id}/fixed`).of<TypeOfKey<TalentFixedKey<id>>>(),
            Missing: this.storeManager.key(`/talent/${Id}/missing`).of<TypeOfKey<TalentMissingKey>>(),
            Cost: this.storeManager.key(`/talent/${Id}/cost`).of<TypeOfKey<CostKey<'talent', id>>>(),
        };
    }

    private getIdFromTalentKey(key: Key<string, any>): { id: string, type: 'effective' | 'base' | 'support' | 'purchased' | 'fixed' | 'missing' | 'cost' } | undefined
    private getIdFromTalentKey<id extends string>(key: TalentPurchasedKey<id> | TalentFixedKey<id> | TalentMissingKey<id> | TalentEffectiveKey<id> | TalentBaseKey<id> | TalentSupportKey<id>) {
        const reg = /\/talent\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'effective' | 'base' | 'support' | 'purchased' | 'fixed' | 'missing' | 'cost' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }

    private getPropertieKeys<id extends string>(prop: id): EigenschaftKeys<id> {
        return {
            Raw: this.storeManager.key(`/eigenschaften/${prop}/raw`).of<TypeOfKey<EigenschaftRawKey<id>>>(),
            Effective: this.storeManager.key(`/eigenschaften/${prop}/effektiv`).of<TypeOfKey<EigenschaftEffective<id>>>(),
            Type: this.storeManager.key(`/eigenschaften/${prop}/type`).of<TypeOfKey<EigenschaftTypeKey<id>>>(),
            Meta: this.storeManager.key(`/eigenschaften/${prop}/meta`).of<TypeOfKey<EigenschaftMetaKey<id>>>(),
            Cost: this.storeManager.key(`/eigenschaften/${prop}/cost`).of<TypeOfKey<CostKey<'eigenschaft', id>>>(),
        }
    }

    private getIdFromPropertieKeys(key: Key<string, any>): { id: string, type: 'raw' | 'effektiv' | 'type' | 'meta' | 'cost' } | undefined
    private getIdFromPropertieKeys<id extends string>(key: PropValues<EigenschaftKeys<id>>
    ) {
        const reg = /\/eigenschaften\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'raw' | 'effektiv' | 'type' | 'meta' | 'cost' | undefined;
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

        const costKey = this.storeManager.key('/points/total').of<Cost>();



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

        this.costStore = this.storeManager.readable(costKey);

        const sumCost = this.storeManager.key('/**/cost').of<Record<string, Record<string, Record<string, Cost>>>>();

        this.storeManager.readable(sumCost);
        this.storeManager.derived(costKey, sumCost, (data, cast) => {


            function filterCost(obj: object): Cost[] {
                return Object.entries(obj).flatMap(([key, value]) => {
                    if (key == 'cost') {
                        return [value] as Cost[];
                    } else if (typeof value == 'object') {
                        return filterCost(value);
                    } else {
                        return [];
                    }
                })
            }


            const costs = filterCost(cast.newValue);
            return toCost(costs.flatMap(x => Object.entries(x)), ([v1, v2]) => [v1, v2] as const);
        });


        const mapDependecyToKeys = (deps: DependencyData[], types?: (keyof BesonderheitKeys | keyof FertigkeitKeys | keyof TalentKeys | keyof EigenschaftKeys)[]) => {

            const dependentData = deps.map(x => x.Typ);

            const dependentBesonderheiten = dependentData.filter(x => x.startsWith('besonderheit-'))
                .map(x => x.substring('besonderheit-'.length))
                .flatMap(x => {
                    if (types != undefined) {
                        return Object.entries(this.getBesonterheitKeys(x)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                    }
                    return Object.values(this.getBesonterheitKeys(x));
                });
            const dependentFertigkeiten = dependentData.filter(x => x.startsWith('fertigkeit-'))
                .map(x => x.substring('fertigkeit-'.length))
                .flatMap(x => {
                    if (types != undefined) {
                        return Object.entries(this.getFertigkeitenKeys(x)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                    }
                    return Object.values(this.getFertigkeitenKeys(x));
                });

            const dependentEigenschaften = dependentData.filter(x => x.startsWith('eigenschaft-'))
                .map(x => x.substring('eigenschaft-'.length))
                .flatMap(x => {
                    if (types != undefined) {
                        return Object.entries(this.getPropertieKeys(x)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                    }
                    return Object.values(this.getPropertieKeys(x))
                });

            const dependentTalent = dependentData.filter(x => x.startsWith('talent-'))
                .map(x => x.substring('talent-'.length))
                .flatMap(x => {
                    if (types != undefined) {
                        return Object.entries(this.getTalentKeys(x)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                    }
                    return Object.values(this.getTalentKeys(x))
                });

            const dependentAge = dependentData.filter(x => x == 'other-alter')
                .map(() => ageKey);

            const dependentGattung = dependentData.filter(x => x.startsWith('Gattung'))
                .map(() => gattungsInstanceKey);
            const dependentArt = dependentData.filter(x => x.startsWith('Art'))
                .map(() => artInstanceKey);
            const dependentMorph = dependentData.filter(x => x.startsWith('Morph'))
                .map(() => morphInstanceKey);

            const dependentLebensabschnittGattung = dependentData.filter(x => x.startsWith('Lebensabschnitt-Gattung')).map(() => lebensabschnittGattungKey);
            const dependentLebensabschnittArt = dependentData.filter(x => x.startsWith('Lebensabschnitt-Art')).map(() => lebensabschnittArtKey);
            const dependentLebensabschnittMorph = dependentData.filter(x => x.startsWith('Lebensabschnitt-Morph')).map(() => lebensabschnittMorphKey);

            const dep = [
                ...dependentGattung,
                ...dependentArt,
                ...dependentMorph,
                ...dependentEigenschaften,
                ...dependentBesonderheiten,
                ...dependentFertigkeiten,
                ...dependentTalent,
                ...dependentAge,
                ...dependentLebensabschnittArt,
                ...dependentLebensabschnittGattung,
                ...dependentLebensabschnittMorph,
            ];
            return dep;
        }


        for (const key of this.stammdaten.allEigenschaftKeys) {

            const { Raw: rawKey, Effective: effectiveKey, Type: typeKey, Meta: metaKey, Cost: costKey } = this.getPropertieKeys(key);

            const tmpKey = this.storeManager.key(`/tmp/eigenschaft/${key}`).of<{ entry: StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen, type: EigenschaftTypes, level: EigenschaftTypesLevel, morphId?: string, artId?: string, gattungId?: string, } | undefined>();
            // const effectiveKey = this.storeManager.key(`/eigenschaft/${key}/effektiv`).of<number | undefined>();
            // const writablStore = this.storeManager.writable(rawKey, undefined);

            this.eigenschaften[key] = {
                effective: this.storeManager.readable(effectiveKey),
                raw: this.storeManager.writable(rawKey, undefined),
                type: this.storeManager.readable(typeKey),
                meta: this.storeManager.readable(metaKey),
                cost: this.storeManager.readable(costKey),
            };
            const dependentData = this.stammdaten.eigenschaftenDependencys.filter(x => x.Eigenschaft == key);

            const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
            const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'));

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
            }, {
                compare: (a, b) => {
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
                }
            });


            this.storeManager.derived(effectiveKey, [ageKey, tmpKey, rawKey, metaKey, ...valueDependency], (data, [{ newValue: age }, { newValue: base }, { newValue: setValue }, { newValue: meta }, ...dependent]) => {
                let resultreturn: number;
                if (base === undefined) {
                    return undefined;
                }


                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency } = this.groupDependencyData(dependent);



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



                    const calculation = meta as FormelDefintion_lebewesen;
                    if (calculation == undefined) {
                        return undefined;
                    }


                    const scope: any = {};

                    for (const element of fertigkeitDependency) {
                        if (element.Effective.newValue !== undefined)
                            scope[element.id] = element.Effective.newValue;
                        else
                            return undefined;
                    }


                    for (const element of besonderheitDependency) {
                        if (element.Effective.newValue !== undefined)
                            scope[element.id] = element.Effective.newValue;
                        else
                            return undefined;
                    }

                    for (const element of eigenschaftDependency) {
                        if (element.Effective.newValue !== undefined)
                            scope[element.id] = element.Effective.newValue;
                        else
                            return undefined;
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



                // check modifier

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
                                .filter((x): x is KeyData<LebensabschittGattungKey | LebensabschittArtKey | LebensabschittMorphKey> => x.key.Key.endsWith('/lebensabschnitt'))
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
                //TODO: Talents are not yet handled



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
            });
            this.storeManager.derived(costKey, [metaKey, rawKey, ...costDependency], (data, [meta, raw, ...dependent]) => {

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependent);

                if (meta.newValue?.type == 'bereich') {
                    return toCost(meta.newValue.Kosten, x => {

                        const _default = meta.newValue?.type == 'bereich' ? meta.newValue.default : 0;


                        let resultreturn: number | undefined = undefined;
                        const scope = {
                            value: raw.newValue ?? _default
                        };
                        try {
                            resultreturn = evaluateBerechnung(x.Berechnung, scope);
                        } catch (error) {
                            console.error(`Faild formle ${x.Berechnung} of ${metaKey.Key} ${x.Id}`, error);
                            return undefined;
                        }
                        if (resultreturn) {
                            return [x.Id, resultreturn] as const;
                        }
                    })
                } else if (meta.newValue?.type == 'reihe') {
                    return toCost(meta.newValue.currentSchwelle?.Kosten ?? [],
                        x => {
                            let resultreturn: number | undefined = undefined;
                            const scope = {
                                value: raw.newValue ?? 0
                            };
                            try {
                                const result = mathjs.evaluate(x.Berechnung, scope);
                                if (isResultSet(result)) {
                                    const entries = (result as { entries: any }).entries;
                                    resultreturn = Array.isArray(entries) ? entries[entries.length - 1] : entries;
                                }
                                else {
                                    resultreturn = Array.isArray(result) ? result[result.length - 1] : result;
                                }
                            } catch (error) {
                                console.error(`Faild formle ${x.Berechnung} of ${metaKey.Key} ${x.Id}`, error);
                                return undefined;
                            }
                            if (resultreturn) {
                                return [x.Id, resultreturn] as const;
                            }
                        })

                }


                return entriesToCost();

            })
        }


        for (const besonderheit of this.stammdaten.Instance.Daten.Besonderheiten.flatMap(x => x.Besonderheit)) {


            const keys = this.getBesonterheitKeys(besonderheit.Id);

            this.besonderheiten[besonderheit.Id] = {
                effective: this.storeManager.readable(keys.Effective),
                unconditionally: this.storeManager.readable(keys.Unbeschränkt),
                purchased: this.storeManager.writable(keys.Purchased, 0),
                fixed: this.storeManager.readable(keys.Fixed),
                missing: this.storeManager.readable(keys.Missing),
                cost: this.storeManager.readable(keys.Cost),
            };

            const dependentData = this.stammdaten.besonderheitDependencys.filter(x => x.Eigenschaft == besonderheit.Id);

            const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
            const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'));
            const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Unbeschränkt']);



            this.storeManager.derived(keys.Effective, [keys.Unbeschränkt, keys.Missing], (data, [unconditionally, missing]) => {
                return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
            });
            this.storeManager.derived(keys.Unbeschränkt, [keys.Purchased, keys.Fixed], (data, [purchased, fixed]) => {
                return Math.max(purchased.newValue, fixed.newValue);
            });



            this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                // todo get fixed besonderheiten

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency } = this.groupDependencyData(dependent);

                const besonderheitMax = Math.max(...besonderheitDependency.map(x =>
                    Math.max(...data.besonderheitenMap[x.id].Stufe.filter((_, i) => i < x.Effective.newValue)
                        .map(x => Math.max(...(x.Mods?.Besonderheiten?.Besonderheit.filter(x => x.Id == besonderheit.Id).map(x => x.Stufe)) ?? [])))
                ));

                const fertigkeitMax = Math.max(...fertigkeitDependency.map(x =>
                    Math.max(...data.fertigkeitenMap[x.id].Stufe.filter((_, i) => i < x.Effective.newValue)
                        .map(x => Math.max(...(x.Mods?.Besonderheiten?.Besonderheit.filter(x => x.Id == besonderheit.Id).map(x => x.Stufe)) ?? [])))
                ));


                const eigenschaftMax = Math.max(...eigenschaftDependency.map(x => {
                    if (x.Meta.newValue?.type == 'punkt' && x.Effective.newValue == 1) {
                        return Math.max(...(x.Meta.newValue.Mods?.Besonderheiten?.Besonderheit.filter(x => x.Id == besonderheit.Id).map(x => x.Stufe)) ?? []);
                    } else if (x.Meta.newValue?.type == 'reihe') {
                        return Math.max(...(x.Meta.newValue.currentSchwelle?.Mods?.Besonderheiten?.Besonderheit.filter(x => x.Id == besonderheit.Id).map(x => x.Stufe)) ?? []);
                    }
                    return 0;

                }));

                return Math.max(0, besonderheitMax, fertigkeitMax, eigenschaftMax);
            });

            this.storeManager.derived(keys.Missing, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                // todo get Missing stuff

                const { besonderheitDependency, fertigkeitDependency, talentDependency } = this.groupDependencyData(dependent);

                const result = filterNull(besonderheit.Stufe
                    .filter((x, i) => i < effective.newValue)
                    .map((x, i) => {
                        const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency);
                        if (missing == null) {
                            return null;
                        }
                        return {
                            wert: i + 1, missing: missing
                        };
                    }));

                return result;
            });

            this.storeManager.derived(keys.Cost, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);


                return toCost(
                    besonderheit.Stufe.map((x, i) => ({ index: i, ...x }))
                        .filter(x => x.index < purchased.newValue)
                        .filter(x => x.index >= fixed.newValue)
                        .flatMap(x => x.Kosten.map(y => {

                            let resultreturn: number;

                            try {
                                resultreturn = evaluateBerechnung(y.Berechnung, {}, ...besonderheitDependency, ...fertigkeitDependency, ...eigenschaftDependency, ...otherDependency) ?? 0;
                            } catch (error) {
                                console.error(`Faild formle ${y.Berechnung} of ${y.Id}`, error);
                                resultreturn = 0;
                            }


                            return [y.Id, resultreturn] as const;
                        })), x => x);

            });





        }


        for (const fertigkeit of this.stammdaten.Instance.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit)) {


            const keys = this.getFertigkeitenKeys(fertigkeit.Id);

            this.fertigkeiten[fertigkeit.Id] = {
                effective: this.storeManager.readable(keys.Effective),
                unconditionally: this.storeManager.readable(keys.Unbeschränkt),
                purchased: this.storeManager.writable(keys.Purchased, 0),
                fixed: this.storeManager.readable(keys.Fixed),
                missing: this.storeManager.readable(keys.Missing),
                cost: this.storeManager.readable(keys.Cost),
            };

            const dependentData = this.stammdaten.fertigkeitDependencys.filter(x => x.Eigenschaft == fertigkeit.Id);

            const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
            const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'));
            const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Unbeschränkt']);



            this.storeManager.derived(keys.Effective, [keys.Unbeschränkt, keys.Missing], (data, [unconditionally, missing]) => {
                return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
            });
            this.storeManager.derived(keys.Unbeschränkt, [keys.Purchased, keys.Fixed], (data, [purchased, fixed]) => {
                return Math.max(purchased.newValue, fixed.newValue);
            });



            this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                // todo get fixed besonderheiten

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependent);

                return 0;
                // return Math.max(0, besonderheitMax, fertigkeitMax, eigenschaftMax);
            });

            this.storeManager.derived(keys.Missing, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                // todo get Missing stuff

                const { besonderheitDependency, fertigkeitDependency, talentDependency } = this.groupDependencyData(dependent);

                const result = filterNull(fertigkeit.Stufe
                    .filter((x, i) => i < effective.newValue)
                    .map((x, i) => {
                        const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency);
                        if (missing == null) {
                            return null;
                        }
                        return {
                            wert: i + 1, missing: missing
                        };
                    }));

                return result;
            });

            this.storeManager.derived(keys.Cost, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);

                const defaultKostData = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten)[0];


                return toCost(
                    fertigkeit.Stufe.map((x, i) => ({ index: i, ...x }))
                        .filter(x => x.index < purchased.newValue)
                        .filter(x => x.index >= fixed.newValue)
                        .map(y => {

                            return [defaultKostData.Id, y.Kosten] as const;
                        }), x => x);

            });





        }


        for (const talent of this.stammdaten.Instance.Daten.Talente.flatMap(x => x.Talent)) {


            const keys = this.getTalentKeys(talent.Id);

            this.talente[talent.Id] = {
                effective: this.storeManager.readable(keys.Effective),
                base: this.storeManager.readable(keys.Base),
                support: this.storeManager.readable(keys.Support),
                purchased: this.storeManager.writable(keys.Purchased, 0),
                fixed: this.storeManager.readable(keys.Fixed),
                missing: this.storeManager.readable(keys.Missing),
                cost: this.storeManager.readable(keys.Cost),
            };

            const dependentData = this.stammdaten.talentDependencys.filter(x => x.Eigenschaft == talent.Id);

            const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
            const supportDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'support'), ['Base', 'Missing']);
            const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Base', 'Support', 'Effective']);



            this.storeManager.derived(keys.Effective, [keys.Base, keys.Support, keys.Missing], (data, [base, support, missing]) => {
                return Math.min(base.newValue + support.newValue, ...missing.newValue.map(x => x.wert - 1));
            });
            this.storeManager.derived(keys.Base, [keys.Purchased, keys.Fixed], (data, [purchased, fixed]) => {

                const ep = purchased.newValue + fixed.newValue;
                const complexity = talent.Komplexität.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1
                const levelCots = data.talentCostTabel[complexity]


                for (let i = levelCots.length - 1; i >= 0; i--) {
                    if (levelCots[i].Kosten.Wert <= ep) {
                        return i;
                    }
                }
                return 0;
            });
            this.storeManager.derived(keys.Support, [...supportDependency], (data, [...dependent]) => {


                const { talentDependency } = this.groupDependencyData(dependent);



                const lookup = Object.fromEntries(talentDependency.map(x => [x.id, x]));


                return [...(talent.Ableitungen?.Ableitung ?? []).map(calculateAbleitung),
                ...(talent.Ableitungen?.Max ?? []).map(calculateMax)].reduce((p, c) => p + c, 0);


                function calculateMax(m: _Max): number {
                    const values = [...m.Ableitung?.map(calculateAbleitung) ?? [],
                    ...m.Max?.map(calculateMax) ?? []
                    ].sort((a, b) => b - a);

                    return values.filter((_, i) => i < m.Anzahl).reduce((p, c) => p + c, 0);
                }

                function calculateAbleitung(a: _Ableitung) {
                    const other = lookup[a.Id];
                    // missing requirments may lower the talent below base.
                    const otherValue = Math.min(other.Base.newValue, ...other.Missing.newValue.map(x => x.wert));

                    return Math.floor(otherValue / a.Anzahl);
                }
            });



            this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                // TODO: get fixed talente

                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependent);

                return 0;
                // return Math.max(0, besonderheitMax, fertigkeitMax, eigenschaftMax);
            });

            this.storeManager.derived(keys.Missing, [keys.Base, keys.Support, ...requirementsDependency], (data, [base, support, ...dependent]) => {
                const { besonderheitDependency, fertigkeitDependency, talentDependency } = this.groupDependencyData(dependent);


                if (base.newValue == UNINITILEZED || support.newValue == UNINITILEZED) {
                    return [];
                }
                const currentLevel = base.newValue + support.newValue;

                const result = filterNull(talent.Level
                    .filter(x => x.Wert <= currentLevel)
                    .map(x => {
                        const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency);
                        if (missing == null) {
                            return null;
                        }
                        return {
                            wert: x.Wert, missing: missing
                        };
                    }));

                return result;
            }, { evalueateUndefined: true });

            this.storeManager.derived(keys.Cost, [keys.Purchased], (data, [purchased]) => {
                const defaultKostData = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten)[0];
                const result = {} as Cost;
                result[defaultKostData.Id] = purchased.newValue;
                return result;
            });





        }



        for (const tag of this.stammdaten.Instance.Daten.Tags.Tag) {


            const keys = this.getTagKeys(tag.Id);

            this.tag[tag.Id] = {
                effective: this.storeManager.readable(keys.Effective),
            };

            const dependentData = this.stammdaten.tagDependencys.filter(x => x.Eigenschaft == tag.Id);

            const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));



            this.storeManager.derived(keys.Effective, valueDependency, (data, dependent) => {
                const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, talentDependency } = this.groupDependencyData(dependent);

                for (const b of besonderheitDependency) {
                    const besonderheit = data.besonderheitenMap[b.id];
                    for (let index = 0; index < b.Effective.newValue; index++) {
                        if ((besonderheit.Stufe[index].Mods?.Tags?.Tag.filter(x => x.Id == tag.Id).length ?? 0) > 0) {
                            return 1
                        }
                    }
                }
                for (const b of eigenschaftDependency) {

                    if (b.Meta.newValue?.type == "punkt" && b.Effective.newValue == 1) {
                        return 1;
                    }
                    if (b.Meta.newValue?.type == 'reihe') {
                        if ((b.Meta.newValue.currentSchwelle?.Mods?.Tags?.Tag.filter(x => x.Id == tag.Id).length ?? 0) > 0) {
                            return 1;

                        }
                    }
                }
                for (const b of fertigkeitDependency) {
                    const fertigkeit = data.fertigkeitenMap[b.id];
                    for (let index = 0; index < b.Effective.newValue; index++) {
                        if ((fertigkeit.Stufe[index].Mods?.Tags?.Tag.filter(x => x.Id == tag.Id).length ?? 0) > 0) {
                            return 1
                        }
                    }
                }
                for (const b of talentDependency) {
                    const talent = data.talentMap[b.id];

                    if (talent.Level.filter(x => x.Wert <= b.Effective.newValue && ((x.Mods?.Tags?.Tag.filter(y => y.Id == tag.Id).length ?? 0) > 0)).length > 0) {
                        return 1;
                    }
                }


                return 0;
            });





        }






    }










    private static getMissingInternal(requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined,

        besonderheitDependency: (MapKeyData<BesonderheitKeys<string>> & {
            kind: 'besonderheit';
            id: string;
        })[],
        fertigkeitDependency: (MapKeyData<FertigkeitKeys<string>> & {
            kind: 'fertigkeit';
            id: string;
        })[],
        talentDependency: (MapKeyData<TalentKeys<string>> & {
            kind: 'talent';
            id: string;
        })[],
    ): MissingRequirements | null {
        if (requirements == undefined)
            return null;





        const talentEffective: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, x.Effective.newValue] as const));
        const talentDerivation: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, x.Support.newValue] as const));
        const talentBase: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, x.Base.newValue] as const));
        const besonderheiten: Record<string, number | undefined> = Object.fromEntries(besonderheitDependency.map(x => [x.id, x.Unbeschränkt.newValue] as const));
        const fertigkeiten: Record<string, number | undefined> = Object.fromEntries(fertigkeitDependency.map(x => [x.id, x.Unbeschränkt.newValue] as const));
        const tags: Record<string, true | undefined> = {};









        const singel = (requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit, negate: boolean): MissingRequirements | null => {
            if (requirements["#"] == 'Tag') {
                return (tags?.[requirements.Tag.Id] === true) !== negate
                    ? null
                    : { type: 'tag', id: requirements.Tag.Id }
            } else if (requirements["#"] === 'Fertigkeit') {
                return (((fertigkeiten?.[requirements.Fertigkeit.Id] ?? 0) >= requirements.Fertigkeit.Stufe) === true) !== negate
                    ? null
                    : { type: 'Fertigkeit', id: requirements.Fertigkeit.Id, Stufe: requirements.Fertigkeit.Stufe }
            } else if (requirements["#"] === 'Besonderheit') {
                return (((besonderheiten?.[requirements.Besonderheit.Id] ?? 0) >= requirements.Besonderheit.Stufe) === true) !== negate
                    ? null
                    : { type: 'Besonderheit', id: requirements.Besonderheit.Id, Stufe: requirements.Besonderheit.Stufe }
            } else if (requirements["#"] === 'Talent' && requirements.Talent.LevelTyp == "Basis") {
                return (((talentBase?.[requirements.Talent.Id] ?? 0) >= requirements.Talent.Level) === true) !== negate
                    ? null
                    : { type: 'Talent', id: requirements.Talent.Id, Stufe: requirements.Talent.Level, Kind: requirements.Talent.LevelTyp }
            } else if (requirements["#"] === 'Talent' && requirements.Talent.LevelTyp == "Effektiv") {
                return (((talentEffective?.[requirements.Talent.Id] ?? 0) >= requirements.Talent.Level) === true) !== negate
                    ? null
                    : { type: 'Talent', id: requirements.Talent.Id, Stufe: requirements.Talent.Level, Kind: requirements.Talent.LevelTyp }
            } else if (requirements["#"] === 'Talent' && requirements.Talent.LevelTyp == "Unterstützung") {
                return (((talentDerivation?.[requirements.Talent.Id] ?? 0) >= requirements.Talent.Level) === true) !== negate
                    ? null
                    : { type: 'Talent', id: requirements.Talent.Id, Stufe: requirements.Talent.Level, Kind: requirements.Talent.LevelTyp }
            } else if (requirements["#"] === 'Not') {
                const temp = singel(requirements.Not, !negate);
                if (temp === null) {
                    return null;
                }
                else {
                    return { type: 'Not', sub: temp }
                }
            } else if (requirements["#"] === 'And') {
                const temp = multy(requirements.And, negate);
                if (temp === null || temp.length == 0) {
                    return null;
                }
                else if (temp.length == 1) {
                    return temp[0];
                }
                else {
                    return { type: 'And', sub: temp }
                }
            } else if (requirements["#"] === 'Or') {
                const temp = multy(requirements.Or, negate);
                if (temp === null || temp.length === 0) {
                    return null;
                }
                else if (temp.length == 1) {
                    return temp[0];
                }
                else {
                    return { type: 'Or', sub: temp }
                }
            }
            else {
                throw Error('Not implemented: restriction');
            }


        }

        const multy = (requirements: BedingungsAuswahlen_misc | BedingungsAuswahlen_besonderheit, negate: boolean): MissingRequirements[] => {
            return [
                ... (filterNull<MissingRequirements>(requirements.And?.map(x => singel({ "#": "And", And: x } as any, negate)) ?? [])),
                ... (filterNull<MissingRequirements>(requirements.Or?.map(x => singel({ "#": "Or", Or: x } as any, negate)) ?? [])),
                ... (filterNull<MissingRequirements>(requirements.Besonderheit?.map(x => singel({ "#": "Besonderheit", Besonderheit: x } as any, negate)) ?? [])),
                ... (filterNull<MissingRequirements>(requirements.Not?.map(x => singel({ "#": "Not", Not: x } as any, !negate)) ?? [])),
                ... (filterNull<MissingRequirements>(requirements.Tag?.map(x => singel({ "#": "Tag", Tag: x } as any, negate)) ?? [])),
                ... (filterNull<MissingRequirements>((requirements as BedingungsAuswahlen_misc).Fertigkeit?.map(x => singel({ "#": "Fertigkeit", Fertigkeit: x } as any, negate)) ?? [])),
                ... (filterNull<MissingRequirements>((requirements as BedingungsAuswahlen_misc).Talent?.map(x => singel({ "#": "Talent", Talent: x } as any, negate)) ?? [])),
            ];
        }
        return singel(requirements, false);
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

function evaluateBerechnung(Berechnung: string, scope?: Record<string, number>, ...deps: ({ id: string, Effective: { newValue: unknown } } | { newValue: unknown, key: Key<string, unknown> })[]) {
    if (scope == undefined) {
        scope = {};
    }

    function isOther(obj: any): obj is { newValue: unknown, key: Key<string, unknown> } {
        return ((obj as { key?: Key<string, unknown> }).key !== undefined);

    }

    for (const element of deps) {
        if (isOther(element)) {
            if (typeof element.newValue === 'number') {
                if (element.key.Key == '/organism/age')
                    scope['alter'] = element.newValue;
            }
        }
        else {
            if (typeof element.Effective.newValue === 'number')
                scope[element.id] = element.Effective.newValue;
        }
    }

    const result = mathjs.evaluate(Berechnung, scope);
    if (isResultSet(result)) {
        const entries = (result as { entries: any; }).entries;
        return Array.isArray(entries) ? entries[entries.length - 1] : entries;
    }
    else {
        return Array.isArray(result) ? result[result.length - 1] : result;
    }

}
