import type { BesonderheitDefinition_besonderheit, FertigkeitDefinition_fertigkeit, Lokalisierungen_misc, Lokalisirung, TalentDefinition_talent } from "src/data/nota.g";
import type { MissingRequirements } from "./models/Character";
import type { Data } from "./models/Data";


export function getText(p: Lokalisierungen_misc | undefined): string {
    const languege = 'de';
    if (!p) {
        return '';
    }
    return (p.Lokalisirung.filter(x => x.meta.Sprache == languege)[0]
        ?? p.Lokalisirung[0]).value;
}

export function getTextTalent(p: TalentDefinition_talent | undefined, format: 'Name' | 'Probe' | 'NameProbe' = 'NameProbe'): string {
    if (!p) {
        return '';
    }
    const probe = [];

    for (let i = 0; i < (p.Probe.Antipathie?.length ?? 0); i++) {
        probe.push('AN');
    }
    for (let i = 0; i < (p.Probe.Einfluss?.length ?? 0); i++) {
        probe.push('EI');
    }
    for (let i = 0; i < (p.Probe.Fokus?.length ?? 0); i++) {
        probe.push('FO');
    }
    for (let i = 0; i < (p.Probe.Gewandtheit?.length ?? 0); i++) {
        probe.push('GE');
    }
    for (let i = 0; i < (p.Probe.Glück?.length ?? 0); i++) {
        probe.push('GL');
    }
    for (let i = 0; i < (p.Probe.Intuition?.length ?? 0); i++) {
        probe.push('IN');
    }
    for (let i = 0; i < (p.Probe.Klugheit?.length ?? 0); i++) {
        probe.push('KL');
    }
    for (let i = 0; i < (p.Probe.Konstitution?.length ?? 0); i++) {
        probe.push('KO');
    }
    for (let i = 0; i < (p.Probe.Mut?.length ?? 0); i++) {
        probe.push('MU');
    }
    for (let i = 0; i < (p.Probe.Präzision?.length ?? 0); i++) {
        probe.push('PR');
    }
    for (let i = 0; i < (p.Probe.Stärke?.length ?? 0); i++) {
        probe.push('ST');
    }
    for (let i = 0; i < (p.Probe.Sympathie?.length ?? 0); i++) {
        probe.push('SY');
    }
    if (probe.length !== 3) {
        console.error('Falche anzahl Attibute', probe)
        throw Error('Falche anzahl Attibute');
    }
    if (format == 'NameProbe')
        return `${getText(p.Name)} (${probe[0]}•${probe[1]}•${probe[2]})`
    else if (format == 'Name')
        return getText(p.Name)
    else if (format == 'Probe')
        return `${probe[0]}•${probe[1]}•${probe[2]}`
        throw Error('Unbekantes Format')
}
export function getTextBesonderheit(p: BesonderheitDefinition_besonderheit | undefined, stufe: number): string {
    if (!p) {
        return '';
    }
    const numbers = ['Ⅰ', 'Ⅱ', "Ⅲ", 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ']
    const list = [
        ...p.Stufe.filter((_, i) => i < stufe).map((x, i) => ({ name: x.Name, stufe: i + 1 })).reverse().filter(x => x.name),
        { name: p.Name, stufe: 1 }
    ];
    const base = list[0];
    const next = [
        ...p.Stufe.map((x, i) => ({ name: x.Name, stufe: i + 1 })).filter((x) => x.stufe > base.stufe).filter(x => x.name)
    ][0]?.stufe ?? p.Stufe.length + 1;

    if (base.stufe < next - 1) {
        return `${getText(base.name)} ${numbers[stufe - base.stufe] ?? stufe - base.stufe + 1}`;

    } else {
        return getText(base.name);
    }
}
export function getTextFertigkeit(p: FertigkeitDefinition_fertigkeit | undefined, stufe: number): string {
    if (!p) {
        return '';
    }
    const numbers = ['Ⅰ', 'Ⅱ', "Ⅲ", 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ']
    const base = [
        ...p.Stufe.filter((_, i) => i < stufe).map((x, i) => ({ name: x.Name, stufe: i + 1 })).reverse().filter(x => x.name),
        { name: p.Name, stufe: 1 }
    ][0];
    const next = [
        ...p.Stufe.map((x, i) => ({ name: x.Name, stufe: i + 1 })).filter((x) => x.stufe > base.stufe).filter(x => x.name)
    ][0]?.stufe ?? p.Stufe.length + 1;

    if (base.stufe < next - 1) {
        return `${getText(base.name)} ${numbers[stufe - base.stufe + 1] ?? stufe - base.stufe + 1}`;

    } else {
        return getText(base.name);
    }
}


export function renderRequirement(req: MissingRequirements, data: Data | undefined) {
    if (!data)
        return "";
    const buildname = (
        m: MissingRequirements & { type: 'Besonderheit' | 'Fertigkeit' | 'tag' | 'Talent' }
    ) => {
        if (m.type === 'Besonderheit') {
            const d = data.besonderheitenMap[m.id];
            return `${getTextBesonderheit(d, m.Stufe)}`;
        } else if (m.type === 'Fertigkeit') {
            const d = data.fertigkeitenMap[m.id];
            return `${getTextFertigkeit(d, m.Stufe)}`;
        } else if (m.type === 'tag') {
            const d = data.tagMap[m.id];
            return `${getText(d.Name)}`;
        } else if (m.type === 'Talent') {
            const d = data.talentMap[m.id];
            return m.Kind === 'Effektiv'
                ? `${getText(d.Name)} auf ${m.Stufe}`
                : m.Kind === 'Basis'
                    ? `${getText(d.Name)} TaB auf ${m.Stufe}`
                    : m.Kind === 'Unterstützung'
                        ? `${getText(d.Name)} TaA auf ${m.Stufe}`
                        : `${getText(d.Name)}`;
        } else {
            throw Error('Shuld not happen');
        }
    };
    if (req.type === 'And' && req.sub.every((x) => x.type !== 'Or' && x.type !== 'And')) {
        const neg = req.sub.filter((x) => x.type === 'Not');
        const pos = req.sub.filter((x) => x.type !== 'Not');
        if (neg.length > 0 && pos.length > 0) {
            const posString =
                pos.length > 1
                    ? `Es werden ${pos
                        .slice(0, pos.length - 1)
                        .map((x) => buildname(x as any))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${pos[pos.length - 1]
                    } benötigt und `
                    : `Es wird ${pos
                        .map((x) => buildname(x as any))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} benötigt und `;
            const negString =
                neg.length > 1
                    ? `${neg
                        .slice(0, neg.length - 1)
                        .map((x) => buildname((neg[0] as any).sub))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${neg[neg.length - 1]
                    } dürfen nicht vorhanden sein.`
                    : `${buildname((neg[0] as any).sub as any)} darf nicht vorhanden sein.`;
            return posString + negString;
        } else if (neg.length > 0) {
            return neg.length > 1
                ? `${neg
                    .slice(0, neg.length - 1)
                    .map((x) => buildname((neg[0] as any).sub))
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${neg[neg.length - 1]
                } dürfen nicht vorhanden sein.`
                : `${buildname((neg[0] as any).sub as any)} darf nicht vorhanden sein.`;
        } else if (pos.length > 0) {
            pos.length > 1
                ? `Es werden ${pos
                    .slice(0, pos.length - 1)
                    .map((x) => buildname(x as any))
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${pos[pos.length - 1]} benötigt.`
                : `Es wird ${pos
                    .map((x) => buildname(x as any))
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} benötigt.`;
        }
    } else if (req.type === 'Or' && req.sub.every((x) => x.type !== 'Or' && x.type !== 'And')) {
        {
            const neg = req.sub.filter((x) => x.type === 'Not');
            const pos = req.sub.filter((x) => x.type !== 'Not');
            if (neg.length > 0 && pos.length > 0) {
                const posString =
                    pos.length > 1
                        ? `${pos
                            .slice(0, pos.length - 1)
                            .map((x) => buildname(x as any))
                            .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} oder ${pos[pos.length - 1]
                        } muss vorhanden sein oder `
                        : `Es wird ${buildname(pos[0] as any)} benötigt oder `;
                const negString =
                    neg.length > 1
                        ? `eines der folgenden, ${neg
                            .slice(0, neg.length - 1)
                            .map((x) => buildname((neg[0] as any).sub))
                            .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${neg[neg.length - 1]
                        } darf nicht vorhanden sein.`
                        : ` ${buildname((neg[0] as any).sub as any)} darf nicht vorhanden sein.`;
                return posString + negString;
            } else if (neg.length > 0) {
                return neg.length > 1
                    ? `Eines von ${neg
                        .slice(0, neg.length - 1)
                        .map((x) => buildname((neg[0] as any).sub))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${neg[neg.length - 1]
                    } darf nicht vorhanden sein.`
                    : `${buildname((neg[0] as any).sub as any)} darf nicht vorhanden sein.`;
            } else if (pos.length > 0) {
                pos.length > 1
                    ? `Es wird ${pos
                        .slice(0, pos.length - 1)
                        .map((x) => buildname(x as any))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} oder ${pos[pos.length - 1]
                    } benötigt.`
                    : `Es wird ${pos
                        .map((x) => buildname(x as any))
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} benötigt.`;
            }
        }
    } else if (req.type === 'Not') {
        if (req.sub.type !== 'Or' && req.sub.type !== 'And') {
            return `${buildname(req.sub as any)} darf nicht vorhanden sein.`;
        }
    } else {
        return `${buildname(req as any)} muß vorhanden sein.`;
    }
    return JSON.stringify(req);
}

export function readonlyMapStore<T>(create: (key: string) => T): Readonly<Record<string, T>> {
    const target: Record<string, T> = {};
    const handler2: ProxyHandler<Record<string, T>> = {
        get(target: Record<string, T>, p: string) {
            if (!target[p]) {
                target[p] = create(p);
            }
            return target[p];
        },
        ownKeys(target: Record<string, T>) {
            return Object.keys(target);
        }
    };
    return new Proxy(target, handler2);
}

export function mapStore<T>(create: (key: string) => T): Readonly<Record<string, T>> {
    const target: Record<string, T> = {};
    const handler2: ProxyHandler<Record<string, T>> = {
        get(target: Record<string, T>, p: string) {
            if (!target[p]) {
                target[p] = create(p);
            }
            return target[p];
        },
        set(target: Record<string, T>, p: string, value: T) {
            target[p] = value;
            return true;
        },
        ownKeys(target: Record<string, T>) {
            return Object.keys(target);
        }
    };
    return new Proxy(target, handler2);
}
export function mapHandel<T>(get: (key: string) => T, set: (key: string, value: T) => void): Record<string, T> {
    const target: Record<string, T> = {};
    const handler2: ProxyHandler<Record<string, T>> = {
        get(target: Record<string, T>, p: string) {
            return get(p);
        },
        set(target: Record<string, T>, p: string, value: T) {
            set(p, value);
            return true;
        },
        ownKeys(target: Record<string, T>) {
            return Object.keys(target);
        }
    };
    return new Proxy(target, handler2);
}
export function readonlyMapHandel<T>(get: (key: string) => T): Record<string, T> {
    const target: Record<string, T> = {};
    const handler2: ProxyHandler<Record<string, T>> = {
        get(target: Record<string, T>, p: string) {
            return get(p);
        },
        set() {
            throw Error('set not supported')
            return true;
        },
        ownKeys(target: Record<string, T>) {
            return Object.keys(target);
        }
    };
    return new Proxy(target, handler2);
}
