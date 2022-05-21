import type { _Gattung, _Lebensabschnitt, _Morph, Art_lebewesen, _Art2, _LevelVoraussetzung, _LevelAuswahlen, _LevelAuswahl, _Level8, _Level1, AbleitungsAuswahl_talent, FertigkeitDefinition_fertigkeit, BesonderheitDefinition_besonderheit, Kosten_misc, KostenDefinition_misc, Besonderheiten_besonderheit } from "src/data/nota.g";
import { type Readable, get, derived, writable, type Writable } from "svelte/store";

import type { Data } from "./Data";

type selection = {
    l: _Lebensabschnitt;
    m: _Morph;
    a: _Art2;
    g: _Gattung;
} | undefined;

export type Eigenschaft = 'Mut' | 'Glück' | 'Klugheit' | 'Intuition' | 'Gewandtheit' | 'Feinmotorik' | 'Sympathie' | 'Antipathie' | 'Stärke' | 'Konstitution';

class EigenschaftenData {

    public readonly startStore = writable(0);
    public get start() {
        return get(this.startStore);
    }
    public set start(value) {
        this.startStore.set(value);
    }
    public readonly modifiedStore = writable({} as Record<Eigenschaft, number>);
    public get modified() {
        return get(this.modifiedStore);
    }
    public set modified(value) {
        this.modifiedStore.set(value);
    }
    public readonly acciredStore = writable(0);
    public get accired() {
        return get(this.acciredStore);
    }
    public set accired(value) {
        this.acciredStore.set(value);
    }
    public readonly costStore = writable({} as Record<number, KostenDefinition_misc[] | undefined>);
    public get cost() {
        return get(this.costStore);
    }
    public set cost(value) {
        this.costStore.set(value);
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
] as const;
class EigenschaftenDataAccess {



    /**
     *
     */
    constructor(base: EigenschaftenData) {
        this.base = base;
        this.startStore = derived(this.base.startStore, (value) => value);
        this.modifiedStore = derived(this.base.modifiedStore, (value) => value);
        this.acciredStore = derived(this.base.acciredStore, (value) => value);
        this.costStore = derived(this.base.costStore, (value) => value);
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
    public readonly modifiedStore: Readable<Record<Eigenschaft, number>>;
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
    public readonly boughtLevel: Writable<number>
    public readonly buyCost: Readable<KostenDefinition_misc[]>
    public readonly sellCost: Readable<KostenDefinition_misc[]>

    /**
     *
     */
    constructor(costId: string, fertigkeitData: FertigkeitDefinition_fertigkeit, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

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





    }



}
class BesonderheitenInfo {

    public readonly canBeBoght: Readable<boolean>
    public readonly canBeSoled: Readable<boolean>
    public readonly boughtLevel: Writable<number>
    public readonly buyCost: Readable<KostenDefinition_misc[]>
    public readonly sellCost: Readable<KostenDefinition_misc[]>

    /**
     *
     */
    constructor(besonderheitData: BesonderheitDefinition_besonderheit, purchaseStore: Writable<Record<string, number | undefined>>, fixStore: Readable<Record<string, number | undefined>>) {

        this.canBeBoght = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id];
            const f = fixed[besonderheitData.Id];
            return ((p == undefined) || p < besonderheitData.Stufe.length) && (f == undefined || f < besonderheitData.Stufe.length);
        })
        this.canBeSoled = derived([purchaseStore, fixStore], ([purchased, fixed]) => {
            const p = purchased[besonderheitData.Id];
            const f = fixed[besonderheitData.Id];
            return ((p != undefined) && p > (f ?? 0));
        })

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
                const p = purchased[besonderheitData.Id];
                const f = fixed[besonderheitData.Id];
                return Math.max(p ?? 0, f ?? 0);
            })
        };

        this.buyCost = derived([purchaseStore, fixStore, this.canBeBoght], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[besonderheitData.Id] ?? 0, fixed[besonderheitData.Id] ?? 0) + 1;
            return besonderheitData.Stufe[target - 1].Kosten;
        })
        this.sellCost = derived([purchaseStore, fixStore, this.canBeSoled], ([purchased, fixed, can]) => {
            if (!can) {
                return [];
            }
            const target = Math.max(purchased[besonderheitData.Id] ?? 0, fixed[besonderheitData.Id] ?? 0);
            return besonderheitData.Stufe[target - 1].Kosten.map(x => ({ Id: x.Id, Wert: -1 * x.Wert }));
        })





    }



}
export class Charakter {
    data: Data;

    public readonly organismusStore = writable<selection>(undefined);
    public readonly punkteStore: Readable<Record<string, number>>;

    private readonly pfadLevelDataStore = writable({} as Record<string, Record<string, Record<string, number>>>);
    public readonly pfadLevelStore: Readable<Readonly<Record<string, Record<string, Record<string, number>>>>>;

    private readonly besonderheitenPurchasedDataStore = writable({} as Record<string, number | undefined>);
    private readonly besonderheitenFixDataStore: Readable<Record<string, number | undefined>>;
    public readonly besonderheitenPurchasedStore: Readable<Record<string, number | undefined>>;
    public readonly besonderheitenStore: Readable<Readonly<Record<string, number | undefined>>>;

    private readonly fertigkeitenPurchasedDataStore = writable({} as Record<string, number | undefined>);
    private readonly fertigkeitenFixDataStore: Readable<Record<string, number | undefined>>;
    public readonly fertigkeitenPurchasedStore: Readable<Record<string, number | undefined>>;
    public readonly fertigkeitenStore: Readable<Readonly<Record<string, number | undefined>>>;

    private readonly talentPurchasedEPData = writable({} as Record<string, number>);
    private readonly talentFixEP: Readable<Record<string, number>>;
    public readonly talentPurchasedEP: Readable<Record<string, number>>;
    public readonly talentBaseEP: Readable<Record<string, number>>;
    public readonly talentBase: Readable<Record<string, number>>;
    public readonly talentDerivation: Readable<Record<string, number>>;
    public readonly talentEffective: Readable<Record<string, number>>;



    public getFertigkeitInfo(id: string) {
        return new FertigkeitInfo(this.data.StandardKosten, this.data.fertigkeitenMap[id], this.fertigkeitenPurchasedDataStore, this.fertigkeitenFixDataStore);
    }
    public getBesonderheitInfo(id: string) {
        return new BesonderheitenInfo(this.data.besonderheitenMap[id], this.besonderheitenPurchasedDataStore, this.besonderheitenFixDataStore);
    }

    /**
     *
     */
    constructor(data: Data) {
        this.data = data;

        this.talentPurchasedEPData.set(Object.keys(this.data.talentMap).reduce((p, c) => { p[c] = 0; return p; }, {} as Record<string, number>));

        this.fertigkeitenPurchasedStore = derived(this.fertigkeitenPurchasedDataStore, x => ({ ...x }));

        this.fertigkeitenFixDataStore = derived(this.pfadLevelDataStore, (levels) => {
            const costs = Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            if ((levels[gruppe][pfad][level] ?? 0) == 0)
                                return [];
                            const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Fertigkeit ?? [];
                        })));

            return costs.reduce((p, c) => {
                p[c.Id] = Math.max(p[c.Id] ?? 0, c.Stufe);
                return p;
            }, {} as Record<string, number | undefined>);
        });
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
                            const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Talent ?? [];
                        })));

            return costs.reduce((p, c) => {
                p[c.Id] = (p[c.Id] ?? 0) + c.EP;
                return p;
            }, {} as Record<string, number>)
        });

        this.talentPurchasedEP = derived(this.talentPurchasedEPData, (b) => ({ ...b }));
        this.talentBaseEP = derived([this.talentPurchasedEPData, this.talentFixEP], ([b, fix]) => {
            const result = {} as Record<string, number>;
            for (const key of Object.keys(b)) {
                const ep = (fix[key] ?? 0) + (b[key] ?? 0);

                result[key] = ep;

            }
            return result;
        });
        this.talentBase = derived(this.talentBaseEP, (b) => {
            const result = {} as Record<string, number>;
            for (const key of Object.keys(b)) {
                const ep = b[key] ?? 0;
                const complexity = data.talentMap[key].Komplexität.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1
                const levelCots = this.data.talentCostTabel[complexity]


                for (let i = levelCots.length - 1; i >= 0; i--) {
                    if (levelCots[i].Kosten.Wert <= ep) {
                        result[key] = i;
                        break;
                    }
                }
            }
            return result;
        });


        this.talentDerivation = derived(this.talentBase, b => {
            const calc = (a: AbleitungsAuswahl_talent | undefined): number[] => {
                return a
                    ? (a.Ableitung?.map(x => Math.floor(b[x.Id] / x.Anzahl)) ?? [])
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

        this.talentEffective = derived([this.talentBase, this.talentDerivation], ([b, d]) => {
            const result = { ...b };
            return Object.entries(d).reduce((p, c) => {
                if (p[c[0]]) {
                    p[c[0]] += c[1];
                } else {
                    p[c[0]] = c[1];
                }
                return p;
            }, result);
        });

        this.pfadLevelStore = derived(this.pfadLevelDataStore, x => ({ ...x }));
        this.besonderheitenPurchasedStore = derived(this.besonderheitenPurchasedDataStore, x => ({ ...x }));



        this.besonderheitenFixDataStore = derived(this.pfadLevelStore, (levels) => {
            return (Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Besonderheit ?? [];
                        })))).reduce((p, c) => {
                            p[c.Id] = Math.max(p[c.Id] ?? 0, c.Stufe);
                            return p;
                        }, {} as Record<string, number | undefined>);

        });
        this.besonderheitenStore = 
        
        
        derived([this.besonderheitenPurchasedStore, this.besonderheitenFixDataStore], ([purchased, fixed]) => {
            return Object.entries(fixed).reduce((p, c) => {
                p[c[0]] = Math.max(p[c[0]] ?? 0, c[1] ?? 0);
                return p;
            }, { ...purchased });
        });
        derived([this.besonderheitenPurchasedStore, this.pfadLevelStore], ([besonderheiten, levels]) => {
            return (Object.keys(levels)
                .flatMap(gruppe => Object.keys(levels[gruppe])
                    .flatMap(pfad => Object.keys(levels[gruppe][pfad])
                        .flatMap(level => {
                            const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
                                .Pfad.filter(x => x.Id == pfad)[0]
                                .Levels.Level.filter(x => x.Id == level)[0];
                            return l.Besonderheit?.map(x => x.Id) ?? [];
                        })))
                .concat(Object.entries(besonderheiten).filter(x => x[1]).map(x => x[0]))).reduce((p, c) => { p[c] = true; return p; }, {} as Record<string, true | undefined>)
        });

        this.organismusStore.subscribe((v) => {
            if (v) {
                EIGENRSCHAFTEN.forEach(att => {
                    const e = this.eigenrschaften[att];
                    e.start = v.m.Eigenschaften?.[att].Start
                        ?? v.a.Eigenschaften?.[att].Start
                        ?? v.g.Eigenschaften?.[att].Start
                        ?? NaN;
                    if (isNaN(e.start)) {
                        throw Error(`Stammdaten fehlerhft Eigenschaft nicht definiert ${att} ${v.m.Id}`)
                    }

                    const definedCosts = (v.a.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0])
                        .concat((v.g.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((v.m.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        .concat((this.data.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]))
                        ;
                    const maxCost = Math.max(...definedCosts);
                    const minCost = Math.min(...definedCosts);

                    e.cost = {};
                    for (let i = minCost; i <= maxCost; i++) {
                        const c = v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.data.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == att && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten
                            ?? this.data.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.filter(x => x.attribut == undefined && Math.min(x.von, x.bis) <= i && i <= Math.max(x.von, x.bis))[0]?.Kosten;
                        if (typeof c == 'object') {
                            e.cost[i] = c;
                        } else if (i == 0) {
                            e.cost[i] = [];
                        }
                    }
                });
            }
        });


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

            pfadLevelData,

            talentEP,

            fertigkeitenFix,
            fertigkeitenPurchaseu,

            besonderheitenFix,
            besonderheitenPurchaseu,

        ]) => {

            const r: Record<string, number> = {};
            for (const s of this.data.Instance.Daten.KostenDefinitionen.KostenDefinition) {
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
            ]
            applyCredit(this.data.Instance.Daten.GenerierungsDaten.Kosten)

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
                level: data.Instance.Daten.PfadGruppen.Pfade
                    .filter(y => y.Id == x.gruppe)[0].Pfad
                    .filter(y => y.Id == x.pfad)[0].Levels.Level
                    .filter(y => y.Id == x.level)[0],
                amount: x.amount

            }))
                .flatMap(x => x.level.Kosten.map(y => ({ Id: y.Id, Wert: y.Wert * x.amount }))));

            applyCost([{
                Id: data.StandardKosten,
                Wert: Object.values(talentEP).reduce((p, c) => p + c, 0)
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
                    const r :KostenDefinition_misc[]= [];

                    for (let i = low; i < up; i++) {
                        r.push( ...data.besonderheitenMap[key].Stufe[i].Kosten)
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
    }

    getTalentPurchasedEPStore(id: string): Writable<number> {
        const d = derived(this.talentPurchasedEP, x => x[id]);
        return {
            ...d,
            set: (v) => {
                const x = get(this.talentPurchasedEP);
                x[id] = v;
                this.talentPurchasedEPData.set(x);
            },
            update: (u) => {
                const x = get(this.talentPurchasedEP);
                x[id] = u(x[id]);
                this.talentPurchasedEPData.set(x);
            }
        }
    }
    getTalentBaseStore(id: string): Readable<number> {
        return derived(this.talentBase, x => x[id]);
    }
    getTalentEPStore(id: string): Readable<number> {
        return derived(this.talentBaseEP, x => x[id]);
    }
    getTalentDerivedStore(id: string): Readable<number> {
        return derived(this.talentDerivation, x => x[id]);
    }
    getTalentEffectiveStore(id: string): Readable<number> {
        return derived(this.talentEffective, x => x[id]);
    }

    getTalentPurchasedEP(id: string): number {
        return get(this.talentPurchasedEPData)[id];
    }
    setTalentPurchasedEP(id: string, value: number): void {
        const x = get(this.talentBaseEP);
        x[id] = value;
        this.talentPurchasedEPData.set(x);
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
        const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
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

            const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter(x => x.Id == gruppe)[0]
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
        const l = this.data.Instance.Daten.PfadGruppen.Pfade.filter((x) => x.Id == gruppe)[0]
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


    private readonly eigenrschaften: Readonly<EigenschaftsMap<EigenschaftenData>> = {
        Mut: new EigenschaftenData(),
        Glück: new EigenschaftenData(),
        Klugheit: new EigenschaftenData(),
        Intuition: new EigenschaftenData(),
        Gewandtheit: new EigenschaftenData(),
        Feinmotorik: new EigenschaftenData(),
        Sympathie: new EigenschaftenData(),
        Antipathie: new EigenschaftenData(),
        Stärke: new EigenschaftenData(),
        Konstitution: new EigenschaftenData(),
    }
    public readonly eigenschaftenData: Readonly<EigenschaftsMap<EigenschaftenDataAccess>> = {
        Mut: new EigenschaftenDataAccess(this.eigenrschaften.Mut),
        Glück: new EigenschaftenDataAccess(this.eigenrschaften.Glück),
        Klugheit: new EigenschaftenDataAccess(this.eigenrschaften.Klugheit),
        Intuition: new EigenschaftenDataAccess(this.eigenrschaften.Intuition),
        Gewandtheit: new EigenschaftenDataAccess(this.eigenrschaften.Gewandtheit),
        Feinmotorik: new EigenschaftenDataAccess(this.eigenrschaften.Feinmotorik),
        Sympathie: new EigenschaftenDataAccess(this.eigenrschaften.Sympathie),
        Antipathie: new EigenschaftenDataAccess(this.eigenrschaften.Antipathie),
        Stärke: new EigenschaftenDataAccess(this.eigenrschaften.Stärke),
        Konstitution: new EigenschaftenDataAccess(this.eigenrschaften.Konstitution),
    }




















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