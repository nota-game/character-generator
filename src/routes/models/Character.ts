import type { _Art, _Gattung, _Lebensabschnitt, _Morph, _Kosten } from "src/data/nota.g";
import { readable, type Readable, type Subscriber, get, derived, writable } from "svelte/store";
import type { Data } from "./Data";

type selection = {
    l: _Lebensabschnitt;
    m: _Morph;
    a: _Art;
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
    public readonly costStore = writable({} as Record<number, _Kosten[] | undefined>);
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

    private readonly base: EigenschaftenData;

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
            a == -1
                ? c[-1]?.map(x => ({ Id: x.Id, Wert: -x.Wert } as any))
                : c[a + 1]);
        this.decreaseCostStore = derived([this.costStore, this.acciredStore], ([c, a]) =>
            a == 1
                ? c[1]?.map(x => ({ Id: x.Id, Wert: -x.Wert } as any))
                : c[a - 1]);
        this.currentStore = derived([this.startStore, this.modifiedStore, this.acciredStore], ([s, m, a]) => s - Object.values(m).reduce((c, p) => c + p, 0) - a)
    }

    public readonly startStore: Readable<number>;
    public readonly currentStore: Readable<number>;
    public readonly modifiedStore: Readable<Record<Eigenschaft, number>>;
    public readonly acciredStore: Readable<number>;
    public readonly costStore: Readable<Record<number, _Kosten[] | undefined>>;
    public readonly increaseCostStore: Readable<_Kosten[] | undefined>;
    public readonly decreaseCostStore: Readable<_Kosten[] | undefined>;


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
export class Charakter {
    data: Data;

    /**
     *
     */
    constructor(data: Data) {
        this.data = data;

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
                        else {
                            console.log(
                                this.data.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.map(x => `${x.von} <= ${i} <= ${x.bis}  ${x.attribut == undefined} && ${x.von <= i} && ${i <= x.bis}`)

                            )

                        }
                    }
                    console.log(
                        //     this.data.Instance.Daten.Organismen.EigenschaftsKosten.Abschnitt.map(x => `${x.von} <= ${i} <= ${x.bis}  ${x.attribut == undefined} && ${x.von <= i} && ${i <= x.bis}`)
                        e.cost
                    )
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
            eCostKonstitution
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

            return r;

            ///////////
            function applyCredit(newLocal: (Record<string, never> & { Wert: number; } & { Id: string; })[]) {
                for (const s of newLocal) {
                    r[s.Id] += s.Wert;
                }
            }
            function applyCost(newLocal: (Record<string, never> & { Wert: number; } & { Id: string; })[]) {
                for (const s of newLocal) {
                    r[s.Id] -= s.Wert;
                }
            }

        });

    }








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



















    public readonly organismusStore = writable<selection>(undefined);

    public get organismus(): selection {
        return get(this.organismusStore);
    }

    public set organismus(v: selection) {
        this.organismusStore.set(v);
    }



    public readonly punkteStore: Readable<Record<string, number>>;

    public get punkte(): Record<string, number> {

        return get(this.punkteStore);
    }






}