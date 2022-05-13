import type { _Art, _Gattung, _Lebensabschnitt, _Morph, _Kosten } from "src/data/nota.g";
import { readable, type Readable, type Subscriber, get } from "svelte/store";
import type { Data } from "./Data";

type selection = {
    l: _Lebensabschnitt;
    m: _Morph;
    a: _Art;
    g: _Gattung;
} | undefined;

type Eigenschaft = 'Mut' | 'Glück' | 'Klugheit' | 'Intuition' | 'Gewandtheit' | 'Feinmotorik' | 'Sympathie' | 'Antipathie' | 'Stärke' | 'Konstitution';
export class Charakter {
    data: Data;

    /**
     *
     */
    constructor(data: Data) {
        this.data = data;
    }



    private readonly EIGENRSCHAFTEN = [
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


    private readonly eigenrschaften = {
        Mut: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Glück: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Klugheit: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Intuition: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Gewandtheit: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Feinmotorik: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Sympathie: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Antipathie: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Stärke: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
        Konstitution: { start: 0, modified: {} as Record<string, number>, accired: 0, Cost: {} as Record<number, _Kosten[] | undefined> },
    }

    private culculateEigenschaft(n: Eigenschaft): number {
        const e = this.eigenrschaften[n];
        return e.start - Object.values(e.modified).reduce((c, p) => c + p, 0) - e.accired;
    }

    public get Mut(): number { return this.culculateEigenschaft('Mut') }
    public get Glück(): number { return this.culculateEigenschaft('Glück') }
    public get Klugheit(): number { return this.culculateEigenschaft('Klugheit') }
    public get Intuition(): number { return this.culculateEigenschaft('Intuition') }
    public get Gewandtheit(): number { return this.culculateEigenschaft('Gewandtheit') }
    public get Feinmotorik(): number { return this.culculateEigenschaft('Feinmotorik') }
    public get Sympathie(): number { return this.culculateEigenschaft('Sympathie') }
    public get Antipathie(): number { return this.culculateEigenschaft('Antipathie') }
    public get Stärke(): number { return this.culculateEigenschaft('Stärke') }
    public get Konstitution(): number { return this.culculateEigenschaft('Konstitution') }

    private _organismus: selection;
    public get organismus(): selection {
        return this._organismus;
    }

    public set organismus(v: selection) {
        this._organismus = v;
        this.updatePunkte();
        if (v) {

            this.EIGENRSCHAFTEN.forEach(att => {
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
                    .concat((v.m.EigenschaftsKosten?.Abschnitt.flatMap(x => [x.bis ?? 0, x.von ?? 0]) ?? [0]));
                const maxCost = Math.max(...definedCosts);
                const minCost = Math.min(...definedCosts);
                e.Cost = {};
                for (let i = minCost; i <= maxCost; i++) {
                    const c = v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == att && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.m.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.a.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && x.von >= i && i >= x.bis)[0]?.Kosten
                        ?? v.g.EigenschaftsKosten?.Abschnitt.filter(x => x.attribut == undefined && x.von >= i && i >= x.bis)[0]?.Kosten;
                    if (typeof c == 'object') {
                        e.Cost[i] = c;
                    }

                }



            });
        }

    }



    private pointstore: Readable<Record<string, number>> | undefined;
    private pointstoreSet: Subscriber<Record<string, number>> | undefined;

    private updatePunkte() {
        const r: Record<string, number> = {};
        for (const s of this.data.Instance.Daten.KostenDefinitionen.KostenDefinition) {
            r[s.Id] = 0;
        }

        applyCredit(this.data.Instance.Daten.GenerierungsDaten.Kosten)

        if (this._organismus?.l.Spielbar?.Kosten) {
            applyCost(this._organismus.l.Spielbar.Kosten);

        }

        if (this.pointstore && this.pointstoreSet) {
            const old = get(this.pointstore);
            if (JSON.stringify(old) != JSON.stringify(r)) {
                this.pointstoreSet(r);
            }
        } else {
            this.pointstore = readable(r, (set) => {
                this.pointstoreSet = set;
                return () => {
                    //
                };
            });
        }


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
    }

    public get punkte(): Readable<Record<string, number>> {
        if (!this.pointstore) {
            this.updatePunkte();
        }
        if (!this.pointstore) {
            throw Error('update should set store')
        }

        return this.pointstore;
    }






}