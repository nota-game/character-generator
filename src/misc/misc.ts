// import type { BesonderheitDefinition_besonderheit, FertigkeitDefinition_fertigkeit, Geschlecht_misc, Lokalisierungen_misc, Lokalisirung, TalentDefinition_talent } from "src/data/nota.g";
// // import { type MissingRequirements, Charakter } from "../models/Character";
// import type { Data } from "../models/Data";

import type { BesonderheitDefinition_besonderheit, FertigkeitDefinition_fertigkeit, Geschlecht_misc, LevelDefinition_misc, Lokalisierungen_misc, PfadDefinition_pfad, TalentDefinition_talent } from "src/data/nota.g";
import { Charakter, type MissingRequirements } from "src/models/Character";
import type { Data } from "src/models/Data";
import { UNINITILEZED } from "./StoreManager2";



export type RemoveTag<T, K extends string, V> =
    Exclude<T, Record<K, V>>
export type RemoveFromUnion<T, K> =
    Exclude<T, Record<keyof K, any>>

export function intersect<T>(a: ArrayLike<T>, b: ArrayLike<T>, equals?: (a: T, b: T) => boolean) {
    if (equals == undefined) {
        equals = (a, b) => a == b;
    }
    const result = [];
    for (let i = 0; i < a.length; i++) {
        const element = a[i];
        for (let j = 0; j < b.length; j++) {
            const other = b[j];
            if (equals(element, other)) {
                result.push(element);
                break;
            }
        }
    }
    return result;
}

export function filterNull<T>(x: (T | null | undefined)[]): T[] {
    return x.filter(y => y !== null && y !== undefined) as T[];
}

export function filterObjectKeys<T extends object>(obj: T, selector: (key: T[keyof T]) => boolean): Partial<T> {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => selector(value))) as any;
}

export function dealay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function handleUninitilized<T>(params: T | typeof UNINITILEZED): T | undefined;
export function handleUninitilized<T>(params: T | typeof UNINITILEZED, d: T): T;
export function handleUninitilized<T>(params: T | typeof UNINITILEZED, d?: T): T | undefined {
    if (params == UNINITILEZED) {
        return d;
    } else {
        return params;
    }
}

export function getLast<T>(array?: T[]) {
    if (array == undefined) return undefined;
    return array.length == 0 ? undefined : array[array.length - 1];
}

export function notUndefined<T>(array: (T | undefined)[]): T[] {
    return array.filter(x => x !== undefined) as T[];
}

export function withIndex<T>(params: readonly T[]) {
    return params.map((e, i) => [e, i] as const);
}

export function groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
    return list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>)
}

export function toObjectKey<T, K extends keyof any, V>(list: T[], getKey: (item: T) => K, getValue: (item: T) => V): Record<K, V>;
export function toObjectKey<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T>;
export function toObjectKey<T, K extends keyof any, V>(list: T[], getKey: (item: T) => K, getValue?: (item: T) => V): Record<K, T> | Record<K, V> {

    const valueEvaluator = getValue ?? ((x) => x as unknown as V);

    return list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);

        previous[group] = valueEvaluator(currentItem);
        return previous;
    }, {} as Record<K, V>)
}

export function distinct<T>(t: T[], keyFunction?: (a: T) => string) {
    if (keyFunction) {
        const result = [];
        const set = new Set();

        for (const element of t) {
            const key = keyFunction(element);
            if (!set.has(key)) {
                set.add(key);
                result.push(element);
            }
        }
        return result;
    } else {
        return t.filter((v, i, a) => a.indexOf(v) === i);
    }
}

export function removeOneOf<T>(arry: T[], toRemove: T): T[] {
    let removed = false;
    return arry.filter(x => {
        if (x == toRemove && !removed) {
            removed = true;
            return false;
        }
        return true;
    });

}

export function join(array: string[], delimeter?: string, lastDelimeter?: string): string {
    if (!delimeter) {
        delimeter = ', '
    }
    if (lastDelimeter != undefined && array.length > 1) {
        return head(array).reduce((p, c) => p.length == 0 ? c : p + delimeter + c, "") + lastDelimeter + getLast(array);

    } else {
        return array.reduce((p, c) => p.length == 0 ? c : p + delimeter + c, "");

    }
}



export function getText(p: Lokalisierungen_misc | undefined, options?: { sex: Geschlecht_misc } | Charakter): string {
    const languege = 'de';
    if (!p) {
        return '';
    }


    const sex: Geschlecht_misc = (options instanceof Charakter) ?
        handleUninitilized(options.morphStore.currentValue())?.Geschlecht ?? 'Unspezifiziert'
        : options == undefined
            ? 'Unspezifiziert'
            : options.sex;


    const lokalisation = p.Lokalisirung.filter(x => x.meta.Sprache == languege)
        ?? p.Lokalisirung.filter(x => x.meta.Sprache == p.Lokalisirung[0].meta.Sprache);

    return (lokalisation.filter(x => x.meta.Geschlecht == sex)[0]
        ?? lokalisation.filter(x => x.meta.Geschlecht == "Unspezifiziert")[0]
        ?? lokalisation.filter(x => x.meta.Geschlecht == "Neutral")[0]
        ?? lokalisation[0]
    ).value;
}

export function getTextTalent(p: TalentDefinition_talent | undefined, character: Charakter, format: 'Name' | 'Probe' | 'NameProbe' = 'NameProbe'): string {
    if (!p) {
        return '';
    }
    const probe = [
        ...filterNull(p.Probe.flatMap(x => x.Eigenschaft.map(y => y.Name))
            .map(x => handleUninitilized(character.eigenschaften[x ?? '']?.meta.currentValue()))
            .map(x => x?.Abkürzung))];
    if (format == 'NameProbe' && probe.length > 0)
        return `${getText(p.Name)} (${probe.map(x => getText(x)).reduce((p, c) => `${p}•${c}`)})`
    else if (format == 'NameProbe')
        return `${getText(p.Name)}`
    else if (format == 'Name')
        return getText(p.Name)
    else if (format == 'Probe')
        return probe.map(x => getText(x)).reduce((p, c) => `${p}•${c}`);
    throw Error('Unbekantes Format')
}
export function getTextPfad(p: PfadDefinition_pfad | undefined, level?: LevelDefinition_misc, options?: { sex: Geschlecht_misc } | Charakter): string {
    if (!p) {
        return '';
    }

    if (level && getText(level.Name).length > 0) {
        return `${getText(p.Name, options)} (${getText(level.Name)})`;
    } else {

        return getText(p.Name, options);
    }
}

export function tail<T>(a: readonly T[]): T[] {
    const [, ...result] = a;
    return result;
}
export function head<T>(a: readonly T[]): T[] {

    return a.slice(0, -1);
}


export function sequenceEqual<T>(a: T[], b: T[]): boolean {
    if (a == undefined && b == undefined) {
        console.log("return true")
        return true;
    }
    if (a == undefined || b == undefined) {
        console.log("return false")
        return false;
    }
    if (a.length != b.length) {
        console.log("return false")
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            console.log("return false")
            return false;
        }
    }
    return true;

}

export function d20() {
    return d(20);
}
export function d(faces: number) {
    return Math.floor(Math.random() * faces) + 1;
}

export function zip<T1, T2>(a: T1[], b: T2[]): (readonly [T1, T2])[] {
    if (a == undefined) {
        a = [];
    }
    if (b == undefined) {
        b = [];
    }
    if (a.length < b.length) {
        return b.map((x, i) => [a[i], x]);

    } else {
        return a.map((x, i) => [x, b[i]]);
    }

}


export function sortLocalisable<T, T2 extends { Name: Lokalisierungen_misc }>(a: T[], transform: (v: T) => T2): T[];
export function sortLocalisable<T extends { Name: Lokalisierungen_misc }>(a: T[]): T[];
export function sortLocalisable<T, T2 extends { Name: Lokalisierungen_misc }>(a: T[], transform?: (v: T) => T2): T[] {
    const t: (v: T) => T2 = transform ? transform : (x) => x as any;
    return a.sort((a, b) => getText(t(a).Name).localeCompare(getText(t(b).Name)));
}

export function getTextBesonderheit(p: BesonderheitDefinition_besonderheit | undefined, stufe: number, options?: { sex: Geschlecht_misc } | Charakter): string;
export function getTextBesonderheit(p: BesonderheitDefinition_besonderheit | undefined, stufe: number, options: Charakter, ...substitute: string[]): string;
export function getTextBesonderheit(p: BesonderheitDefinition_besonderheit | undefined, stufe: number, options?: { sex: Geschlecht_misc } | Charakter, ...substitute: string[]): string {
    if (!p) {
        return '';
    }
    const replace = (str: string) => {

        for (let i = 0; i < p.Parameter.length; i++) {
            const parameter = p.Parameter[i];
            const value = substitute?.[i];
            if (value && parameter) {
                if (parameter["#"] == 'Auswahl') {
                    const wahl = parameter.Auswahl.Input.Wahl.filter(x => x.Id == value)[0];
                    str = str.replaceAll(`{${parameter.Auswahl.identifier}}`, getText(wahl.Name, options));
                } else if (parameter["#"] == 'Talent' && options instanceof Charakter) {
                    const talent = options.stammdaten.talentMap[value];
                    str = str.replaceAll(`{${parameter.Talent.identifier}}`, getTextTalent(talent, options, 'Name'));
                } else if (parameter["#"] == 'Text') {
                    str = str.replaceAll(`{${parameter.Text.identifier}}`, value);
                } else if (parameter["#"] == 'Zahl') {
                    str = str.replaceAll(`{${parameter.Zahl.identifier}}`, value);
                }
            }
        }
        return str;
    }

    if (stufe == 0) {
        return replace(getText(p.Name, options));
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
        return replace(`${getText(base.name, options)} ${numbers[stufe - base.stufe] ?? stufe - base.stufe + 1}`);

    } else {
        return replace(getText(base.name, options));
    }
}
export function getTextFertigkeit(p: FertigkeitDefinition_fertigkeit | undefined, stufe: number, options?: { sex: Geschlecht_misc } | Charakter): string {
    if (!p) {
        return '';
    }
    if (stufe == 0) {
        return getText(p.Name, options);
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
        return `${getText(base.name, options)} ${numbers[stufe - base.stufe] ?? stufe - base.stufe + 1}`;

    } else {
        return getText(base.name, options);
    }
}


export function renderRequirementMap(req: {
    wert: number;
    missing: MissingRequirements;
}, data: Data, of:
        { type: 'talent', value: TalentDefinition_talent | string }

    , options: (Charakter)): string;
export function renderRequirementMap(req: {
    wert: number;
    missing: MissingRequirements;
}, data: Data, of: { type: 'fertigkeit', value: FertigkeitDefinition_fertigkeit | string }
    | { type: 'besonderheit', value: BesonderheitDefinition_besonderheit | string }
    | { type: 'level', level: LevelDefinition_misc | string, pfad: PfadDefinition_pfad | string }
    , options?: ({ sex: Geschlecht_misc } | Charakter)): string;
export function renderRequirementMap(req: {
    wert: number;
    missing: MissingRequirements;
}, data: Data, of: { type: 'fertigkeit', value: FertigkeitDefinition_fertigkeit | string }
    | { type: 'besonderheit', value: BesonderheitDefinition_besonderheit | string }
    | { type: 'talent', value: TalentDefinition_talent | string }
    | { type: 'level', level: LevelDefinition_misc | string, pfad: PfadDefinition_pfad | string }
    , options?: ({ sex: Geschlecht_misc } | Charakter)) {

    const text = renderRequirement(req.missing, data);

    if (of.type == 'fertigkeit') {

        const fertigkeit = (typeof of.value == 'string') ? data?.fertigkeitenMap[of.value] : of.value;
        return `${text.substring(0, text.length - 1)}, um ${getTextFertigkeit(fertigkeit, req.wert, options)} zu Aktivieren.`
    } else if (of.type == 'besonderheit') {
        const besoderheit = (typeof of.value == 'string') ? data?.besonderheitenMap[of.value] : of.value;
        return `${text.substring(0, text.length - 1)}, um ${getTextBesonderheit(besoderheit, req.wert, options)} zu Aktivieren.`
    } else if (of.type == 'talent') {
        if (options instanceof Charakter) {

            const talent = (typeof of.value == 'string') ? data?.talentMap[of.value] : of.value;
            return `${text.substring(0, text.length - 1)}, um ${getTextTalent(talent, options, 'Name')} auf ${req.wert} zu Steigern.`
        } else {
            throw new Error('Render talent needs a character');
        }
    } else if (of.type == 'level') {

        const pfad = (typeof of.pfad == 'string') ? data.pfadMap[of.pfad] : of.pfad;
        const level = (typeof of.level == 'string') ? data?.levelMap[pfad.Id][of.level] : of.level;

        return `${text.substring(0, text.length - 1)}, um ${getTextPfad(pfad, level, options)} zu Aktivieren.`
    }


    return text;

}
export function renderRequirement(req: MissingRequirements, data: Data | undefined) {
    if (!data)
        return "";
    const buildname = (
        m: MissingRequirements
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
        } else if (m.type === 'Level') {
            const d = data.pfadMap[m.pfad];
            const d2 = data.levelMap[m.pfad][m.id];
            if (m.Stufe == 1) {
                return `${getText(d.Name)} (${getText(d2.Name)})`;
            } else {
                return `${getText(d.Name)} (${getText(d2.Name)}) auf ${m.Stufe}`;
            }
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
            throw Error(`Shuld not happen ${JSON.stringify(m)}`);
        }
    };
    if (req.type === 'And' && req.sub.every((x) => x.type !== 'Or' && x.type !== 'And')) {
        const neg = req.sub.filter((x) => x.type === 'Not');
        const pos = req.sub.filter((x) => x.type !== 'Not');
        const posNames = pos
            .map((x) => buildname(x as any));
        const negNames = neg
            .map((x) => buildname((x as any).sub));

        if (neg.length > 0 && pos.length > 0) {
            const posString =
                pos.length > 1
                    ? `Es werden ${posNames
                        .slice(0, pos.length - 1)
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${posNames[pos.length - 1]
                    } benötigt und `
                    : `Es wird ${posNames
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} benötigt und `;
            const negString =
                neg.length > 1
                    ? `${negNames
                        .slice(0, neg.length - 1)
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${negNames[neg.length - 1]
                    } dürfen nicht vorhanden sein.`
                    : `${negNames[0]} darf nicht vorhanden sein.`;
            return posString + negString;
        } else if (neg.length > 0) {
            return neg.length > 1
                ? `${negNames
                    .slice(0, neg.length - 1)
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${negNames[neg.length - 1]
                } dürfen nicht vorhanden sein.`
                : `${negNames} darf nicht vorhanden sein.`;
        } else if (pos.length > 0) {
            return pos.length > 1
                ? `Es werden ${posNames
                    .slice(0, pos.length - 1)
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${posNames[pos.length - 1]} benötigt.`
                : `Es wird ${posNames
                    .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} benötigt.`;
        }
    } else if (req.type === 'Or' && req.sub.every((x) => x.type !== 'Or' && x.type !== 'And')) {
        {
            const neg = req.sub.filter((x) => x.type === 'Not');
            const pos = req.sub.filter((x) => x.type !== 'Not');
            const posNames = pos
                .map((x) => buildname(x as any));
            const negNames = neg
                .map((x) => buildname((x as any).sub));
            if (neg.length > 0 && pos.length > 0) {
                const posString =
                    pos.length > 1
                        ? `${posNames
                            .slice(0, pos.length - 1)
                            .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} oder ${posNames[pos.length - 1]
                        } muss vorhanden sein oder `
                        : `Es wird ${posNames[0]} benötigt oder `;
                const negString =
                    neg.length > 1
                        ? `eines der folgenden, ${negNames
                            .slice(0, neg.length - 1)
                            .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${negNames[neg.length - 1]
                        } darf nicht vorhanden sein.`
                        : ` ${negNames[0]} darf nicht vorhanden sein.`;
                return posString + negString;
            } else if (neg.length > 0) {
                return neg.length > 1
                    ? `Eines von ${negNames
                        .slice(0, neg.length - 1)
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} und ${negNames[neg.length - 1]
                    } darf nicht vorhanden sein.`
                    : `${negNames[0]} darf nicht vorhanden sein.`;
            } else if (pos.length > 0) {
                return pos.length > 1
                    ? `Es wird ${posNames
                        .slice(0, pos.length - 1)
                        .reduce((p, c) => (p == '' ? c : `${p}, ${c}`))} oder ${posNames[pos.length - 1]
                    } benötigt.`
                    : `Es wird ${posNames
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

// export function readonlyMapStore<T>(create: (key: string) => T): Readonly<Record<string, T>> {
//     const target: Record<string, T> = {};
//     const handler2: ProxyHandler<Record<string, T>> = {
//         get(target: Record<string, T>, p: string) {
//             if (!target[p]) {
//                 target[p] = create(p);
//             }
//             return target[p];
//         },
//         ownKeys(target: Record<string, T>) {
//             return Object.keys(target);
//         }
//     };
//     return new Proxy(target, handler2);
// }

// export function mapStore<T>(create: (key: string) => T): Readonly<Record<string, T>> {
//     const target: Record<string, T> = {};
//     const handler2: ProxyHandler<Record<string, T>> = {
//         get(target: Record<string, T>, p: string) {
//             if (!target[p]) {
//                 target[p] = create(p);
//             }
//             return target[p];
//         },
//         set(target: Record<string, T>, p: string, value: T) {
//             target[p] = value;
//             return true;
//         },
//         ownKeys(target: Record<string, T>) {
//             return Object.keys(target);
//         }
//     };
//     return new Proxy(target, handler2);
// }
// export function mapHandel<T>(get: (key: string) => T, set: (key: string, value: T) => void): Record<string, T> {
//     const target: Record<string, T> = {};
//     const handler2: ProxyHandler<Record<string, T>> = {
//         get(target: Record<string, T>, p: string) {
//             return get(p);
//         },
//         set(target: Record<string, T>, p: string, value: T) {
//             set(p, value);
//             return true;
//         },
//         ownKeys(target: Record<string, T>) {
//             return Object.keys(target);
//         }
//     };
//     return new Proxy(target, handler2);
// }
// export function readonlyMapHandel<T>(get: (key: string) => T): Record<string, T> {
//     const target: Record<string, T> = {};
//     const handler2: ProxyHandler<Record<string, T>> = {
//         get(target: Record<string, T>, p: string) {
//             return get(p);
//         },
//         set() {
//             throw Error('set not supported')
//             return true;
//         },
//         ownKeys(target: Record<string, T>) {
//             return Object.keys(target);
//         }
//     };
//     return new Proxy(target, handler2);
// }
