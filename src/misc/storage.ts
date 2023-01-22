import type { PersistanceData } from "src/models/Character";

import type { Subscriber, Writable } from "svelte/store";


export const localStorageChar = local<PersistanceData>();

function local<T>(): Writable<T | undefined> & { updateId: (id: string) => void, getId: () => string | undefined } {
    const callbacks: Subscriber<T | undefined>[] = [];
    let id: string | undefined = undefined;
    const notify = () => {
        const currentValue = get();
        for (const callback of callbacks) {
            callback(currentValue);
        }
    }

    const set = (v: T | undefined): void => {
        if (id === undefined) {
            throw new Error('id of Store was not yet set');
        }
        if (v)
            window.localStorage.setItem(id, JSON.stringify(v));
        else
            window.localStorage.removeItem(id);
        notify();
    };
    const get = (): T | undefined => {
        if (id === undefined) {
            return undefined;
        }
        const l = window.localStorage.getItem(id);
        if (l)
            return JSON.parse(l) as T;
        return undefined;
    };

    const updateId = (newId: string) => {
        id = newId;
        notify();
    };



    const subscribe = (callback: Subscriber<T | undefined>) => {
        callbacks.push(callback);
        callback(get());
        return () => {
            const index = callbacks.indexOf(x => x !== callback);
            if (index >= 0) {
                callbacks.splice(index, 1);
            }
        }


    };

    return {
        set,
        update: (fn) => set(fn(get())),
        updateId,
        getId: () => id,
        subscribe,
    }

}