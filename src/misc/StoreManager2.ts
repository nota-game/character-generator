'use strict';

import type { Readable as ReadableOriginal, Writable as WritableOriginal, StartStopNotifier, Subscriber, Unsubscriber, Updater } from "svelte/store";
import * as internal from "svelte/internal";

import type structuredClone from "@ungap/structured-clone";
import { deepEqual } from "ts-deep-equal";
import type { Data } from "src/models/Data";
import { filterNull, handleUninitilized } from "./misc";
import { cosh } from "mathjs";

export declare type Invalidator<T> = (value?: T) => void;

function identity(p: any) {
    return p;
}


export interface Readable<T, KeyString extends string = string> extends ReadableOriginal<T> {
    key: Key<KeyString, T>;
    // currentValue: () => T | typeof UNINITILEZED;

    /**
     * currentValue
     */
    currentValue<V>(options: { defaultValue: V }): T|V;
    currentValue(): T | typeof UNINITILEZED;

}

export interface Writable<T, KeyString extends string = string> extends WritableOriginal<T> {
    key: Key<KeyString, T>;
    currentValue: () => T 
    

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
    oldValues: any[] | undefined,
    storeType: 'readable' | 'writable' | 'aggregated';
    changingDependent: Set<string>;
    needUpdate: boolean;
    updateIncomplete: boolean;
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
declare type KeysValues<T> = T extends Key<any, any>
    ? KeyData<T>
    : {
        [K in keyof T]: T[K] extends Key<any, any>
        ? KeyData<T[K]>
        : never;
    };
declare type KeysValuesUninitilezed<T> = T extends Key<any, any>
    ? KeyDataUninitilized<T>
    : {
        [K in keyof T]: T[K] extends Key<any, any>
        ? KeyDataUninitilized<T[K]>
        : never;
    };

export declare type KeyData<TKey> =
    TKey extends Key<any, infer TValue>
    ? {
        key: TKey,
        changed: boolean,
        oldValue: TValue | typeof UNINITILEZED,
        newValue: TValue,
    }
    : never
    ;
export declare type KeyDataUninitilized<TKey> =
    TKey extends Key<any, infer TValue>
    ? {
        key: TKey,
        changed: boolean,
        oldValue: TValue | typeof UNINITILEZED,
        newValue: TValue | typeof UNINITILEZED,
    }
    : never
    ;

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

type derivatFunction<T, Param, S extends KeysArray> = (this: SubscriberData<T, Param>, data: Param, values: KeysValues<S>, oldValue: T | typeof UNINITILEZED) => T;
type derivatFunctionUninitized<T, Param, S extends KeysArray> = (this: SubscriberData<T, Param>, data: Param, values: KeysValuesUninitilezed<S>, oldValue: T | typeof UNINITILEZED) => T;

export default class StoreManager<Param> {

    public static key<key extends string>(key: key): KeyOf<key> {
        return {
            of() {
                return { Key: key };
            },
        }
    }

    private readonly data: Record<string, SubscriberData<any, Param>> = {};
    private readonly staticData: Param;
    private readonly clonedFrom: StoreManager<Param> | undefined;
    private readonly clonedTo: StoreManager<Param>[] = [];

    private readonly changedValues: Set<string> = new Set();

    private suspendNotification = false;

    /**
     *
     */
    constructor(staticData: Param, cloneFrom?: { other: StoreManager<Param>, callback: (store: { id: string, manager: StoreManager<Param> } & ({ type: 'writable', store: Writable<unknown> } | { type: 'readable' | 'writable' | 'aggregated', store: Readable<unknown> })) => void }) {
        this.staticData = staticData;
        this.subscriber_queue = [];
        this.clonedFrom = cloneFrom?.other;
        if (cloneFrom) {
            this.suspendNotification = true;
            if (cloneFrom.other.clonedFrom !== undefined) {
                throw new Error('Clone from Clone not permitted');
            }
            cloneFrom.other.clonedTo.push(this);
            this.data = {};
            for (const key of Object.keys(cloneFrom.other.data)) {
                const original = cloneFrom.other.data[key];
                const element = { ...original };
                this.data[key] = element;
                element.changingDependent = new Set();
                element.manager = this;
                element.subscribers = new Set();

                if (element.storeType == 'writable') {
                    const writable = this.writableInternal(StoreManager.key(element.id).of<unknown>(), (key, setFunction) => {
                        element.fn = setFunction;
                        return element;
                    }, element.value, element.compare);
                    cloneFrom.callback({ type: element.storeType, store: writable, id: element.id, manager: this });
                } else {
                    const store = this.readable(StoreManager.key(element.id).of<unknown>())
                    cloneFrom.callback({ type: element.storeType, store: store, id: element.id, manager: this });
                }

            }
            this.suspendNotification = false;
        }
    }

    public checkClone() {
        if (!window.debug) {
            return;
        }
        if (this.clonedFrom == undefined) {
            return;
        }
        let errors = false;
        for (const key of Object.keys(this.data)) {
            if (this.data[key].value != this.clonedFrom.data[key].value) {
                console.warn('A value Changed', key);
                errors = true;
            }
        }
        return errors;
    }
    public resetClone() {
        if (this.clonedFrom == undefined) {
            return;
        }
        if (window.debug) {
            for (const key of Object.keys(this.data)) {
                if (this.data[key].value != this.clonedFrom.data[key].value && !this.changedValues.has(key)) {
                    console.warn('A value Changed that was not marked as changed');
                }
            }
        }
        for (const key of this.changedValues) {
            this.data[key].value = this.clonedFrom.data[key].value;
            this.data[key].oldValues = this.clonedFrom.data[key].oldValues;
        }
        this.changedValues.clear();
    }

    public clone(callback: (store: { id: string, manager: StoreManager<Param> } & ({ type: 'writable', store: Writable<unknown> } | { type: 'readable' | 'writable' | 'aggregated', store: Readable<unknown> })) => void): StoreManager<Param> {
        const other = new StoreManager(this.staticData, { other: this, callback });
        return other;
    }

    private readonly subscriber_queue: Array<any>;
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    public readable<KeyString extends string, T>(key: Key<KeyString, T>): Readable<T> {
        const current = this.prepareData(key, 'readable');
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
            key,
            currentValue: (options?: { defaultValue: T }) => {
                if (options !== undefined) {
                    return handleUninitilized(current.value, options.defaultValue);
                }
                else {
                    return current.value as T; // overloading makes porblems with types here ¬_¬
                }
            }
        };
    }





    private prepareData<T>(key: Key<any, T>, storeType: 'readable' | 'writable' | 'aggregated', set?: (this: SubscriberData<T, Param>, data: Param) => (T | typeof UNINITILEZED), options?: { configureData?: (data: SubscriberData<T, Param>) => void }): SubscriberData<T, Param> {
        if (storeType == 'readable' && set !== undefined) {
            throw new Error(`Store ${key.Key} was set to readable but has a setter`);
        }
        if (!this.data[key.Key]) {

            if (this.clonedTo.length > 0 || this.clonedFrom !== undefined) {
                throw new Error(`Can't introduce new store ${key.Key} when already cloned`);
            }

            const setFactory = () => {

                // wildcardIds are initilized here and must be readonly
                return function (this: SubscriberData<T, Param>, data: Param) {
                    // if (current.value !== UNINITILEZED)
                    //     return current.value;

                    if ([...current.dependentOn.values()].filter(x => {
                        if (this.manager.data[x] === undefined)
                            console.log("*****************")
                        // throw new Error("AURS " +x);
                        return this.manager.data[x]?.storeType ?? false
                    }).map(x => this.manager.data[x].value !== UNINITILEZED).every(x => x)) {


                        // find the part that is fix
                        const root = key.Key.replace(/\/\*.*/, "");
                        return StoreManager.mergeDeep({},
                            ...[...current.dependentOn.values()].filter(x => this.manager.data[x]?.storeType).map(x => {
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
                                        currentPart[element] = this.manager.data[x].value;
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
                oldValues: undefined,
                compare: undefined,
                changingDependent: new Set(),
                needUpdate: false,
                updateIncomplete: false,
                storeType: storeType,
                subscribers: new Set<readonly [Subscriber<T>, ((value?: T) => void)]>()
            };
            if (options?.configureData) {
                options.configureData(current);
            }
            if (set) {
                current.fn = (data) => set.call(current, data);
            }
            this.data[key.Key] = current;

            if (set == undefined) {
                const reg = generateRegex(key.Key);
                Object.values(this.data).filter(x => reg.test(x.id) && x.id !== key.Key).forEach(x => {
                    if (set !== undefined) {
                        throw `${key.Key} is leaf, cant create ${x.id}`;
                    }
                    AddDependency(x, current);

                });
                Object.values(this.data).filter(x => {
                    const reg = generateRegex(x.id);
                    return reg.test(key.Key) && x.id !== key.Key
                }).forEach(x => {
                    if (set !== undefined) {
                        throw `${key.Key} is leaf, cant create ${x.id}`;
                    }
                    AddDependency(current, x);

                });

            }
            const possibleNewValue = current.fn(this.staticData);


            if ((typeof possibleNewValue !== "object") || Object.keys(possibleNewValue ?? {}).length > 0) {

                this.setValue(current, possibleNewValue);
                // current.needsUpdate.delete(key.Key);

            }

            if (current.storeType == 'aggregated' || current.storeType == 'writable') {

                Object.values(this.data).forEach(other => {
                    const reg = generateRegex(other.id);
                    if (reg.test(current.id) && current.id !== other.id) {
                        // if (other.leaf) {
                        //     throw `${other.id} is leaf, cant create ${current.id}`;
                        // }
                        AddDependency(current, other);
                        const newValue = other.fn(this.staticData);
                        this.Notify(current);
                        // current.needsUpdate.delete(key.Key);


                        if (!(other.compare ?? deepEqual)(newValue, other.value)) {
                            this.setValue<T>(other, newValue);
                            this.Notify(other);
                        }
                    }
                });
            }
            return current;
        }
        else if (set !== undefined) {
            if (this.clonedTo.length > 0 || this.clonedFrom !== undefined) {
                throw new Error(`Can't introduce new store ${key.Key} when already cloned`);
            }

            const current = (this.data[key.Key] as SubscriberData<T, Param>);
            if (current.storeType !== 'readable') {// redables may be changed later to writables
                throw new Error(`Called Writable or derevide multiple Times for key ${key.Key}`);
            }
            if (current.value !== UNINITILEZED) {
                throw new Error(`Not possible already sub kes: ${key.Key}`);

            }
            if (options?.configureData) {
                options.configureData(current);
            }
            current.fn = set;

            this.setValue(current, current.fn(this.staticData))
            this.Notify(current);
            // current.needsUpdate.delete(key.Key);
            current.storeType = storeType;

            return current;
        }
        const current = this.data[key.Key] as SubscriberData<T, Param>;



        return current;
    }


    private setValue<T>(dataHolder: SubscriberData<T, Param>, newValue: T | typeof UNINITILEZED) {
        dataHolder.value = newValue;
        dataHolder.manager.changedValues.add(dataHolder.id);
    }

    private static mergeDeep(target: any, ...sources: any[]): any {
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
                    StoreManager.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {
                        [key]: source[key]
                    });
                }
            }
        }

        return StoreManager.mergeDeep(target, ...sources);
    }

    private writableInternal<T, KeyString extends string>(key: Key<KeyString, T>, getCurrent: (key: Key<any, T>, set: (this: SubscriberData<T, Param>, data: Param) => (T | typeof UNINITILEZED)) => SubscriberData<T, Param>, value: T, compare?: (a: T, b: T) => boolean): Writable<T> {

        let dataValueStore: SubscriberData<T, Param> | undefined = undefined
        const setFunction = () => dataValueStore?.value ?? value;
        const current = getCurrent(key, setFunction);
        dataValueStore = current;
        current.changingDependent.delete(key.Key);
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
                this.invalidate(current);
                // storedValue = new_value;
                this.setValue(current, new_value);
                this.clonedTo.forEach(x => x.setValue(x.data[current.id], new_value))
                this.Notify(current);

                if (window.debug) {
                    // Debug
                    for (const [, value] of (Object.entries(this.data))) {
                        if (value.changingDependent.size > 0) {
                            console.warn(`Not everything notified when changing ${current.id}: ${value.id} has missing entrys, cleanup ${this.clonedFrom == undefined ? 'main' : 'clone'}…`, value.changingDependent);
                            value.changingDependent.clear();
                        }
                    }
                }
            }
        }
        const update = (updater: Updater<T>): void => {
            if (current.value == UNINITILEZED) {
                throw new Error('Not initilized yet. Should not happen.');
            }
            const new_value = updater(current.value);
            if (current.value == UNINITILEZED || !(current.compare ?? deepEqual)(current.value, new_value)) {
                this.invalidate(current);
                // storedValue = new_value;
                this.setValue(current, new_value);
                this.clonedTo.forEach(x => x.setValue(x.data[current.id], new_value));
                this.Notify(current);
            }
        }
        // const xxKay = this.key<"a", string>("a");
        // this.writable(xxKay, '');
        // this.derived(this.key<"123", number>("123"), (x) => {
        //     return x;
        // })
        return {
            subscribe, set, update, key, currentValue: () => current.value
        };
    }

    public writable<T, KeyString extends string>(key: Key<KeyString, T>, value: T, compare?: (a: T, b: T) => boolean): Writable<T> {
        return this.writableInternal(key, (key, setFunction) => this.prepareData(key, 'writable', setFunction), value, compare);
    }

    // , fn: (values: StoresValues<S>, set?: (value: T) => void) => T, initial_value?: T
    // public derived<K extends Keys, T>(values: KeysValues<K>, fn: (values: KeysValues<K>) => T): Readable<T> {
    public derived<S extends KeysArray, T, KeyString extends string>(key: Key<KeyString, T>, stores: S, fn: derivatFunction<T, Param, S>, options?: { compare?: (a: T | typeof UNINITILEZED, b: T | typeof UNINITILEZED) => boolean, evalueateUndefined?: false | undefined }): Readable<T>
    public derived<S extends KeysArray, T, KeyString extends string>(key: Key<KeyString, T>, stores: S, fn: derivatFunctionUninitized<T, Param, S>, options?: { compare?: (a: T | typeof UNINITILEZED, b: T | typeof UNINITILEZED) => boolean, evalueateUndefined: true }): Readable<T>
    public derived<S extends KeysArray, T, KeyString extends string>(key: Key<KeyString, T>, stores: S, fn: derivatFunction<T, Param, S>, options?: { compare?: (a: T | typeof UNINITILEZED, b: T | typeof UNINITILEZED) => boolean, evalueateUndefined?: boolean }): Readable<T> {
        const single = !Array.isArray(stores);
        const stores_array: Array<Key<any, any>> = single
            ? [stores]
            : stores;

        // let oldValues: any[];

        stores_array.forEach(x => {
            const toAdd = this.prepareData(x, 'readable');
        });
        const current: SubscriberData<T, Param> = this.prepareData(key, 'aggregated', function (data) {
            // const missingStore = stores_array.map(x => this.manager.data[x.Key]).filter(x => !(x !== undefined && x.value !== UNINITILEZED && x.changingDependent.size == 0))
            // console.time(`check if ready derived store ${this.id}`);
            const everyThingReady = (this.changingDependent.size == 0) && stores_array.map(x => this.manager.data[x.Key]).every(x => x !== undefined && x.value !== UNINITILEZED && x.changingDependent.size == 0);
            // console.timeEnd(`check if ready derived store ${this.id}`);
            if (everyThingReady || this.updateIncomplete) {
                // console.time(`check changes derived store ${this.id}`);
                const changes = stores_array.map((x, i) => this.oldValues == undefined ? true : !(this.manager.data[x.Key].compare ?? ((a, b) => a == b))(this.manager.data[x.Key].value, this.oldValues[i]))
                // console.timeEnd(`check changes derived store ${this.id}`);
                this.oldValues = stores_array.map(x => this.manager.data[x.Key].value);
                const results = stores_array.map((x, i) => (
                    {
                        newValue: this.manager.data[x.Key].value,
                        oldValue: this.oldValues === undefined ? UNINITILEZED : this.oldValues[i],
                        changed: changes[i],
                        key: x,
                    }));
                if (!everyThingReady) {
                    // we updated but not all values were present, so we need to update later again.
                    this.needUpdate = true;
                }
                // console.time(`Update derived store ${this.id}`);
                const result = fn.call(this, data, single ? results[0] : results as any, this.value);
                // console.timeEnd(`Update derived store ${this.id}`);

                return result;
            }
            return UNINITILEZED;
        }, {
            configureData: (data) => {
                data.updateIncomplete = options?.evalueateUndefined ?? false;
                data.compare = options?.compare;
            }
        });

        // current.updateIncomplete = options?.evalueateUndefined ?? false;
        stores_array.forEach(x => {
            const toAdd = this.prepareData(x, 'readable');

            AddDependency(toAdd, current);


        });






        return this.readable(key);





    }



    private invalidate(current: SubscriberData<any, Param>) {

        const notify = new Set<string>();

        function collect(this: StoreManager<Param>, current: SubscriberData<any, Param>) {
            for (const also of current.alsoNotify) {
                if (!notify.has(also)) {
                    notify.add(also);
                    const next = this.data[also];
                    // collect.call(this, next);
                }
            }
        }



        collect.call(this, current);


        // for (const [_, invalidator] of current.subscribers) {
        //     invalidator();
        // }
        // for (const [subscriber] of current.subscribers) {
        //     subscriber(current.value);
        // }



        for (const n of [...notify].map(x => this.data[x])) {
            // if (n.fn == UNINITILEZED) {
            //     continue;
            // }
            if (!n.changingDependent.has(current.id)) {
                n.changingDependent.add(current.id);
                this.invalidate(n);
            }
        }
    }

    // This tracks changes everey Change will increas the number
    private lastChange = 0;
    private Notify(current: SubscriberData<any, Param>, valueChanged?: false) {
        const toNotify = new Set<string>();
        toNotify.add(current.id);
        this.NotifyInternal(current, valueChanged, {}, toNotify);

        if (toNotify) {



            for (const element of [...toNotify]) {
                const data = current.manager.data[element];


                for (const [subscriber, invalidator] of data.subscribers) {

                    invalidator();
                    subscriber(data.value);
                }
            }
        }
    }
    private NotifyInternal(current: SubscriberData<any, Param>, valueChanged: false | undefined, alreadyNotified: Record<string, number>, subscribersToNotiyf: Set<string>) {
        if (this.suspendNotification) {
            return;
        }

        // If no change happend since the last notification of this object, there is nothing todo.
        if (alreadyNotified[current.id] == this.lastChange) {
            return;
        } else {
            alreadyNotified[current.id] = this.lastChange;
        }





        const notify = new Set<string>(current.alsoNotify);
        const clear = new Set<string>();

        function collect(this: StoreManager<Param>, current: SubscriberData<any, Param>) {
            for (const also of current.alsoNotify) {
                if (!clear.has(also)) {
                    clear.add(also);
                    const next = this.data[also];
                    collect.call(this, next);
                }
            }
        }
        collect.call(this, current);

        // if (current.value !== UNINITILEZED) {


        //     // for (const [subscriber] of current.subscribers) {
        //     //     subscriber(current.value);
        //     // }
        // }



        if (current.changingDependent.size === 0 || current.updateIncomplete) {

            for (const n of [...clear].map(x => this.data[x])) {
                // we also need to change wehen dependent list change
                if (n.changingDependent.has(current.id)) {
                    this.recordChange();
                    n.changingDependent.delete(current.id);
                }
            }
        }
        for (const n of [...notify].map(x => this.data[x])) {
            // if (n.fn == UNINITILEZED) {
            //     continue;
            // }
            if (valueChanged !== false || n.needUpdate) {
                n.needUpdate = false;
                const newValue = n.fn(this.staticData);
                if (newValue !== UNINITILEZED && !(n.compare ?? deepEqual)(n.value, newValue)) {

                    this.setValue(n, newValue);
                    subscribersToNotiyf.add(n.id);

                    this.clonedTo.forEach(x => x.setValue(x.data[n.id], newValue));

                    // we need to note the change before we notify
                    this.recordChange();
                    this.NotifyInternal(n, undefined, alreadyNotified, subscribersToNotiyf);
                }
                else if (newValue === UNINITILEZED) {
                    n.needUpdate = true;
                    this.NotifyInternal(n, false, alreadyNotified, subscribersToNotiyf)
                } else {
                    this.NotifyInternal(n, false, alreadyNotified, subscribersToNotiyf)
                }
            } else {
                this.NotifyInternal(n, false, alreadyNotified, subscribersToNotiyf)
            }
        }


        return subscribersToNotiyf;

    }

    private recordChange() {
        this.lastChange++;
        if (this.lastChange >= Number.MAX_SAFE_INTEGER) {
            this.lastChange = 0;
        }
    }
}
function AddDependency(notifier: SubscriberData<any, any>, dependend: SubscriberData<any, any>) {
    notifier.alsoNotify.add(dependend.id);
    dependend.dependentOn.add(notifier.id);
}

function generateRegex(key: string) {
    return new RegExp("^" + (key).replace('|', '\\|').replace('**', '.+').replace('*', '[^/]+') + '($|(/.+))');
}

