import { derivative, i, number, or } from "mathjs";
import type { _LevelAuswahlen, _LevelAuswahl, AbleitungsAuswahl_talent, FertigkeitDefinition_fertigkeit, BesonderheitDefinition_besonderheit, Kosten_misc, KostenDefinition_misc, Besonderheiten_besonderheit, BedingungsAuswahl_besonderheit, BedingungsAuswahlen_besonderheit, BedingungsAuswahl_misc, BedingungsAuswahlen_misc, LebensabschnittDefinition_lebewesen, MorphDefinition_lebewesen, ArtDefinition_lebewesen, GattungDefinition_lebewesen, EigenschaftsMods_lebewesen, _Level1, _Reihe, _Besonderheit, EntwicklungDefinition_lebewesen, ReiheDefinition_lebewesen, FormelDefintion_lebewesen, PunktDefintion_lebewesen } from "src/data/nota.g";
import StoreManager from "../../misc/StoreManager";
import { dataset_dev } from "svelte/internal";
import { type Readable, get, type Writable } from "svelte/store";
import { derivedLazy } from "../lazyDerivied";
import { distinct, filterNull } from "../misc";
import * as mathjs from 'mathjs'

import { Data } from "./Data";

export type selection = {
    lebensabschnitt: LebensabschnittDefinition_lebewesen[];
    morph: MorphDefinition_lebewesen;
    art: ArtDefinition_lebewesen;
    gattung: GattungDefinition_lebewesen;
} | undefined;

export type Eigenschaft = 'Mut' | 'Glück' | 'Klugheit' | 'Intuition' | 'Gewandtheit' | 'Feinmotorik' | 'Sympathie' | 'Antipathie' | 'Stärke' | 'Konstitution' | 'Fokus' | 'Einfluss';

class EigenschaftenData {
    public readonly eigenschaft: Eigenschaft;

    /**
     *
     */
    constructor(e: Eigenschaft, storeManager: StoreManager) {
        this.eigenschaft = e;
        this.acciredStore = storeManager.writable(0);
    }



    public readonly acciredStore: Writable<number>;
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
export const EIGENRSCHAFTEN_SHORT = [
    'MU',
    'GL',
    'KL',
    'IN',
    'GE',
    'PR',
    'SY',
    'AP',
    'ST',
    'KO',
    'FO',
    'EI',
] as const;
class EigenschaftenDataAccess {



    /**
     *
     */
    constructor(storemaneger: StoreManager, base: EigenschaftenData, startPropertysStore: Readable<Record<Eigenschaft, { start: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>>, mods: Readable<{ addMod: number, multiMod: number }>) {
        this.base = base;
        this.startStore = storemaneger.derived(startPropertysStore, (value) => value[base.eigenschaft].start);
        this.costStore = storemaneger.derived(startPropertysStore, (value) => value[base.eigenschaft].cost);
        this.acciredStore = storemaneger.derived(this.base.acciredStore, (value) => value);
        this.modifiedStore = storemaneger.derived([this.acciredStore, mods], ([a, { addMod, multiMod }]) => addMod + (a * multiMod - a));
        this.increaseCostStore = storemaneger.derived([this.costStore, this.acciredStore], ([c, a]) =>
            a <= -1
                ? c[-1]?.map(x => ({ Id: x.Id, Wert: -x.Wert }))
                : c[a + 1]);
        this.decreaseCostStore = storemaneger.derived([this.costStore, this.acciredStore], ([c, a]) =>
            a >= 1
                ? c[1]?.map(x => ({ Id: x.Id, Wert: -x.Wert }))
                : c[a - 1]);
        this.currentStore = storemaneger.derived([this.startStore, this.modifiedStore, this.acciredStore], ([s, m, a]) => s - Object.values(m).reduce((c, p) => c + p, 0) - a)
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
    constructor(storemanager: StoreManager, costId: string, fertigkeitData: FertigkeitDefinition_fertigkeit, actualStore: Readable<Record<string, number | undefined>>, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

        this.canBeBoght = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p == undefined) || p < fertigkeitData.Stufe.length) && (f == undefined || f < fertigkeitData.Stufe.length);
        })
        this.canBeSoled = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p != undefined) && p > (f ?? 0));
        })
        this.canBeRemoved = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[fertigkeitData.Id];
            const f = fixed[fertigkeitData.Id];
            return ((p != undefined) && (f ?? 0) == 0);
        })
        this.actualLevel = storemanager.derived(actualStore, a => a[fertigkeitData.Id] ?? 0);

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
            ...storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
                const p = purchased[fertigkeitData.Id];
                const f = fixed[fertigkeitData.Id];
                return Math.max(p ?? 0, f ?? 0);
            })
        };

        this.buyCost = storemanager.derived([purchaseStore, fixStore, this.canBeBoght], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[fertigkeitData.Id] ?? 0, fixed[fertigkeitData.Id] ?? 0) + 1;
            return [{
                Id: costId,
                Wert: fertigkeitData.Stufe[target - 1].Kosten
            }];
        })
        this.sellCost = storemanager.derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[fertigkeitData.Id] ?? 0, fixed[fertigkeitData.Id] ?? 0);
            return [{
                Id: costId,
                Wert: fertigkeitData.Stufe[target - 1].Kosten * -1
            }];
        })
        this.removeCost = storemanager.derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
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
    public readonly canBeBoghtReason: Readable<string>
    public readonly canBeSoled: Readable<boolean>
    public readonly canBeSoledReason: Readable<string>
    public readonly canBeRemoved: Readable<boolean>
    public readonly canBeRemovedReason: Readable<string>
    public readonly boughtLevel: Writable<number>
    public readonly actualLevel: Readable<number>
    public readonly buyCost: Readable<KostenDefinition_misc[]>
    public readonly sellCost: Readable<KostenDefinition_misc[]>
    public readonly removeCost: Readable<KostenDefinition_misc[]>

    /**
     *
     */
    constructor(storemanager: StoreManager, besonderheitData: BesonderheitDefinition_besonderheit, actualStore: Readable<Record<string, number | undefined>>, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

        this.canBeBoght = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            if (besonderheitData.Gebunden)
                return false;
            return ((p == undefined) || p < besonderheitData.Stufe.length) && (f == undefined || f < besonderheitData.Stufe.length);
        })
        this.canBeBoghtReason = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            if (besonderheitData.Gebunden)
                return "Kann nur indirekt Erworben werden, z.B. über einen Pafd.";
            if (f != undefined && f >= besonderheitData.Stufe.length)
                return "Wurde bereits indirekt Erworben, z.B. über einen Pafd.";
            if ((p != undefined) && p >= besonderheitData.Stufe.length)
                return "Wurde bereits Erworben.";
            return "";
        })
        this.canBeSoled = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            return ((p != undefined) && p > (f ?? 0));
        })
        this.canBeSoledReason = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            if ((p != undefined) && (f ?? 0) == 0)
                return "";
            return "Wurde indirekt Erworben, z.B. über einen Pafd.";
        })
        this.canBeRemoved = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            return ((p != undefined) && (f ?? 0) == 0);
        })
        this.canBeRemovedReason = storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id] ?? 0;
            const f = fixed[besonderheitData.Id] ?? 0;
            if ((p != undefined) && (f ?? 0) == 0)
                return "";
            return "Wurde indirekt Erworben, z.B. über einen Pafd.";
        })
        this.actualLevel = storemanager.derived(actualStore, a => a[besonderheitData.Id] ?? 0);

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
            ...storemanager.derived([purchaseStore, fixStore], ([purchased, fixed]) => {
                const p = purchased[besonderheitData.Id] ?? 0;
                const f = fixed[besonderheitData.Id] ?? 0;
                return Math.max(p ?? 0, f ?? 0);
            })
        };

        this.buyCost = storemanager.derived([purchaseStore, fixStore, this.canBeBoght], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased?.[besonderheitData.Id] ?? 0, fixed?.[besonderheitData.Id] ?? 0) + 1;
            return besonderheitData.Stufe[target - 1].Kosten;
        })
        this.sellCost = storemanager.derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[besonderheitData.Id] ?? 0, fixed[besonderheitData.Id] ?? 0);
            return besonderheitData.Stufe[target - 1].Kosten.map(x => ({ Id: x.Id, Wert: -1 * x.Wert }));
        })
        this.removeCost = storemanager.derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
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


function equalRequirement(a: MissingRequirements, b: MissingRequirements) {
    return compareRequirement(a, b) == 0
}
function compareRequirement(a: MissingRequirements, b: MissingRequirements): 0 | -1 | 1 {
    function typeOrder(type: 'tag' | 'Fertigkeit' | 'Besonderheit' | 'Talent' | 'Not' | 'And' | 'Or') {
        switch (type) {
            case 'Talent': return 1;
            case 'Fertigkeit': return 2;
            case 'Besonderheit': return 3;
            case 'tag': return 4;
            case 'Not': return 5;
            case 'And': return 6;
            case 'Or': return 7;
            default:
                return -1;
        }
    }
    if (a.type != b.type) {
        return typeOrder(a.type) < typeOrder(b.type) ? -1 : 1;
    } else {

        if ((a.type == 'Fertigkeit' || a.type == 'Besonderheit' || a.type == 'tag' || a.type == 'Talent')
            && (b.type == 'Fertigkeit' || b.type == 'Besonderheit' || b.type == 'tag' || b.type == 'Talent')) {

            if (a.id != b.id) {
                return a.id.localeCompare(b.id) as 1 | -1;
            }
            else if ((a.type == 'Fertigkeit' || a.type == 'Talent' || a.type == 'Besonderheit') && (b.type == 'Fertigkeit' || b.type == 'Talent' || b.type == 'Besonderheit') && a.Stufe != b.Stufe) {
                return a.Stufe < b.Stufe ? -1 : 1;
            }
            if (a.type == 'Talent' && b.type == 'Talent' && a.Kind != b.Kind) {
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


export type MissingRequirements = { type: 'tag', id: string }
    | { type: 'Fertigkeit', id: string, Stufe: number }
    | { type: 'Besonderheit', id: string, Stufe: number }
    | { type: 'Talent', id: string, Stufe: number, Kind: 'Basis' | 'Effektiv' | 'Unterstützung' }
    | { type: 'Not', sub: MissingRequirements }
    | { type: 'And', sub: MissingRequirements[] }
    | { type: 'Or', sub: MissingRequirements[] }


export type CharakterData = {
    id: string,
    stammdatenId: string,
    name: string,
    alter: number,
    morphId: string | undefined,
    eigenschaften: Record<string, number>;
    sekundäreEigenschaften: Record<string, number>;
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

    private readonly storeManager = new StoreManager();


    public readonly organismusStore: Readable<selection>;
    public readonly morphIdStore = this.storeManager.writable<string | undefined>(undefined);
    public readonly nameStore = this.storeManager.writable<string>("");
    public get name() {
        return get(this.nameStore);
    }
    public set name(name: string) {
        this.nameStore.set(name);
    }
    public readonly punkteStore: Readable<Record<string, number>>;

    public readonly ageStore = this.storeManager.writable<number>(0);

    public readonly glückMaxStore: Readable<number>;
    public readonly sizeStore: Readable<number>;
    public readonly weightStore: Readable<number>;

    public readonly allMissingRequirementsStore: Readable<MissingRequirements[]>;

    public readonly morphStore: Readable<MorphDefinition_lebewesen | undefined>;


    private readonly closeConbatWeaponsStoreData = this.storeManager.writable<Record<string, true | undefined>>({});
    public readonly closeConbatWeaponsStore = this.storeManager.derived(this.closeConbatWeaponsStoreData, x => ({ ...x }));
    public get closeConbatWeapons() { return get(this.closeConbatWeaponsStore) };
    public getCloseConbatWeaponsStore(id: string): Writable<boolean> {
        const d = this.storeManager.derived(this.closeConbatWeaponsStore, x => x[id] ?? false);

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

    public get allMissingRequirements() {
        return get(this.allMissingRequirementsStore);
    }

    public getCloseConbatWeapons(id: string) {
        return get(this.getCloseConbatWeaponsStore(id));
    };
    public setCloseConbatWeapons(id: string, value: boolean) {
        return this.getCloseConbatWeaponsStore(id).set(value);
    };

    private readonly distanceWeaponsStoreData = this.storeManager.writable<Record<string, true | undefined>>({});
    public readonly distanceWeaponsStore = this.storeManager.derived(this.distanceWeaponsStoreData, x => ({ ...x }));
    public get distanceWeapons() { return get(this.distanceWeaponsStore) };
    public getDistanceWeaponsStore(id: string): Writable<boolean> {
        const d = this.storeManager.derived(this.distanceWeaponsStore, x => x[id] ?? false);

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
    public setDistanceWeapons(id: string, value: boolean) {
        return this.getDistanceWeaponsStore(id).set(value);
    };








    private readonly armorStoreData = this.storeManager.writable<Record<string, true | undefined>>({});
    public readonly armorStore = this.storeManager.derived(this.armorStoreData, x => ({ ...x }));
    public get armor() { return get(this.armorStore) };
    public getArmorStore(id: string): Writable<boolean> {
        const d = this.storeManager.derived(this.armorStore, x => x[id] ?? false);

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
    public setArmor(id: string, value: boolean) {
        return this.getArmorStore(id).set(value);
    };



    public readonly startPropertysStore: Readable<Record<Eigenschaft, { start: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>>;

    public readonly defaultPathStore: Readable<ReadonlyArray<string>>;
    private readonly pfadLevelDataStore = this.storeManager.writable({} as Record<string, Record<string, Record<string, number>>>);
    public readonly pfadLevelStore: Readable<Readonly<Record<string, Record<string, Record<string, number>>>>>;

    private readonly besonderheitenPurchasedDataStore = this.storeManager.writable({} as Record<string, number | undefined>);
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

    private readonly fertigkeitenPurchasedDataStore = this.storeManager.writable({} as Record<string, number | undefined>);
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

    private readonly propertyScaleData = this.storeManager.writable({} as Record<string, number>);

    private readonly talentPurchasedEPData = this.storeManager.writable({} as Record<string, number>);
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

    // Abgeleitete Werte

    public readonly ausdauerStore: Readable<number>;
    public get ausdauer(): number {
        return get(this.ausdauerStore);
    }

    public readonly initiativeStore: Readable<number>;
    public get initiative(): number {
        return get(this.initiativeStore);
    }

    public readonly geschwindigkeitStore: Readable<number>;
    public get geschwindigkeit(): number {
        return get(this.geschwindigkeitStore);
    }

    public readonly kraftStore: Readable<number>;
    public get kraft(): number {
        return get(this.kraftStore);
    }






    public get DataStore(): Readable<CharakterData> {
        return this.storeManager.derived([this.propertyScaleData, this.ageStore, this.closeConbatWeaponsStore, this.distanceWeaponsStore, this.armorStore, this.pfadLevelStore, this.talentPurchasedEPData, this.morphIdStore, this.fertigkeitenPurchasedStore, this.besonderheitenPurchasedStore, this.nameStore, ...EIGENRSCHAFTEN.map(key => this.eigenrschaften[key].acciredStore)], ([propertyScaleData, ageStore, closeConbatWeaponsStore, distanceWeaponsStore, armorStore, pfadLevelStore, talentPurchasedEPData, morphIdStore, fertigkeitenPurchasedStore, besonderheitenPurchasedStore, name, ...eigenschaften]) => {



            return {
                id: this.id,
                stammdatenId: this.stammdaten.id,
                name: name,
                alter: ageStore,
                sekundäreEigenschaften: Object.fromEntries(Object.entries(propertyScaleData).filter((([key, value]) => {
                    if (this.morphId) {
                        const morph = this.stammdaten.morphLookup[this.morphId];
                        if (!morph.morph.Entwiklung?.Reihe?.some(x => x.id == key)) {
                            return false;
                        }
                    }
                    return (value ?? 0) > 0;
                }))) as any,
                eigenschaften: Object.fromEntries(EIGENRSCHAFTEN.map((key, i) => [key, eigenschaften[i]]).filter(([_, v]) => (v as number) != 0)),
                besonderheiten: Object.fromEntries(Object.entries(besonderheitenPurchasedStore).filter((([key, value]) => (value ?? 0) > 0))) as any,
                fertigkeiten: Object.fromEntries(Object.entries(fertigkeitenPurchasedStore).filter((([key, value]) => (value ?? 0) > 0))) as any,
                morphId: morphIdStore,
                talentEP: Object.fromEntries(Object.entries(talentPurchasedEPData).filter(([_, value]) => (value ?? 0) > 0)),
                pfade: JSON.parse(JSON.stringify(pfadLevelStore)),
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

        function filter<T extends { [key: string]: unknown }>(t: T, map: { [key: string]: unknown }): T {
            return Object.fromEntries(Object.entries(t).filter(([key]) => map[key] !== undefined)) as any;
        }

        this.besonderheitenPurchasedDataStore.set(filter(v.besonderheiten, this.stammdaten.besonderheitenMap));
        this.fertigkeitenPurchasedDataStore.set(filter(v.fertigkeiten, this.stammdaten.fernkampfMap));

        this.propertyScaleData.set(v.sekundäreEigenschaften);

        this.morphId = v.morphId;

        this.talentPurchasedEPData.set(filter(v.talentEP, this.stammdaten.talentMap));
        this.pfadLevelDataStore.set(v.pfade);

        this.name = v.name;
        this.closeConbatWeaponsStoreData.set(Object.fromEntries(v.ausrüstung?.nahkampf?.filter(x => this.stammdaten.nahkampfMap[x])?.map(x => [x, true]) ?? []))
        this.distanceWeaponsStoreData.set(Object.fromEntries(v.ausrüstung?.fernkampf?.filter(x => this.stammdaten.fernkampfMap[x])?.map(x => [x, true]) ?? []))
        this.armorStoreData.set(Object.fromEntries(v.ausrüstung?.rüstung?.filter(x => this.stammdaten.RüstungMap[x])?.map(x => [x, true]) ?? []))

        this.ageStore.set(v.alter ?? this.morph?.Lebensabschnitte.Lebensabschnitt[0].startAlter ?? 0)

    }



    public getFertigkeitInfo(id: string) {
        return new FertigkeitInfo(this.storeManager, this.stammdaten.StandardKosten, this.stammdaten.fertigkeitenMap[id], this.fertigkeitenStore, this.fertigkeitenPurchasedDataStore, this.fertigkeitenFixDataStore);
    }
    public getBesonderheitInfo(id: string) {
        return new BesonderheitenInfo(this.storeManager, this.stammdaten.besonderheitenMap[id], this.besonderheitenStore, this.besonderheitenPurchasedDataStore, this.besonderheitenFixDataStore);
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
    public getMissingRequirementsStore(requirements: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined): Readable<MissingRequirements | null> {
        if (requirements == undefined)
            return this.storeManager.writable(null);
        return this.storeManager.derived([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, this.besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, this.fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore], ([talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags]) => {
            return this.getMissingInternal(requirements, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags);
        });
    }





    /**
     *
     */
    constructor(data: Data, idOrOld: CharakterData | string) {
        this.stammdaten = data;


        this.sizeStore = this.storeManager.derived([this.propertyScaleData], ([propertyScaleData]) => {
            return propertyScaleData['größe'] ?? 0;
        });

        this.morphStore = this.storeManager.derived(this.morphIdStore, mid => {
            if (mid)
                return this.stammdaten.morphLookup[mid].morph;
            return undefined;
        });

        this.organismusStore = this.storeManager.derived([this.ageStore, this.morphIdStore], ([age, morphId]) => {
            if (morphId == undefined) {
                console.debug('no morph')
                return undefined;
            }

            const lookedup = this.stammdaten.morphLookup[morphId];
            const lebensabschnitt = Data.age2Lebensabschnitte(age, lookedup.morph, lookedup.art, lookedup.gattung);
            if (lebensabschnitt == undefined) {
                console.debug('no age')
                return undefined;
            }
            return {
                lebensabschnitt,
                ...lookedup
            };
        });

        this.defaultPathStore = this.storeManager.derived(this.organismusStore, (organismus) => {

            return (organismus?.morph.StandardPfade?.Pfad.map(x => x.Id) ?? [])
                .concat(
                    organismus?.art.StandardPfade?.Pfad.map(x => x.Id) ?? [])
            // organismus?.gattung.StandardPfade?.Pfad.map(x=>x.Id)

        });

        this.startPropertysStore = this.storeManager.derived(this.organismusStore, v => {
            return Object.fromEntries(EIGENRSCHAFTEN.map(att => {
                if (v) {





                    const start = v.morph.Eigenschaften?.[att].Start
                        ?? v.art.Eigenschaften?.[att].Start
                        ?? v.gattung.Eigenschaften?.[att].Start
                        ?? NaN;
                    if (isNaN(start)) {
                        throw Error(`Stammdaten fehlerhft Eigenschaft nicht definiert ${att} ${v.morph.Id}`)
                    }

                    const definedCosts = (v.art.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0])
                        .concat((v.gattung.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((v.morph.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        ;
                    const maxCost = Math.max(...definedCosts);
                    const minCost = Math.min(...definedCosts);

                    const cost: Record<number, KostenDefinition_misc[] | undefined> = {};
                    for (let i = minCost; i <= maxCost; i++) {
                        const c = v.morph.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.morph.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.art.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.gattung.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.morph.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.morph.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.art.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.gattung.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.stammdaten.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten;
                        if (typeof c == 'object') {
                            cost[i] = c;
                        } else if (i == 0) {
                            cost[i] = [];
                        }
                    }

                    return [att, { start, cost }] as const;
                }
                return [att, { start: 0, cost: {}, }] as const;
            })) as Record<Eigenschaft, { start: number; cost: Record<number, KostenDefinition_misc[] | undefined> }>;

        });


        this.talentPurchasedEPData.set({} as Record<string, number>);

        this.fertigkeitenPurchasedStore = this.storeManager.derived(this.fertigkeitenPurchasedDataStore, x => ({ ...x }));

        this.fertigkeitenFixDataStore = this.storeManager.derived(this.pfadLevelDataStore, (levels) => {
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
        this.fertigkeitenStoreIgnoreRequirements = this.storeManager.derived([this.fertigkeitenPurchasedStore, this.fertigkeitenFixDataStore], ([purchased, fixed]) => {
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

        this.fertigkeitenStore = this.storeManager.derived([this.fertigkeitenPurchasedStore, this.fertigkeitenFixDataStore], ([purchased, fixed]) => {
            return Object.entries(fixed).reduce((p, c) => {
                p[c[0]] = Math.max(p[c[0]] ?? 0, c[1] ?? 0);
                return p;
            }, { ...purchased });
        });

        this.talentFixEP = this.storeManager.derived(this.pfadLevelDataStore, levels => {
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

        this.talentPurchasedEP = this.storeManager.derived(this.talentPurchasedEPData, (b) => ({ ...Object.fromEntries(Object.keys(data.talentMap).map(k => [k, b[k] ?? 0])) }));
        this.talentBaseEPStore = this.storeManager.derived([this.talentPurchasedEPData, this.talentFixEP], ([b, fix]) => {
            const result = {} as Record<string, number>;
            for (const key of Object.keys(data.talentMap)) {
                const ep = (fix[key] ?? 0) + (b[key] ?? 0);

                result[key] = ep;

            }
            return result;
        });
        this.talentBaseStore = this.storeManager.derived(this.talentBaseEPStore, (b) => {
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
                            const req = data.talentMap[key].Level.filter(x => x.Wert <= p[key]) ?? [];
                            const missing = req.map(x => ({ wert: x.Wert, missing: this.getMissingInternal(x.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags) })).filter(x => x.missing !== null);

                            p[key] = Math.min(p[key] ?? 0, ...missing.map(x => x.wert - 1))
                        });
                        return p;
                    }, {});
        this.talentEffectiveStore = talentEffectiveStore;

        this.talentDerivationStore = this.storeManager.derived([this.talentBaseStore, this.talentEffectiveStore], ([b, e]) => {
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

        this.talentEffectiveIgnoreRequirementsStore = this.storeManager.derived([this.talentBaseStore, this.talentDerivationStore], ([b, d]) => {
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
                            const req = data.talentMap[key].Level.filter(x => x.Wert <= value) ?? [];
                            const missing = req.map(x => ({ wert: x.Wert, missing: this.getMissingInternal(x.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags) })).filter(x => x.missing !== null);
                            if (missing.length > 0) {
                                p[key] = missing as any;
                            }
                            return p;
                        }, {} as Record<string, { Wert: number, missing: MissingRequirements }[]>);
                    }, {});
        this.talentMissingRequirement = talentMissingRequirement;



        this.pfadLevelStore = this.storeManager.derived(this.pfadLevelDataStore, x => JSON.parse(JSON.stringify(x ?? {})));
        this.besonderheitenPurchasedStore = this.storeManager.derived(this.besonderheitenPurchasedDataStore, x => ({ ...x }));



        this.besonderheitenFixDataStore = this.storeManager.derived([this.pfadLevelStore, this.organismusStore, this.propertyScaleData, this.ageStore, this.besonderheitenPurchasedStore], ([levels, o, propertyScale, age, purchasedBesonderheiten]) => {
            const besonderheiten = (Object.keys(levels)
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
                .concat(o?.lebensabschnitt.flatMap(l => l.Mods?.Besonderheiten?.Besonderheit ?? []) ?? [])
                .concat(o?.morph.Entwiklung?.Reihe?.flatMap(reihe => {
                    if (propertyScale[reihe.id]) {
                        const { currentSchwelle } = Charakter.applyAge(age, reihe, propertyScale[reihe.id]);
                        return currentSchwelle?.Mods?.Besonderheiten?.Besonderheit ?? [];
                    }

                    return [];
                }) ?? [])
                .concat(o?.art.Mods?.Besonderheiten?.Besonderheit ?? [])
                .concat(o?.gattung.Mods?.Besonderheiten?.Besonderheit ?? [])
                .concat(o?.morph.Mods?.Besonderheiten?.Besonderheit ?? [])
                .reduce((p, c) => {
                    p[c.Id] = Math.max(p[c.Id] ?? 0, c.Stufe);
                    return p;
                }, {} as Record<string, number | undefined>);




            for (const key of Object.keys(purchasedBesonderheiten)) {
                const current = purchasedBesonderheiten[key];
                const data = this.stammdaten.besonderheitenMap[key];
                for (let i = 0; i < (current ?? 0); i++) {
                    const element = data.Stufe[i];
                    for (const toAdd of element.Mods?.Besonderheiten?.Besonderheit.filter(x => (besonderheiten[x.Id] ?? 0) < x.Stufe) ?? []) {
                        besonderheiten[toAdd.Id] = toAdd.Stufe;
                    }
                }
            }


            const newAdded: _Besonderheit[] = [];
            do {
                newAdded.length = 0;
                for (const key of Object.keys(besonderheiten)) {
                    const current = besonderheiten[key];
                    const data = this.stammdaten.besonderheitenMap[key];
                    for (let i = 0; i < (current ?? 0); i++) {
                        const element = data.Stufe[i];
                        newAdded.push(...element.Mods?.Besonderheiten?.Besonderheit.filter(x => (besonderheiten[x.Id] ?? 0) < x.Stufe) ?? []);
                    }
                }
                for (const n of newAdded) {
                    // since we already checked that only newer are present we can just assign
                    besonderheiten[n.Id] = n.Stufe;
                }
            } while (newAdded.length > 0);


            return besonderheiten;

        });
        this.besonderheitenStoreIgnoreRequirements =
            this.storeManager.derived([this.besonderheitenPurchasedStore, this.besonderheitenFixDataStore], ([purchased, fixed]) => {
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
                                if (this.getMissingInternal(b.Stufe[i].Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenIgnored, fertigkeiten, fertigkeitenIgnored, tags)) {
                                    return [y[0], i === 0 ? undefined : i];
                                }

                            }
                            return y;
                        }).filter(([_, value]) => value !== undefined));
                    }, {});
        this.besonderheitenStore = besonderheitenStore;


        this.tagsStore =
            this.storeManager.derived([this.besonderheitenStore, this.pfadLevelStore, this.organismusStore, this.fertigkeitenStore, this.propertyScaleData, this.ageStore], ([besonderheiten, levels, o, fertigkeiten, propertyScale, age]) => {
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
                                .Stufe[stufe! - 1].Mods
                                ?.Tags?.Tag.map(x => x.Id) ?? [];
                        })))
                    .concat(o?.morph.Entwiklung?.Reihe?.flatMap(reihe => {
                        if (propertyScale[reihe.id]) {
                            const { currentSchwelle } = Charakter.applyAge(age, reihe, propertyScale[reihe.id]);
                            return currentSchwelle?.Mods?.Tags?.Tag.map(x => x.Id) ?? [];
                        }

                        return [];
                    }) ?? [])

                    .concat(Object.entries(fertigkeiten).filter(x => (x[1] ?? 0) > 0)
                        .flatMap(([bid, stufe]) => {
                            return this.stammdaten.Instance.Daten.Fertigkeiten.flatMap(x => x.Fertigkeit).filter(x => x.Id == bid)[0]
                                .Stufe[stufe! - 1].Mods
                                ?.Tags?.Tag.map(x => x.Id) ?? [];
                        }))
                    .reduce((p, c) => { p[c] = true; return p; }, {} as Record<string, true | undefined>)
            });



        besonderheitenInit.init([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        fertigkeitenInit.init([this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        talentMissingRequirementInit.init([this.talentEffectiveIgnoreRequirementsStore, this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);
        talentEffectiveInit.init([this.talentEffectiveIgnoreRequirementsStore, this.talentEffectiveStore, this.talentDerivationStore, this.talentBaseStore, besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore]);




        this.eigenrschaften = Object.fromEntries(EIGENRSCHAFTEN.map(att => [att, new EigenschaftenData(att, this.storeManager,)] as const)) as any;
        this.eigenschaftenData = Object.fromEntries(EIGENRSCHAFTEN.map(att => [att, new EigenschaftenDataAccess(this.storeManager, this.eigenrschaften[att], this.startPropertysStore, this.getMod(att))] as const)) as any;

        this.ausdauerStore = this.storeManager.derived([this.eigenschaftenData.Konstitution.currentStore, this.eigenschaftenData.Stärke.currentStore, this.getMod('Ausdauer')], ([ko, st, { addMod, multiMod }]) => {
            const raw = 70 - (ko + ko + st);
            const r = raw * multiMod + addMod;
            return Math.ceil(r);
        })
        this.initiativeStore = this.storeManager.derived([this.eigenschaftenData.Mut.currentStore, this.eigenschaftenData.Intuition.currentStore, this.eigenschaftenData.Gewandtheit.currentStore, this.getMod('Initiative')], ([MU, IN, GE, { addMod, multiMod }]) => {
            const raw = 100 - (MU + IN + GE + GE);
            const r = raw * multiMod + addMod;
            return Math.ceil(r);
        })
        this.geschwindigkeitStore = this.storeManager.derived([this.getMod('Geschwindigkeit')], ([{ addMod, multiMod }]) => {
            const raw = 6;
            const r = raw * multiMod + addMod;
            return Math.ceil(r);
        })
        this.weightStore = this.storeManager.derived([this.propertyScaleData, this.getMod('Gewicht')], ([propertyScaleData, { addMod, multiMod }]) => {
            const height = (propertyScaleData['größe'] ?? 0) / 100;
            const bmi = propertyScaleData['bmi'] ?? 0;

            const kgRaw = bmi * height * height;
            const kg = kgRaw * multiMod + addMod;
            return Math.floor(kg * 10) / 10;
        });

        this.kraftStore = this.storeManager.derived([this.eigenschaftenData.Stärke.currentStore, this.weightStore, this.getMod('Kraft')], ([x, w, { addMod, multiMod }]) => {
            const f = 91 / 30 * (1 / (x * x)) + 1529 / 300 * (1 / x) + 3 / 50;
            const raw = f * w;
            const r = raw * multiMod + addMod;
            return Math.ceil(r);
        })
        this.glückMaxStore = this.storeManager.derived([this.eigenschaftenData.Glück.currentStore, this.getMod('GlücksPunkte')], ([x, { addMod, multiMod }]) => {
            const raw = 21 - x;
            const r = raw * multiMod + addMod;
            return Math.ceil(r);
        })



        this.allMissingRequirementsStore = this.storeManager.derived([this.talentEffectiveStore, this.talentEffectiveIgnoreRequirementsStore, this.talentDerivationStore, this.talentBaseStore, this.besonderheitenStore, this.besonderheitenStoreIgnoreRequirements, this.fertigkeitenStore, this.fertigkeitenStoreIgnoreRequirements, this.tagsStore, this.pfadLevelStore], ([talentEffective, talentAll, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags, pfade]) => {

            return filterNull<MissingRequirements>(Object.entries(talentAll)
                .filter(([key, value]) => value > 0)
                .flatMap(([key, value]) => this.stammdaten.talentMap[key].Level
                    .filter(x => x.Wert <= value)
                    .flatMap(x => this.getMissingInternal(x.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags))
                ).concat(
                    Object.entries(fertigkeitenIgnored)
                        .filter(([key, value]) => (value ?? 0) > 0)
                        .flatMap(([key, value]) => this.stammdaten.fertigkeitenMap[key].Stufe
                            .filter((_, i) => i < (value ?? 0))
                            .flatMap(x => this.getMissingInternal(x.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags))
                        )).concat(
                            Object.entries(besonderheitenTgnored)
                                .filter(([key, value]) => (value ?? 0) > 0)
                                .flatMap(([key, value]) => this.stammdaten.besonderheitenMap[key].Stufe
                                    .filter((_, i) => i < (value ?? 0))
                                    .flatMap(x => this.getMissingInternal(x.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags))
                                ))
                .concat(
                    Object.entries(pfade).flatMap(([gruppe, gv]) => Object.entries(gv).flatMap(([pfad, pv]) => Object.entries(pv)
                        .filter(([level, value]) => (value ?? 0) > 0)
                        .flatMap(([level, value]) => {

                            const pi = this.stammdaten.pfadMap[pfad];
                            const li = pi.Levels.Level.filter(x => x.Id == level);
                            return [this.getMissingInternal(pi.Voraussetzung, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags)].concat(
                                li.flatMap(x => this.getMissingInternal(x.Voraussetzung?.Zusätzlich, talentEffective, talentDerivation, talentBase, besonderheiten, besonderheitenTgnored, fertigkeiten, fertigkeitenIgnored, tags)))

                        }
                        )))))



        });


        this.punkteStore = this.storeManager.derived([
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

            this.propertyScaleData,
            this.ageStore,

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
            propertyScale,
            age,

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

            for (const l of organismus?.lebensabschnitt ?? []) {
                if (l.Spielbar?.Kosten) {
                    applyCost(l.Spielbar.Kosten);
                }
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


            applyCost(
                Object.entries(propertyScale).flatMap(([key, value]) => {
                    const r: KostenDefinition_misc[] = [];

                    const reihe = organismus?.morph.Entwiklung?.Reihe?.filter(x => x.id == key)?.[0];
                    if (reihe == undefined) { return r; }

                    const { currentSchwelle } = Charakter.applyAge(age, reihe, value);

                    ;
                    r.push(...(currentSchwelle?.Kosten ?? []));
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


    public static applyAge(age: number, reihe: _Reihe, currentValue: number) {
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

        const filtert = schwellen.filter(x => x.Wert <= currentValue);
        const currentSchwelle = filtert.length > 0 ? filtert.reverse()[0] : undefined;

        return { schwellen, quantile, currentSchwelle };

    }


    public getPropertyKeys() {
        const keys: Record<string, number> = {};
        const add = (input: EntwicklungDefinition_lebewesen) => {
            for (const { id, Reihenfolge } of ([] as { id: string, Reihenfolge: number }[])
                .concat(input.Berechnung ?? [])
                .concat(input.Punkt ?? [])
                .concat(input.Reihe ?? [])) {

                if (keys[id] === undefined) {
                    keys[id] = Reihenfolge;
                }
            }
        }

        if (this.organismus?.morph.Entwiklung) {
            add(this.organismus?.morph.Entwiklung);
        }
        if (this.organismus?.art.Entwiklung) {
            add(this.organismus?.art.Entwiklung);
        }
        if (this.organismus?.gattung.Entwiklung) {
            add(this.organismus?.gattung.Entwiklung);
        }
        if (this.stammdaten.Instance.Daten.Organismen.Entwiklung) {
            add(this.stammdaten.Instance.Daten.Organismen.Entwiklung);
        }
        return Object.keys(keys).sort((a, b) => {
            if (keys[a] == keys[b]) {
                return a.localeCompare(b);
            }
            return keys[a] - keys[b];
        });
    }


    public getPropertyStore(): Readable<{ [key: string]: number }> {
        return this.storeManager.derived([this.getPropertysScopeStore(), this.getMods()], ([scope, mods]) => {
            return Object.fromEntries(Object.keys(scope).filter(x => typeof scope[x] == "function").map(x => {
                try {

                    const v = scope[x]();
                    if (mods[x] !== undefined) {
                        return ([x, (v * mods[x].multiMod) + mods[x].addMod]);
                    }
                    return ([x, v])
                } catch (error) {
                    console.debug(`faild to get ${x}`, error);
                    return 0;
                }
            }))
        })
    }

    public getPropertyTypeStore() {
        return this.storeManager.derived(this.organismusStore, organismus => {

            if (organismus == undefined) {
                return {};
            }

            const keys: Record<string, (ReiheDefinition_lebewesen & { type: 'reihe' }) |
                (PunktDefintion_lebewesen & { type: 'punkt' })
                | (FormelDefintion_lebewesen & { type: 'calc' })> = {};
            const add = (input: EntwicklungDefinition_lebewesen) => {

                for (const r of input.Reihe ?? []) {
                    if (keys[r.id] === undefined) {
                        keys[r.id] = { ...r, type: 'reihe' };
                    }
                }
                for (const r of input.Punkt ?? []) {
                    if (keys[r.id] === undefined) {
                        keys[r.id] = { ...r, type: 'punkt' };
                    }
                }
                for (const r of input.Berechnung ?? []) {
                    if (keys[r.id] === undefined) {
                        keys[r.id] = { ...r, type: 'calc' };
                    }
                }

            }

            if (organismus.morph.Entwiklung) {
                add(organismus.morph.Entwiklung);
            }
            if (organismus.art.Entwiklung) {
                add(organismus.art.Entwiklung);
            }
            if (organismus.gattung.Entwiklung) {
                add(organismus.gattung.Entwiklung);
            }
            if (this.stammdaten.Instance.Daten.Organismen.Entwiklung) {
                add(this.stammdaten.Instance.Daten.Organismen.Entwiklung);
            }
            return keys;


        })
    }

    private getPropertysScopeStore(): Readable<any> {

        const store = this.storeManager.derived([this.organismusStore, this.propertyScaleData, ...EIGENRSCHAFTEN.map(x => this.eigenschaftenData[x].currentStore)], ([organismus, property, ...eigenrschaften]) => {


            const scope: any = {
            };

            for (let i = 0; i < EIGENRSCHAFTEN.length; i++) {
                const key = EIGENRSCHAFTEN_SHORT[i];
                scope[key] = eigenrschaften[i];
            }

            const buildScope = (e: EntwicklungDefinition_lebewesen | undefined) => {
                if (!e) {
                    return;
                }
                for (const r of e.Reihe ?? []) {
                    console.debug("Evaluet Reihe", r.id);
                    mathjs.evaluate(`${r.id}()= ${property[r.id] ?? 0}`, scope);
                }
                for (const p of e.Punkt ?? []) {
                    console.debug("Evaluet Punkt", p.id);
                    mathjs.evaluate(`${p.id}()= ${property[p.id] ?? 0}`, scope);
                }
                for (const c of e.Berechnung ?? []) {
                    console.debug("Evaluet calculate", c.id);
                    mathjs.evaluate(`${c.id}()= ${c.Formel}`, scope);
                }
            }
            console.debug("Evalueta Scope", organismus);
            console.debug("Evalueta Organismen", this.stammdaten.Instance.Daten.Organismen.Entwiklung);
            buildScope(this.stammdaten.Instance.Daten.Organismen.Entwiklung);
            console.debug("Evalueta Gattung", organismus?.gattung.Entwiklung);
            buildScope(organismus?.gattung.Entwiklung);
            console.debug("Evalueta Art", organismus?.art.Entwiklung);
            buildScope(organismus?.art.Entwiklung);
            console.debug("Evalueta Morph", organismus?.morph.Entwiklung);
            buildScope(organismus?.morph.Entwiklung);
            console.debug("Generate Scope", scope);
            return scope;

        });
        return store;

    }

    private getMods() {
        return this.storeManager.derived([this.organismusStore, this.besonderheitenStore, this.fertigkeitenStore, this.talentEffectiveStore, this.ageStore, this.propertyScaleData], ([o, b, f, t, age, propertyScale]) => {
            return Object.fromEntries((this.getPropertyKeys()).map((keyt) => {
                const mods = Object.entries(b/* if null it was used to early */).flatMap(([key, value]) => {
                    return Array.from({ length: value ?? 0 }, (_, i) => this.stammdaten.besonderheitenMap[key].Stufe[i].Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                })
                    .concat(Object.entries(f).flatMap(([key, value]) => {
                        return Array.from({ length: value ?? 0 }, (_, i) => this.stammdaten.fertigkeitenMap[key].Stufe[i].Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                    }))
                    .concat(Object.entries(t).flatMap(([key, value]) => {
                        return this.stammdaten.talentMap[key].Level.filter(x => x.Wert <= value).map(x => x.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                    }))
                    .concat(o?.lebensabschnitt.flatMap(l => l.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? []) ?? [])
                    .concat(o?.morph.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                    .concat(o?.morph.Entwiklung?.Reihe?.flatMap(reihe => {
                        if (propertyScale[reihe.id]) {
                            const { currentSchwelle } = Charakter.applyAge(age, reihe, propertyScale[reihe.id]);
                            return currentSchwelle?.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [];
                        }

                        return [];
                    }) ?? [])

                    .concat(o?.art.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                    .concat(o?.gattung.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                    .flatMap(x => x);
                const addMod = mods.filter(x => x.Type == 'additiv').reduce((p, c) => p + c.Mod, 0);
                const multiMod = mods.filter(x => x.Type == 'multiplikativ').reduce((p, c) => p + (c.Mod - 1), 1);


                return [keyt, { addMod, multiMod }];
            }));
        });
    }
    private getMod(keyt: string) {
        return this.storeManager.derived([this.organismusStore, this.besonderheitenStore, this.fertigkeitenStore, this.talentEffectiveStore, this.ageStore, this.propertyScaleData], ([o, b, f, t, age, propertyScale]) => {
            const mods = Object.entries(b/* if null it was used to early */).flatMap(([key, value]) => {
                return Array.from({ length: value ?? 0 }, (_, i) => this.stammdaten.besonderheitenMap[key].Stufe[i].Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
            })
                .concat(Object.entries(f).flatMap(([key, value]) => {
                    return Array.from({ length: value ?? 0 }, (_, i) => this.stammdaten.fertigkeitenMap[key].Stufe[i].Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                }))
                .concat(Object.entries(t).flatMap(([key, value]) => {
                    return this.stammdaten.talentMap[key].Level.filter(x => x.Wert <= value).map(x => x.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                }))
                .concat(o?.lebensabschnitt.flatMap(l => l.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? []) ?? [])
                .concat(o?.morph.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                .concat(o?.morph.Entwiklung?.Reihe?.flatMap(reihe => {
                    if (propertyScale[reihe.id]) {
                        const { currentSchwelle } = Charakter.applyAge(age, reihe, propertyScale[reihe.id]);
                        return currentSchwelle?.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [];
                    }

                    return [];
                }) ?? [])

                .concat(o?.art.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                .concat(o?.gattung.Mods?.Eigenschaften?.Mod.filter(m => m.Eigenschaft == keyt) ?? [])
                .flatMap(x => x);
            const addMod = mods.filter(x => x.Type == 'additiv').reduce((p, c) => p + c.Mod, 0);
            const multiMod = mods.filter(x => x.Type == 'multiplikativ').reduce((p, c) => p + (c.Mod - 1), 1);


            return { addMod, multiMod };
        });
    }


    getTalentPurchasedEPStore(id: string): Writable<number> {
        const d = this.storeManager.derived(this.talentPurchasedEP, x => x[id] ?? 0);
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
        return this.storeManager.derived(this.talentBaseStore, x => x[id]);
    }
    getTalentEPStore(id: string): Readable<number> {
        return this.storeManager.derived(this.talentBaseEPStore, x => x[id]);
    }
    getTalentDerivedStore(id: string): Readable<number> {
        return this.storeManager.derived(this.talentDerivationStore, x => x[id]);
    }
    getTalentEffectiveStore(id: string): Readable<number> {
        return this.storeManager.derived(this.talentEffectiveStore, x => x[id]);
    }
    gettalentEffectiveIgnoreRequirements(id: string) {
        return this.storeManager.derived(this.talentEffectiveIgnoreRequirementsStore, x => x[id]);
    }
    gettalentMissingRequirement(id: string) {
        return this.storeManager.derived(this.talentMissingRequirement, x => x[id]);
    }

    getTalentPurchasedEP(id: string): number {
        return get(this.talentPurchasedEPData)[id] ?? 0;
    }
    setTalentPurchasedEP(id: string, value: number): void {
        const x = get(this.talentPurchasedEPData);
        x[id] = value;
        this.talentPurchasedEPData.set(x);
    }
    getPropertyScale(id: string): number {
        return get(this.propertyScaleData)[id] ?? 0;
    }
    setPropertyScale(id: string, value: number): void {
        const x = get(this.propertyScaleData);
        x[id] = value;
        this.propertyScaleData.set(x);
    }

    getSimulation(callback: (char: Charakter) => void, key?: string) {
        let number = 0;
        return this.storeManager.derived(this.DataStore, data => {
            number++;
            const copyData = JSON.parse(JSON.stringify(data));

            const copy = new Charakter(this.stammdaten, copyData);
            callback(copy);

            const talentKeys = distinct(
                Object.keys(copy.talentEffective).concat(Object.keys(this.talentEffective))
            );
            const changedTalents = talentKeys
                .map((key) => {
                    return {
                        key: key,
                        new: copy.talentEffective[key],
                        old: this.talentEffective[key],
                        newEp: copy.talentBaseEP[key] + copy.getTalentPurchasedEP(key),
                        oldEp: this.talentBaseEP[key] + this.getTalentPurchasedEP(key)
                    };
                })
                .filter((x) => x.old != x.new || x.oldEp != x.newEp);

            const fertigkeitenKeys = distinct(
                Object.keys(copy.fertigkeiten)
                    .concat(Object.keys(this.fertigkeiten))
                    .concat(Object.keys(copy.fertigkeitenIgnoreRequirements))
                    .concat(Object.keys(this.fertigkeitenIgnoreRequirements))
            );

            const changedFertigkeiten = fertigkeitenKeys
                .map((key) => {
                    return {
                        key: key,
                        new: copy.fertigkeiten[key] ?? 0,
                        old: this.fertigkeiten[key] ?? 0,
                        newIgnored: copy.fertigkeitenIgnoreRequirements[key] ?? 0,
                        oldIgnored: this.fertigkeitenIgnoreRequirements[key] ?? 0
                    };
                })
                .filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);
            const besonderheitenKeys = distinct(
                Object.keys(copy.besonderheiten)
                    .concat(Object.keys(this.besonderheiten))
                    .concat(Object.keys(copy.besonderheitenIgnoreRequirements))
                    .concat(Object.keys(this.besonderheitenIgnoreRequirements))
            );

            const changedBestonderheiten = besonderheitenKeys
                .map((key) => {
                    return {
                        key: key,
                        new: copy.besonderheiten[key] ?? 0,
                        old: this.besonderheiten[key] ?? 0,
                        newIgnored: copy.besonderheitenIgnoreRequirements[key] ?? 0,
                        oldIgnored: this.besonderheitenIgnoreRequirements[key] ?? 0
                    };
                })
                .filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);

            const currentMissing = this.allMissingRequirements.sort(compareRequirement);
            const copyMissing = copy.allMissingRequirements.sort(compareRequirement);

            function contains(list: MissingRequirements[], element: MissingRequirements) {
                for (const c of list) {
                    const comp = compareRequirement(c, element);
                    if (comp == 0) {
                        return true;
                    } else if (comp < 0) {
                        // we can stop here since the lists are sorted
                        return false;
                    }
                }
                return false;
            }
            const newMissing = copyMissing.filter(x => !contains(currentMissing, x));
            const removedMissing = currentMissing.filter(x => !contains(copyMissing, x));
            return { changedTalents, changedFertigkeiten, changedBestonderheiten, requirements: { added: newMissing, removed: removedMissing } };

        });
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
        return this.storeManager.derived(this.pfadLevelDataStore, old => {
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
        return this.storeManager.derived(this.pfadLevelDataStore, old => {
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
        return this.storeManager.derived(this.pfadLevelDataStore, old => {
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
        return this.storeManager.derived(this.pfadLevelDataStore, old => {
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


        const succes = l.Voraussetzung?.LevelVoraussetzung
            ? single(l.Voraussetzung?.LevelVoraussetzung)
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

    public get morph(): MorphDefinition_lebewesen | undefined {
        return get(this.morphStore);
    }

    public get morphId(): string | undefined {
        return get(this.morphIdStore);
    }

    public set morphId(v: string | undefined) {
        this.morphIdStore.set(v);
    }




    public get punkte(): Record<string, number> {

        return get(this.punkteStore);
    }






}