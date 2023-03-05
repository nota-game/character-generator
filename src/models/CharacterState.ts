import { Wound, type WoundServity } from "src/controls/hitman";
import type { Lokalisierungen_misc, Nachladeeinheit_kampf_ausstattung, NahkampfWaffenDefinition_kampf_ausstattung, TalentDefinition_talent, _Probe, _Trefferzonen } from "src/data/nota.g";
import { d20, filterNull, join } from "src/misc/misc";
import type { TacticsInformation } from "src/view/game/mele/actionTacticsTacticConfig.svelte";
import { derived, get, readable, writable, type Readable, type Writable } from "svelte/store";
import type { Charakter } from "./Character";
import { LogBattleAction } from "./log/LogBattleAction";
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

    public readonly toughness: Readable<Record<keyof _Trefferzonen, Record<WoundServity, number>>>;
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
        Blutung: writable(0),
        LinkerArm: new Wound(),
        RechterArm: new Wound(),
        LinkesBein: new Wound(),
        RechtesBein: new Wound(),
        Brust: new Wound(),
        Hüfte: new Wound(),
        Kopf: new Wound(),
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

        this.defaultErschwernis = derived([...Object.values(this.fatique), ...Object.values(this.meleMali), this.Ausdauer], ([Blutung,
            Erschöpfung,
            Verausgabung,
            Strapazierung,
            Position,
            Schmerzen,
            Ausdauer]) => {

            const maliDistance = [5, 5, 4, 4, 3, 3, 2, 2, 1] as const;

            const maliPositions = Position + Schmerzen;
            let mali = 0;
            for (let maliCurrent = 0, index = 0; maliCurrent <= maliPositions; maliCurrent += maliDistance[index] ?? 1, index++) {
                mali = index;
            }



            return (Ausdauer < 24 ? 3 : 0) + mali;
            ;

        });

        this.toughness = derived([
            this.char.eigenschaften['wiederstandsBrustLeicht'].effective,
            this.char.eigenschaften['wiederstandsBrustMittel'].effective,
            this.char.eigenschaften['wiederstandsBrustSchwer'].effective,
            this.char.eigenschaften['wiederstandsBrustAmputation'].effective,
            this.char.eigenschaften['wiederstandsHüfteLeicht'].effective,
            this.char.eigenschaften['wiederstandsHüfteMittel'].effective,
            this.char.eigenschaften['wiederstandsHüfteSchwer'].effective,
            this.char.eigenschaften['wiederstandsHüfteAmputation'].effective,
            this.char.eigenschaften['wiederstandsKopfLeicht'].effective,
            this.char.eigenschaften['wiederstandsKopfMittel'].effective,
            this.char.eigenschaften['wiederstandsKopfSchwer'].effective,
            this.char.eigenschaften['wiederstandsKopfAmputation'].effective,
            this.char.eigenschaften['wiederstandsLinkerArmLeicht'].effective,
            this.char.eigenschaften['wiederstandsLinkerArmMittel'].effective,
            this.char.eigenschaften['wiederstandsLinkerArmSchwer'].effective,
            this.char.eigenschaften['wiederstandsLinkerArmAmputation'].effective,
            this.char.eigenschaften['wiederstandsLinkesBeinLeicht'].effective,
            this.char.eigenschaften['wiederstandsLinkesBeinMittel'].effective,
            this.char.eigenschaften['wiederstandsLinkesBeinSchwer'].effective,
            this.char.eigenschaften['wiederstandsLinkesBeinAmputation'].effective,
            this.char.eigenschaften['wiederstandsRechterArmLeicht'].effective,
            this.char.eigenschaften['wiederstandsRechterArmMittel'].effective,
            this.char.eigenschaften['wiederstandsRechterArmSchwer'].effective,
            this.char.eigenschaften['wiederstandsRechterArmAmputation'].effective,
            this.char.eigenschaften['wiederstandsRechtesBeinLeicht'].effective,
            this.char.eigenschaften['wiederstandsRechtesBeinMittel'].effective,
            this.char.eigenschaften['wiederstandsRechtesBeinSchwer'].effective,
            this.char.eigenschaften['wiederstandsRechtesBeinAmputation'].effective,

        ], ([wiederstandsBrustLeicht,
            wiederstandsBrustMittel,
            wiederstandsBrustSchwer,
            wiederstandsBrustAmputation,
            wiederstandsHüfteLeicht,
            wiederstandsHüfteMittel,
            wiederstandsHüfteSchwer,
            wiederstandsHüfteAmputation,
            wiederstandsKopfLeicht,
            wiederstandsKopfMittel,
            wiederstandsKopfSchwer,
            wiederstandsKopfAmputation,
            wiederstandsLinkerArmLeicht,
            wiederstandsLinkerArmMittel,
            wiederstandsLinkerArmSchwer,
            wiederstandsLinkerArmAmputation,
            wiederstandsLinkesBeinLeicht,
            wiederstandsLinkesBeinMittel,
            wiederstandsLinkesBeinSchwer,
            wiederstandsLinkesBeinAmputation,
            wiederstandsRechterArmLeicht,
            wiederstandsRechterArmMittel,
            wiederstandsRechterArmSchwer,
            wiederstandsRechterArmAmputation,
            wiederstandsRechtesBeinLeicht,
            wiederstandsRechtesBeinMittel,
            wiederstandsRechtesBeinSchwer,
            wiederstandsRechtesBeinAmputation,]) => {


            return {
                Brust: {
                    leicht: wiederstandsBrustLeicht ?? 0,
                    mittel: wiederstandsBrustMittel ?? 0,
                    schwer: wiederstandsBrustSchwer ?? 0,
                    amputiert: wiederstandsBrustAmputation ?? 0
                },
                Hüfte: {
                    leicht: wiederstandsHüfteLeicht ?? 0,
                    mittel: wiederstandsHüfteMittel ?? 0,
                    schwer: wiederstandsHüfteSchwer ?? 0,
                    amputiert: wiederstandsHüfteAmputation ?? 0
                },
                Kopf: {
                    leicht: wiederstandsKopfLeicht ?? 0,
                    mittel: wiederstandsKopfMittel ?? 0,
                    schwer: wiederstandsKopfSchwer ?? 0,
                    amputiert: wiederstandsKopfAmputation ?? 0
                },
                LinkerArm: {
                    leicht: wiederstandsLinkerArmLeicht ?? 0,
                    mittel: wiederstandsLinkerArmMittel ?? 0,
                    schwer: wiederstandsLinkerArmSchwer ?? 0,
                    amputiert: wiederstandsLinkerArmAmputation ?? 0
                },
                LinkesBein: {
                    leicht: wiederstandsLinkesBeinLeicht ?? 0,
                    mittel: wiederstandsLinkesBeinMittel ?? 0,
                    schwer: wiederstandsLinkesBeinSchwer ?? 0,
                    amputiert: wiederstandsLinkesBeinAmputation ?? 0
                },
                RechterArm: {
                    leicht: wiederstandsRechterArmLeicht ?? 0,
                    mittel: wiederstandsRechterArmMittel ?? 0,
                    schwer: wiederstandsRechterArmSchwer ?? 0,
                    amputiert: wiederstandsRechterArmAmputation ?? 0
                },
                RechtesBein: {
                    leicht: wiederstandsRechtesBeinLeicht ?? 0,
                    mittel: wiederstandsRechtesBeinMittel ?? 0,
                    schwer: wiederstandsRechtesBeinSchwer ?? 0,
                    amputiert: wiederstandsRechtesBeinAmputation ?? 0
                }
            } satisfies Record<keyof _Trefferzonen, Record<WoundServity, number>>;



        })

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

    public perforTacticAction(weapon: NahkampfWaffenDefinition_kampf_ausstattung | undefined, tacticsInformation: TacticsInformation[], talent: string | TalentDefinition_talent, difficulty = 0, testIndex = 0) {
        const talentInstance = typeof talent == 'string'
            ? this.char.stammdaten.talentMap[talent]
            : talent;

        const log = new LogBattleAction(this, weapon, tacticsInformation, talentInstance, difficulty, testIndex);
        this.addLog(log);
        return log;
    }


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
        const currentBleeding = get(this.wounds.Blutung);
        const currentPain = get(this.meleMali.Schmerzen);
        if (currentPain > 0) {
            this.meleMali.Schmerzen.update(x => Math.min(0, x - 1));
            message.push('Schmerzen haben sich vermindert');
        }
        if (currentBleeding > 0) {
            this.fatique.Blutung.update(x => x + currentBleeding);
            message.push(`Blutung verursacht ${currentBleeding} Blutungspungte. Aktuelle Ausdauer ${get(this.Ausdauer)}`);

            if (d20() > 19) {
                this.wounds.Blutung.update(x => Math.max(0, x - 1));
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

    public addDamage(zone: keyof _Trefferzonen, { blunt = 0, cut = 0 }) {


        const toghnes = get(this.toughness);


        let hitServity: WoundServity | undefined;

        if (cut > 0) {
            this.wounds.Blutung.update((x) => x + cut);
        }
        if (blunt > 0) {
            this.wounds[zone];

            const damageBarrier = toghnes[zone];

            this.addFatique;

            let highestBarrier: WoundServity | undefined = undefined;
            for (const barier of ['amputiert', 'schwer', 'mittel', 'leicht'] as const) {
                if (blunt >= damageBarrier[barier]) {
                    highestBarrier = barier;
                    break;
                }
            }
            if (highestBarrier != undefined) {
                hitServity = this.wounds[zone].hit(highestBarrier);
            }
        }

        if (cut > 0 && hitServity != undefined) {
            this.addLog(new LogMessage(`Schaden Erhalten, ${cut} Blutungen, und eine ${hitServity} Wunde am ${zone}.`));
        } else if (cut > 0) {
            this.addLog(new LogMessage(`Schaden Erhalten, ${cut} Blutungen.`));
        } else if (hitServity != undefined) {
            this.addLog(new LogMessage(`Schaden Erhalten, eine ${hitServity} Wunde am ${zone}.`));
        } else {
            this.addLog(new LogMessage(`Kein Schaden erlitten.`));
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