import { v4 as uuidv4 } from 'uuid';
import type { _Gattung, _Lebensabschnitt, _Morph, Art_lebewesen, _Art2, _LevelVoraussetzung, _LevelAuswahlen, _LevelAuswahl, _Level8, _Level1, AbleitungsAuswahl_talent, FertigkeitDefinition_fertigkeit, BesonderheitDefinition_besonderheit, Kosten_misc, KostenDefinition_misc, Besonderheiten_besonderheit, BedingungsAuswahl_besonderheit, BedingungsAuswahlen_besonderheit, BedingungsAuswahl_misc, BedingungsAuswahlen_misc, LebensabschnittDefinition_lebewesen, MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen } from "src/data/nota.g";
import { type Readable, get, derived, writable, type Writable } from "svelte/store";
import { derivedLazy } from "../lazyDerivied";

import type { Data } from "./Data";

export type selection = {
    l: LebensabschnittDefinition_lebewesen;
    m: MorphDefinition_lebewesen;
    a: ArtDefinition_lebewesen;
    g: GattungDefinition_lebewesen;
} | undefined;

export type Eigenschaft = 'Mut' | 'Glück' | 'Klugheit' | 'Intuition' | 'Gewandtheit' | 'Feinmotorik' | 'Sympathie' | 'Antipathie' | 'Stärke' | 'Konstitution' | 'Fokus' | 'Einfluss';

class EigenschaftenData {
    public readonly eigenschaft: Eigenschaft;

    /**
     *
     */
    constructor(e: Eigenschaft) {
        this.eigenschaft = e;
    }


    public readonly acciredStore = writable(0);
    public get accired() {
        return get(this.acciredStore);
    }
    public set accired(value) {
        this.acciredStore.set(value);
    }

}

interface EigenschaftsMap<T> {
    Mut: T;
    Glück: T;
    Klugheit: T;
    Intuition: T;
    Gewandtheit: T;
    Feinmotorik: T;
    Sympathie: T;
    Antipathie: T;
    Stärke: T;
    Konstitution: T;
    Fokus: T;
    Einfluss: T;
}
export const EIGENRSCHAFTEN = [
    'Mut',
    'Glück',
    'Klugheit',
    'Intuition',
    'Gewandtheit',
    'Feinmotorik',
    'Sympathie',
    'Antipathie',
    'Stärke',
    'Konstitution',
    'Fokus',
    'Einfluss',
] as const;
class EigenschaftenDataAccess {



    /**
     *
     */
    constructor(base: EigenschaftenData, startPropertysStore: Readable<Record<Eigenschaft, { start: number; mod: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>>) {
        this.base = base;
        this.startStore = derived(startPropertysStore, (value) => value[base.eigenschaft].start);
        this.modifiedStore = derived(startPropertysStore, (value) => value[base.eigenschaft].mod);
        this.costStore = derived(startPropertysStore, (value) => value[base.eigenschaft].cost);
        this.acciredStore = derived(this.base.acciredStore, (value) => value);
        this.increaseCostStore = derived([this.costStore, this.acciredStore], ([c, a]) =>
            a <= -1
                ? c[-1]?.map(x => ({ Id: x.Id, Wert: -x.Wert }))
                : c[a + 1]);
        this.decreaseCostStore = derived([this.costStore, this.acciredStore], ([c, a]) =>
            a >= 1
                ? c[1]?.map(x => ({ Id: x.Id, Wert: -x.Wert }))
                : c[a - 1]);
        this.currentStore = derived([this.startStore, this.modifiedStore, this.acciredStore], ([s, m, a]) => s - Object.values(m).reduce((c, p) => c + p, 0) - a)
    }

    private readonly base: EigenschaftenData;
    public readonly startStore: Readable<number>;
    public readonly currentStore: Readable<number>;
    public readonly modifiedStore: Readable<number>;
    public readonly acciredStore: Readable<number>;
    public readonly costStore: Readable<Record<number, KostenDefinition_misc[] | undefined>>;
    public readonly increaseCostStore: Readable<KostenDefinition_misc[] | undefined>;
    public readonly decreaseCostStore: Readable<KostenDefinition_misc[] | undefined>;


    public get start() {
        return get(this.startStore);
    }
    public get current() {
        return get(this.currentStore);
    }
    public get modified() {
        return get(this.modifiedStore);
    }
    public get accired() {
        return get(this.acciredStore);
    }
    public get cost() {
        return get(this.costStore);
    }

    public get increaseCost() {
        return get(this.increaseCostStore);
    }
    public get decreaseCost() {
        return get(this.decreaseCostStore);
    }
    public increase() {
        if (this.cost?.[this.accired + 1]) {
            this.base.accired++;
        }
    }
    public decrease() {
        if (this.cost?.[this.accired - 1]) {
            this.base.accired--;
        }
    }

}

class FertigkeitInfo {

    public readonly canBeBoght: Readable<boolean>
    public readonly canBeSoled: Readable<boolean>
    public readonly canBeRemoved: Readable<boolean>
    public readonly boughtLevel: Writable<number>
    public readonly actualLevel: Readable<number>
    public readonly buyCost: Readable<KostenDefinition_misc[]>
    public readonly sellCost: Readable<KostenDefinition_misc[]>
    public readonly removeCost: Readable<KostenDefinition_misc[]>

    /**
     *
     */
    constructor(costId: string, fertigkeitData: FertigkeitDefinition_fertigkeit, actualStore: Readable<Record<string, number | undefined>>, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

        this.canBeBoght = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p == undefined) || p < fertigkeitData.Stufe.length) && (f == undefined || f < fertigkeitData.Stufe.length);
        })
        this.canBeSoled = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p != undefined) && p > (f ?? 0));
        })
        this.canBeRemoved = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p != undefined) && (f ?? 0) == 0);
        })
        this.actualLevel = derived(actualStore, a => a[fertigkeitData.Id] ?? 0);

        this.boughtLevel = {
            set: (v) => {
                purchaseStore.update(old => {
                    const f = get(fixStore)[fertigkeitData.Id];
                    if (v > (f ?? 0) && v <= fertigkeitData.Stufe.length) {
                        old[fertigkeitData.Id] = v;
                    }
                    else if (v <= (f ?? 0)) {
                        old[fertigkeitData.Id] = undefined;
                    }
                    return old;
                })
            },
            update: (u) => {
                const v = u(get(this.boughtLevel))
                purchaseStore.update(old => {
                    const f = get(fixStore)[fertigkeitData.Id];
                    if (v > (f ?? 0) && v <= fertigkeitData.Stufe.length) {
                        old[fertigkeitData.Id] = v;
                    }
                    else if (v <= (f ?? 0)) {
                        old[fertigkeitData.Id] = undefined;
                    }
                    return old;
                })

            },
            ...derived([purchaseStore, fixStore], ([purchased, fixed]) => {
                const p = purchased[fertigkeitData.Id];
                const f = fixed[fertigkeitData.Id];
                return Math.max(p ?? 0, f ?? 0);
            })
        };

        this.buyCost = derived([purchaseStore, fixStore, this.canBeBoght], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[fertigkeitData.Id] ?? 0, fixed[fertigkeitData.Id] ?? 0) + 1;
            return [{
                Id: costId,
                Wert: fertigkeitData.Stufe[target - 1].Kosten
            }];
        })
        this.sellCost = derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[fertigkeitData.Id] ?? 0, fixed[fertigkeitData.Id] ?? 0);
            return [{
                Id: costId,
                Wert: fertigkeitData.Stufe[target - 1].Kosten * -1
            }];
        })
        this.removeCost = derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const array = [];
            for (let i = fixed[fertigkeitData.Id] ?? 0; i < (purchased[fertigkeitData.Id] ?? 0); i++) {
                array.push(
                    { Id: costId, Wert: -1 * fertigkeitData.Stufe[i].Kosten }
                );

            }

            return array;
        })




    }



}
class BesonderheitenInfo {

    public readonly canBeBoght: Readable<boolean>
    public readonly canBeSoled: Readable<boolean>
    public readonly canBeRemoved: Readable<boolean>
    public readonly boughtLevel: Writable<number>
    public readonly actualLevel: Readable<number>
    public readonly buyCost: Readable<KostenDefinition_misc[]>
    public readonly sellCost: Readable<KostenDefinition_misc[]>
    public readonly removeCost: Readable<KostenDefinition_misc[]>

    /**
     *
     */
    constructor(besonderheitData: BesonderheitDefinition_besonderheit, actualStore: Readable<Record<string, number | undefined>>, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

        this.canBeBoght = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            return ((p == undefined) || p < besonderheitData.Stufe.length) && (f == undefined || f < besonderheitData.Stufe.length);
        })
        this.canBeSoled = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            return ((p != undefined) && p > (f ?? 0));
        })
        this.canBeRemoved = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            return ((p != undefined) && (f ?? 0) == 0);
        })
        this.actualLevel = derived(actualStore, a => a[besonderheitData.Id] ?? 0);

        this.boughtLevel = {
            set: (v) => {
                purchaseStore.update(old => {
                    const f = get(fixStore)[besonderheitData.Id];
                    if (v > (f ?? 0) && v <= besonderheitData.Stufe.length) {
                        old[besonderheitData.Id] = v;
                    }
                    else if (v <= (f ?? 0)) {
                        old[besonderheitData.Id] = undefined;
                    }
                    return old;
                })
            },
            update: (u) => {
                const v = u(get(this.boughtLevel))
                purchaseStore.update(old => {
                    const f = get(fixStore)[besonderheitData.Id];
                    if (v > (f ?? 0) && v <= besonderheitData.Stufe.length) {
                        old[besonderheitData.Id] = v;
                    }
                    else if (v <= (f ?? 0)) {
                        old[besonderheitData.Id] = undefined;
                    }
                    return old;
                })

            },
            ...derived([purchaseStore, fixStore], ([purchased, fixed]) => {
                const p = purchased[besonderheitData.Id] ?? 0;
                const f = fixed[besonderheitData.Id] ?? 0;
                return Math.max(p ?? 0, f ?? 0);
            })
        };

        this.buyCost = derived([purchaseStore, fixStore, this.canBeBoght], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased?.[besonderheitData.Id] ?? 0, fixed?.[besonderheitData.Id] ?? 0) + 1;
            return besonderheitData.Stufe[target - 1].Kosten;
        })
        this.sellCost = derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[besonderheitData.Id] ?? 0, fixed[besonderheitData.Id] ?? 0);
            return besonderheitData.Stufe[target - 1].Kosten.map(x => ({ Id: x.Id, Wert: -1 * x.Wert }));
        })
        this.removeCost = derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const array = [];
            for (let i = fixed[besonderheitData.Id] ?? 0; i < (purchased[besonderheitData.Id] ?? 0); i++) {
                array.push(
                    besonderheitData.Stufe[i].Kosten.map(x => ({ Id: x.Id, Wert: -1 * x.Wert }))
                );

            }

            return array.flatMap(x => x);
        })





    }



}

export type MissingRequirements = { type: 'tag', id: string }
    | { type: 'Fertigkeit', id: string, Stufe: number }
    | { type: 'Besonderheit', id: string, Stufe: number }
    | { type: 'Talent', id: string, Stufe: number, Kind: 'Basis' | 'Effektiv' | 'Unterstützung' }
    | { type: 'Not', sub: MissingRequirements }
    | { type: 'And', sub: MissingRequirements[] }
    | { type: 'Or', sub: MissingRequirements[] }


export type CharakterData = {
    id: string,
    name: string,
    lebensabschnittId: string | undefined,
    eigenschaften: Record<string, number>
    besonderheiten: Record<string, number>;
    pfade: Readonly<Record<string, Record<string, Record<string, number>>>>;
    fertigkeiten: Record<string, number>;
    talentEP: Record<string, number>;
    ausrüstung: {
        nahkampf: string[],
        fernkampf: string[],
        rüstung: string[],
    };
};

export class Charakter {
    public readonly stammdaten: Data;
    private readonly id: string;

    public readonly organismusStore = writable<selection>(undefined);
    public readonly nameStore = writable<string>(undefined);
    public get name() {
        return get(this.nameStore);
    }
    public set name(name: string) {
        this.nameStore.set(name);
    }
    public readonly punkteStore: Readable<Record<string, number>>;

    private readonly closeConbatWeaponsStoreData = writable<Record<string, true | undefined>>({});
    public readonly closeConbatWeaponsStore = derived(this.closeConbatWeaponsStoreData, x => ({ ...x }));
    public get closeConbatWeapons() { return get(this.closeConbatWeaponsStore) };
    public getCloseConbatWeaponsStore(id: string): Writable<boolean> {
        const d = derived(this.closeConbatWeaponsStore, x => x[id] ?? false);

        return {
            subscribe: d.subscribe,
            set: (v) => {
                this.closeConbatWeaponsStoreData.update(o => {
                    const n = v;
                    o[id] = n ? n : undefined;
                    return o;
                })
            },
            update: (u) => {
                this.closeConbatWeaponsStoreData.update(o => {
                    const n = u(o[id] ?? false);
                    o[id] = n ? n : undefined;
                    return o;
                })
            }
        }
    };
    public getCloseConbatWeapons(id: string) {
        return get(this.getCloseConbatWeaponsStore(id));
    };
    public setCloseConbatWeapons(id: string, value:boolean) {
        return this.getCloseConbatWeaponsStore(id).set(value);
    };

    private readonly distanceWeaponsStoreData = writable<Record<string, true | undefined>>({});
    public readonly distanceWeaponsStore = derived(this.distanceWeaponsStoreData, x => ({ ...x }));
    public get distanceWeapons() { return get(this.distanceWeaponsStore) };
    public getDistanceWeaponsStore(id: string): Writable<boolean> {
        const d = derived(this.distanceWeaponsStore, x => x[id] ?? false);

        return {
            subscribe: d.subscribe,
            set: (v) => {
                this.distanceWeaponsStoreData.update(o => {
                    const n = v;
                    o[id] = n ? n : undefined;
                    return o;
                })
            },
            update: (u) => {
                this.distanceWeaponsStoreData.update(o => {
                    const n = u(o[id] ?? false);
                    o[id] = n ? n : undefined;
                    return o;
                })
            }
        }
    };
    public getDistanceWeapons(id: string) {
        return get(this.getDistanceWeaponsStore(id));
    };
    public setDistanceWeapons(id: string, value:boolean) {
        return this.getDistanceWeaponsStore(id).set(value);
    };








    private readonly armorStoreData = writable<Record<string, true | undefined>>({});
    public readonly armorStore = derived(this.armorStoreData, x => ({ ...x }));
    public get armor() { return get(this.armorStore) };
    public getArmorStore(id: string): Writable<boolean> {
        const d = derived(this.armorStore, x => x[id] ?? false);

        return {
            subscribe: d.subscribe,
            set: (v) => {
                this.armorStoreData.update(o => {
                    const n = v;
                    o[id] = n ? n : undefined;
                    return o;
                })
            },
            update: (u) => {
                this.armorStoreData.update(o => {
                    const n = u(o[id] ?? false);
                    o[id] = n ? n : undefined;
                    return o;
                })
            }
        }
    };
    public getArmor(id: string) {
        return get(this.getArmorStore(id));
    };
    public setArmor(id: string, value:boolean) {
        return this.getArmorStore(id).set(value);
    };



    public readonly startPropertysStore: Readable<Record<Eigenschaft, { start: number; mod: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>>;

    private readonly pfadLevelDataStore = writable({} as Record<string, Record<string, Record<string, number>>>);
    public readonly pfadLevelStore: Readable<Readonly<Record<string, Record<string, Record<string, number>>>>>;

    private readonly besonderheitenPurchasedDataStore = writable({} as Record<string, number | undefined>);
    private readonly besonderheitenFixDataStore: Readable<Record<string, number | undefined>>;
    public readonly besonderheitenPurchasedStore: Readable<Record<string, number | undefined>>;
    public readonly besonderheitenStore: Readable<Readonly<Record<string, number | undefined>>>;

    public get besonderheiten(): Readonly<Record<string, number | undefined>> {
        return get(this.besonderheitenStore);
    }
    public readonly besonderheitenStoreIgnoreRequirements: Readable<Readonly<Record<string, number | undefined>>>;
    public get besonderheitenIgnoreRequirements(): Readonly<Record<string, number | undefined>> {
        return get(this.besonderheitenStoreIgnoreRequirements)
    }

    private readonly fertigkeitenPurchasedDataStore = writable({} as Record<string, number | undefined>);
    private readonly fertigkeitenFixDataStore: Readable<Record<string, number | undefined>>;
    public readonly fertigkeitenPurchasedStore: Readable<Record<string, number | undefined>>;
    public readonly fertigkeitenStore: Readable<Readonly<Record<string, number | undefined>>>;
    public get fertigkeiten(): Readonly<Record<string, number | undefined>> {
        return get(this.fertigkeitenStore);
    }
    public readonly fertigkeitenStoreIgnoreRequirements: Readable<Readonly<Record<string, number | undefined>>>;
    public get fertigkeitenIgnoreRequirements(): Readonly<Record<string, number | undefined>> {
        return get(this.fertigkeitenStoreIgnoreRequirements);
    }

    private readonly talentPurchasedEPData = writable({} as Record<string, number>);
    private readonly talentFixEP: Readable<Record<string, number>>;
    public readonly talentPurchasedEP: Readable<Record<string, number | undefined>>;
    public readonly talentBaseEPStore: Readable<Record<string, number>>;
    public get talentBaseEP(): Record<string, number> {
        return get(this.talentBaseEPStore)
    }
    public readonly talentBaseStore: Readable<Record<string, number>>;
    public get talentBase(): Record<string, number> {
        return get(this.talentBaseStore);
    }
    public readonly talentDerivationStore: Readable<Record<string, number>>;
    public get talentDerivation(): Record<string, number> {
        return get(this.talentDerivationStore);
    }
    public readonly talentEffectiveStore: Readable<Record<string, number>>;
    public get talentEffective(): Record<string, number> {
        return get(this.talentEffectiveStore);
    }
    public readonly talentEffectiveIgnoreRequirementsStore: Readable<Record<string, number>>;
    public get talentEffectiveIgnoreRequirements(): Record<string, number> {
        return get(this.talentEffectiveIgnoreRequirementsStore);
    }
    public readonly talentMissingRequirement: Readable<Record<string, { Wert: number; missing: MissingRequirements; }[]>>;

    public readonly tagsStore: Readable<Record<string, true | undefined>>;
    public get tags(): Record<string, true | undefined> {
        return get(this.tagsStore);
    }

    public get DataStore(): Readable<CharakterData> {
        return derived([this.closeConbatWeaponsStore, this.distanceWeaponsStore, this.armorStore, this.pfadLevelStore, this.talentPurchasedEPData, this.organismusStore, this.fertigkeitenPurchasedStore, this.besonderheitenPurchasedStore, this.nameStore, ...EIGENRSCHAFTEN.map(key => this.eigenrschaften[key].acciredStore)], ([closeConbatWeaponsStore, distanceWeaponsStore, armorStore, pfadLevelStore, talentPurchasedEPData, organismusStore, fertigkeitenPurchasedStore, besonderheitenPurchasedStore, name, ...eigenschaften]) => {


            return {
                id: this.id,
                name: name,
                eigenschaften: Object.fromEntries(EIGENRSCHAFTEN.map((key, i) => [key, eigenschaften[i]]).filter(([_, v]) => (v as number) != 0)),
                besonderheiten: Object.fromEntries(Object.entries(besonderheitenPurchasedStore).filter((([key, value]) => (value ?? 0) > 0))) as any,
                fertigkeiten: Object.fromEntries(Object.entries(fertigkeitenPurchasedStore).filter((([key, value]) => (value ?? 0) > 0))) as any,
                lebensabschnittId: organismusStore?.l.Id,
                talentEP: Object.fromEntries(Object.entries(talentPurchasedEPData).filter(([_, value]) => (value ?? 0) > 0)),
                pfade: pfadLevelStore,
                ausrüstung: {
                    nahkampf: Object.entries(closeConbatWeaponsStore).filter(x => x[1]).map(x => x[0]).sort(),
                    fernkampf: Object.entries(distanceWeaponsStore).filter(x => x[1]).map(x => x[0]).sort(),
                    rüstung: Object.entries(armorStore).filter(x => x[1]).map(x => x[0]).sort()
                }

            };
        })

    }

    public get Data(): CharakterData {
        return get(this.DataStore);
    }



    private set Data(v: CharakterData) {

        EIGENRSCHAFTEN.forEach((key) => {
            this.eigenrschaften[key].accired = v.eigenschaften[key] ?? 0;
        });
        this.besonderheitenPurchasedDataStore.set(v.besonderheiten);
        this.fertigkeitenPurchasedDataStore.set(v.fertigkeiten);
        if (v.lebensabschnittId) {
            const x = this.stammdaten.lebensabschnittLookup[v.lebensabschnittId];
            this.organismusStore.set(x);
        } else {
            this.organismusStore.set(undefined);
        }
        this.talentPurchasedEPData.set(v.talentEP);
        this.pfadLevelDataStore.set(v.pfade);
        this.name = v.name;
        this.closeConbatWeaponsStoreData.set(Object.fromEntries(v.ausrüstung?.nahkampf?.map(x => [x, true]) ?? []))
        this.distanceWeaponsStoreData.set(Object.fromEntries(v.ausrüstung?.fernkampf?.map(x => [x, true]) ?? []))
        this.armorStoreData.set(Object.fromEntries(v.ausrüstung?.rüstung?.map(x => [x, true]) ?? []))
    }



    public getFertigkeitInfo(id: string) {
        return new FertigkeitInfo(this.stammdaten.StandardKosten, this.stammdaten.fertigkeitenMap[id], this.fertigkeitenStore, this.fertigkeitenPurchasedDataStore, this.fertigkeitenFixDataStore);
    }
    public getBesonderheitInfo(id: string) {
        return new BesonderheitenInfo(this.stammdaten.besonderheitenMap[id], this.besonderheitenStore, this.besonderheitenPurchasedDataStore, this.besonderheitenFixDataStore);
    }

    public getMissingRequirements(requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined): MissingRequirements | null {
        return this.getMissingInternal(requirements, this.talentEffective, this.talentDerivation, this.talentBase, this.besonderheiten, this.besonderheitenIgnoreRequirements, this.fertigkeiten, this.fertigkeitenIgnoreRequirements, this.tags);
    }
    private getMissingInternal(requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined, talentEffective: Record<string, number>, talentDerivation: Record<string, number>, talentBase: Record<string, number>, besonderheiten: Record<string, number | undefined>, besonderheitenIgnored: Record<string, number | undefined>, fertigkeiten: Record<string, number | undefined>, fertigkeitenIgnored: Record<string, number | undefined>, tags: Record<string, true | undefined>): MissingRequirements | null {
        if (requirements == undefined)
            return null;
        const singel = (requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit, negate: boolean): MissingRequirements | null => {
            if (requirements["#"] == 'Tag') {
                return (tags?.[requirements.Tag.Id] === true) !== negate
                    ? null
                    : { type: 'tag', id: requirements.Tag.Id }
            } else if (requirements["#"] === 'Fertigkeit') {
                return (((fertigkeiten?.[requirements.Fertigkeit.Id] ?? 0) >= requirements.Fertigkeit.Stufe) === true) !== negate && (((fertigkeitenIgnored?.[requirements.Fertigkeit.Id] ?? 0) >= requirements.Fertigkeit.Stufe) === true) !== negate
                    ? null
                    : { type: 'Fertigkeit', id: requirements.Fertigkeit.Id, Stufe: requirements.Fertigkeit.Stufe }
            } else if (requirements["#"] === 'Besonderheit') {
                return (((besonderheiten?.[requirements.Besonderheit.Id] ?? 0) >= requirements.Besonderheit.Stufe) === true) !== negate && (((besonderheitenIgnored?.[requirements.Besonderheit.Id] ?? 0) >= requirements.Besonderheit.Stufe) === true) !== negate
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
                if (temp === null) {
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
                if (temp.length === 0) {
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
        function filterNull<T>(x: (T | null)[]): T[] {
            return x.filter(y => y !== null) as T[];
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
    public getMissingRequirementsStore(requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined): Readable<MissingRequirements | null> {
        if (requirements == undefined)
            return writable(null);
        return derived([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, this.besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, this.fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore], ([talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
            return this.getMissingInternal(requirements, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags);
        });
    }

    /**
     *
     */
    constructor(data: Data, idOrOld: CharakterData | string) {
        this.stammdaten = data;


        this.startPropertysStore = derived(this.organismusStore, v => {
            return Object.fromEntries(EIGENRSCHAFTEN.map(att => {
                if (v) {

                    const mod = v.l.Mods?.Eigenschaften?.[att]?.Mod ?? 0;




                    const start = v.m.Eigenschaften?.[att].Start
                        ?? v.a.Eigenschaften?.[att].Start
                        ?? v.g.Eigenschaften?.[att].Start
                        ?? NaN;
                    if (isNaN(start)) {
                        throw Error(`Stammdaten fehlerhft Eigenschaft nicht definiert ${att} ${v.m.Id}`)
                    }

                    const definedCosts = (v.a.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0])
                        .concat((v.g.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((v.m.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        ;
                    const maxCost = Math.max(...definedCosts);
                    const minCost = Math.min(...definedCosts);

                    const cost: Record<number, KostenDefinition_misc[] | undefined> = {};
                    for (let i = minCost; i <= maxCost; i++) {
                        const c = v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten;
                        if (typeof c == 'object') {
                            cost[i] = c;
                        } else if (i == 0) {
                            cost[i] = [];
                        }
                    }

                    return [att, { start, mod, cost }] as const;
                }
                return [att, { start: 0, cost: {}, mod: 0 }] as const;
            })) as Record<Eigenschaft, { start: number; mod: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>;

        });

        this.eigenrschaften = Object.fromEntries(EIGENRSCHAFTEN.map(att => [att, new EigenschaftenData(att)] as const)) as any;
        this.eigenschaftenData = Object.fromEntries(EIGENRSCHAFTEN.map(att => [att, new EigenschaftenDataAccess(this.eigenrschaften[att], this.startPropertysStore)] as const)) as any;


        this.talentPurchasedEPData.set({} as Record<string, number>);

        this.fertigkeitenPurchasedStore = derived(this.fertigkeitenPurchasedDataStore, x => ({ ...x }));

        this.fertigkeitenFixDataStore = derived(this.pfadLevelDataStore, (levels) => {
            const costs = Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            if ((levels[gruppe][pfad][level] ?? 0) == 0)
                                return [];
                            const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Fertigkeit ?? [];
                        })));

            return costs.reduce((p, c) => {
                p[c.Id] = Math.max(p[c.Id] ?? 0, c.Stufe);
                return p;
            }, {} as Record<string, number | undefined>);
        });
        this.fertigkeitenStoreIgnoreRequirements = derived([this.fertigkeitenPurchasedStore, this.fertigkeitenFixDataStore], ([purchased, fixed]) => {
            return Object.entries(fixed).reduce((p, c) => {
                p[c[0]] = Math.max(p[c[0]] ?? 0, c[1] ?? 0);
                return p;
            }, { ...purchased });
        });



        const
            [fertigkeitenStore, fertigkeitenInit] =
                derivedLazy<[Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, true | undefined>>], Record<string, number | undefined>>
                    (([talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
                        return Object.fromEntries(Object.entries(fertigkeitenIgnored).map(y => {
                            if (y[1] == undefined) {
                                return [y[0], undefined];
                            }
                            const b = data.fertigkeitenMap[y[0]];
                            for (let i = 0; i < y[1]; i++) {
                                if (this.getMissingInternal(b.Stufe[i].Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags)) {
                                    return [y[0], i === 0 ? undefined : i];
                                }
                            }
                            return y;
                        }).filter(([_, value]) => value !== undefined));
                    }, {});
        this.fertigkeitenStore = fertigkeitenStore;

        this.fertigkeitenStore = derived([this.fertigkeitenPurchasedStore, this.fertigkeitenFixDataStore], ([purchased, fixed]) => {
            return Object.entries(fixed).reduce((p, c) => {
                p[c[0]] = Math.max(p[c[0]] ?? 0, c[1] ?? 0);
                return p;
            }, { ...purchased });
        });

        this.talentFixEP = derived(this.pfadLevelDataStore, levels => {
            const costs = Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            const count = levels[gruppe][pfad][level];
                            return Array.from({ length: count }, () => l.Talent ?? []).flatMap(x => x);
                        })));

            return costs.reduce((p, c) => {
                p[c.Id] = (p[c.Id] ?? 0) + c.EP;
                return p;
            }, {} as Record<string, number>);
        });

        this.talentPurchasedEP = derived(this.talentPurchasedEPData, (b) => ({ ...Object.fromEntries(Object.keys(data.talentMap).map(k => [k, b[k] ?? 0])) }));
        this.talentBaseEPStore = derived([this.talentPurchasedEPData, this.talentFixEP], ([b, fix]) => {
            const result = {} as Record<string, number>;
            for (const key of Object.keys(data.talentMap)) {
                const ep = (fix[key] ?? 0) + (b[key] ?? 0);

                result[key] = ep;

            }
            return result;
        });
        this.talentBaseStore = derived(this.talentBaseEPStore, (b) => {
            const result = {} as Record<string, number>;
            for (const key of Object.keys(data.talentMap)) {
                const ep = b[key] ?? 0;
                const complexity = data.talentMap[key].Komplexität.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1
                const levelCots = this.stammdaten.talentCostTabel[complexity]


                for (let i = levelCots.length - 1; i >= 0; i--) {
                    if (levelCots[i].Kosten.Wert <= ep) {
                        result[key] = i;
                        break;
                    }
                }


            }
            return result;
        });




        const
            [talentEffectiveStore, talentEffectiveInit] =
                derivedLazy<[Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, true | undefined>>], Record<string, number>>
                    (([p, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
                        p = { ...p };
                        Object.keys(data.talentMap).forEach((key) => {
                            const req = data.talentMap[key].Bedingungen?.Bedingung.filter(x => x.Wert <= p[key]) ?? [];
                            const missing = req.map(x => ({ wert: x.Wert, missing: this.getMissingInternal(x, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags) })).filter(x => x.missing !== null);

                            p[key] = Math.min(p[key] ?? 0, ...missing.map(x => x.wert - 1))
                        });
                        return p;
                    }, {});
        this.talentEffectiveStore = talentEffectiveStore;

        this.talentDerivationStore = derived([this.talentBaseStore, this.talentEffectiveStore], ([b, e]) => {
            const calc = (a: AbleitungsAuswahl_talent | undefined): number[] => {
                return a
                    ? (a.Ableitung?.map(x => Math.floor(Math.min(b[x.Id], e[x.Id] ?? 0) / x.Anzahl)) ?? [])
                        .concat(
                            (a.Max?.map(x => calc(x).sort((a, b) => b - a).slice(0, x.Anzahl).reduce((p, c) => p + c, 0)) ?? [])
                        )
                    : [];
            }

            return Object.values(data.talentMap).map(t => ({

                id: t.Id,
                value: calc(t.Ableitungen).reduce((p, c) => p + c, 0)
            })).reduce((p, c) => { p[c.id] = c.value; return p; }, {} as Record<string, number>);


        });

        this.talentEffectiveIgnoreRequirementsStore = derived([this.talentBaseStore, this.talentDerivationStore], ([b, d]) => {
            const result = { ...b };
            return Object.entries(d).reduce((p, [key, value]) => {
                if (p[key]) {
                    p[key] += value;
                } else {
                    p[key] = value;
                }
                return p;
            }, result);
        });






        const
            [talentMissingRequirement, talentMissingRequirementInit] =
                derivedLazy<[Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, true | undefined>>], Record<string, { Wert: number, missing: MissingRequirements }[]>>
                    (([v, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
                        return Object.entries(v).reduce((p, [key, value]) => {
                            const req = data.talentMap[key].Bedingungen?.Bedingung.filter(x => x.Wert <= value) ?? [];
                            const missing = req.map(x => ({ wert: x.Wert, missing: this.getMissingInternal(x, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags) })).filter(x => x.missing !== null);
                            if (missing.length > 0) {
                                p[key] = missing as any;
                            }
                            return p;
                        }, {} as Record<string, { Wert: number, missing: MissingRequirements }[]>);
                    }, {});
        this.talentMissingRequirement = talentMissingRequirement;



        this.pfadLevelStore = derived(this.pfadLevelDataStore, x => ({ ...x }));
        this.besonderheitenPurchasedStore = derived(this.besonderheitenPurchasedDataStore, x => ({ ...x }));



        this.besonderheitenFixDataStore = derived([this.pfadLevelStore, this.organismusStore], ([levels, o]) => {
            return (Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            if ((levels[gruppe][pfad][level] ?? 0) == 0)
                                return [];

                            const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Besonderheit ?? [];
                        }))))
                .concat(o?.l.Mods?.Besonderheiten?.Besonderheit ?? [])
                .reduce((p, c) => {
                    p[c.Id] = Math.max(p[c.Id] ?? 0, c.Stufe);
                    return p;
                }, {} as Record<string, number | undefined>);

        });
        this.besonderheitenStoreIgnoreRequirements =
            derived([this.besonderheitenPurchasedStore, this.besonderheitenFixDataStore], ([purchased, fixed]) => {
                return Object.entries(fixed).reduce((p, c) => {
                    p[c[0]] = Math.max(p[c[0]] ?? 0, c[1] ?? 0);
                    return p;
                }, { ...purchased });
            });
        const
            [besonderheitenStore, besonderheitenInit] =
                derivedLazy<[Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, number | undefined>>, Readable<Record<string, true | undefined>>], Record<string, number | undefined>>
                    (([talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
                        return Object.fromEntries(Object.entries(besonderheitenIgnored).map(y => {
                            if (y[1] == undefined) {
                                return [y[0], undefined];
                            }
                            const b = data.besonderheitenMap[y[0]];
                            for (let i = 0; i < y[1]; i++) {
                                if (this.getMissingInternal(b.Stufe[i].Bedingung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags)) {
                                    return [y[0], i === 0 ? undefined : i];
                                }

                            }
                            return y;
                        }).filter(([_, value]) => value !== undefined));
                    }, {});
        this.besonderheitenStore = besonderheitenStore;


        this.tagsStore =
            derived([this.besonderheitenStore, this.pfadLevelStore, this.fertigkeitenStore], ([besonderheiten, levels, fertigkeiten]) => {
                return (Object.keys(levels)
                    .flatMap(gruppe => Object.keys(levels[gruppe])
                        .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                            .flatMap(level => {
                                const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
                                    .Pfad.filter(x => x.Id == pfad)[0]
                                    .Levels.Level.filter(x => x.Id == level)[0];
                                return l.Tag?.map(x => x.Id) ?? [];
                            })))
                    .concat(Object.entries(besonderheiten).filter(x => (x[1] ?? 0) > 0)
                        .flatMap(([bid, stufe]) => {
                            return this.stammdaten.Instance.Daten.Besonderheiten.flatMap(x => x.Besonderheit).filter(x => x.Id == bid)[0]
                                .Stufe[stufe! - 1]
                                .Tags?.Tag.map(x => x.Id) ?? [];
                        })))
                    .concat(Object.entries(fertigkeiten).filter(x => (x[1] ?? 0) > 0)
                        .flatMap(([bid, stufe]) => {
                            return this.stammdaten.Instance.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit).filter(x => x.Id == bid)[0]
                                .Stufe[stufe! - 1]
                                .Tags?.Tag.map(x => x.Id) ?? [];
                        }))
                    .reduce((p, c) => { p[c] = true; return p; }, {} as Record<string, true | undefined>)
            });



        besonderheitenInit.init([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        fertigkeitenInit.init([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        talentMissingRequirementInit.init([this.talentEffectiveIgnoreRequirementsStore, this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        talentEffectiveInit.init([this.talentEffectiveIgnoreRequirementsStore, this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);





        this.punkteStore = derived([
            this.organismusStore,
            this.eigenschaftenData.Mut.acciredStore,
            this.eigenschaftenData.Glück.acciredStore,
            this.eigenschaftenData.Klugheit.acciredStore,
            this.eigenschaftenData.Intuition.acciredStore,
            this.eigenschaftenData.Gewandtheit.acciredStore,
            this.eigenschaftenData.Feinmotorik.acciredStore,
            this.eigenschaftenData.Sympathie.acciredStore,
            this.eigenschaftenData.Antipathie.acciredStore,
            this.eigenschaftenData.Stärke.acciredStore,
            this.eigenschaftenData.Konstitution.acciredStore,
            this.eigenschaftenData.Einfluss.acciredStore,
            this.eigenschaftenData.Fokus.acciredStore,

            this.eigenschaftenData.Mut.costStore,
            this.eigenschaftenData.Glück.costStore,
            this.eigenschaftenData.Klugheit.costStore,
            this.eigenschaftenData.Intuition.costStore,
            this.eigenschaftenData.Gewandtheit.costStore,
            this.eigenschaftenData.Feinmotorik.costStore,
            this.eigenschaftenData.Sympathie.costStore,
            this.eigenschaftenData.Antipathie.costStore,
            this.eigenschaftenData.Stärke.costStore,
            this.eigenschaftenData.Konstitution.costStore,
            this.eigenschaftenData.Einfluss.costStore,
            this.eigenschaftenData.Fokus.costStore,

            this.pfadLevelDataStore,

            this.talentPurchasedEP,

            this.fertigkeitenFixDataStore,
            this.fertigkeitenPurchasedStore,

            this.besonderheitenFixDataStore,
            this.besonderheitenPurchasedStore,


        ], ([
            organismus,

            acciredMut,
            acciredGlück,
            acciredKlugheit,
            acciredIntuition,
            acciredGewandtheit,
            acciredFeinmotorik,
            acciredSympathie,
            acciredAntipathie,
            acciredStärke,
            acciredKonstitution,
            acciredEinfluss,
            acciredFokus,

            eCostMut,
            eCostGlück,
            eCostKlugheit,
            eCostIntuition,
            eCostGewandtheit,
            eCostFeinmotorik,
            eCostSympathie,
            eCostAntipathie,
            eCostStärke,
            eCostKonstitution,
            eCostEinfluss,
            eCostFokus,

            pfadLevelData,

            talentEP,

            fertigkeitenFix,
            fertigkeitenPurchaseu,

            besonderheitenFix,
            besonderheitenPurchaseu,

        ]) => {

            const r: Record<string, number> = {};
            for (const s of this.stammdaten.Instance.Daten.KostenDefinitionen.KostenDefinition) {
                r[s.Id] = 0;
            }
            const earray = [
                { cost: eCostMut, accired: acciredMut },
                { cost: eCostGlück, accired: acciredGlück },
                { cost: eCostKlugheit, accired: acciredKlugheit },
                { cost: eCostIntuition, accired: acciredIntuition },
                { cost: eCostGewandtheit, accired: acciredGewandtheit },
                { cost: eCostFeinmotorik, accired: acciredFeinmotorik },
                { cost: eCostSympathie, accired: acciredSympathie },
                { cost: eCostAntipathie, accired: acciredAntipathie },
                { cost: eCostStärke, accired: acciredStärke },
                { cost: eCostKonstitution, accired: acciredKonstitution },
                { cost: eCostFokus, accired: acciredFokus },
                { cost: eCostEinfluss, accired: acciredEinfluss },
            ]
            applyCredit(this.stammdaten.Instance.Daten.GenerierungsDaten.Kosten)

            if (organismus?.l.Spielbar?.Kosten) {
                applyCost(organismus.l.Spielbar.Kosten);
            }


            earray.forEach(att => {
                for (let i = 1; i <= att.accired; i++) {
                    const ec = att.cost[i];
                    if (ec) {
                        applyCost(ec);
                    }
                }
                for (let i = -1; i >= att.accired; i--) {
                    const ec = att.cost[i];
                    if (ec) {
                        applyCost(ec);
                    }
                }
            });

            applyCost(Object.keys(pfadLevelData).flatMap(gruppe =>
                Object.keys(pfadLevelData[gruppe]).flatMap(pfad =>
                    Object.keys(pfadLevelData[gruppe][pfad]).flatMap(level => ({
                        gruppe,
                        pfad,
                        level,
                        amount: pfadLevelData[gruppe][pfad][level],
                    }))
                )
            ).map(x => ({
                level: data.Instance.Daten.Pfade
                    .filter(y => y.Id == x.gruppe)[0].Pfad
                    .filter(y => y.Id == x.pfad)[0].Levels.Level
                    .filter(y => y.Id == x.level)[0],
                amount: x.amount

            }))
                .flatMap(x => x.level.Kosten.map(y => ({ Id: y.Id, Wert: y.Wert * x.amount }))));

            applyCost([{
                Id: data.StandardKosten,
                Wert: Object.values(talentEP).reduce<number>((p, c) => p + (c ?? 0), 0)
            }]);
            applyCost([{
                Id: data.StandardKosten,
                Wert: Object.keys(fertigkeitenPurchaseu).map(key => {
                    const up = fertigkeitenPurchaseu[key] ?? 0;
                    const low = fertigkeitenFix[key] ?? 0;
                    let r = 0;

                    for (let i = low; i < up; i++) {
                        r += data.fertigkeitenMap[key].Stufe[i].Kosten
                    }
                    return r;
                }).reduce((p, c) => p + c, 0)
            }]);
            applyCost(
                Object.keys(besonderheitenPurchaseu).flatMap(key => {
                    const up = besonderheitenPurchaseu[key] ?? 0;
                    const low = besonderheitenFix[key] ?? 0;
                    const r: KostenDefinition_misc[] = [];

                    for (let i = low; i < up; i++) {
                        r.push(...data.besonderheitenMap[key].Stufe[i].Kosten)
                    }
                    return r;
                })
            );


            return r;

            ///////////
            function applyCredit(newLocal: KostenDefinition_misc[]) {
                for (const s of newLocal) {
                    r[s.Id] += s.Wert;
                }
            }
            function applyCost(newLocal: KostenDefinition_misc[]) {
                for (const s of newLocal) {
                    r[s.Id] -= s.Wert;
                }
            }

        });

        if (typeof idOrOld === 'string') {
            this.id = idOrOld;

        } else {
            this.Data = idOrOld;
            this.id = idOrOld.id;
        }

    }

    getTalentPurchasedEPStore(id: string): Writable<number> {
        const d = derived(this.talentPurchasedEP, x => x[id] ?? 0);
        return {
            ...d,
            set: (v) => {
                const x = get(this.talentPurchasedEP);
                x[id] = v;
                this.talentPurchasedEPData.set(x as any);
            },
            update: (u) => {
                const x = get(this.talentPurchasedEP);
                x[id] = u(x[id] ?? 0);
                this.talentPurchasedEPData.set(x as any);
            }
        }
    }
    getTalentBaseStore(id: string): Readable<number> {
        return derived(this.talentBaseStore, x => x[id]);
    }
    getTalentEPStore(id: string): Readable<number> {
        return derived(this.talentBaseEPStore, x => x[id]);
    }
    getTalentDerivedStore(id: string): Readable<number> {
        return derived(this.talentDerivationStore, x => x[id]);
    }
    getTalentEffectiveStore(id: string): Readable<number> {
        return derived(this.talentEffectiveStore, x => x[id]);
    }
    gettalentEffectiveIgnoreRequirements(id: string) {
        return derived(this.talentEffectiveIgnoreRequirementsStore, x => x[id]);
    }
    gettalentMissingRequirement(id: string) {
        return derived(this.talentMissingRequirement, x => x[id]);
    }

    getTalentPurchasedEP(id: string): number {
        return get(this.talentPurchasedEPData)[id] ?? 0;
    }
    setTalentPurchasedEP(id: string, value: number): void {
        const x = get(this.talentBaseEPStore);
        x[id] = value;
        this.talentPurchasedEPData.set(x);
    }


    pathChoosenTimes(gruppe: string, pfad: string, level: string, instance?: Readonly<Record<string, Record<string, Record<string, number>>>>) {
        instance ??= this.pfadLevel;
        if (instance[gruppe] == undefined) {
            return 0;
        }
        if (instance[gruppe][pfad] == undefined) {
            return 0;
        }
        if (instance[gruppe][pfad][level] == undefined) {
            return 0;
        }



        return instance[gruppe][pfad][level];
    }
    pathChoosenTimesStore(gruppe: string, pfad: string, level: string) {
        return derived(this.pfadLevelDataStore, old => {
            return this.pathChoosenTimes(gruppe, pfad, level, old);
        });
    }

    canPathUnChoosen(gruppe: string, pfad: string, level: string, instance?: Readonly<Record<string, Record<string, Record<string, number>>>>) {
        instance ??= this.pfadLevel;
        if (instance[gruppe] == undefined) {
            return false;
        }
        if (instance[gruppe][pfad] == undefined) {
            return false;
        }
        if (instance[gruppe][pfad][level] == undefined) {
            return false;
        }

        if (!Object.keys(instance[gruppe][pfad])
            .filter(x => x != level)
            .filter(x => instance![gruppe][pfad][x] > 0)
            .every(key => this.levelPrerequire(gruppe, pfad, key, { withoutLevel: level }))) {
            return false;
        }


        return instance[gruppe][pfad][level] > 0;
    }
    canPathUnChoosenStore(gruppe: string, pfad: string, level: string) {
        return derived(this.pfadLevelDataStore, old => {
            return this.canPathUnChoosen(gruppe, pfad, level, old);
        });
    }
    canPathChoosen(gruppe: string, pfad: string, level: string, instance?: Readonly<Record<string, Record<string, Record<string, number>>>>) {
        instance ??= this.pfadLevel;

        if (!this.levelPrerequire(gruppe, pfad, level)) {
            return false;
        }

        if (instance[gruppe] &&
            instance[gruppe][pfad] &&
            !Object.keys(instance[gruppe][pfad])
                .filter(x => x != level)
                .filter(x => instance![gruppe][pfad][x] > 0)
                .every(key => this.levelPrerequire(gruppe, pfad, key, { withLevel: level }))) {
            return false;
        }

        if (instance[gruppe] == undefined) {
            return true;
        }
        if (instance[gruppe][pfad] == undefined) {
            return true;
        }
        if (instance[gruppe][pfad][level] == undefined) {
            return true;
        }
        const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
            .Pfad.filter(x => x.Id == pfad)[0]
            .Levels.Level.filter(x => x.Id == level)[0]

        return instance[gruppe][pfad][level] < (l.WiederhoteNutzung ?? 1);
    }

    canPathChoosenStore(gruppe: string, pfad: string, level: string) {
        return derived(this.pfadLevelDataStore, old => {
            return this.canPathChoosen(gruppe, pfad, level, old);
        });
    }

    hasPathChoosen(gruppe: string, pfad: string, level: string, instance?: Readonly<Record<string, Record<string, Record<string, number>>>>) {
        instance ??= this.pfadLevel;
        if (instance[gruppe] == undefined) {
            return false;
        }
        if (instance[gruppe][pfad] == undefined) {
            return false;
        }
        if (instance[gruppe][pfad][level] == undefined) {
            return false;
        }

        return instance[gruppe][pfad][level] > 0;
    }

    hasPathChoosenStore(gruppe: string, pfad: string, level: string) {
        return derived(this.pfadLevelDataStore, old => {
            return this.hasPathChoosen(gruppe, pfad, level, old);
        });
    }

    addPath(gruppe: string, pfad: string, level: string) {
        this.pfadLevelDataStore.update(old => {
            if (old[gruppe] == undefined) {
                old[gruppe] = {};
            }
            if (old[gruppe][pfad] == undefined) {
                old[gruppe][pfad] = {};
            }
            if (old[gruppe][pfad][level] == undefined) {
                old[gruppe][pfad][level] = 0;
            }

            const l = this.stammdaten.Instance.Daten.Pfade.filter(x => x.Id == gruppe)[0]
                .Pfad.filter(x => x.Id == pfad)[0]
                .Levels.Level.filter(x => x.Id == level)[0]

            if (old[gruppe][pfad][level] < (l.WiederhoteNutzung ?? 1)) {
                old[gruppe][pfad][level]++;
            }
            return old;
        });
    }

    removePath(gruppe: string, pfad: string, level: string) {
        this.pfadLevelDataStore.update(old => {
            if (old[gruppe] == undefined) {
                old[gruppe] = {};
            }
            if (old[gruppe][pfad] == undefined) {
                old[gruppe][pfad] = {};
            }
            if (old[gruppe][pfad][level] == undefined) {
                old[gruppe][pfad][level] = 0;
            }

            if (old[gruppe][pfad][level] > 0) {
                old[gruppe][pfad][level]--;
            }
            if (old[gruppe][pfad][level] == 0) {
                delete old[gruppe][pfad][level];
                if (Object.keys(old[gruppe][pfad]).length == 0) {
                    delete old[gruppe][pfad];
                    if (Object.keys(old[gruppe]).length == 0) {
                        delete old[gruppe];

                    }
                }
            }
            return old;
        });

    }

    private levelPrerequire(gruppe: string, pfad: string, level: string, options?: { withoutLevel?: string } | { withLevel?: string }) {
        const { withoutLevel, withLevel } = options as any ?? {};
        const evalLevel = (lvl: _Level1): boolean => {
            if (lvl.mindestVorkommen == 1 && lvl.Id == withLevel) {
                return true;
            }
            if (this.pfadLevel[gruppe] == undefined) {
                return false;
            }
            if (this.pfadLevel[gruppe][pfad] == undefined) {
                return false;
            }
            if (this.pfadLevel[gruppe][pfad][lvl.Id] == undefined) {
                return false;
            }
            return withoutLevel == lvl.Id
                ? (this.pfadLevel[gruppe][pfad][lvl.Id] - 1) >= (lvl.mindestVorkommen ?? 1)
                : withLevel == lvl.Id
                    ? (this.pfadLevel[gruppe][pfad][lvl.Id] + 1) >= (lvl.mindestVorkommen ?? 1)
                    : this.pfadLevel[gruppe][pfad][lvl.Id] >= (lvl.mindestVorkommen ?? 1);
        };

        const single = (e: _LevelAuswahl): boolean => {
            if (e["#"] === "Not") {
                return !single(e.Not);
            } else if (e["#"] === "And") {
                return evalAnd(e.And);
            } else if (e["#"] === "Or") {
                return evalOr(e.Or);
            } else if (e["#"] === "Level") {
                return evalLevel(e.Level);
            } else {
                throw Error('Not supported')
            }

        }
        const evalAnd = (e: _LevelAuswahlen): boolean => {
            return (e.And?.every(x => evalAnd(x))
                ?? true)
                &&
                (e.Or?.every(x => evalOr(x))
                    ?? true)
                &&
                (e.Level?.every(x => evalLevel(x))
                    ?? true) &&
                (e.Not?.every(x => !single(x))
                    ?? true)
        }
        const evalOr = (e: _LevelAuswahlen): boolean => {
            return (e.And?.some(x => evalAnd(x))
                ?? true)
                &&
                (e.Or?.some(x => evalOr(x))
                    ?? true)
                &&
                (e.Level?.some(x => evalLevel(x))
                    ?? true) &&
                (e.Not?.some(x => !single(x))
                    ?? true)
        }
        const l = this.stammdaten.Instance.Daten.Pfade.filter((x) => x.Id == gruppe)[0]
            ?.Pfad.filter((x) => x.Id == pfad)[0]
            ?.Levels.Level.filter((x) => x.Id == level)[0];


        const succes = l.Bedingungen?.LevelVoraussetzung
            ? single(l.Bedingungen?.LevelVoraussetzung)
            : true;

        return succes;
    }

    public get pfadLevel(): Readonly<Record<string, Record<string, Record<string, number>>>> {
        return get(this.pfadLevelDataStore);
    };
    private get pfadLevelData(): Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, number>>>>>> {
        return get(this.pfadLevelDataStore);
    };


    private readonly eigenrschaften: Readonly<EigenschaftsMap<EigenschaftenData>>;
    public readonly eigenschaftenData: Readonly<EigenschaftsMap<EigenschaftenDataAccess>>;




















    public get organismus(): selection {
        return get(this.organismusStore);
    }

    public set organismus(v: selection) {
        this.organismusStore.set(v);
    }




    public get punkte(): Record<string, number> {

        return get(this.punkteStore);
    }






}