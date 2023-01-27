import type { ModWert_lebewesen, MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen, LebensabschnittDefinition_lebewesen, StaticheDefinition_lebewesen, ReiheDefinition_lebewesen, FormelDefintion_lebewesen, PunktDefintion_lebewesen, _Reihe, _Schwelle, _Lokalisirung, _Besonderheit, Schutzwert_kampf_ausstattung, _Anzahl, _ActionType, BedingungsAuswahl_misc, BedingungsAuswahl_besonderheit, BedingungsAuswahlen_misc, BedingungsAuswahlen_besonderheit, _Ableitung, _Max, _LevelAuswahlen, _LevelAuswahl, _Level1, Ableitung_talent, Max_talent, KostenDefinition_misc, KostenDefinitions_misc, KostenDefinitionen_misc, _Bereich } from "../data/nota.g";
import StoreManager, { UNINITILEZED, type Key, type KeyData, type Readable, type Writable } from "../misc/StoreManager2";
import { derived, type Readable as ReadableOriginal, type Writable as WritableOriginal } from "svelte/store";
// import { derivedLazy } from "../lazyDerivied";
import * as mathjs from 'mathjs'

import { Data, type DependencyData } from "./Data";
import { distinct, filterNull, filterObjectKeys, getLast, groupBy, notUndefined, toObjectKey } from "../misc/misc";
import { cos, fix, index, isResultSet, meanTransformDependencies, xgcd } from "mathjs";

export type EigenschaftTypes = 'bereich' | 'reihe' | 'punkt' | 'berechnung';
export type EigenschaftTypesLevel = 'morph' | 'art' | 'gattung' | 'organismus';

export type MissingRequirements = { type: 'tag', id: string }
    | { type: 'Fertigkeit', id: string, Stufe: number }
    | { type: 'Besonderheit', id: string, Stufe: number }
    | { type: 'Level', id: string, pfad: string, Stufe: number }
    | { type: 'Talent', id: string, Stufe: number, Kind: 'Basis' | 'Effektiv' | 'Unterstützung' }
    | { type: 'Not', sub: MissingRequirements }
    | { type: 'And', sub: MissingRequirements[] }
    | { type: 'Or', sub: MissingRequirements[] }
    ;


export type Cost = Record<string, number>;

export function substractCost(a: Cost, b: Cost) {
    const keys = distinct([...Object.keys(a), ...Object.keys(b)]);
    const result = {} as Cost;
    for (const key of keys) {
        result[key] = (a[key] ?? 0) - (b[key] ?? 0);
    }
    return result;
}
export function addCost(a: Cost, b: Cost) {
    const keys = distinct([...Object.keys(a), ...Object.keys(b)]);
    const result = {} as Cost;
    for (const key of keys) {
        result[key] = (a[key] ?? 0) + (b[key] ?? 0);
    }
    return result;
}
export function negateCost(a: Cost) {
    const keys = Object.keys(a);
    const result = {} as Cost;
    for (const key of keys) {
        result[key] = -a[key];
    }
    return result;
}


export type PersistanceData = {
    stammdatenId: string,
    id: string,
    name: string,
    age: number,
    pfad: Record<string, Record<string, number>>,
    besonderheiten: Record<string, number>,
    fertigkeiten: Record<string, number>,
    talente: Record<string, number>,
    eigenschaften: Record<string, number>,
    ausstattung: string[],
    gattung?: string,
    art?: string,
    morph?: string,
}

type MapKeyData<K> = {
    [e in keyof K]: KeyData<K[e]>;
}


type PropValues<T> = T[keyof T]
    ;

type missingMapping = ({
    type: 'besonderheit' | 'fertigkeit' | 'talent' | 'tag';
    id: string;
} | {
    type: 'level';
    id: {
        level: string;
        path: string;
    };
}) & {
    missing: { wert: number, missing: MissingRequirements }[];
};


export type CharacterChange = {
    changedCost: {
        key: string;
        new: number;
        old: number;
        differece: number;
    }[];
    changedLevels: {
        key: { path: string, level: string };
        new: number;
        old: number;
    }[];
    changedTags: {
        key: string;
        new: number;
        old: number;
    }[];
    changedTalents: {
        key: string;
        new: number;
        old: number;
        newEp: number;
        oldEp: number;
    }[];
    changedFertigkeiten: {
        key: string;
        new: number;
        old: number;
        // newIgnored: number;
        // oldIgnored: number;
    }[];
    changedBestonderheiten: {
        key: string;
        new: number;
        old: number;
        // newIgnored: number;
        // oldIgnored: number;
    }[];
    requirements: {
        added: (typeWithMissing)[];
        removed: typeWithMissing[];
    };
};
type typeWithMissing = {
    wert: number;
    missing: MissingRequirements;
    missingOnType: "besonderheit" | "fertigkeit" | "talent";
    missingOnId: string;
} | {
    wert: number;
    missing: MissingRequirements;
    missingOnType: "level";
    missingOnId: {
        path: string;
        level: string;
    };
};

export type CostKey<kind extends 'eigenschaft' | 'fertigkeit' | 'besonderheit' | 'talent' | 'pfad', id extends string = string, cost extends 'cost' | 'costNext' | 'costPreview' = 'cost', id2 extends string = string> =
    kind extends 'eigenschaft'
    ? Key<`/eigenschaften/${id}/${cost}`, Cost>
    : kind extends 'fertigkeit'
    ? Key<`/fertigkeit/${id}/${cost}`, Cost>
    : kind extends 'besonderheit'
    ? Key<`/besonderheit/${id}/${cost}`, Cost>
    : kind extends 'talent'
    ? Key<`/talent/${id}/${cost}`, Cost>
    : kind extends 'pfad'
    ? Key<`/pfad/${id}/${id2}/${cost}`, Cost>
    : never
    ;

export type EigenschaftKeys<id extends string = string> = {
    Effective: EigenschaftEffective<id>,
    Raw: EigenschaftRawKey<id>,
    Type: EigenschaftTypeKey<id>,
    Meta: EigenschaftMetaKey<id>,
    Cost: CostKey<'eigenschaft', id>,
}

export type EigenschaftMetaKey<id extends string = string> = Key<`/eigenschaften/${id}/meta`, StaticheDefinition_lebewesen & { type: 'bereich', quantileForAge: Quantile[]; } | (ReiheDefinition_lebewesen & {
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


type LevelKeys<pfadId extends string = string, levelId extends string = string> = {
    Effective: LevelEffectiveKey<pfadId, levelId>,
    Purchased: LevelPurchasedKey<pfadId, levelId>,
    Missing: LevelMissingKey<pfadId, levelId>,
    MissingNext: LevelMissingNextKey<pfadId, levelId>,

    Cost: CostKey<'pfad', pfadId, 'cost', levelId>,
    CostNext: CostKey<'pfad', pfadId, 'costNext', levelId>,
    CostPreview: CostKey<'pfad', pfadId, 'costPreview', levelId>,
}

type LevelEffectiveKey<id extends string = string, levelId extends string = string> = Key<`/pfad/${id}/${levelId}/effective`, number>;
type LevelPurchasedKey<id extends string = string, levelId extends string = string> = Key<`/pfad/${id}/${levelId}/purchased`, number>;
type LevelMissingKey<id extends string = string, levelId extends string = string> = Key<`/pfad/${id}/${levelId}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;
type LevelMissingNextKey<id extends string = string, levelId extends string = string> = Key<`/pfad/${id}/${levelId}/missingNext`, {
    wert: number;
    missing: MissingRequirements;
}[]>;


type TalentKeys<id extends string = string> = {
    Effective: TalentEffectiveKey<id>,
    Unconditionally: TalentUnbeschränktKey<id>,
    Base: TalentBaseKey<id>,
    Support: TalentSupportKey<id>,
    Fixed: TalentFixedKey<id>,
    Purchased: TalentPurchasedKey<id>,
    NextLevelSupport: TalentNextLevelSupportKey<id>,
    NextLevelEpCost: TalentNextLevelEpCostKey<id>,
    PreviousLevelEpCost: TalentPreviousLevelEpCostKey<id>,
    Missing: TalentMissingKey<id>,
    Cost: CostKey<'talent', id>,
}

type TalentEffectiveKey<id extends string = string> = Key<`/talent/${id}/effective`, number>;
type TalentUnbeschränktKey<id extends string = string> = Key<`/talent/${id}/unbeschränkt`, number>;
type TalentBaseKey<id extends string = string> = Key<`/talent/${id}/base`, number>;
type TalentSupportKey<id extends string = string> = Key<`/talent/${id}/support`, number>;
type TalentFixedKey<id extends string = string> = Key<`/talent/${id}/fixed`, number>;
type TalentPurchasedKey<id extends string = string> = Key<`/talent/${id}/purchased`, number>;
type TalentNextLevelSupportKey<id extends string = string> = Key<`/talent/${id}/nextLevelSupport`, TalentSupportIncrease[]>;
type TalentNextLevelEpCostKey<id extends string = string> = Key<`/talent/${id}/nextLevelEp`, number>;
type TalentPreviousLevelEpCostKey<id extends string = string> = Key<`/talent/${id}/previousLevelEp`, number>;
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
    MissingNextLevel: FertigkeitMissingNextLevelKey<id>,
    Cost: CostKey<'fertigkeit', id>,
    CostNext: CostKey<'fertigkeit', id, 'costNext'>,
    CostPreview: CostKey<'fertigkeit', id, 'costPreview'>,
}

type FertigkeitEffectiveKey<id extends string = string> = Key<`/fertigkeit/${id}/Stufe`, number>;
type FertigkeitUnbeschränktKey<id extends string = string> = Key<`/fertigkeit/${id}/StufeUnbeschränkt`, number>;
type FertigkeitFixedKey<id extends string = string> = Key<`/fertigkeit/${id}/fixed`, number>;
type FertigkeitPurchasedKey<id extends string = string> = Key<`/fertigkeit/${id}/purchased`, number>;
type FertigkeitMissingKey<id extends string = string> = Key<`/fertigkeit/${id}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;
type FertigkeitMissingNextLevelKey<id extends string = string> = Key<`/fertigkeit/${id}/missingNextLevel`, {
    wert: number;
    missing: MissingRequirements;
}[]>;



type BesonderheitKeys<id extends string = string> = {
    Effective: BesonderheitEffectiveKey<id>,
    Unbeschränkt: BesonderheitUnbeschränktKey<id>,
    Fixed: BesonderheitFixedKey<id>,
    Purchased: BesonderheitPurchasedKey<id>,
    Missing: BesonderheitMissingKey<id>,
    MissingNextLevel: BesonderheitMissingNextLevelKey<id>,
    Cost: CostKey<'besonderheit', id>,
    CostNext: CostKey<'besonderheit', id, 'costNext'>,
    CostPreview: CostKey<'besonderheit', id, 'costPreview'>,
}

type BesonderheitPurchasedKey<id extends string = string> = Key<`/besonderheit/${id}/purchased`, number>;
type BesonderheitFixedKey<id extends string = string> = Key<`/besonderheit/${id}/fixed`, number>;
type BesonderheitUnbeschränktKey<id extends string = string> = Key<`/besonderheit/${id}/StufeUnbeschränkt`, number>;
type BesonderheitEffectiveKey<id extends string = string> = Key<`/besonderheit/${id}/Stufe`, number>;
type BesonderheitMissingKey<id extends string = string> = Key<`/besonderheit/${id}/missing`, {
    wert: number;
    missing: MissingRequirements;
}[]>;
type BesonderheitMissingNextLevelKey<id extends string = string> = Key<`/besonderheit/${id}/missingNextLevel`, {
    wert: number;
    missing: MissingRequirements;
}[]>;


type EquipmentKeys<id extends string = string> = {
    equiped: EquipmentKey<id>,
};
type EquipmentKey<id extends string = string> = Key<`/equipment/${id}/equiped`, true | undefined>;



type LebensabschittGattungKey = Key<'/organism/gattung/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;
type LebensabschittArtKey = Key<'/organism/art/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;
type LebensabschittMorphKey = Key<'/organism/morph/lebensabschnitt', LebensabschnittDefinition_lebewesen | undefined>;


function transformToCost<T>(entries: T[], fn: ((value: T) => ((readonly [string, number]) | undefined))): Cost {
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




export type TalentSupportIncrease = {
    id: string;
    increaseTaB: number;
    increaseEP: number;
};

export class Charakter {

    public readonly twin: Charakter | undefined;


    public readonly ageStore: Writable<number>;
    public readonly nameStore: Writable<string>;

    public readonly persistanceStore: Readable<PersistanceData>;

    public readonly gattungsIdStore: Writable<string | undefined>;
    public readonly gattungsStore: Readable<GattungDefinition_lebewesen | undefined>;
    public readonly possibleGattungStore: Readable<string[]>;

    public readonly artIdStore: Writable<string | undefined>;
    public readonly artStore: Readable<ArtDefinition_lebewesen | undefined>;
    public readonly possibleArtStore: Readable<string[]>;

    public readonly morphIdStore: Writable<string | undefined>;
    public readonly morphStore: Readable<MorphDefinition_lebewesen | undefined>;
    public readonly possibleMorphStore: Readable<string[]>;
    public readonly pointStore: Readable<Cost>;
    public readonly missingStore: Readable<missingMapping[]>;


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
        missingNextLevel: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'besonderheit'>>>,
        costNext: Readable<TypeOfKey<CostKey<'besonderheit', string, 'costNext'>>>,
        costPreview: Readable<TypeOfKey<CostKey<'besonderheit', string, 'costPreview'>>>,
    }> = {};

    public readonly fertigkeiten: Record<string, {
        effective: Readable<number>,
        unconditionally: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        missingNextLevel: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'fertigkeit'>>>,
        costNext: Readable<TypeOfKey<CostKey<'fertigkeit', string, 'costNext'>>>,
        costPreview: Readable<TypeOfKey<CostKey<'fertigkeit', string, 'costPreview'>>>,
    }> = {};



    public readonly talente: Record<string, {
        effective: Readable<number>,
        unconditionally: Readable<number>,
        base: Readable<number>,
        support: Readable<number>,
        purchased: Writable<number>,
        fixed: Readable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        nextLevelSupport: Readable<TalentSupportIncrease[]>,
        nextLevelEpCost: Readable<number>,
        previousLevelEpCost: Readable<number>,

        cost: Readable<TypeOfKey<CostKey<'talent'>>>,
    }> = {};

    public readonly tag: Record<string, {
        effective: Readable<number>,
    }> = {};

    public readonly pfad: Record<string, Record<string, {
        effective: Readable<number>,
        purchased: Writable<number>,
        missing: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        missingNext: Readable<{ wert: number; missing: MissingRequirements; }[]>,
        cost: Readable<TypeOfKey<CostKey<'pfad'>>>,
        costNext: Readable<TypeOfKey<CostKey<'pfad', string, 'costNext'>>>,
        costPreview: Readable<TypeOfKey<CostKey<'pfad', string, 'costPreview'>>>,
    }>> = {};

    public readonly lebensAbschnitteStore: Readable<{
        gattung: LebensabschnittDefinition_lebewesen | undefined;
        art: LebensabschnittDefinition_lebewesen | undefined;
        morph: LebensabschnittDefinition_lebewesen | undefined;
    }>;


    public readonly equipment: Record<string, {
        type: 'armor' | 'longRangeWeapon' | 'closeCombatWeapon' | 'misc',
        equiped: Writable<true | undefined>,
    }> = {};


    public readonly stammdaten: Data;
    public readonly id: string;

    private readonly storeManager: StoreManager<Data>;





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
            const level = this.getIdFromLevelKey(e.key);
            if (level) {
                if (level.type == 'effective') {
                    return {
                        kind: 'level' as const,
                        entry: e as KeyData<LevelEffectiveKey>,
                        levelId: level.level,
                        pathId: level.path,
                        id: `${level.path}|${level.level}`,
                        type: level.type,
                    }

                } else if (level.type == 'missing') {
                    return {
                        kind: 'level' as const,
                        entry: e as KeyData<LevelMissingKey>,
                        levelId: level.level,
                        pathId: level.path,
                        id: `${level.path}|${level.level}`,
                        type: level.type,
                    }
                } else if (level.type == 'purchased') {
                    return {
                        kind: 'level' as const,
                        entry: e as KeyData<LevelPurchasedKey>,
                        levelId: level.level,
                        pathId: level.path,
                        id: `${level.path}|${level.level}`,
                        type: level.type,
                    }
                }
            }
            const tag = this.getIdFromTagKey(e.key);
            if (tag) {
                if (tag.type == 'effective') {
                    return {
                        kind: 'tag' as const,
                        entry: e as KeyData<TagEffectiveKey>,
                        id: tag.id,
                        type: tag.type,
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


        const levelDependency = notUndefined(enrich
            .map(([key, value]) => {
                const erg = {
                    kind: 'level',
                    id: key,
                    path: ''
                } as Partial<MapKeyData<LevelKeys>> & { kind: 'level', id: string, path: string };
                if (value[0]?.kind != erg.kind) {
                    return undefined;
                }
                for (const v of value) {
                    if (v.kind === erg.kind) {
                        if (v.type == 'effective') {
                            erg.Effective = v.entry;
                            erg.path = v.pathId;
                            erg.id = v.levelId;
                        } else if (v.type == 'missing') {
                            erg.Missing = v.entry;
                            erg.path = v.pathId;
                            erg.id = v.levelId;
                        } else if (v.type == 'purchased') {
                            erg.Purchased = v.entry;
                            erg.path = v.pathId;
                            erg.id = v.levelId;
                        }
                    }
                }
                return erg as MapKeyData<LevelKeys> & { kind: 'level', id: string, path: string };
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
        const tagDependency = notUndefined(enrich
            .map(([key, value]) => {
                const erg = {
                    kind: 'tag',
                    id: key,
                } as Partial<MapKeyData<TagKeys>> & { kind: 'tag', id: string };
                if (value[0]?.kind != erg.kind) {
                    return undefined;
                }
                for (const v of value) {
                    if (v.kind === erg.kind) {
                        if (v.type == 'effective') {
                            erg.Effective = v.entry;
                        }
                    }
                }
                return erg as MapKeyData<TagKeys> & { kind: 'tag', id: string };
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
        return { fertigkeitDependency, besonderheitDependency, eigenschaftDependency, talentDependency, otherDependency, tagDependency, levelDependency };
    }

    private getEquipmentKeys<id extends string>(Id: id): EquipmentKeys<id> {
        return {
            equiped: StoreManager.key(`/equipment/${Id}/equiped`).of<true | undefined>(),
        }

    }


    private getBesonterheitKeys<id extends string>(Id: id): BesonderheitKeys {
        return {
            Purchased: StoreManager.key(`/besonderheit/${Id}/purchased`).of<TypeOfKey<BesonderheitPurchasedKey<id>>>(),
            Effective: StoreManager.key(`/besonderheit/${Id}/Stufe`).of<TypeOfKey<BesonderheitEffectiveKey<id>>>(),
            Fixed: StoreManager.key(`/besonderheit/${Id}/fixed`).of<TypeOfKey<BesonderheitFixedKey<id>>>(),
            Missing: StoreManager.key(`/besonderheit/${Id}/missing`).of<TypeOfKey<BesonderheitMissingKey<id>>>(),
            MissingNextLevel: StoreManager.key(`/besonderheit/${Id}/missingNextLevel`).of<TypeOfKey<BesonderheitMissingNextLevelKey<id>>>(),
            Unbeschränkt: StoreManager.key(`/besonderheit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<BesonderheitUnbeschränktKey<id>>>(),
            Cost: StoreManager.key(`/besonderheit/${Id}/cost`).of<TypeOfKey<CostKey<'besonderheit', id>>>(),
            CostNext: StoreManager.key(`/besonderheit/${Id}/costNext`).of<TypeOfKey<CostKey<'besonderheit', id, 'costNext'>>>(),
            CostPreview: StoreManager.key(`/besonderheit/${Id}/costPreview`).of<TypeOfKey<CostKey<'besonderheit', id, 'costPreview'>>>(),
        }
    }


    private getIdFromBesonterheitkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'missingNextLevel' | 'Stufe' | 'cost' | 'costNext' | 'costPreview' } | undefined
    private getIdFromBesonterheitkeitKey<id extends string>(key: BesonderheitPurchasedKey<id> | BesonderheitFixedKey<id> | BesonderheitUnbeschränktKey<id> | BesonderheitMissingKey<id> | BesonderheitEffectiveKey<id>) {
        const reg = /\/besonderheit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'missingNextLevel' | 'Stufe' | 'cost' | 'costNext' | 'costPreview' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getFertigkeitenKeys<id extends string>(Id: id): FertigkeitKeys<id> {
        return {
            Purchased: StoreManager.key(`/fertigkeit/${Id}/purchased`).of<TypeOfKey<FertigkeitPurchasedKey<id>>>(),
            Effective: StoreManager.key(`/fertigkeit/${Id}/Stufe`).of<TypeOfKey<FertigkeitEffectiveKey<id>>>(),
            Fixed: StoreManager.key(`/fertigkeit/${Id}/fixed`).of<TypeOfKey<FertigkeitFixedKey<id>>>(),
            Missing: StoreManager.key(`/fertigkeit/${Id}/missing`).of<TypeOfKey<FertigkeitMissingKey>>(),
            MissingNextLevel: StoreManager.key(`/fertigkeit/${Id}/missingNextLevel`).of<TypeOfKey<FertigkeitMissingKey>>(),
            Unbeschränkt: StoreManager.key(`/fertigkeit/${Id}/StufeUnbeschränkt`).of<TypeOfKey<FertigkeitUnbeschränktKey<id>>>(),
            Cost: StoreManager.key(`/fertigkeit/${Id}/cost`).of<TypeOfKey<CostKey<'fertigkeit', id>>>(),
            CostNext: StoreManager.key(`/fertigkeit/${Id}/costNext`).of<TypeOfKey<CostKey<'fertigkeit', id, 'costNext'>>>(),
            CostPreview: StoreManager.key(`/fertigkeit/${Id}/costPreview`).of<TypeOfKey<CostKey<'fertigkeit', id, 'costPreview'>>>(),
        };
    }

    private getIdFromFertigkeitKey(key: Key<string, any>): { id: string, type: 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'missingNextLevel' | 'Stufe' | 'cost' | 'costNext' | 'costPreview' } | undefined
    private getIdFromFertigkeitKey<id extends string>(key: FertigkeitPurchasedKey<id> | FertigkeitFixedKey<id> | FertigkeitUnbeschränktKey<id> | FertigkeitMissingKey<id> | FertigkeitEffectiveKey<id>) {
        const reg = /\/fertigkeit\/(?<name>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const type = match?.groups?.['type'] as 'purchased' | 'fixed' | 'StufeUnbeschränkt' | 'missing' | 'missingNextLevel' | 'Stufe' | 'costNext' | 'costPreview' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { id: erg, type: type };
    }


    private getTagKeys<id extends string>(Id: id): TagKeys<id> {
        return {
            Effective: StoreManager.key(`/tag/${Id}`).of<TypeOfKey<TagEffectiveKey<id>>>(),
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
            Effective: StoreManager.key(`/talent/${Id}/effective`).of<TypeOfKey<TalentEffectiveKey<id>>>(),
            Unconditionally: StoreManager.key(`/talent/${Id}/unbeschränkt`).of<TypeOfKey<TalentUnbeschränktKey<id>>>(),
            Base: StoreManager.key(`/talent/${Id}/base`).of<TypeOfKey<TalentBaseKey<id>>>(),
            Support: StoreManager.key(`/talent/${Id}/support`).of<TypeOfKey<TalentSupportKey<id>>>(),
            Purchased: StoreManager.key(`/talent/${Id}/purchased`).of<TypeOfKey<TalentPurchasedKey<id>>>(),
            Fixed: StoreManager.key(`/talent/${Id}/fixed`).of<TypeOfKey<TalentFixedKey<id>>>(),
            Missing: StoreManager.key(`/talent/${Id}/missing`).of<TypeOfKey<TalentMissingKey>>(),
            NextLevelSupport: StoreManager.key(`/talent/${Id}/nextLevelSupport`).of<TypeOfKey<TalentNextLevelSupportKey>>(),
            NextLevelEpCost: StoreManager.key(`/talent/${Id}/nextLevelEp`).of<TypeOfKey<TalentNextLevelEpCostKey>>(),
            PreviousLevelEpCost: StoreManager.key(`/talent/${Id}/previousLevelEp`).of<TypeOfKey<TalentPreviousLevelEpCostKey>>(),
            Cost: StoreManager.key(`/talent/${Id}/cost`).of<TypeOfKey<CostKey<'talent', id>>>(),
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

    private getLevelKeys<PfadId extends string, LevelId extends string>(pfadId: PfadId, levelId: LevelId): LevelKeys<PfadId, LevelId> {
        return {
            Effective: StoreManager.key(`/pfad/${pfadId}/${levelId}/effective`).of<TypeOfKey<LevelEffectiveKey<PfadId, LevelId>>>(),
            Purchased: StoreManager.key(`/pfad/${pfadId}/${levelId}/purchased`).of<TypeOfKey<LevelPurchasedKey<PfadId, LevelId>>>(),
            Missing: StoreManager.key(`/pfad/${pfadId}/${levelId}/missing`).of<TypeOfKey<LevelMissingKey<PfadId, LevelId>>>(),
            MissingNext: StoreManager.key(`/pfad/${pfadId}/${levelId}/missingNext`).of<TypeOfKey<LevelMissingKey<PfadId, LevelId>>>(),
            Cost: StoreManager.key(`/pfad/${pfadId}/${levelId}/cost`).of<TypeOfKey<CostKey<'pfad', PfadId, 'cost', LevelId>>>(),
            CostNext: StoreManager.key(`/pfad/${pfadId}/${levelId}/costNext`).of<TypeOfKey<CostKey<'pfad', PfadId, 'costNext', LevelId>>>(),
            CostPreview: StoreManager.key(`/pfad/${pfadId}/${levelId}/costPreview`).of<TypeOfKey<CostKey<'pfad', PfadId, 'costPreview', LevelId>>>(),
        };
    }

    private getIdFromLevelKey(key: Key<string, any>): { path: string, level: string, type: 'effective' | 'purchased' | 'missing' | 'missingNext' | 'cost' | 'costNext' | 'costPreview' } | undefined
    private getIdFromLevelKey<id extends string, levelId extends string>(key: LevelEffectiveKey<id, levelId> | LevelPurchasedKey<id, levelId> | LevelMissingKey<id, levelId> | CostKey<'pfad', id, 'cost', levelId>) {
        const reg = /\/pfad\/(?<name>[^/]+)\/(?<level>[^/]+)\/(?<type>[^/]+)/
        const match = key.Key.match(reg);
        const erg = match?.groups?.['name'] as id | undefined;
        const erg2 = match?.groups?.['level'] as levelId | undefined;
        const type = match?.groups?.['type'] as 'effective' | 'purchased' | 'missing' | 'missingNext' | 'cost' | 'costNext' | 'costPreview' | undefined;
        return (erg == undefined || type == undefined)
            ? undefined
            : { path: erg, level: erg2, type: type };
    }

    private getPropertieKeys<id extends string>(prop: id): EigenschaftKeys<id> {
        return {
            Raw: StoreManager.key(`/eigenschaften/${prop}/raw`).of<TypeOfKey<EigenschaftRawKey<id>>>(),
            Effective: StoreManager.key(`/eigenschaften/${prop}/effektiv`).of<TypeOfKey<EigenschaftEffective<id>>>(),
            Type: StoreManager.key(`/eigenschaften/${prop}/type`).of<TypeOfKey<EigenschaftTypeKey<id>>>(),
            Meta: StoreManager.key(`/eigenschaften/${prop}/meta`).of<TypeOfKey<EigenschaftMetaKey<id>>>(),
            Cost: StoreManager.key(`/eigenschaften/${prop}/cost`).of<TypeOfKey<CostKey<'eigenschaft', id>>>(),
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
    constructor(stammdaten: Data, idOrPersisted: string | PersistanceData, cloneFrom?: Charakter) {
        this.stammdaten = stammdaten;


        this.id = typeof idOrPersisted == 'string' ? idOrPersisted : idOrPersisted.id;




        const gattungsIdKey = StoreManager.key('/organism/gattung/selected').of<string | undefined>();
        const artIdKey = StoreManager.key('/organism/art/selected').of<string | undefined>();
        const morphIdKey = StoreManager.key('/organism/morph/selected').of<string | undefined>();

        const gattungsInstanceKey = StoreManager.key('/organism/gattung/instance').of<GattungDefinition_lebewesen | undefined>();
        const artInstanceKey = StoreManager.key('/organism/art/instance').of<ArtDefinition_lebewesen | undefined>();
        const morphInstanceKey = StoreManager.key('/organism/morph/instance').of<MorphDefinition_lebewesen | undefined>();

        const gattungPossibleKey = StoreManager.key('/organism/gattung/possible').of<string[]>();
        const artPossibleKey = StoreManager.key('/organism/art/possible').of<string[]>();
        const morphPossibleKey = StoreManager.key('/organism/morph/possible').of<string[]>();

        const ageKey = StoreManager.key('/organism/age').of<number>();
        const nameKey = StoreManager.key('/name').of<string>();

        const dataStoreKey = StoreManager.key('/persistance').of<PersistanceData>();


        const costKey = StoreManager.key('/points/total').of<Cost>();
        const missingKey = StoreManager.key('/totalMissing').of<missingMapping[]>();

        const lebensabschnittGattungKey = StoreManager.key('/organism/gattung/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittArtKey = StoreManager.key('/organism/art/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittMorphKey = StoreManager.key('/organism/morph/lebensabschnitt').of<LebensabschnittDefinition_lebewesen | undefined>()
        const lebensabschnittKey = StoreManager.key('/organism/*/lebensabschnitt').of<{ gattung: LebensabschnittDefinition_lebewesen | undefined, art: LebensabschnittDefinition_lebewesen | undefined, morph: LebensabschnittDefinition_lebewesen | undefined }>()

        const sumCost = StoreManager.key('/**/cost').of<Record<string, Record<string, Record<string, Cost>>>>();
        const sumMissing = StoreManager.key('/**/missing').of<Record<string, Record<string, Record<string, MissingRequirements>>>>();



        if (cloneFrom) {

            const storeList: Record<string, ({ id: string, manager: StoreManager<Data> } & ({ type: 'writable', store: Writable<unknown> } | { type: 'readable' | 'writable' | 'aggregated', store: Readable<unknown> }))> = {}

            this.storeManager = cloneFrom.storeManager.clone((data) => {
                storeList[data.id] = (data);
            });


            this.ageStore = storeList[ageKey.Key].store as Writable<number>;
            this.nameStore = storeList[nameKey.Key].store as Writable<string>;


            this.gattungsIdStore = storeList[gattungsIdKey.Key].store as Writable<string>;
            this.possibleGattungStore = storeList[gattungPossibleKey.Key].store as Readable<string[]>;
            this.gattungsStore = storeList[gattungsInstanceKey.Key].store as Readable<GattungDefinition_lebewesen>;

            this.artIdStore = storeList[artIdKey.Key].store as Writable<string>;;
            this.possibleArtStore = storeList[artPossibleKey.Key].store as Readable<string[]>;
            this.artStore = storeList[artInstanceKey.Key].store as Readable<ArtDefinition_lebewesen>;

            this.morphIdStore = storeList[morphIdKey.Key].store as Writable<string>;
            this.possibleMorphStore = storeList[morphPossibleKey.Key].store as Readable<string[]>;
            this.morphStore = storeList[morphInstanceKey.Key].store as Readable<MorphDefinition_lebewesen>;

            this.persistanceStore = storeList[dataStoreKey.Key].store as Readable<PersistanceData>;

            this.lebensAbschnitteStore = storeList[lebensabschnittKey.Key].store as Readable<{
                gattung: LebensabschnittDefinition_lebewesen | undefined;
                art: LebensabschnittDefinition_lebewesen | undefined;
                morph: LebensabschnittDefinition_lebewesen | undefined;
            }>;


            this.pointStore = storeList[costKey.Key].store as Readable<Cost>;
            this.missingStore = this.storeManager.readable(missingKey);


            for (const { key, type } of [
                ...Object.keys(this.stammdaten.RüstungMap).map(key => ({ key, type: 'armor' as const })),
                ...Object.keys(this.stammdaten.fernkampfMap).map(key => ({ key, type: 'longRangeWeapon' as const })),
                ...Object.keys(this.stammdaten.nahkampfMap).map(key => ({ key, type: 'closeCombatWeapon' as const })),
            ]) {
                this.equipment[key] = {
                    equiped: storeList[this.getEquipmentKeys(key).equiped.Key].store as Writable<true | undefined>,
                    type
                }
            }

            for (const key of this.stammdaten.allEigenschaftKeys) {
                const { Raw: rawKey, Effective: effectiveKey, Type: typeKey, Meta: metaKey, Cost: costKey } = this.getPropertieKeys(key);
                this.eigenschaften[key] = {
                    effective: storeList[effectiveKey.Key].store as Readable<number>,
                    raw: storeList[rawKey.Key].store as Writable<number>,
                    type: storeList[typeKey.Key].store as Readable<EigenschaftTypes>,
                    meta: storeList[metaKey.Key].store as Readable<TypeOfKey<EigenschaftMetaKey>>,
                    cost: storeList[costKey.Key].store as Readable<TypeOfKey<CostKey<'eigenschaft'>>>,
                };
            }


            for (const besonderheit of this.stammdaten.Instance.Daten.Besonderheiten.flatMap(x => x.Besonderheit)) {
                const keys = this.getBesonterheitKeys(besonderheit.Id);
                this.besonderheiten[besonderheit.Id] = {
                    effective: storeList[keys.Effective.Key].store as Readable<number>,
                    unconditionally: storeList[keys.Unbeschränkt.Key].store as Readable<number>,
                    purchased: storeList[keys.Purchased.Key].store as Writable<number>,
                    fixed: storeList[keys.Fixed.Key].store as Readable<number>,
                    missing: storeList[keys.Missing.Key].store as Readable<TypeOfKey<BesonderheitMissingKey>>,
                    missingNextLevel: storeList[keys.MissingNextLevel.Key].store as Readable<TypeOfKey<BesonderheitMissingNextLevelKey>>,
                    cost: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'besonderheit'>>>,
                    costNext: storeList[keys.CostNext.Key].store as Readable<TypeOfKey<CostKey<'besonderheit', string, 'costNext'>>>,
                    costPreview: storeList[keys.CostPreview.Key].store as Readable<TypeOfKey<CostKey<'besonderheit', string, 'costPreview'>>>,
                };
            }


            for (const fertigkeit of this.stammdaten.Instance.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit)) {
                const keys = this.getFertigkeitenKeys(fertigkeit.Id);
                this.fertigkeiten[fertigkeit.Id] = {
                    effective: storeList[keys.Effective.Key].store as Readable<number>,
                    unconditionally: storeList[keys.Unbeschränkt.Key].store as Readable<number>,
                    purchased: storeList[keys.Purchased.Key].store as Writable<number>,
                    fixed: storeList[keys.Fixed.Key].store as Readable<number>,
                    missing: storeList[keys.Missing.Key].store as Readable<TypeOfKey<FertigkeitMissingKey>>,
                    missingNextLevel: storeList[keys.MissingNextLevel.Key].store as Readable<TypeOfKey<FertigkeitMissingNextLevelKey>>,
                    cost: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'fertigkeit'>>>,
                    costNext: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'fertigkeit', string, 'costNext'>>>,
                    costPreview: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'fertigkeit', string, 'costPreview'>>>,
                };
            }


            for (const talent of this.stammdaten.Instance.Daten.Talente.flatMap(x => x.Talent)) {
                const keys = this.getTalentKeys(talent.Id);
                this.talente[talent.Id] = {
                    effective: storeList[keys.Effective.Key].store as Readable<number>,
                    unconditionally: storeList[keys.Unconditionally.Key].store as Readable<number>,
                    base: storeList[keys.Base.Key].store as Readable<number>,
                    support: storeList[keys.Support.Key].store as Readable<number>,
                    purchased: storeList[keys.Purchased.Key].store as Writable<number>,
                    fixed: storeList[keys.Fixed.Key].store as Readable<number>,
                    missing: storeList[keys.Missing.Key].store as Readable<TypeOfKey<TalentMissingKey>>,
                    nextLevelSupport: storeList[keys.NextLevelSupport.Key].store as Readable<TypeOfKey<TalentNextLevelSupportKey>>,
                    nextLevelEpCost: storeList[keys.NextLevelEpCost.Key].store as Readable<TypeOfKey<TalentNextLevelEpCostKey>>,
                    previousLevelEpCost: storeList[keys.PreviousLevelEpCost.Key].store as Readable<TypeOfKey<TalentPreviousLevelEpCostKey>>,
                    cost: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'talent'>>>,
                };
            }

            for (const path of this.stammdaten.Instance.Daten.Pfade.flatMap(x => x.Pfad)) {
                this.pfad[path.Id] = {};
                for (const level of path.Levels.Level) {
                    const keys = this.getLevelKeys(path.Id, level.Id);
                    this.pfad[path.Id][level.Id] = {
                        effective: storeList[keys.Effective.Key].store as Readable<number>,
                        purchased: storeList[keys.Purchased.Key].store as Writable<number>,
                        missing: storeList[keys.Missing.Key].store as Readable<TypeOfKey<LevelMissingKey>>,
                        missingNext: storeList[keys.MissingNext.Key].store as Readable<TypeOfKey<LevelMissingNextKey>>,
                        cost: storeList[keys.Cost.Key].store as Readable<TypeOfKey<CostKey<'pfad'>>>,
                        costNext: storeList[keys.CostNext.Key].store as Readable<TypeOfKey<CostKey<'pfad', string, 'costNext'>>>,
                        costPreview: storeList[keys.CostNext.Key].store as Readable<TypeOfKey<CostKey<'pfad', string, 'costPreview'>>>,
                    };
                }
            }




            for (const tag of this.stammdaten.Instance.Daten.Tags.Tag) {


                const keys = this.getTagKeys(tag.Id);

                this.tag[tag.Id] = {
                    effective: storeList[keys.Effective.Key].store as Readable<number>
                };
            }



        } else {


            this.storeManager = new StoreManager(stammdaten);






            this.ageStore = this.storeManager.writable(ageKey, 1);
            this.nameStore = this.storeManager.writable(nameKey, '');

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

            this.pointStore = this.storeManager.readable(costKey);
            this.missingStore = this.storeManager.readable(missingKey);


            this.storeManager.readable(sumMissing);
            this.storeManager.derived(missingKey, sumMissing, (data, cast) => {


                function filterCost(obj: object, path: string[]): missingMapping[] {
                    return Object.entries(obj).flatMap(([key, value]) => {
                        if (key == 'missing') {
                            if (!Array.isArray(value) || value.length == 0) {
                                return [];
                            }
                            else if (path.length == 2)
                                return [{ missing: value, type: path[0], id: path[1] }] as missingMapping[];
                            else if (path.length == 3)
                                return [{ missing: value, type: 'level', id: { path: path[1], level: path[2] } }] as missingMapping[];
                            else
                                throw '';
                        } else if (typeof value == 'object') {
                            return filterCost(value, [...path, key]);
                        } else {
                            return [];
                        }
                    })
                }
                return filterCost(cast.newValue, []);
            });
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

                const start = transformToCost(data.Instance.Daten.GenerierungsDaten.Kosten, value => [value.Id, parseFloat(value.Berechnung)]);
                const costs = filterCost(cast.newValue);

                const cost = transformToCost(costs.flatMap(x => Object.entries(x)), ([v1, v2]) => [v1, v2] as const);


                // return start;
                return substractCost(start, cost);
            });




            this.persistanceStore = this.storeManager.derived(dataStoreKey, [
                nameKey,
                ageKey,
                StoreManager.key('/pfad/**/purchased').of<Record<string, Record<string, { purchased: number }>>>(),
                StoreManager.key('/besonderheit/*/purchased').of<Record<string, { purchased: number }>>(),
                StoreManager.key('/fertigkeit/*/purchased').of<Record<string, { purchased: number }>>(),
                StoreManager.key('/talent/*/purchased').of<Record<string, { purchased: number }>>(),
                StoreManager.key('/eigenschaften/*/raw').of<Record<string, { raw: number }>>(),
                gattungsIdKey,
                artIdKey,
                morphIdKey,
                StoreManager.key('/equipment/*/equiped').of<Record<string, { equiped: true | undefined }>>(),

            ], (data, [name, age, pfad, besonderheiten, fertigkeiten, talente, eigenschaften, gattung, art, morph, ausstattung]) => {
                return {
                    stammdatenId: this.stammdaten.id,
                    id: this.id,
                    name: name.newValue,
                    age: age.newValue,
                    pfad: Object.fromEntries(Object.entries(pfad.newValue).map(([key, levls]) => [key, Object.fromEntries(Object.entries(levls).filter(([, { purchased: value }]) => value > 0).map(([key, { purchased: value }]) => [key, value]))]).filter(([, subRecord]) => Object.values(subRecord).length > 0)),
                    besonderheiten: Object.fromEntries(Object.entries(besonderheiten.newValue).filter(([, { purchased: value }]) => value > 0).map(([key, { purchased: value }]) => [key, value])),
                    fertigkeiten: Object.fromEntries(Object.entries(fertigkeiten.newValue).filter(([, { purchased: value }]) => value > 0).map(([key, { purchased: value }]) => [key, value])),
                    talente: Object.fromEntries(Object.entries(talente.newValue).filter(([, { purchased: value }]) => value > 0).map(([key, { purchased: value }]) => [key, value])),
                    eigenschaften: Object.fromEntries(Object.entries(eigenschaften.newValue).filter(([, { raw: value }]) => value > 0).map(([key, { raw: value }]) => [key, value])),
                    gattung: gattung.newValue,
                    art: art.newValue,
                    morph: morph.newValue,
                    ausstattung: Object.keys(filterObjectKeys(ausstattung.newValue, x => x.equiped == true)),
                };
            })



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
                        return Object.values(this.getTalentKeys(x));
                    });

                const dependentTag = dependentData.filter(x => x.startsWith('tag-'))
                    .map(x => x.substring('tag-'.length))
                    .flatMap(x => {
                        if (types != undefined) {
                            return Object.entries(this.getTagKeys(x)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                        }
                        return Object.values(this.getTagKeys(x));
                    });
                const dependentLevel = deps.filter(x => x.Typ.startsWith('level-'))
                    .map(x => x.Typ.substring('level-'.length))
                    .map(x => ({ path: x.split('|')[0], level: x.split('|')[1] }))
                    .flatMap(x => {
                        if (types != undefined) {
                            return Object.entries(this.getLevelKeys(x.path, x.level)).filter(([key]) => types.includes(key as any)).map(([, value]) => value);
                        }
                        return Object.values(this.getLevelKeys(x.path, x.level));
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
                    ...dependentTag,
                    ...dependentLevel,
                    ...dependentAge,
                    ...dependentLebensabschnittArt,
                    ...dependentLebensabschnittGattung,
                    ...dependentLebensabschnittMorph,
                ];
                return dep;
            }


            for (const { key, type } of [
                ...Object.keys(this.stammdaten.RüstungMap).map(key => ({ key, type: 'armor' as const })),
                ...Object.keys(this.stammdaten.fernkampfMap).map(key => ({ key, type: 'longRangeWeapon' as const })),
                ...Object.keys(this.stammdaten.nahkampfMap).map(key => ({ key, type: 'closeCombatWeapon' as const })),
            ]) {
                this.equipment[key] = {
                    equiped: this.storeManager.writable(this.getEquipmentKeys(key).equiped, undefined),
                    type
                };
            }


            for (const key of this.stammdaten.allEigenschaftKeys) {

                const { Raw: rawKey, Effective: effectiveKey, Type: typeKey, Meta: metaKey, Cost: costKey } = this.getPropertieKeys(key);

                const tmpKey = StoreManager.key(`/tmp/eigenschaft/${key}`).of<{ entry: StaticheDefinition_lebewesen | ReiheDefinition_lebewesen | FormelDefintion_lebewesen | PunktDefintion_lebewesen, type: EigenschaftTypes, level: EigenschaftTypesLevel, morphId?: string, artId?: string, gattungId?: string, } | undefined>();
                // const effectiveKey = StoreManager.key(`/eigenschaft/${key}/effektiv`).of<number | undefined>();
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


                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, talentDependency, otherDependency } = this.groupDependencyData(dependent);



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

                    function getMods(obj: any, property: string): ModWert_lebewesen[] {
                        if (typeof obj !== 'object') {
                            return [];
                        }
                        return Object.entries(obj).flatMap(([key, value]: [string, any]) => {
                            if (key == 'Mods' && value['Eigenschaften'] != undefined && value['Eigenschaften']['Mod'] !== undefined && Array.isArray(value['Eigenschaften']['Mod'])) {
                                const mods = value.Eigenschaften.Mod as Partial<ModWert_lebewesen>[];
                                return mods.filter((x): x is ModWert_lebewesen => x.Eigenschaft == property && x.Mod != undefined && x.Type !== undefined)
                            }
                            return getMods(value, property);


                        });


                    }

                    const mods = [
                        ...fertigkeitDependency.flatMap(x => {
                            const instance = data.fertigkeitenMap[x.id];
                            return instance.Stufe.filter((y, i) => x.Effective.newValue > i).flatMap(y =>
                                notUndefined(y.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                            )
                        }),


                        ...besonderheitDependency.flatMap(x => {
                            const instance = data.besonderheitenMap[x.id];
                            return instance.Stufe.filter((y, i) => x.Effective.newValue > i).flatMap(y =>
                                notUndefined(y.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                            )
                        }),

                        ...getMods(otherDependency.map(x => x.newValue), key),
                        // .filter((x): x is KeyData<LebensabschittGattungKey | LebensabschittArtKey | LebensabschittMorphKey> => x.key.Key.endsWith('/lebensabschnitt'))
                        // .flatMap(x =>
                        //     notUndefined(x.newValue?.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])),

                        ...eigenschaftDependency
                            .flatMap((x) => {
                                if (x.Meta.newValue?.type == 'punkt' && x.Effective.newValue == 1) {
                                    return (x.Meta.newValue.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                                }
                                else if (x.Meta.newValue?.type == 'reihe') {
                                    return x.Meta.newValue.currentSchwelle?.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [];
                                }
                                return [];
                            }),

                        ...talentDependency.flatMap(x => {
                            const instance = data.talentMap[x.id];
                            return instance.Level.filter((y) => x.Effective.newValue >= y.Wert).flatMap(y =>
                                notUndefined(y.Mods?.Eigenschaften?.Mod.filter(z => z.Eigenschaft == key) ?? [])
                            )
                        })

                    ];



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


                        return { type: base.type, ...entry, ...Charakter.applyAge(age, entry) };
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
                        return transformToCost(meta.newValue.Kosten, x => {

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
                        return transformToCost(meta.newValue.currentSchwelle?.Kosten ?? [],
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
                    missingNextLevel: this.storeManager.readable(keys.MissingNextLevel),
                    cost: this.storeManager.readable(keys.Cost),
                    costNext: this.storeManager.readable(keys.CostNext),
                    costPreview: this.storeManager.readable(keys.CostPreview),
                };

                const dependentData = this.stammdaten.besonderheitDependencys.filter(x => x.Eigenschaft == besonderheit.Id);

                const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
                const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'));
                const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Unbeschränkt', 'Effective', "Base", 'Support']);



                this.storeManager.derived(keys.Effective, [keys.Unbeschränkt, keys.Missing], (data, [unconditionally, missing]) => {
                    return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
                });
                this.storeManager.derived(keys.Unbeschränkt, [keys.Purchased, keys.Fixed], (data, [purchased, fixed]) => {
                    return Math.min(besonderheit.Stufe.length, Math.max(purchased.newValue, fixed.newValue));

                });



                this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                    // todo get fixed besonderheiten

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency, tagDependency, levelDependency } = this.groupDependencyData(dependent);

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

                    const levelMax = Math.max(
                        ...(levelDependency.filter(x => x.Effective.newValue > 0).flatMap(x => data.levelMap[x.path][x.id].Besonderheit?.filter(y => y.Id == besonderheit.Id).map(y => y.Stufe) ?? []))
                    );


                    return Math.max(0, besonderheitMax, fertigkeitMax, eigenschaftMax, levelMax);
                });

                this.storeManager.derived(keys.Missing, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                    // todo get Missing stuff

                    const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency } = this.groupDependencyData(dependent);

                    const result = filterNull(besonderheit.Stufe
                        .filter((x, i) => i < (effective.newValue == UNINITILEZED ? 0 : effective.newValue))
                        .map((x, i) => {
                            const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                            if (missing == null) {
                                return null;
                            }
                            return {
                                wert: i + 1, missing: missing
                            };
                        }));

                    return result;
                }, { evalueateUndefined: true });

                this.storeManager.derived(keys.MissingNextLevel, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                    // todo get Missing stuff

                    const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency } = this.groupDependencyData(dependent);

                    const result = filterNull(besonderheit.Stufe
                        .filter((x, i) => i <= (effective.newValue == UNINITILEZED ? 0 : effective.newValue))
                        .map((x, i) => {
                            const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                            if (missing == null) {
                                return null;
                            }
                            return {
                                wert: i + 1, missing: missing
                            };
                        }));

                    return result;
                }, { evalueateUndefined: true });

                this.storeManager.derived(keys.CostNext, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);


                    return transformToCost(
                        besonderheit.Stufe.map((x, i) => ({ index: i, ...x }))
                            .filter(x => x.index < purchased.newValue + 1)
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




                this.storeManager.derived(keys.CostPreview, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);


                    return transformToCost(
                        besonderheit.Stufe.map((x, i) => ({ index: i, ...x }))
                            .filter(x => x.index < purchased.newValue - 1)
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




                this.storeManager.derived(keys.Cost, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);


                    return transformToCost(
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
                    missingNextLevel: this.storeManager.readable(keys.MissingNextLevel),
                    cost: this.storeManager.readable(keys.Cost),
                    costNext: this.storeManager.readable(keys.CostNext),
                    costPreview: this.storeManager.readable(keys.CostPreview),
                };

                const dependentData = this.stammdaten.fertigkeitDependencys.filter(x => x.Eigenschaft == fertigkeit.Id);

                const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
                const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'));
                const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Unbeschränkt', 'Effective', 'Support', 'Base']);



                this.storeManager.derived(keys.Effective, [keys.Unbeschränkt, keys.Missing], (data, [unconditionally, missing]) => {
                    return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
                });
                this.storeManager.derived(keys.Unbeschränkt, [keys.Purchased, keys.Fixed], (data, [purchased, fixed]) => {
                    return Math.min(fertigkeit.Stufe.length, Math.max(purchased.newValue, fixed.newValue));
                });



                this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency, tagDependency, levelDependency } = this.groupDependencyData(dependent);
                    return Math.max(0,
                        ...(levelDependency.filter(x => x.Effective.newValue > 0).flatMap(x => data.levelMap[x.path][x.id].Fertigkeit?.filter(y => y.Id == fertigkeit.Id).map(y => y.Stufe) ?? []))
                    );
                });

                this.storeManager.derived(keys.Missing, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                    // todo get Missing stuff

                    const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency } = this.groupDependencyData(dependent);

                    const result = filterNull(fertigkeit.Stufe
                        .filter((x, i) => i < (effective.newValue == UNINITILEZED ? 0 : effective.newValue))
                        .map((x, i) => {
                            const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                            if (missing == null) {
                                return null;
                            }
                            return {
                                wert: i + 1, missing: missing
                            };
                        }));

                    return result;
                }, { evalueateUndefined: true });

                this.storeManager.derived(keys.MissingNextLevel, [keys.Unbeschränkt, ...requirementsDependency], (data, [effective, ...dependent]) => {
                    // todo get Missing stuff

                    const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency } = this.groupDependencyData(dependent);

                    const result = filterNull(fertigkeit.Stufe
                        .filter((x, i) => i < (effective.newValue == UNINITILEZED ? 0 : effective.newValue + 1))
                        .map((x, i) => {
                            const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                            if (missing == null) {
                                return null;
                            }
                            return {
                                wert: i + 1, missing: missing
                            };
                        }));

                    return result;
                }, { evalueateUndefined: true });

                this.storeManager.derived(keys.Cost, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);

                    const defaultKostData = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten)[0];


                    return transformToCost(
                        fertigkeit.Stufe.map((x, i) => ({ index: i, ...x }))
                            .filter(x => x.index < purchased.newValue)
                            .filter(x => x.index >= fixed.newValue)
                            .map(y => {

                                return [defaultKostData.Id, y.Kosten] as const;
                            }), x => x);

                });
                this.storeManager.derived(keys.CostNext, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);

                    const defaultKostData = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten)[0];


                    return transformToCost(
                        fertigkeit.Stufe.map((x, i) => ({ index: i, ...x }))
                            .filter(x => x.index < purchased.newValue + 1)
                            .filter(x => x.index >= fixed.newValue)
                            .map(y => {

                                return [defaultKostData.Id, y.Kosten] as const;
                            }), x => x);

                });
                this.storeManager.derived(keys.CostPreview, [keys.Fixed, keys.Purchased, ...costDependency], (data, [fixed, purchased, ...dependencys]) => {

                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);

                    const defaultKostData = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(x => x.StandardKosten)[0];


                    return transformToCost(
                        fertigkeit.Stufe.map((x, i) => ({ index: i, ...x }))
                            .filter(x => x.index < purchased.newValue - 1)
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
                    unconditionally: this.storeManager.readable(keys.Unconditionally),
                    base: this.storeManager.readable(keys.Base),
                    support: this.storeManager.readable(keys.Support),
                    purchased: this.storeManager.writable(keys.Purchased, 0),
                    fixed: this.storeManager.readable(keys.Fixed),
                    missing: this.storeManager.readable(keys.Missing),
                    nextLevelSupport: this.storeManager.readable(keys.NextLevelSupport),
                    nextLevelEpCost: this.storeManager.readable(keys.NextLevelEpCost),
                    previousLevelEpCost: this.storeManager.readable(keys.PreviousLevelEpCost),
                    cost: this.storeManager.readable(keys.Cost),
                };

                const dependentData = this.stammdaten.talentDependencys.filter(x => x.Eigenschaft == talent.Id);

                const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'), ['Effective']);
                const supportDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'support'), ['Base', 'Missing']);
                const nextLevelDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'support'), ['Base', 'Effective', 'Purchased', 'Fixed']);
                const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Base', 'Support', 'Effective']);



                this.storeManager.derived(keys.Effective, [keys.Unconditionally, keys.Missing], (data, [unconditionally, missing]) => {
                    return Math.min(unconditionally.newValue, ...missing.newValue.map(x => x.wert - 1));
                });

                this.storeManager.derived(keys.Unconditionally, [keys.Base, keys.Support], (data, [base, support]) => {
                    return base.newValue + support.newValue;
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


                this.storeManager.derived(keys.NextLevelEpCost, [keys.Purchased, keys.Fixed, keys.Base], (data, [purchased, fixed, base]) => {

                    const ep = purchased.newValue + fixed.newValue;
                    const complexity = talent.Komplexität.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
                    const levelCots = data.talentCostTabel[complexity]

                    const { Kosten: { Wert: nextLevelCost } } = levelCots[base.newValue + 1];
                    return nextLevelCost - ep;

                });
                this.storeManager.derived(keys.PreviousLevelEpCost, [keys.Purchased, keys.Fixed, keys.Base], (data, [purchased, fixed, base]) => {

                    const ep = purchased.newValue + fixed.newValue;
                    const complexity = talent.Komplexität.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
                    const levelCots = data.talentCostTabel[complexity]

                    if (base.newValue == 0) {
                        return -purchased.newValue;
                    }
                    const { Kosten: { Wert: nextLevelCost } } = levelCots[base.newValue - 1];
                    const reduction = nextLevelCost - ep;
                    return Math.max(reduction, -purchased.newValue);

                });



                this.storeManager.derived(keys.Fixed, valueDependency, (data, dependent) => {
                    const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency, levelDependency } = this.groupDependencyData(dependent);
                    const total = (levelDependency.flatMap(x => data.levelMap[x.path][x.id].Talent?.filter(x => x.Id == talent.Id)?.map(y => y.EP * x.Effective.newValue) ?? [])).reduce((p, c) => p + c, 0);
                    return total;
                });

                this.storeManager.derived(keys.Missing, [keys.Base, keys.Support, ...requirementsDependency], (data, [base, support, ...dependent]) => {
                    const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency } = this.groupDependencyData(dependent);


                    if (base.newValue == UNINITILEZED || support.newValue == UNINITILEZED) {
                        return [];
                    }
                    const currentLevel = base.newValue + support.newValue;

                    const result = filterNull(talent.Level
                        .filter(x => x.Wert <= currentLevel)
                        .map(x => {
                            const missing = Charakter.getMissingInternal(x.Voraussetzung, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
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

                this.storeManager.derived(keys.NextLevelSupport, [keys.Base, keys.Support, ...nextLevelDependency], (data, [base, support, ...dependent]) => {
                    const { talentDependency } = this.groupDependencyData(dependent);


                    const talentLookup = toObjectKey(talentDependency, x => x.id);



                    function calculateAbleitung(a: Ableitung_talent) {
                        const x = a.Ableitung;

                        const current = talentLookup[x.Id].Base.newValue;
                        const currentEffective = talentLookup[x.Id].Effective.newValue;

                        return Math.floor(Math.min(current, currentEffective) / x.Anzahl);
                    }
                    function calculateAbleitungNext(a: Ableitung_talent, min: number) {
                        const x = a.Ableitung;
                        const s = data.talentMap[x.Id];
                        const current = talentLookup[x.Id].Base.newValue;
                        const currentEffective = talentLookup[x.Id].Effective.newValue;

                        const currentEP = talentLookup[x.Id].Fixed.newValue + talentLookup[x.Id].Purchased.newValue;

                        if (currentEffective < current) {
                            // caped
                            return [];
                        }
                        const comp = s.Komplexität.toLocaleLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;

                        const target = Math.max(min, Math.floor(current / x.Anzahl) + 1) * x.Anzahl;
                        if (target > Data.MAX_TALENT) {
                            return [];
                        }
                        const targetCostTotal = data.talentCostTabel[comp][target];
                        const targetCost = targetCostTotal.Kosten.Wert - currentEP;
                        return [
                            {
                                id: x.Id,
                                increaseEP: targetCost,
                                increaseTaB: target - current,
                            } satisfies TalentSupportIncrease
                        ];
                    }

                    function calculateMax(a: Max_talent): number[] {
                        const x = a.Max;
                        const s = (x.Ableitung?.map((y) => calculateAbleitung({ Ableitung: y })) ?? []).concat(
                            x.Max?.map((y) => calculateMax({ Max: y }).reduce((p, c) => p + c, 0)) ?? []
                        );
                        return s.sort().reverse().slice(0, Math.min(s.length, x.Anzahl));
                    }

                    function calculateMaxNext(a: Max_talent, min: number): TalentSupportIncrease[] {
                        const x = a.Max;
                        const current = calculateMax(a);
                        const currentMin = Math.max(
                            current.length < a.Max.Anzahl ? 0 : current[current.length - 1] + 1,
                            min
                        );

                        const s = (
                            x.Ableitung?.flatMap((y) => calculateAbleitungNext({ Ableitung: y }, currentMin)) ?? []
                        ).concat(x.Max?.flatMap((y) => calculateMaxNext({ Max: y }, currentMin)) ?? []);
                        return s;
                    }

                    const nextDerivedLevelCost =
                        (
                            talent.Ableitungen?.Ableitung?.flatMap((x) =>
                                calculateAbleitungNext({ Ableitung: x }, 1)
                            ) ?? []
                        )
                            .concat(talent.Ableitungen?.Max?.flatMap((x) => calculateMaxNext({ Max: x }, 1)) ?? [])
                            .sort((a, b) => a.increaseEP - b.increaseEP) ?? [];

                    return nextDerivedLevelCost;
                });





            }

            for (const path of this.stammdaten.Instance.Daten.Pfade.flatMap(x => x.Pfad)) {
                this.pfad[path.Id] = {};
                for (const level of path.Levels.Level) {
                    const keys = this.getLevelKeys(path.Id, level.Id);

                    this.pfad[path.Id][level.Id] = {
                        effective: this.storeManager.readable(keys.Effective),
                        purchased: this.storeManager.writable(keys.Purchased, 0),
                        missing: this.storeManager.readable(keys.Missing),
                        missingNext: this.storeManager.readable(keys.MissingNext),
                        cost: this.storeManager.readable(keys.Cost),
                        costNext: this.storeManager.readable(keys.CostNext),
                        costPreview: this.storeManager.readable(keys.CostPreview),
                    };

                    const dependentData = this.stammdaten.levelDependencys.filter(x => x.Eigenschaft == `${path.Id}|${level.Id}`);

                    // const valueDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'value'));
                    // const supportDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'support'), ['Base', 'Missing']);
                    const requirementsDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'requirements'), ['Base', 'Support', 'Effective']);
                    const costDependency = mapDependecyToKeys(dependentData.filter(x => x.Effecting == 'cost'), ['Effective']);





                    this.storeManager.derived(keys.Effective, [keys.Purchased, keys.Missing], (data, [purchased, missing]) => {
                        return Math.min(purchased.newValue, ...missing.newValue.map(x => x.wert - 1));
                    });



                    this.storeManager.derived(keys.Missing, [keys.Purchased, ...requirementsDependency], (data, [purchased, ...dependent]) => {
                        const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency, levelDependency } = this.groupDependencyData(dependent);

                        if (purchased.newValue == UNINITILEZED || purchased.newValue == 0) {
                            return [];
                        }
                        const Voraussetzung = data.levelMap[path.Id][level.Id].Voraussetzung;


                        const levelMap = Object.fromEntries(levelDependency.map(x => [x.id, (x.Effective.newValue as unknown === UNINITILEZED) ? 0 : x.Effective.newValue]))



                        const misc = this.levelPrerequire(Voraussetzung?.LevelVoraussetzung, levelMap, path.Id);
                        const missing = Charakter.getMissingInternal(Voraussetzung?.Zusätzlich, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                        let mis: MissingRequirements;
                        if (misc?.type == 'And') {
                            if (missing?.type == "And") {
                                misc.sub.push(...missing.sub);
                            } else if (missing != null) {
                                misc.sub.push(missing);
                            }
                            mis = misc;
                        } else if (missing?.type == 'And') {
                            if (misc != null) {
                                missing.sub.push(misc);
                            }
                            mis = missing;
                        } else if (misc == null) {
                            if (missing !== null)
                                mis = missing;
                            else {
                                return [];
                            }
                        } else if (missing == null) {
                            if (misc !== null) {
                                mis = misc;
                            } else {
                                return [];
                            }
                        }
                        else {
                            mis = { type: 'And', sub: [misc, missing] };
                        }

                        return [{ wert: 1, missing: mis }];
                    }, { evalueateUndefined: true });

                    this.storeManager.derived(keys.MissingNext, [...requirementsDependency], (data, [...dependent]) => {
                        const { besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency, levelDependency } = this.groupDependencyData(dependent);

                        // if (purchased.newValue == UNINITILEZED || purchased.newValue == 0) {
                        //     return [];
                        // }
                        const Voraussetzung = data.levelMap[path.Id][level.Id].Voraussetzung;


                        const levelMap = Object.fromEntries(levelDependency.map(x => [x.id, (x.Effective.newValue as unknown === UNINITILEZED) ? 0 : x.Effective.newValue]))



                        const misc = this.levelPrerequire(Voraussetzung?.LevelVoraussetzung, levelMap, path.Id);
                        const missing = Charakter.getMissingInternal(Voraussetzung?.Zusätzlich, besonderheitDependency, fertigkeitDependency, talentDependency, tagDependency);
                        let mis: MissingRequirements;
                        if (misc?.type == 'And') {
                            if (missing?.type == "And") {
                                misc.sub.push(...missing.sub);
                            } else if (missing != null) {
                                misc.sub.push(missing);
                            }
                            mis = misc;
                        } else if (missing?.type == 'And') {
                            if (misc != null) {
                                missing.sub.push(misc);
                            }
                            mis = missing;
                        } else if (misc == null) {
                            if (missing !== null)
                                mis = missing;
                            else {
                                return [];
                            }
                        } else if (missing == null) {
                            if (misc !== null) {
                                mis = misc;
                            } else {
                                return [];
                            }
                        }
                        else {
                            mis = { type: 'And', sub: [misc, missing] };
                        }

                        return [{ wert: 1, missing: mis }];
                    }, { evalueateUndefined: true });



                    this.storeManager.derived(keys.Cost, [keys.Purchased, ...costDependency], (data, [purchased, ...dependencys]) => {
                        const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);
                        return transformToCost(level.Kosten.map(y => {
                            let total = 0;
                            for (let index = 0; index < purchased.newValue; index++) {


                                const scope = {
                                    value: index
                                };
                                try {
                                    total += evaluateBerechnung(y.Berechnung, scope, ...besonderheitDependency, ...fertigkeitDependency, ...eigenschaftDependency, ...otherDependency) ?? 0;
                                } catch (error) {
                                    console.error(`Faild formle ${y.Berechnung} of ${y.Id}`, error);
                                }
                            }
                            return [y.Id, total] as const;
                        }), x => x);
                    });
                    this.storeManager.derived(keys.CostNext, [keys.Purchased, ...costDependency], (data, [purchased, ...dependencys]) => {
                        const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);
                        return transformToCost(level.Kosten.map(y => {
                            let total = 0;
                            for (let index = 0; index < Math.min(purchased.newValue + 1, level.WiederhoteNutzung); index++) {


                                const scope = {
                                    value: index
                                };
                                try {
                                    total += evaluateBerechnung(y.Berechnung, scope, ...besonderheitDependency, ...fertigkeitDependency, ...eigenschaftDependency, ...otherDependency) ?? 0;
                                } catch (error) {
                                    console.error(`Faild formle ${y.Berechnung} of ${y.Id}`, error);
                                }
                            }
                            return [y.Id, total] as const;
                        }), x => x);
                    });
                    this.storeManager.derived(keys.CostPreview, [keys.Purchased, ...costDependency], (data, [purchased, ...dependencys]) => {
                        const { besonderheitDependency, eigenschaftDependency, fertigkeitDependency, otherDependency } = this.groupDependencyData(dependencys);
                        return transformToCost(level.Kosten.map(y => {
                            let total = 0;
                            for (let index = 0; index < Math.max(purchased.newValue - 1, 0); index++) {


                                const scope = {
                                    value: index
                                };
                                try {
                                    total += evaluateBerechnung(y.Berechnung, scope, ...besonderheitDependency, ...fertigkeitDependency, ...eigenschaftDependency, ...otherDependency) ?? 0;
                                } catch (error) {
                                    console.error(`Faild formle ${y.Berechnung} of ${y.Id}`, error);
                                }
                            }
                            return [y.Id, total] as const;
                        }), x => x);
                    });
                }
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

            if (typeof idOrPersisted == 'object') {
                this.nameStore.set(idOrPersisted.name);
                this.ageStore.set(idOrPersisted.age);

                for (const [pfad, levelLookup] of Object.entries(idOrPersisted.pfad)) {
                    for (const [levelId, value] of Object.entries(levelLookup)) {
                        this.pfad[pfad]?.[levelId]?.purchased.set(value);
                    }
                }
                for (const [id, value] of Object.entries(idOrPersisted.besonderheiten)) {
                    this.besonderheiten[id].purchased.set(value);
                }
                for (const [id, value] of Object.entries(idOrPersisted.fertigkeiten)) {
                    this.fertigkeiten[id].purchased.set(value);
                }
                for (const [id, value] of Object.entries(idOrPersisted.talente)) {
                    this.talente[id].purchased.set(value);
                }
                for (const [id, value] of Object.entries(idOrPersisted.eigenschaften)) {
                    this.eigenschaften[id].raw.set(value);
                }
                this.gattungsIdStore.set(idOrPersisted.gattung);
                this.artIdStore.set(idOrPersisted.art);
                this.morphIdStore.set(idOrPersisted.morph);

                for (const a of idOrPersisted.ausstattung) {
                    this.equipment[a]?.equiped.set(true);
                }

            }


            this.twin = new Charakter(stammdaten, idOrPersisted, this);

        }






    }







    private levelPrerequire(root: _LevelAuswahl | undefined, levels: Record<string, number>, pfadId: string): MissingRequirements | null {
        // type missingData = ({
        //     type: 'and';
        //     level: string;
        //     minValue: number;
        // }
        //     | {
        //         type: 'or';
        //         sub: missingData[]
        //     }
        //     | {
        //         type: 'not';
        //         sub: missingData[]
        //     }
        // );

        const evalLevel = (lvl: _Level1, negate: boolean): MissingRequirements | null => {
            if ((levels[lvl.Id] >= lvl.mindestVorkommen) !== negate) {
                return null;
            } else {
                return { type: 'Level', id: lvl.Id, pfad: pfadId, Stufe: lvl.mindestVorkommen };
            }
        };

        const single = (e: _LevelAuswahl, negate: boolean): MissingRequirements | null => {
            if (e["#"] === "Not") {
                const sub = single(e.Not, !negate);
                if (sub == null) {
                    return null
                } else {
                    return { type: 'Not', sub: sub };
                }
            } else if (e["#"] === "And") {
                return evalAnd(e.And, negate);
            } else if (e["#"] === "Or") {
                return evalOr(e.Or, negate);
            } else if (e["#"] === "Level") {
                return evalLevel(e.Level, negate);
            } else {
                throw Error('Not supported')
            }

        }
        const evalAnd = (e: _LevelAuswahlen, negate: boolean): MissingRequirements | null => {
            const sub = filterNull([
                ...(e.And?.map(x => evalAnd(x, negate)) ?? []),
                ...(e.Or?.map(x => evalOr(x, negate)) ?? []),
                ...(e.Level?.map(x => evalLevel(x, negate)) ?? []),
                ...(e.Not?.map(x => ({ type: 'Not' as const, sub: single(x, !negate) as MissingRequirements })).filter((x) => x.sub != null) ?? []),
            ]);


            if (sub.length > 0) {
                return {
                    type: 'And', sub: sub
                };
            } else {
                return null;
            }

        }
        const evalOr = (e: _LevelAuswahlen, negate: boolean): MissingRequirements | null => {
            const sub = filterNull([
                ...(e.And?.flatMap(x => evalAnd(x, negate)) ?? []),
                ...(e.Or?.flatMap(x => evalOr(x, negate)) ?? []),
                ...(e.Level?.flatMap(x => evalLevel(x, negate)) ?? []),
                ...(e.Not?.map(x => ({ type: 'Not' as const, sub: single(x, !negate) as MissingRequirements })).filter((x) => x.sub != null) ?? []),

            ]);

            const max = (e.And?.length ?? 0)
                + (e.Or?.length ?? 0)
                + (e.Level?.length ?? 0)
                + (e.Not?.length ?? 0);

            if (sub.length == max) {
                return { type: 'Or', sub: sub };
            } else {
                return null;
            }


        }

        if (root === undefined) {
            return null
        }

        return single(root, false);


        // const succes = l.Voraussetzung?.LevelVoraussetzung
        //     ? single(l.Voraussetzung?.LevelVoraussetzung)
        //     : true;

        // return succes;
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
        tagDependency: (MapKeyData<TagKeys<string>> & {
            kind: 'tag';
            id: string;
        })[],
    ): MissingRequirements | null {
        if (requirements == undefined)
            return null;





        function safeGuard<T>(obj: T, def: T): T {
            if (obj == UNINITILEZED) {
                return def;
            }
            return obj;
        }
        const talentEffective: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, safeGuard(x.Effective.newValue, 0)] as const));
        const talentDerivation: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, safeGuard(x.Support.newValue, 0)] as const));
        const talentBase: Record<string, number> = Object.fromEntries(talentDependency.map(x => [x.id, safeGuard(x.Base.newValue, 0)] as const));
        const besonderheiten: Record<string, number | undefined> = Object.fromEntries(besonderheitDependency.map(x => [x.id, safeGuard(x.Unbeschränkt.newValue, 0)] as const));
        const fertigkeiten: Record<string, number | undefined> = Object.fromEntries(fertigkeitDependency.map(x => [x.id, safeGuard(x.Unbeschränkt.newValue, 0)] as const));
        const tags: Record<string, number> = Object.fromEntries(tagDependency.map(x => [x.id, safeGuard(x.Effective.newValue, 0)] as const));









        const singel = (requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit, negate: boolean): MissingRequirements | null => {
            if (requirements["#"] == 'Tag') {
                return (tags?.[requirements.Tag.Id] > 0) !== negate
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
                const { requirement: temp } = multy(requirements.And, negate);
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
                const { requirement: temp, max } = multy(requirements.Or, negate);
                if (temp === null || temp.length !== max) {
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

        const multy = (requirements: BedingungsAuswahlen_misc | BedingungsAuswahlen_besonderheit, negate: boolean) => {

            const max = (requirements.And?.length ?? 0)
                + (requirements.Or?.length ?? 0)
                + (requirements.Besonderheit?.length ?? 0)
                + (requirements.Not?.length ?? 0)
                + (requirements.Tag?.length ?? 0)
                + ((requirements as BedingungsAuswahlen_misc).Fertigkeit?.length ?? 0)
                + ((requirements as BedingungsAuswahlen_misc).Talent?.length ?? 0);


            return {
                max, requirement: [
                    ... (filterNull<MissingRequirements>(requirements.And?.map(x => singel({ "#": "And", And: x } as any, negate)) ?? [])),
                    ... (filterNull<MissingRequirements>(requirements.Or?.map(x => singel({ "#": "Or", Or: x } as any, negate)) ?? [])),
                    ... (filterNull<MissingRequirements>(requirements.Besonderheit?.map(x => singel({ "#": "Besonderheit", Besonderheit: x } as any, negate)) ?? [])),
                    ... (filterNull<MissingRequirements>(requirements.Not?.map(x => singel({ "#": "Not", Not: x } as any, !negate)) ?? [])),
                    ... (filterNull<MissingRequirements>(requirements.Tag?.map(x => singel({ "#": "Tag", Tag: x } as any, negate)) ?? [])),
                    ... (filterNull<MissingRequirements>((requirements as BedingungsAuswahlen_misc).Fertigkeit?.map(x => singel({ "#": "Fertigkeit", Fertigkeit: x } as any, negate)) ?? [])),
                    ... (filterNull<MissingRequirements>((requirements as BedingungsAuswahlen_misc).Talent?.map(x => singel({ "#": "Talent", Talent: x } as any, negate)) ?? [])),
                ]
            };
        }
        return singel(requirements, false);
    }






























    public static applyAge(age: number, reihe: _Bereich): { quantileForAge: Quantile[]; };
    public static applyAge(age: number, reihe: _Reihe): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; };
    public static applyAge(age: number, reihe: _Reihe, currentValue: number): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; currentSchwelle: Schwelle; };
    public static applyAge(age: number, reihe: _Reihe & _Bereich & Partial<_Reihe> & Partial<_Bereich>, currentValue?: number): { schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; currentSchwelle?: Schwelle; } {



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








    public getSimulation(type: 'level', callback: (char: Charakter) => void, key: string, key2: string): ReadableOriginal<Promise<CharacterChange>>;
    public getSimulation(type: 'besonderheit' | 'fertigkeit' | 'talent', callback: (char: Charakter) => void, key: string): ReadableOriginal<Promise<CharacterChange>>;
    getSimulation(type: 'besonderheit' | 'fertigkeit' | 'talent' | 'level', callback: (char: Charakter) => void, key: string, key2?: string): ReadableOriginal<Promise<CharacterChange>> {

        let promis: Promise<CharacterChange> | undefined;

        const handler = () => {

            if (promis !== undefined) {
                return promis;
            }

            return new Promise<CharacterChange>((resolve, reject) => {


                setTimeout(() => {

                    // const timetag = `simulation-go-${type}-${key}-${key2 ?? ''}`;
                    // console.time(timetag);

                    const twin = this.twin;

                    if (twin === undefined) {
                        resolve({
                            changedCost: [],
                            changedBestonderheiten: [],
                            changedFertigkeiten: [],
                            changedTalents: [],
                            changedTags: [],
                            changedLevels: [],
                            requirements: { added: [], removed: [] }
                        } satisfies CharacterChange);
                        return;
                    }
                    if (twin.storeManager.checkClone()) {
                        console.error('store maneger not reseted');
                    }

                    callback(twin);

                    const punkteKeys = distinct(Object.keys(twin.pointStore.currentValue()).concat(Object.keys(this.pointStore.currentValue())));

                    const copyCostRaw = twin.pointStore.currentValue();
                    const copyCost = copyCostRaw === UNINITILEZED ? {} : copyCostRaw;


                    const originalCostRaw = this.pointStore.currentValue();
                    const originalCost = originalCostRaw === UNINITILEZED ? {} : originalCostRaw;


                    const changedCost = punkteKeys.map(x => ({
                        key: x,
                        new: copyCost[x],
                        old: originalCost[x],
                        differece: copyCost[x] - originalCost[x]
                    })).filter(x => x.differece != 0);

                    function removeUninitilized<T>(params: T | typeof UNINITILEZED, d: T): T {
                        if (params == UNINITILEZED) {
                            return d;
                        } else {
                            return params;
                        }
                    }

                    const besonderheitenKeys = distinct(
                        Object.keys(twin.besonderheiten)
                            .concat(Object.keys(this.besonderheiten))
                    );
                    const changedBestonderheiten = besonderheitenKeys
                        .map((key) => {
                            return {
                                key: key,
                                new: removeUninitilized(twin.besonderheiten[key].effective.currentValue(), 0),
                                old: removeUninitilized(this.besonderheiten[key].effective.currentValue(), 0),
                                // newIgnored: removeUninitilized(twin.besonderheiten[key].unconditionally.currentValue(), 0),
                                // oldIgnored: removeUninitilized(this.besonderheiten[key].unconditionally.currentValue(), 0)
                            };
                        })
                        .filter((x) => x.old != x.new);

                    const fertigkeitenKeys = distinct(
                        Object.keys(twin.fertigkeiten)
                            .concat(Object.keys(this.fertigkeiten))
                    );
                    const changedFertigkeiten = fertigkeitenKeys
                        .map((key) => {
                            return {
                                key: key,
                                new: removeUninitilized(twin.fertigkeiten[key].effective.currentValue(), 0),
                                old: removeUninitilized(this.fertigkeiten[key].effective.currentValue(), 0),
                                // newIgnored: removeUninitilized(twin.fertigkeiten[key].unconditionally.currentValue(), 0),
                                // oldIgnored: removeUninitilized(this.fertigkeiten[key].unconditionally.currentValue(), 0)
                            };
                        })
                        .filter((x) => x.old != x.new);

                    const tagsKeys = distinct(
                        Object.keys(twin.tag)
                            .concat(Object.keys(this.tag))
                    );
                    const changedTags = tagsKeys
                        .map((key) => {
                            return {
                                key: key,
                                new: removeUninitilized(twin.tag[key].effective.currentValue(), 0),
                                old: removeUninitilized(this.tag[key].effective.currentValue(), 0),
                            };
                        })
                        .filter((x) => x.old != x.new);



                    const talentKeys = distinct(
                        Object.keys(twin.talente).concat(Object.keys(this.talente))
                    );
                    const changedTalents = talentKeys
                        .map((key) => {
                            return {
                                key: key,
                                new: removeUninitilized(twin.talente[key].effective.currentValue(), 0),
                                old: removeUninitilized(this.talente[key].effective.currentValue(), 0),
                                newEp: removeUninitilized(twin.talente[key].fixed.currentValue(), 0) + removeUninitilized(twin.talente[key].purchased.currentValue(), 0),
                                oldEp: removeUninitilized(this.talente[key].fixed.currentValue(), 0) + removeUninitilized(this.talente[key].purchased.currentValue(), 0)
                            };
                        })
                        .filter((x) => x.old != x.new || x.oldEp != x.newEp);






                    const levelKeys = distinct(
                        Object.entries(twin.pfad).flatMap(([path, levels]) => Object.keys(levels).map(l => ({ path: path, level: l })))
                            .concat(Object.entries(this.pfad).flatMap(([path, levels]) => Object.keys(levels).map(l => ({ path, level: l })))),
                        (v) => `${v.level}∫${v.path}`
                    );
                    const changedLevels = levelKeys
                        .map(({ path: path, level }) => {
                            return {
                                key: { path: path, level },
                                new: removeUninitilized(twin.pfad[path][level].effective.currentValue(), 0),
                                old: removeUninitilized(this.pfad[path][level].effective.currentValue(), 0),
                            };
                        })
                        .filter((x) => x.old != x.new);














                    const currentMissing =
                        [
                            ...besonderheitenKeys.flatMap(x => removeUninitilized(this.besonderheiten[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'besonderheit' as const, missingOnId: x, ...missing }))),
                            ...talentKeys.flatMap(x => removeUninitilized(this.talente[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'talent' as const, missingOnId: x, ...missing }))),
                            ...fertigkeitenKeys.flatMap(x => removeUninitilized(this.fertigkeiten[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'fertigkeit' as const, missingOnId: x, ...missing }))),
                            ...levelKeys.flatMap(({ path, level }) => removeUninitilized(this.pfad[path][level].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'level' as const, missingOnId: { path, level }, ...missing }))),

                        ].sort(compaleInternal);
                    const twinMissing =
                        [
                            ...besonderheitenKeys.flatMap(x => removeUninitilized(twin.besonderheiten[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'besonderheit' as const, missingOnId: x, ...missing }))),
                            ...talentKeys.flatMap(x => removeUninitilized(twin.talente[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'talent' as const, missingOnId: x, ...missing }))),
                            ...fertigkeitenKeys.flatMap(x => removeUninitilized(twin.fertigkeiten[x].missing.currentValue(), []).flatMap(missing => ({ missingOnType: 'fertigkeit' as const, missingOnId: x, ...missing }))),
                            ...levelKeys.flatMap(({ path, level }) => {

                                const currentValue = twin.pfad[path][level].missing.currentValue();
                                const uninitilzeud = removeUninitilized(currentValue, []);
                                const result = uninitilzeud.flatMap(missing => ({ missingOnType: 'level' as const, missingOnId: { path, level }, ...missing }));

                                return result;
                            }
                            ),

                        ].sort(compaleInternal);



                    function contains(list: typeWithMissing[], element: typeWithMissing) {
                        for (const c of list) {
                            const comp = compaleInternal(element, c);
                            if (comp == 0) {
                                return true;
                            } else if (comp < 0) {
                                // we can stop here since the lists are sorted
                                return false;
                            }
                        }
                        return false;
                    }

                    const newMissing = twinMissing.filter(x => !contains(currentMissing, x));
                    const removedMissing = currentMissing.filter(x => !contains(twinMissing, x));









                    twin.storeManager.resetClone();

                    // console.timeEnd(timetag);
                    promis = undefined;
                    resolve({
                        changedLevels,
                        changedCost: changedCost,
                        changedBestonderheiten: changedBestonderheiten,
                        changedFertigkeiten: changedFertigkeiten,
                        changedTalents: changedTalents,
                        changedTags,
                        requirements: { added: newMissing, removed: removedMissing },
                    } satisfies CharacterChange);
                }, 500);


            });


        };

        const alweysStors = [this.pointStore, this.missingStore];
        if (type == 'besonderheit') {
            if (this.besonderheiten[key] === undefined) {
                throw new Error(`Unknown besonderheit ${key}`);
            }
            const xxx = this.getBesonterheitKeys(key);
            const stores = Object.values(xxx).map(x => this.storeManager.readable(x));
            return derived([...stores, ...alweysStors], handler);
        } else if (type == 'fertigkeit') {
            if (this.fertigkeiten[key] === undefined) {
                throw new Error(`Unknown besonderheit ${key}`);
            }
            const xxx = this.getFertigkeitenKeys(key);
            const stores = Object.values(xxx).map(x => this.storeManager.readable(x));

            return derived([...stores, ...alweysStors], handler);
        } else if (type == 'talent') {
            if (this.talente[key] === undefined) {
                throw new Error(`Unknown besonderheit ${key}`);
            }
            const xxx = this.getTalentKeys(key);
            const stores = Object.values(xxx).map(x => this.storeManager.readable(x));
            return derived([...stores, ...alweysStors], handler);
        } else if (type == 'level') {
            if (this.pfad[key][key2 ?? ''] === undefined) {
                throw new Error(`Unknown besonderheit ${key}`);
            }
            const xxx = this.getLevelKeys(key, key2 ?? '');
            const stores = Object.values(xxx).map(x => this.storeManager.readable(x));
            return derived([...stores, ...alweysStors], handler);
        }


        throw 'NotImplemented';

        type typeWithMissing = {
            wert: number;
            missing: MissingRequirements;
            missingOnType: "besonderheit" | "fertigkeit" | "talent";
            missingOnId: string;
        } | {
            wert: number;
            missing: MissingRequirements;
            missingOnType: "level";
            missingOnId: {
                path: string;
                level: string;
            };
        };

        function compaleInternal(a: typeWithMissing, b: typeWithMissing) {

            const typeCompare = a.missingOnType.localeCompare(b.missingOnType);
            if (typeCompare !== 0) {
                return typeCompare;
            }

            if (typeof a.missingOnId === 'object') {
                if (typeof b.missingOnId === 'object') {
                    const pathComp = a.missingOnId.path.localeCompare(b.missingOnId.path) != 0
                        ? a.missingOnId.path.localeCompare(b.missingOnId.path)
                        : a.missingOnId.level.localeCompare(b.missingOnId.level);
                    if (pathComp !== 0) {
                        return pathComp;
                    }

                }
            } else if (typeof b.missingOnId === 'object') {
                return 1;
            } else {
                const idCompare = a.missingOnId.localeCompare(b.missingOnId);
                if (idCompare !== 0) {
                    return idCompare;
                }
            }

            if (a.wert !== b.wert) {
                return (a.wert - b.wert) < 0 ? -1 : 1;
            }


            return compareRequirement(a.missing, b.missing);
        };
    }
}






































































export type Schwelle = {
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

export type Quantile = {
    Wert: number;
    Quantil: number;
};

function evaluateBerechnung(Berechnung: string, scope?: Record<string, number>, ...deps: ({ id: string, Effective: { newValue: unknown } } | { newValue: unknown, key: Key<string, unknown> })[]) {
    if (scope == undefined) {
        scope = {};
    }

    if (Object.values(scope).some(x => typeof x == 'object')) {
        console.info('intserstins');
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
    try {

        const result = mathjs.evaluate(Berechnung, scope);
        if (isResultSet(result)) {
            const entries = (result as { entries: any; }).entries;
            return Array.isArray(entries) ? entries[entries.length - 1] : entries;
        }
        else {
            return Array.isArray(result) ? result[result.length - 1] : result;
        }
    } catch (error) {

        console.warn('scope was ', scope);

        throw error;
    }

}



export function compareRequirement(a: MissingRequirements, b: MissingRequirements): 0 | -1 | 1 {
    function typeOrder(type: 'tag' | 'Fertigkeit' | 'Besonderheit' | 'Talent' | 'Level' | 'Not' | 'And' | 'Or') {
        switch (type) {
            case 'Talent': return 1;
            case 'Fertigkeit': return 2;
            case 'Besonderheit': return 3;
            case 'tag': return 4;
            case 'Level': return 5;
            case 'Not': return 6;
            case 'And': return 7;
            case 'Or': return 8;
            default:
                return -1;
        }
    }
    if (a.type != b.type) {
        return typeOrder(a.type) < typeOrder(b.type) ? -1 : 1;
    } else {

        if ((a.type == 'Fertigkeit' || a.type == 'Besonderheit' || a.type == 'tag' || a.type == 'Talent' || a.type == 'Level')
            && (b.type == 'Fertigkeit' || b.type == 'Besonderheit' || b.type == 'tag' || b.type == 'Talent' || b.type == 'Level')) {

            if (a.type == 'Level' && b.type == 'Level' && a.pfad != b.pfad) { // we need to compare path first for level
                return a.pfad.localeCompare(b.pfad) as 1 | -1;
            }
            else if (a.id != b.id) {
                return a.id.localeCompare(b.id) as 1 | -1;
            }
            else if ((a.type == 'Fertigkeit' || a.type == 'Talent' || a.type == 'Besonderheit' || a.type == 'Level') && (b.type == 'Fertigkeit' || b.type == 'Talent' || b.type == 'Besonderheit' || b.type == 'Level') && a.Stufe != b.Stufe) {
                return a.Stufe < b.Stufe ? -1 : 1;
            }
            else if (a.type == 'Talent' && b.type == 'Talent' && a.Kind != b.Kind) {
                return a.Kind.localeCompare(b.Kind) as 1 | -1;
            }

        } else if (a.type == 'Not' && b.type == 'Not') {
            return compareRequirement(a.sub, b.sub);
        } else if (a.type == 'And' && b.type == 'And' || a.type == 'Or' && b.type == 'Or') {
            for (let i = 0; i < a.sub.length; i++) {
                const aSub = a.sub[i];
                const bSub = b.sub[i];
                if (bSub === undefined) {
                    // a is Longer
                    return 1;
                }
                const subComp = compareRequirement(aSub, bSub);
                if (subComp != 0) {
                    return subComp;
                }
            }
            if (b.sub.length > a.sub.length) {
                return -1;
            }
        }
    }
    return 0;

}