import { Wound } from "src/controls/hitman";
import type { AbleitungsAuswahl_talent, Lokalisierungen_misc, TalentDefinition_talent, _Probe } from "src/data/nota.g";
import { d20, distinct, getTextBesonderheit } from "src/misc/misc";
import { derived, get, readable, writable, type Readable, type Writable } from "svelte/store";
import type { BesonderheitenHolder, Charakter } from "./Character";

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
    difficulty: number;
    quality: number;
    begabung: (readonly [string, number])[];
};


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

    public refreshLog(log: Log) {
        if (log.type == 'simple-role') {

            const tawEffectiv = log.taw - log.difficulty;

            const tawResult =
                tawEffectiv -
                log.roles
                    .filter((x) => (x.substituted ?? x.role) < x.target)
                    .map((x) => x.substituted ?? x.role)
                    .reduce((a, b) => a + b, 0);

            const quality = tawResult < 1 ? 0 : Math.floor(Math.log2(tawResult)) + 1;
            log.tawResult= Math.min(tawResult, log.taw);
            log.quality = quality;
        }
        this.logSetter.update(x => {
            return x;
        })
    }


    public simpleSkillCheck(talentId: string, probe: _Probe, difficulty: number): LogSimpleRole {
        difficulty += get(this.defaultErschwernis);
        const talent = this.char.stammdaten.talentMap[talentId];
        const taw = this.char.talente[talentId].effective.currentValue({ defaultValue: 0 });
        const tawEffectiv = taw - difficulty;
        let tawResult = tawEffectiv;


        console.log('begin role');
        const roles: rolePropertys[] = [];

        function getAbleitungen(params: AbleitungsAuswahl_talent | undefined): string[] {
            if (params == undefined) {
                return [];
            }
            return [
                ...(params.Ableitung?.map((x) => x.Id) ?? []),
                ...(params.Max?.flatMap((x) => getAbleitungen(x)) ?? [])
            ];
        }
        const relatedTalents = distinct([
            talentId,
            ...getAbleitungen(this.char.stammdaten.talentMap[talentId].Ableitungen)
        ]);

        const begabung = relatedTalents
            .map((t) => [this.char.besonderheiten('Begabung Talent', t) as BesonderheitenHolder, t] as const)
            .filter(([b, id]) => {
                const stufe = b.effective.currentValue({ defaultValue: 0 });
                return (id == talentId && stufe > 0) || stufe > 1;
            })
            .map(
                ([b, id]) =>
                    [
                        getTextBesonderheit(
                            this.char.stammdaten.besonderheitenMap['Begabung Talent'],
                            b.effective.currentValue({ defaultValue: 0 }),
                            this.char,
                            id
                        ),
                        d20()
                    ] as const
            );

        for (const e of probe.Eigenschaft) {
            if (e.Name) {
                const meta = this.char.eigenschaften[e.Name].meta.currentValue({ defaultValue: undefined });
                if (!meta) {
                    continue;
                }

                const defaltValue = meta.type == 'bereich' ? meta.default : 21;
                const currentValue =
                    this.char.eigenschaften[e.Name].effective.currentValue({ defaultValue: undefined }) ??
                    defaltValue;
                const role = d20();

                const name = this.char.eigenschaften[e.Name ?? '']?.meta.currentValue({
                    defaultValue: undefined
                })?.Abkürzung ?? {
                    Lokalisirung: [
                        { meta: { Sprache: 'de', Geschlecht: 'Unspezifiziert' }, value: 'UNBEKANT' }
                    ]
                };

                roles.push({ role, target: currentValue, name });

                if (role < currentValue) {
                    tawResult -= role;
                }
            }
        }

        for (let i = 0; i < begabung.length; i++) {
            // role an additional role
            const [, role] = begabung[i];
            console.log('extra role', role);

            const possibleSubstitutions = roles.filter((x) => x.target > (x.substituted ?? x.role));
            const currentOnes = roles.filter((x) => (x.substituted ?? x.role) == 1).length;
            const subs = possibleSubstitutions
                .map((x) => {
                    const change =
                        currentOnes > 0 && role == 1
                            ? -1 // cant do anything here
                            : currentOnes > 1 && (x.substituted ?? x.role != 1)
                                ? -1 // if we have more then one 1 we need to replace that
                                : currentOnes > 1
                                    ? 1 // fix 1 there wont be a better one in this run
                                    : role >= x.target
                                        ? x.substituted ?? x.role
                                        : (x.substituted ?? x.role) - role;
                    return [change, x] as const;
                })
                .filter(([x]) => x > 0)
                .sort(([a], [b]) => b - a);
            console.log('subs', JSON.parse(JSON.stringify(subs)));
            if (subs[0]) {
                const [increse, roleToChange] = subs[0];
                console.log('substitute', JSON.parse(JSON.stringify({ increse, roleToChange })));
                roleToChange.substituted = role;
                tawResult =
                    tawEffectiv -
                    roles
                        .filter((x) => (x.substituted ?? x.role) < x.target)
                        .map((x) => x.substituted ?? x.role)
                        .reduce((a, b) => a + b, 0);
            } else if (role == 20) {
                const s = roles.filter((x) => x.role != 20)[0];
                if (s) {
                    s.substituted = role;
                }
            }
        }

        const quality = tawResult < 1 ? 0 : Math.floor(Math.log2(tawResult)) + 1;

        const roleEntry = {
            type: 'simple-role',
            talent,
            roles,
            taw,
            tawResult: Math.min(tawResult, taw),
            quality,
            difficulty,
            begabung
        } satisfies LogSimpleRole;
        console.log('roleEntry', roleEntry);
        // roleEntrys.push(roleEntry);
        this.addLog(roleEntry);
        return roleEntry;
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