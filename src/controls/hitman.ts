import { get, writable, type Writable } from "svelte/store";

export type WoundServity = 'leicht' | 'mittel' | 'schwer' | 'amputiert';

export class Wound {


    constructor() {
        this.leicht = writable(0);
        this.mittel = writable(0);
        this.schwer = writable(0);
        this.amputiert = writable(0);
    }

    public readonly leicht: Writable<number>;
    public readonly mittel: Writable<number>;
    public readonly schwer: Writable<number>;
    public readonly amputiert: Writable<number>;

    public heal(servety: WoundServity) {
        this[servety].update(x => Math.max(x - 1, 0));

    }

    public hit(servety: WoundServity) {
        function increase(servety: WoundServity): WoundServity |null{
            return servety == 'leicht'
                ? 'mittel'
                : servety == 'mittel'
                    ? 'schwer'
                    : servety == 'schwer'
                        ? 'amputiert'
                        : null;
        }

        const max =
            servety == 'leicht' ? 3 : servety == 'mittel' ? 2 : servety == 'schwer' ? 1 : 1;
        if (get(this[servety]) >= max) {
            const increased = increase(servety);
            if(increased!=null){
                this.hit(increased);
            }
        } else {
            this[servety].update(x => x + 1);
        }
    }
}
