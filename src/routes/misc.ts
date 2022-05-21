import type { Lokalisierungen_misc, Lokalisirung } from "src/data/nota.g";
import { derived, get, writable, type Readable, type Writable } from "svelte/store";

export function getText(p: Lokalisierungen_misc | undefined): string {
    const languege = 'de';
    if (!p) {
        return '';
    }
    return (p.Lokalisirung.filter(x => x.meta.Sprache == languege)[0]
        ?? p.Lokalisirung[0]).value;
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
