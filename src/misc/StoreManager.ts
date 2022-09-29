'use strict';

import type { Readable, StartStopNotifier, Subscriber, Unsubscriber, Writable } from "svelte/store";
import * as internal from "svelte/internal";



declare type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;
/** One or more values from `Readable` stores. */
declare type StoresValues<T> = T extends Readable<infer U> ? U : {
    [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
};


export default class StoreManager {


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
    public readable<T>(value: T, start: StartStopNotifier<T>): Readable<T> {
        return {
            subscribe: this.writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    public writable<T>(value: T, start: StartStopNotifier<T> = internal.noop): Writable<T> {
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
    public derived<S extends Stores, T>(stores: S, fn: (values: StoresValues<S>, set?: (value: T) => void) => T, initial_value?: T): Readable<T> {


        

        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return this.readable(initial_value as T, (set) => {
            let inited = false;
            const values: StoresValues<S> = [] as StoresValues<S>;
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
