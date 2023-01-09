'use strict';

import type { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from "svelte/store";
import * as internal from "svelte/internal";

import type structuredClone from "@ungap/structured-clone";
import { deepEqual } from "ts-deep-equal";
import type { Data } from "src/models/Data";
import { filterNull } from "./misc";

export declare type Invalidator<T> = (value?: T) => void;

function identity(p: any) {
    return p;
}

// eslint-disable-next-line @typescript-eslint/ban-types

export const UNINITILEZED: unique symbol = Symbol.for("UNINITILEZED");


type SubscriberData<T, Param> = {
    id: string;
    value: T | typeof UNINITILEZED;
    alsoNotify: Set<string>;
    fn: ((this: SubscriberData<T, Param>, data: Param) => T | typeof UNINITILEZED);
    manager: StoreManager<Param>,
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
declare type KeysValuesArray<T> = {
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

export default class StoreManager<Param> {

    public key<key extends string>(key: key): KeyOf<key> {
        return {
            of() {
                return { Key: key };
            },
        }
    }

    private readonly data: Record<string, SubscriberData<any, Param>> = {};
    private readonly staticData: Param;


    /**
     *
     */
    constructor(staticData: Param) {
        this.staticData = staticData;
        this.subscriber_queue = [];
    }

    private readonly subscriber_queue: Array<any>;
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    public readable<KeyString extends string, T>(key: Key<KeyString, T>): Readable<T> & { key: Key<KeyString, T> } {
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
            subscribe,
            key
        };
    }





    private prepareData<T>(key: Key<any, T>, set?: (this: SubscriberData<T, Param>, data: Param) => (T | typeof UNINITILEZED)): SubscriberData<T, Param> {
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

            const current: SubscriberData<T, Param> = {
                id: key.Key,
                value: UNINITILEZED,
                dependentOn: new Set(),
                alsoNotify: new Set(),
                manager: this,
                fn: set ?? setFactory(),
                compare: undefined,
                leaf: set !== undefined,
                subscribers: new Set<readonly [Subscriber<T>, ((value?: T) => void)]>()
            };
            if (set) {
                current.fn = (data) => set.call(current, data);
            }
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
            current.value = current.fn(this.staticData);
            if (current.leaf) {

                Object.values(this.data).forEach(other => {
                    const reg = new RegExp("^" + other.id.replace('**', '.+').replace('*', '[^/]+') + '($|(/.+))');
                    if (reg.test(current.id) && current.id !== other.id) {
                        // if (other.leaf) {
                        //     throw `${other.id} is leaf, cant create ${current.id}`;
                        // }
                        current.alsoNotify.add(other.id);
                        other.dependentOn.add(current.id);
                        const newValue = other.fn(this.staticData);
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
            const current = (this.data[key.Key] as SubscriberData<T, Param>);
            if (current.leaf) {
                throw new Error(`Called Writable or derevide multiple Times for key ${key.Key}`);
            }
            current.fn = set;
            current.value = current.fn(this.staticData);
            current.leaf = true;
            return current;
        }
        const current = this.data[key.Key] as SubscriberData<T, Param>;



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


    public writable<T, KeyString extends string>(key: Key<KeyString, T>, value: T, compare?: (a: T, b: T) => boolean): Writable<T> & { key: Key<KeyString, T> } {
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
            subscribe, set, update, key
        };
    }

    // , fn: (values: StoresValues<S>, set?: (value: T) => void) => T, initial_value?: T
    // public derived<K extends Keys, T>(values: KeysValues<K>, fn: (values: KeysValues<K>) => T): Readable<T> {
    public derived<S extends KeysArray, T, KeyString extends string>(key: Key<KeyString, T>, stores: S, fn: (this: SubscriberData<T, Param>, data: Param, values: KeysValues<S>, changes: boolean[], oldValue: T | typeof UNINITILEZED) => T, compare?: (a: T | typeof UNINITILEZED, b: T | typeof UNINITILEZED) => boolean): Readable<T> & { key: Key<KeyString, T> } {
        const single = !Array.isArray(stores);
        const stores_array: Array<Key<any, any>> = single
            ? [stores]
            : stores;

        let oldValues: any[];

        stores_array.forEach(x => {
            const toAdd = this.prepareData(x);
        });
        const current: SubscriberData<T, Param> = this.prepareData(key, function (data) {
            if (stores_array.every(x => this.manager.data[x.Key] !== undefined && this.manager.data[x.Key].value !== UNINITILEZED)) {
                const changes = stores_array.map((x, i) => oldValues == undefined ? true : (this.manager.data[x.Key].compare ?? deepEqual)(this.manager.data[x.Key].value, oldValues[i]))
                oldValues = stores_array.map(x => this.manager.data[x.Key].value);
                return fn.call(this, data, single ? this.manager.data[stores_array[0].Key].value : stores_array.map(x => this.manager.data[x.Key].value, changes) as any, changes, this.value)
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



    private Notify(current: SubscriberData<any, Param>) {

        const notify = new Set<string>();

        function collect(this: StoreManager<Param>, current: SubscriberData<any, Param>) {
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
            // if (n.fn == UNINITILEZED) {
            //     continue;
            // }
            const newValue = n.fn(this.staticData);
            if (!(current.compare ?? deepEqual)(n.value, newValue)) {
                n.value = newValue;
                this.Notify(n);
            }

        }
    }
}
