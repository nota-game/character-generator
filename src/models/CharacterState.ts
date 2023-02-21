import { Wound } from "src/controls/hitman";
import type { Lokalisierungen_misc, TalentDefinition_talent } from "src/data/nota.g";
import { d20 } from "src/misc/misc";
import { derived, get, writable, type Readable } from "svelte/store";
import type { Charakter } from "./Character";

export type fatiqueType = 'Blutung' | 'Erschöpfung' | 'Verausgabung' | 'Strapazierung';

type Log = LogMessage | LogSimpleRole;

export type LogMessage = {
    type: 'message',
    message: string,
}

export type rolePropertys = {
    role: number;
    target: number;
    substituted?: number;
    ignored?: true;
    name: Lokalisierungen_misc;
};
export type LogSimpleRole = {
    type: 'simple-role',
    talent: TalentDefinition_talent;
    roles: rolePropertys[];
    taw: number;
    tawResult: number;
    quality: number;
    begabung: (readonly [string, number])[];
};


export class CharacterState {
    public readonly char: Charakter;

    public readonly log: Readable<Log[]>;
    private logSetter = writable([] as Log[]);

    public readonly fatique = {
        Blutung: writable(0),
        Erschöpfung: writable(0),
        Verausgabung: writable(0),
        Strapazierung: writable(0),
    } as const;

    public readonly wounds = {
        blutung: writable(0),
        linkerArm: new Wound(),
        rechterArm: new Wound(),
        linkesBein: new Wound(),
        rechtesBein: new Wound(),
        brust: new Wound(),
        bauch: new Wound(),
        kopf: new Wound(),
    } as const;

    public readonly MaxAussdauer: number;

    public readonly Ausdauer = derived(Object.values(this.fatique), ([Blutung, Erschöpfung, Verausgabung, Strapazierung,]) => this.MaxAussdauer - Blutung - Erschöpfung - Verausgabung - Strapazierung);

    constructor(char: Charakter) {
        this.char = char;
        this.MaxAussdauer = char.eigenschaften['ausdauer'].effective.currentValue({
            defaultValue: 1
        }) ?? 1;
        this.log = derived(this.logSetter, x => x);

    }

    public addLog(log: Log) {
        this.logSetter.update(x => {
            
            return [log,...x];
        })
    }

    /**
     * newRound
     */
    public newRound() {
        this.addLog({ type: 'message', message: 'Beginne neue Runde' });
        const currentBleeding = get(this.wounds.blutung);
        if (currentBleeding > 0) {
            this.fatique.Blutung.update(x => x + currentBleeding);
            this.addLog({ type: 'message', message: `Blutung verursacht ${currentBleeding} Blutungspungte. Aktuelle Ausdauer ${get(this.Ausdauer)}` });

            if (d20() > 19) {
                this.wounds.blutung.update(x => Math.max(0, x - 1));
                if (currentBleeding == 1) {
                    this.addLog({ type: 'message', message: `Die Blutung hat sich gestoppt.` });
                } else {
                    this.addLog({ type: 'message', message: `Die Blutung hat sich reduziert.` });
                }
            }

        }

    }

    public rest(hours: number) {
        this.recover('full');
        const verausgabung = get(this.fatique.Verausgabung);

        if (verausgabung == 0 && get(this.fatique.Strapazierung) == 0) {
            this.addLog({ type: 'message', message: `Rast (${hours} Stunden) war angenehm, aber es gab nichts zum regenerienen.` });
        } else if (verausgabung < hours) {
            hours -= verausgabung / 2;
            this.fatique.Verausgabung.set(0);
            const amountOfStrapazierungToRemove = Math.floor(hours / 2);
            this.fatique.Strapazierung.update(x => Math.max(0, x - amountOfStrapazierungToRemove));

            if (verausgabung > 0 && amountOfStrapazierungToRemove > 0) {
                this.addLog({ type: 'message', message: `Rasten (${hours} Stunden) Regeneriert ${amountOfStrapazierungToRemove} Strapazierung und sämtliche Verausgabung.` });
            } else if (verausgabung > 0) {
                this.addLog({ type: 'message', message: `Rasten (${hours} Stunden) sämtliche Verausgabung.` });
            } else if (amountOfStrapazierungToRemove > 0) {
                this.addLog({ type: 'message', message: `Rasten (${hours} Stunden) Regeneriert ${amountOfStrapazierungToRemove} Strapazierung.` });
            } else {
                this.addLog({ type: 'message', message: `Rast (${hours} Stunden) war nicht lange genug zur erholung.` });
            }
        } else {
            this.fatique.Verausgabung.update(x => Math.floor(Math.max(0, x - hours * 2)));
            this.addLog({ type: 'message', message: `Rasten (${hours} Stunden) Regeneriert ${verausgabung - get(this.fatique.Verausgabung)} Verausgabung.` });
        }
    }

    public restForBleeding() {
        const recoveing = Math.min(Math.floor(get(this.Ausdauer) / 10), 1)
        this.fatique.Blutung.update(x => {
            const newValue = Math.max(0, x - recoveing);
            if (newValue == 0) {
                this.addLog({ type: 'message', message: `Die Ruhe hat sämtliche folgen des Blutverlustes aufgehoben.` });
            } else {
                this.addLog({ type: 'message', message: `Die Ruhe hat ${recoveing} Blutverlust regeneriert.` });
            }
            return newValue;
        })
    }

    /**
     * recover
     */
    public recover(type: 'half' | 'full') {
        const existingFatique = get(this.fatique.Erschöpfung);
        const addedVerausgabung = Math.floor(existingFatique / 6);
        if (type == 'full') {
            this.fatique.Erschöpfung.set(0);
            if (addedVerausgabung > 0) {
                this.addLog({ type: 'message', message: `Alle Erschöpfung ist vegangen, aber dafür wurden ${addedVerausgabung} Verausgabung erhaten.` });
            } else {
                this.addLog({ type: 'message', message: `Alle Erschöpfung ist vegangen.` });
            }
        } else {
            this.fatique.Erschöpfung.update(x => Math.floor(existingFatique / 2));
            if (addedVerausgabung > 0) {
                this.addLog({ type: 'message', message: `Erschöpfung wurde auf ${Math.floor(existingFatique / 2)} reduziert, aber dafür wurden ${addedVerausgabung} Verausgabung erhaten.` });
            } else {
                this.addLog({ type: 'message', message: `Erschöpfung wurde auf ${Math.floor(existingFatique / 2)} reduziert.` });
            }
        }
        this.addFatique('Verausgabung', addedVerausgabung);
    }

    public addFatique(type: fatiqueType, amount = 1) {
        this.fatique[type].update(x => {
            if (type == 'Verausgabung') {
                const maxAdditonal = 6 - x;
                const notAddable = Math.max(amount - maxAdditonal, 0);
                this.addFatique('Strapazierung', notAddable);
                return Math.min(Math.max(0, x + amount), 6);
            }
            if (amount > 0) {
                this.addLog({ type: 'message', message: `${amount} ${type} wurde erhalten.` });
            } else {
                this.addLog({ type: 'message', message: `${amount} ${type} wurde entfernt.` });
            }
            return Math.max(x + amount, 0);
        })
    }



}