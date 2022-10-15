'use strict';

import type { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
import * as internal from "svelte/internal";

import type structuredClone from "@ungap/structured-clone";
import { deepEqual } from "ts-deep-equal";

export declare type Invalidator<T> = (value?: T) => void;

function identity(p: any) {
    return p;
}

// eslint-disable-next-line @typescript-eslint/ban-types

export const UNINITILEZED: unique symbol = Symbol.for("UNINITILEZED");


type SubscriberData<T> = {
    id: string;
    value: T | typeof UNINITILEZED;
    alsoNotify: Set<string>;
    fn: (() => T | typeof UNINITILEZED);
    compare: ((a: T, b: T) => boolean) | undefined;
    dependentOn: Set<string>;
    leaf: boolean;
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
declare type KeysValues<T> = T extends Key<any, infer U> ? U : {
    [K in keyof T]: T[K] extends Key<any, infer U> ? U : never;
};

export interface Key<K extends string, T> {
    /**
     * Subscribe on value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    Key: K;
}

interface KeyOf<key extends string> {
    of<T>(): Key<key, T>;
}

export default class StoreManager {

    public key<key extends string>(key: key): KeyOf<key> {
        return {
            of() {
                return { Key: key };
            },
        }
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
            if (current.value !== UNINITILEZED)
                run(current.value);
            return () => {
                current.subscribers.delete(subscriber);
            };
        }
        return {
            subscribe
        };
    }





    private prepareData<T>(key: Key<any, T>, set?: () => T): SubscriberData<T> {
        if (!this.data[key.Key]) {

            const setFactory = () => {
                // wildcardIds are initilized here and must be readonly


                return () => {
                    // if (current.value !== UNINITILEZED)
                    //     return current.value;

                    if ([...current.dependentOn.values()].filter(x => {
                        if (this.data[x] === undefined)
                            console.log("*****************")
                        // throw new Error("AURS " +x);
                        return this.data[x]?.leaf ?? false
                    }).map(x => this.data[x].value !== UNINITILEZED).every(x => x)) {


                        // find the part that is fix
                        const root = key.Key.replace(/\/\*.*/, "");
                        return this.mergeDeep({},
                            ...[...current.dependentOn.values()].filter(x => this.data[x]?.leaf).map(x => {
                                let tail = x.substring(root.length);
                                if (!tail.startsWith('/')) {
                                    throw 'not implemented';
                                }
                                tail = tail.substring(1);

                                const part = tail.split('/');
                                const rootObjecs: any = {};
                                let currentPart = rootObjecs;
                                for (let i = 0; i < part.length; i++) {
                                    const element = part[i];
                                    if (i == part.length - 1) {
                                        currentPart[element] = this.data[x].value;
                                    } else {
                                        currentPart[element] = {};
                                        currentPart = currentPart[element];
                                    }
                                }
                                return rootObjecs;
                            }));

                        // return [...current.dependentOn.values()].map(x => [this.data[x].id, this.data[x].value]) as T;
                    }
                    return UNINITILEZED;
                };
            };

            const current: SubscriberData<T> = {
                id: key.Key,
                value: UNINITILEZED,
                dependentOn: new Set(),
                alsoNotify: new Set(),
                fn: set ?? setFactory(),
                compare: undefined,
                leaf: set !== undefined,
                subscribers: new Set<readonly [Subscriber<T>, ((value?: T) => void)]>()
            };
            this.data[key.Key] = current;

            if (set == undefined) {
                const reg = new RegExp("^" + key.Key.replace('**', '.+').replace('*', '[^/]+') + '($|(/.+))');
                Object.values(this.data).filter(x => reg.test(x.id) && x.id !== key.Key).forEach(x => {
                    if (set !== undefined) {
                        throw `${key.Key} is leaf, cant create ${x.id}`;
                    }
                    x.alsoNotify.add(key.Key);
                    current.dependentOn.add(x.id);
                });

            }
            current.value = current.fn();
            if (current.leaf) {

                Object.values(this.data).forEach(other => {
                    const reg = new RegExp("^" + other.id.replace('**', '.+').replace('*', '[^/]+') + '($|(/.+))');
                    if (reg.test(current.id) && current.id !== other.id) {
                        // if (other.leaf) {
                        //     throw `${other.id} is leaf, cant create ${current.id}`;
                        // }
                        current.alsoNotify.add(other.id);
                        other.dependentOn.add(current.id);
                        const newValue = other.fn();
                        if (!(other.compare ?? deepEqual)(newValue, other.value)) {
                            other.value = newValue;
                            this.Notify(other);
                        }
                    }
                });
            }

            return current;
        }
        else if (set !== undefined) {
            const current = (this.data[key.Key] as SubscriberData<T>);
            if (current.leaf) {
                throw new Error(`Called Writable or derevide multiple Times for key ${key.Key}`);
            }
            current.fn = set;
            current.value = current.fn();
            current.leaf = true;
            return current;
        }
        const current = this.data[key.Key] as SubscriberData<T>;



        return current;
    }


    private mergeDeep(target: any, ...sources: any[]): any {
        function isObject(item: any) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        }
        if (!sources.length) return target;
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, {
                        [key]: {}
                    });
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {
                        [key]: source[key]
                    });
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }


    public writable<T>(key: Key<any, T>, value: T, compare?: (a: T, b: T) => boolean): Writable<T> {
        let setValue = value;
        const current = this.prepareData(key, () => setValue);
        current.compare = compare;
        // if (current.fn) {
        //     throw Error(`Store for ${key} already initilized`);
        // }

        this.Notify(current);

        const subscribe = (run: Subscriber<T>, invalidate: Invalidator<T> = internal.noop): Unsubscriber => {
            const subscriber = [run, invalidate] as const;
            current.subscribers.add(subscriber);
            if (current.value !== UNINITILEZED)
                run(current.value);
            return () => {
                current.subscribers.delete(subscriber);
            };
        }

        const set = (new_value: T): void => {
            if (current.value === UNINITILEZED || !(current.compare ?? deepEqual)(current.value, new_value)) {
                // this.invalidate(current);
                setValue = new_value;
                current.value = new_value;
                this.Notify(current);
            }
        }
        const update = (updater: Updater<T>): void => {
            if (current.value == UNINITILEZED) {
                throw new Error('Not initilized yet. Should not happen.');
            }
            const new_value = updater(current.value);
            if (current.value == UNINITILEZED || !(current.compare ?? deepEqual)(current.value, new_value)) {
                // this.invalidate(current);
                setValue = new_value;
                current.value = new_value;
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
    public derived<S extends KeysArray, T>(key: Key<any, T>, stores: S, fn: (values: KeysValues<S>, set?: (value: T) => void) => T, compare?: (a: T | typeof UNINITILEZED, b: T | typeof UNINITILEZED) => boolean): Readable<T> {
        const single = !Array.isArray(stores);
        const stores_array: Array<Key<any, any>> = single
            ? [stores]
            : stores;

        stores_array.forEach(x => {
            const toAdd = this.prepareData(x);
        });
        const current = this.prepareData(key, () => {
            if (stores_array.every(x => this.data[x.Key] !== undefined && this.data[x.Key].value !== UNINITILEZED)) {
                return fn(single ? this.data[stores_array[0].Key].value : stores_array.map(x => this.data[x.Key].value) as any)
            }
            return UNINITILEZED;
        });

        current.compare = compare;
        stores_array.forEach(x => {
            const toAdd = this.prepareData(x);
            toAdd.alsoNotify.add(key.Key);
            current.dependentOn.add(x.Key);
        });






        return this.readable(key);





    }



    private Notify(current: SubscriberData<any>) {

        const notify = new Set<string>();

        function collect(this: StoreManager, current: SubscriberData<any>) {
            for (const also of current.alsoNotify) {
                if (!notify.has(also)) {
                    notify.add(also);
                    // const next = this.data[also];
                    // next.validValue = false;
                    // collect.call(this, next);
                }
            }
        }
        collect.call(this, current);

        for (const [_, invalidator] of current.subscribers) {
            invalidator();
        }
        for (const [subscriber] of current.subscribers) {
            subscriber(current.value);
        }



        for (const n of [...notify].map(x => this.data[x])) {
            if (n.fn == UNINITILEZED) {
                continue;
            }
            const newValue = n.fn();
            if (!(current.compare ?? deepEqual)(n.value, newValue)) {
                n.value = newValue;
                this.Notify(n);
            }

        }
    }
}
