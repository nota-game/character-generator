import { type Readable, get, derived, readable, type Writable, type Subscriber, type Unsubscriber } from "svelte/store";
import * as internal from "svelte/internal";

/** One or more `Readable`s. */
type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;
/** One or more values from `Readable` stores. */
type StoresValues<T> = T extends Readable<infer U> ? U : {
    [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
};

export function derivedLazy<S extends Stores, T>(fn: (values: StoresValues<S>) => T, initial_value?: T): [Readable<T>, { init: (stores: S) => void }] {


    let single: boolean;
    let stores_array: Array<Readable<any>>;

    let inited = false;
    const init: (stores: S) => void = (stores) => {
        single = !Array.isArray(stores);
        stores_array = !Array.isArray(stores)
            ? [stores]
            : stores;

        unsubscribers = stores_array.map((store, i) => internal.subscribe(store, (value: any) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        get(redeble);
        sync();
        
    }
    let set: Subscriber<T>;
    let unsubscribers: Unsubscriber[];
    const redeble = readable(initial_value, (set2) => {
        set = set2;
        
        return function stop() {
                      //internal.run_all(unsubscribers);
        };
    });


    const values: any[] = [];
    let pending = 0;
    let lastValue = initial_value;
    const sync = () => {
        if (pending) {
            return;
        }
        const result = fn(single ? values[0] : values);
        if (!deepEqual(result, lastValue)) {
            set(result);
            lastValue = result;
        }

    };


    return [redeble, { init }];


}


function deepEqual<T>(a: T, b: T) {
    if ((typeof a == 'object' && a != null) &&
        (typeof b == 'object' && b != null)) {
        const count = [0, 0];
        for (const key in a) count[0]++;
        for (const key in b) count[1]++;
        if (count[0] - count[1] != 0) { return false; }
        for (const key in a) {
            if (!(key in b) || !deepEqual(a[key], b[key])) { return false; }
        }
        for (const key in b) {
            if (!(key in a) || !deepEqual(b[key], a[key])) { return false; }
        }
        return true;
    }
    else {
        return a === b;
    }
}