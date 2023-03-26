import type SimplePeer from 'simple-peer';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

export class PeerConnection {
    private peer: SimplePeer.Instance | undefined;
    private readonly onData: (data: string) => void;

    public readonly IsConnected: Readable<boolean>
    private readonly _IsConnected: Writable<boolean>

    constructor(onData: (data: string) => void) {
        this.onData = onData;
        this._IsConnected = writable(false);
        this.IsConnected = derived(this._IsConnected, (x) => x);
    }
    /**
     * registerPerr
     */
    public registerPeer(peer: SimplePeer.Instance) {
        if (this.peer != undefined) {
            throw new Error('peer was already set');
        }
        this.peer = peer;
        peer.on('data', (data) => {
            this.onData(data);
        });
        this._IsConnected.set(true);
    }

    public send(data: string) {
        if (this.peer == undefined) {
            throw new Error('peer not set');
        }
        this.peer.send(data);
    }
}