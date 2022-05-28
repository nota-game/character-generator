import { noop } from "svelte/internal";
import type { Writable } from "svelte/store";


export function local<T>(name: string): Writable<T | undefined> {
console.log(name)
    const set = (v: T | undefined): void => {
        if (v)
            window.localStorage.setItem(name, JSON.stringify(v));
        else
            window.localStorage.removeItem(name);
    };
    const get = (): T | undefined => {
        const l = window.localStorage.getItem(name);
        if (l)
            return JSON.parse(l) as T;
        return undefined;
    };
    return {
        set,
        update: (fn) => set(fn(get())),
        subscribe: (v) => {
            v(get());
            return noop;
        }

    }

}