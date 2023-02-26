import { Wound } from "src/controls/hitman";
import type { Lokalisierungen_misc, TalentDefinition_talent, _Probe } from "src/data/nota.g";
import { d20, filterNull, join } from "src/misc/misc";
import { derived, get, readable, writable, type Readable, type Writable } from "svelte/store";
import type { Charakter } from "./Character";
import { LogSimpleRole } from "./log/LogSimpleRole";

export type fatiqueType = 'Blutung' | 'Erschöpfung' | 'Verausgabung' | 'Strapazierung';
export type meleMaliType = 'Position' | 'Schmerzen';

type Log = LogMessage | LogSimpleRole;

export class LogMessage {
    public readonly message: readonly string[];

    constructor(message: readonly string[] | string) {
        if (typeof message == 'string') {
            this.message = [message];
        } else {
            this.message = message;
        }
    }

}


export class CharacterState {
    public readonly char: Charakter;

    public readonly log: Readable<Log[]>;
    public readonly defaultErschwernis: Readable<number>;
    private logSetter = writable([] as Log[]);

    public readonly fatique = {
        Blutung: writable(0),
        Erschöpfung: writable(0),
        Verausgabung: writable(0),
        Strapazierung: writable(0),
    } as const;

    public readonly meleMali = {
        Schmerzen: writable(0),
        Position: writable(0),
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

    public readonly MaxGlüksPunkte: number;
    public readonly GlüksPunkte: Writable<number>;

    constructor(char: Charakter) {
        this.char = char;
        this.MaxAussdauer = char.eigenschaften['ausdauer'].effective.currentValue({
            defaultValue: 1
        }) ?? 1;
        this.log = derived(this.logSetter, x => x);
        this.MaxGlüksPunkte = char.eigenschaften['GlP'].effective.currentValue({
            defaultValue: 1
        }) ?? 1;
        this.GlüksPunkte = writable(this.MaxGlüksPunkte);

        this.log = derived(this.logSetter, x => x);

        this.defaultErschwernis = derived([...Object.values(this.fatique), this.Ausdauer], ([Blutung,
            Erschöpfung,
            Verausgabung,
            Strapazierung, Ausdauer]) => {

            return (Ausdauer < 24 ? 3 : 0)
                ;

        });

    }

    public addLog(log: Log) {
        this.logSetter.update(x => {
            return [log, ...x];
        })
    }

    // public refreshLog(log: Log) {
    //     if (log.type == 'simple-role') {

    //         const tawEffectiv = log.taw - log.difficulty;

    //         const tawResult =
    //             tawEffectiv -
    //             log.roles
    //                 .filter((x) => (x.substituted ?? x.role) < x.target)
    //                 .map((x) => x.substituted ?? x.role)
    //                 .reduce((a, b) => a + b, 0);

    //         const quality = tawResult < 1 ? 0 : Math.floor(Math.log2(tawResult)) + 1;
    //         log.tawResult = Math.min(tawResult, log.taw);
    //         log.quality = quality;
    //     }
    //     this.logSetter.update(x => {
    //         return x;
    //     })
    // }


    public simpleSkillCheck(talent: string | TalentDefinition_talent, difficulty = 0, testIndex = 0) {
        const talentInstance = typeof talent == 'string'
            ? this.char.stammdaten.talentMap[talent]
            : talent;

        const log = new LogSimpleRole(this, talentInstance, difficulty, testIndex);
        this.addLog(log);
        return log;
    }

    /**
     * newRound
     */
    public newRound() {
        const message = ['Beginne neue Runde'];
        const currentBleeding = get(this.wounds.blutung);
        const currentPain = get(this.meleMali.Schmerzen);
        if (currentPain > 0) {
            this.meleMali.Schmerzen.update(x => Math.min(0, x - 1));
            message.push('Schmerzen haben sich vermindert');
        }
        if (currentBleeding > 0) {
            this.fatique.Blutung.update(x => x + currentBleeding);
            message.push(`Blutung verursacht ${currentBleeding} Blutungspungte. Aktuelle Ausdauer ${get(this.Ausdauer)}`);

            if (d20() > 19) {
                this.wounds.blutung.update(x => Math.max(0, x - 1));
                if (currentBleeding == 1) {
                    message.push(`Die Blutung hat sich gestoppt.`);
                } else {
                    message.push(`Die Blutung hat sich reduziert.`);
                }
            }

        }

        this.addLog(new LogMessage(message));
    }

    public rest(hours: number) {
        this.recover('full');
        const verausgabung = get(this.fatique.Verausgabung);

        if (verausgabung == 0 && get(this.fatique.Strapazierung) == 0) {
            this.addLog(new LogMessage(`Rast (${hours} Stunden) war angenehm, aber es gab nichts zum regenerienen.`));
        } else if (verausgabung < hours) {
            hours -= verausgabung / 2;
            this.fatique.Verausgabung.set(0);
            const amountOfStrapazierungToRemove = Math.floor(hours / 2);
            this.fatique.Strapazierung.update(x => Math.max(0, x - amountOfStrapazierungToRemove));

            if (verausgabung > 0 && amountOfStrapazierungToRemove > 0) {
                this.addLog(new LogMessage(`Rasten (${hours} Stunden) Regeneriert ${amountOfStrapazierungToRemove} Strapazierung und sämtliche Verausgabung.`));
            } else if (verausgabung > 0) {
                this.addLog(new LogMessage(`Rasten (${hours} Stunden) sämtliche Verausgabung.`));
            } else if (amountOfStrapazierungToRemove > 0) {
                this.addLog(new LogMessage(`Rasten (${hours} Stunden) Regeneriert ${amountOfStrapazierungToRemove} Strapazierung.`));
            } else {
                this.addLog(new LogMessage(`Rast (${hours} Stunden) war nicht lange genug zur erholung.`));
            }
        } else {
            this.fatique.Verausgabung.update(x => Math.floor(Math.max(0, x - hours * 2)));
            this.addLog(new LogMessage(`Rasten (${hours} Stunden) Regeneriert ${verausgabung - get(this.fatique.Verausgabung)} Verausgabung.`));
        }
    }

    public restForBleeding(days: number) {
        const recoveing = Math.max(Math.floor(this.MaxAussdauer / 10), 1) * Math.floor(days);
        this.fatique.Blutung.update(x => {
            const newValue = Math.max(0, x - recoveing);
            if (newValue == 0) {
                this.addLog(new LogMessage(`Die Ruhe hat sämtliche folgen des Blutverlustes aufgehoben.`));
            } else {
                this.addLog(new LogMessage(`Die Ruhe hat ${recoveing} Blutverlust regeneriert.`));
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


        const addedMessages = join(filterNull(Object.entries(this.addFatique('Verausgabung', addedVerausgabung)).map(([type, amount]) => {
            if (amount > 0) {
                return `${amount} ${type}`;
            } else if (amount < 0) {
                return `${amount} ${type}`;
            } else {
                return undefined;
            }
        })), ',', ' und ');

        if (type == 'full') {
            this.fatique.Erschöpfung.set(0);
            if (addedVerausgabung > 0) {
                this.addLog(new LogMessage(`Alle Erschöpfung ist vegangen, aber dafür wurden ${addedMessages} erhaten.`));
            } else {
                this.addLog(new LogMessage(`Alle Erschöpfung ist vegangen.`));
            }
        } else {
            this.fatique.Erschöpfung.update(x => Math.floor(existingFatique / 2));
            if (addedVerausgabung > 0) {
                this.addLog(new LogMessage(`Erschöpfung wurde auf ${Math.floor(existingFatique / 2)} reduziert, aber dafür wurden ${addedMessages} erhaten.`));
            } else {
                this.addLog(new LogMessage(`Erschöpfung wurde auf ${Math.floor(existingFatique / 2)} reduziert.`));
            }
        }
    }

    public addFatique(type: fatiqueType, amount = 1, supressLog = false): Record<fatiqueType, number> {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newValue: Record<fatiqueType, number> = { Blutung: 0, Erschöpfung: 0, Strapazierung: 0, Verausgabung: 0 }; // it will be assingend by callback
        function addData(destination: Partial<Record<fatiqueType, number>>, source: Partial<Record<fatiqueType, number>>) {
            for (const key of ['Blutung', 'Erschöpfung', 'Verausgabung', 'Strapazierung'] as const) {
                destination[key] = (destination[key] ?? 0) + (source[key] ?? 0);
            }
        }

        this.fatique[type].update(x => {
            if (type == 'Verausgabung') {
                const maxAdditonal = 6 - x;
                const notAddable = Math.max(amount - maxAdditonal, 0);
                const toAdd = amount - notAddable;
                addData(newValue, this.addFatique('Strapazierung', notAddable, true));
                const change = Math.min(Math.max(0, x + toAdd), 6);
                const holde = { Verausgabung: toAdd };

                addData(newValue, holde);
                return change;
            }

            const change = Math.max(x + amount, 0);
            const holder = {} as Record<fatiqueType, number>;
            holder[type] = amount;
            addData(newValue, holder);
            return change;
        })
        if (newValue == undefined) {
            throw new Error('should not happen…');
        }

        if (!supressLog) {
            const messages = filterNull(Object.entries(newValue).map(([type, amount]) => {
                if (amount > 0) {
                    return `${amount} ${type} wurde erhalten.`;
                } else if (amount < 0) {
                    return `${amount} ${type} wurde entfernt.`;
                } else {
                    return undefined;
                }
            }));
            if (messages.length > 0) {
                this.addLog(new LogMessage(messages));
            }
        }

        return newValue;
    }
    public addMeleMali(type: meleMaliType, amount = 1) {
        this.meleMali[type].update(x => {
            if (amount > 0) {
                this.addLog(new LogMessage(`${amount} ${type} wurde erhalten.`));
            } else {
                this.addLog(new LogMessage(`${amount} ${type} wurde entfernt.`));
            }
            return Math.max(x + amount, 0);
        })
    }



}