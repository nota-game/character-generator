'use strict';

import type { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
import * as internal from "svelte/internal";
import { boolean } from "mathjs";
import type structuredClone from "@ungap/structured-clone";

export declare type Invalidator<T> = (value?: T) => void;

function identity(p: any) {
    return p;
}

type SubscriberData<T> = {
    id: string;
    value: T;
    alsoNotify: Set<string>;
    fn: ((...args: any) => T) | undefined;
    validValue: boolean;
    dependentOn: Set<string>;
    subscribers: Set<readonly [Subscriber<T>, Invalidator<T>]>;
};
// declare type Keys = Key<any>;// | [Key<any, any>, ...Array<Key<any, any>>] | Array<Key<any, any>>;
// declare type KeysValues<T> = T extends Key<infer U> ? U : never;//{
//     [K in keyof T]: T[K] extends Key<any, infer U> ? U : never;
// };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Key<T> { Key: string };
//export type Key<key extends string, T> = key;
// type KeyType<I> = I extends Key<any, infer U>
//     ? U
//     : never;



declare type KeysArray = Key<any, any> | [Key<any, any>, ...Array<Key<any, any>>] | Array<Key<any, any>>;
/** One or more values from `Readable` stores. */
declare type KeysValues<T> = T extends Key<any, infer U> ? [string, U] : {
    [K in keyof T]: T[K] extends Key<any, infer U> ? [string, U] : never;
};

export interface Key<K extends string, T> {
    /**
     * Subscribe on value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    Key: K;
}

export default class StoreManager {

    public key<key extends string, T>(key: key): Key<key, T> {
        return { Key: key };
    }

    private readonly data: Record<string, SubscriberData<any>> = {};


    /**
     *
     */
    constructor() {

        this.subscriber_queue = [];
    }

    private readonly subscriber_queue: Array<any>;
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    public readable<key2 extends Key<string, T>, T>(key: key2): Readable<T> {
        const current = this.prepareData(key);
        const subscribe = (run: Subscriber<T>, invalidate: Invalidator<T> = internal.noop): Unsubscriber => {
            const subscriber = [run, invalidate] as const;
            current.subscribers.add(subscriber);
            if (current.validValue)
                run(current.value);
            return () => {
                current.subscribers.delete(subscriber);
            };
        }
        return {
            subscribe
        };
    }





    private prepareData<T>(key: Key<any, T>): SubscriberData<T> {
        if (!this.data[key.Key]) {
            this.data[key.Key] = {
                id: key.Key,
                value: undefined,
                dependentOn: new Set(),
                alsoNotify: new Set(),
                validValue: false,
                fn: undefined,
                subscribers: new Set<readonly [Subscriber<T>, ((value?: T) => void)]>()
            };

            Object.values(this.data).forEach(other => {
                const reg = new RegExp("^" + other.id.replace('*', '[^/]+'));
                if (reg.test(current.id)) {
                    current.alsoNotify.add(key.Key);
                }
            });
        }
        const current = this.data[key.Key];

        if (current.fn == undefined && current.id.includes('*')) {
            // wildcardIds are initilized here and must be readonly

            const reg = new RegExp("^" + current.id.replace('*', '[^/]+'));
            Object.values(this.data).filter(x => reg.test(x.id)).forEach(x => {
                x.alsoNotify.add(key.Key);
            });

        }

        return current;
    }

    public writable<T>(key: Key<any, T>, value: T, compare: (a: T, b: T) => boolean = internal.safe_not_equal): Writable<T> {
        const current = this.prepareData(key);

        if (current.fn) {
            throw Error(`Store for ${key} already initilized`);
        }
        current.fn = identity;
        current.value = value;
        current.validValue = true;
        this.Notify(current);

        const subscribe = (run: Subscriber<T>, invalidate: Invalidator<T> = internal.noop): Unsubscriber => {
            const subscriber = [run, invalidate] as const;
            current.subscribers.add(subscriber);
            if (current.validValue)
                run(current.value);
            return () => {
                current.subscribers.delete(subscriber);
            };
        }

        const set = (new_value: T): void => {
            if (!current.validValue || !compare(current.value, new_value)) {
                current.value = new_value;
                current.validValue = true;
                this.Notify(current);
            }
        }
        const update = (updater: Updater<T>): void => {
            const new_value = updater(current.value);
            if (!current.validValue || !compare(current.value, new_value)) {
                current.value = new_value;
                current.validValue = true;
                this.Notify(current);
            }
        }
        // const xxKay = this.key<"a", string>("a");
        // this.writable(xxKay, '');
        // this.derived(this.key<"123", number>("123"), (x) => {
        //     return x;
        // })
        return {
            subscribe, set, update
        };
    }

    // , fn: (values: StoresValues<S>, set?: (value: T) => void) => T, initial_value?: T
    // public derived<K extends Keys, T>(values: KeysValues<K>, fn: (values: KeysValues<K>) => T): Readable<T> {
    public derived<S extends KeysArray, T>(key: Key<any, T>, stores: S, fn: (values: KeysValues<S>, set?: (value: T) => void) => T, initial_value?: T): Readable<T> {

        const current = this.prepareData(key);

        if (current.fn) {
            throw Error(`Store for ${key} already initilized`);
        }


        const single = !Array.isArray(stores);
        const stores_array: Array<Key<any, any>> = single
            ? [stores]
            : stores;

        stores_array.forEach(x => {
            const toAdd = this.prepareData(x);

            toAdd.alsoNotify.add(key.Key);
            current.dependentOn.add(x.Key);
        });






    }


    private Notify(current: SubscriberData<any>) {

        const notify = new Set<string>().add(current.id);

        function collect(this: StoreManager, current: SubscriberData<any>) {
            for (const also of current.alsoNotify) {
                if (!notify.has(also)) {
                    notify.add(also);
                    const next = this.data[also];
                    next.validValue = false;
                    collect.call(this, next);
                }
            }
        }
        collect.call(this, current);

        for (const [_, invalidator] of [...notify].flatMap(x => [...this.data[x].subscribers])) {
            invalidator();
        }
        for (const [subscriber] of [...notify].flatMap(x => [...this.data[x].subscribers])) {
            subscriber(current.value);
        }
    }

    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    public writable2<T>(value: T, start: StartStopNotifier<T> = internal.noop): Writable<T> {
        let stop: Unsubscriber | null = null;
        const subscribers = new Set<readonly [Subscriber<T>, ((value?: T) => void)]>();
        const set = (new_value: T): void => {
            if (internal.safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !this.subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        this.subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < this.subscriber_queue.length; i += 2) {
                            this.subscriber_queue[i][0](this.subscriber_queue[i + 1]);
                        }
                        this.subscriber_queue.length = 0;
                    }
                }

            }
        }
        const update = (fn: (arg: T) => T) => {
            set(fn(value));
        }
        const subscribe = (run: Subscriber<T>, invalidate: (value?: T) => void = internal.noop): Unsubscriber => {
            const subscriber = [run, invalidate] as const;
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || internal.noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    public derived2<S extends KeysArray, T>(stores: S, fn: (values: KeysValues<S>, set?: (value: T) => void) => T, initial_value?: T): Key<T> {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return this.readable(initial_value as T, (set) => {
            let inited = false;
            const values: KeysValues<S> = [] as KeysValues<S>;
            let pending = 0;
            let cleanup = internal.noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = internal.is_function(result) ? result as any : internal.noop;
                }
            };
            const unsubscribers = (stores_array as Array<any>).map((store: S, i: number) => internal.subscribe(store, (value: any) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                internal.run_all(unsubscribers);
                cleanup();
            };
        });
    }
}
