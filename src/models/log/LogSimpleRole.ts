import type { AbleitungsAuswahl_talent, Lokalisierungen_misc, TalentDefinition_talent } from "src/data/nota.g";
import { d20 as originalD20, distinct, filterNull, getLast, getTextBesonderheit, withIndex } from "src/misc/misc";
import { derived, get, writable, type Readable, type Writable } from "svelte/store";
import type { BesonderheitenHolder } from "./../Character";
import type { CharacterState } from "./../CharacterState";



export type rolePropertys = {
    readonly role: number;
    readonly target: number;
    readonly name: Lokalisierungen_misc;
};


export type modifier<used extends 'used' | 'available'> = { readonly id: number, readonly text: string } & (
    {
        readonly type: 'substitute' | 'modify';
        readonly change: number;
        readonly text: string;
        readonly roleIndex: used extends 'used' ? number | undefined : number | 'any'
    } | {
        readonly type: 'ignore';
        readonly text: string;
        readonly roleIndex: used extends 'used' ? number | undefined : number | 'any'
    } | (rolePropertys & {
        readonly type: 'addedRole';
        readonly text: string;
    }) | {
        readonly type: 'quality';
        readonly change: number;
        readonly text: string;
    } | {
        readonly type: 'result';
        readonly change: number;
        readonly text: string;
    }
);

export class LogSimpleRole {
    // private readonly _tawResult = writable(0);
    private readonly _modifier: Writable<readonly modifier<'available'>[]>;


    public readonly charState: CharacterState;

    public readonly effectiveRoles: Readable<readonly rolePropertys[]>;
    public readonly roles: readonly rolePropertys[];
    public readonly tawResult: Readable<number>;
    public readonly quality: Readable<number>;

    public readonly taw: number;
    public readonly modifierAvailable: Readable<readonly modifier<'available'>[]>;
    public readonly modifier: Readable<readonly modifier<'used'>[]>;
    public readonly talent: TalentDefinition_talent;


    public readonly succsess: Readable<boolean>;
    public readonly critical: Readable<boolean>;

    public readonly rawDifficulty: number;
    public readonly baseDifficulty: number;

    public get difficulty(): number {
        return this.rawDifficulty + this.baseDifficulty;
    }

    constructor(charState: CharacterState, talent: TalentDefinition_talent, difficulty = 0, testIndex = 0) {

        // this helps with reproducing bugs in SkillCheck logic
        const newDebugRoles: number[] = [];
        const debugRoles = [
            // 7,
            // 14,
            // 4,
            // 6,
            // 6
        ] as const;
        let debugIndex = 0;

        function d20() {
            const role = originalD20();
            newDebugRoles.push(role);
            console.debug('new Debug roles', newDebugRoles)
            return role;
        }

        this.charState = charState;

        this.talent = talent;
        const probe = talent.Probe[testIndex];
        const talentId = talent.Id;
        const char = charState.char;
        this.taw = char.talente[talentId].effective.currentValue({ defaultValue: 0 });

        this.rawDifficulty = difficulty;
        this.baseDifficulty = get(charState.defaultErschwernis);
        const tawEffectiv = this.taw - this.difficulty;


        this.roles = filterNull(probe.Eigenschaft.map((e) => {
            if (e.Name) {
                const meta = char.eigenschaften[e.Name].meta.currentValue({ defaultValue: undefined });
                if (!meta) {
                    return undefined;
                }

                const defaltValue = meta.type == 'bereich' ? meta.default : 21;
                const currentValue = char.eigenschaften[e.Name].effective.currentValue({ defaultValue: undefined }) ??
                    defaltValue;
                const role = debugRoles[debugIndex++] ?? d20();

                const name = char.eigenschaften[e.Name ?? '']?.meta.currentValue({
                    defaultValue: undefined
                })?.Abkürzung ?? {
                    Lokalisirung: [
                        { meta: { Sprache: 'de', Geschlecht: 'Unspezifiziert' }, value: 'UNBEKANT' }
                    ]
                };
                return { role, target: currentValue, name } satisfies rolePropertys;
            }
        }));


        this._modifier = writable([]);
        this.modifierAvailable = derived(this._modifier, x => x);
        this.modifier = derived(this.modifierAvailable, (modifier) => {
            const roles = [...this.roles.map(x => ({ ...x }))];


            const ignoredRolesFixed = modifier.filter((x): x is modifier<'used'> & { type: 'ignore', roleIndex: number } => x.type == 'ignore' && x.roleIndex != 'any');


            const fixedSubstitutions = filterNull(modifier.filter((x): x is modifier<'available'> & { type: 'substitute'; roleIndex: number; } => x.type == 'substitute' && x.roleIndex != 'any')
                .map(mod => {
                    if (ignoredRolesFixed.map(x => x.roleIndex == mod.roleIndex)) {
                        return undefined;
                    }
                    const currentRole = roles[mod.roleIndex];
                    if (currentRole.role != mod.change
                        && ((currentRole.role < currentRole.target && mod.change < currentRole.role)
                            || (currentRole.role == 1 && roles.filter(x => x.role == 1).length > 1)
                            || mod.change == 20)) {
                        // change local roles so later iterations respect new value
                        currentRole.role = mod.change;
                        return mod satisfies modifier<'used'>;
                    }
                    return undefined;
                }));

            const variableSubstitutions = filterNull(modifier.filter((x): x is modifier<'available'> & { type: 'substitute'; roleIndex: 'any' } => x.type == 'substitute' && x.roleIndex == 'any')
                .map(mod => {
                    const role = mod.change;
                    console.log('extra role', role);

                    const possibleSubstitutions = withIndex(roles).filter(([x]) => x.target > (x.role));
                    const currentOnes = roles.filter((x) => (x.role) == 1).length;
                    const subs = possibleSubstitutions
                        .map(([x, i]) => {
                            const change = currentOnes > 0 && role == 1
                                ? -1 // cant do anything here
                                : currentOnes > 1 && (x.role != 1)
                                    ? -1 // if we have more then one 1 we need to replace that
                                    : currentOnes > 1
                                        ? 1 // fix 1 there wont be a better one in this run
                                        : role >= x.target
                                            ? x.role
                                            : (x.role - role);
                            return [change, x, i] as const;
                        })
                        .filter(([x]) => x > 0)
                        .sort(([a], [b]) => b - a);
                    console.log('subs', JSON.parse(JSON.stringify(subs)));
                    if (subs[0]) {
                        const [increse, roleToChange, index] = subs[0];
                        console.log('substitute', JSON.parse(JSON.stringify({ increse, roleToChange })));
                        roleToChange.role = role;
                        return { ...mod, roleIndex: index } satisfies modifier<'used'>;

                    } else if (role == 20) {
                        const [s, index] = withIndex(roles).filter(([x]) => x.role != 20)[0];
                        if (s) {
                            s.role = role;
                            return { ...mod, roleIndex: index } satisfies modifier<'used'>;
                        }
                    }
                    return undefined;
                }));

            const ignoredRolesVariable = filterNull(modifier.filter((x): x is modifier<'available'> & { type: 'ignore', roleIndex: 'any' } => x.type == 'ignore' && x.roleIndex == 'any')
                .map(mod => {

                    const possibleSubstitutions = roles.filter((x) => x.target > (x.role));
                    const currentOnes = roles.filter((x) => (x.role) == 1).length;
                    const subs = possibleSubstitutions
                        .map((x, i) => {
                            const change = currentOnes > 1 && (x.role != 1)
                                ? -1 // if we have more then one 1 we need to replace that
                                : currentOnes > 1
                                    ? 1 // fix 1 there wont be a better one in this run
                                    : x.role;
                            return [change, x, i] as const;
                        })
                        .filter(([x]) => x > 0)
                        .sort(([a], [b]) => b - a);
                    console.log('subs', JSON.parse(JSON.stringify(subs)));
                    if (subs[0]) {
                        const [increse, roleToChange, index] = subs[0];
                        console.log('substitute', JSON.parse(JSON.stringify({ increse, roleToChange })));
                        roleToChange.role = 20; // just a hack to remove it for further roles from checks
                        return { ...mod, roleIndex: index } satisfies modifier<'used'>;

                    }
                    return undefined;
                }));
            ;


            // this will only keep the last substitution for every role, this should also be the best
            const substitutions = Object.values([...fixedSubstitutions,
            ...variableSubstitutions]
                .reduce((p, c) => p[c.roleIndex] = c, {} as Record<number, modifier<'used'>>));

            const ignoled = Object.values([...ignoredRolesVariable,
            ...ignoredRolesFixed]
                .reduce((p, c) => p[c.roleIndex] = c, {} as Record<number, modifier<'used'> & { type: 'ignore' }>));


            return [
                ...ignoled,
                ...substitutions,
                ...modifier.filter((x): x is modifier<'used'> & { type: 'quality' | 'result' } => x.type == 'quality' || x.type == 'result' || x.type == 'addedRole')
            ]
                // filter out modifiers of ignoled roles
                .filter(x => (x.type !== 'substitute' && x.type !== 'modify') || !ignoled.some(y => y.roleIndex == x.roleIndex))
                ;
        });

        this.effectiveRoles = derived(this.modifier, modifier => {
            return filterNull([...this.roles, ...modifier.filter((x): x is modifier<'used'> & { type: 'addedRole'; } => x.type == 'addedRole')].map((role, index) => {
                // first ignored
                const ignoreModifier = getLast(modifier.filter((x): x is modifier<'used'> & { type: 'ignore'; } => x.type == 'ignore' && x.roleIndex == index));
                if (ignoreModifier) {
                    return undefined;
                }

                // then substitution
                let currentRole = role.role;
                const substiutionModifier = getLast(modifier.filter((x): x is modifier<'used'> & { type: 'substitute'; } => x.type == 'substitute' && x.roleIndex == index));
                if (substiutionModifier)
                    currentRole = substiutionModifier.change;

                // then modify
                const modifyBy = modifier.filter((x): x is modifier<'used'> & { type: 'modify'; } => x.type == 'modify' && x.roleIndex == index)
                    .reduce((p, c) => p + c.change, 0);
                currentRole += modifyBy;

                return { ...role, role: currentRole };
            }));
        });


        this.tawResult = derived([this.effectiveRoles, this.modifier], ([roles, modifier]) => {
            return tawEffectiv -
                roles
                    .filter((x) => (x.role) < x.target)
                    .map((x) => x.role)
                    .reduce((a, b) => a + b, 0)
                + modifier
                    .filter((x): x is modifier<'used'> & { type: 'result' } => x.type == 'result')
                    .reduce((p, c) => p + c.change, 0);
        });

        this.quality = derived([this.tawResult, this.modifier], ([tawResult, modifier]) => {
            const rawQuality = Math.floor(Math.log2(tawResult)) + 1;
            const mod = modifier
                .filter((x): x is modifier<'used'> & { type: 'quality' } => x.type == 'quality')
                .reduce((p, c) => p + c.change, 0);
            return tawResult < 1 ? 0 : rawQuality + mod;
        });





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
            ...getAbleitungen(char.stammdaten.talentMap[talentId].Ableitungen)
        ]);




        this.succsess = derived([this.tawResult, this.effectiveRoles], ([tawResult, effectiveRoles]) => {
            (tawResult >= 0 || effectiveRoles.filter(x => x.role == 20).length >= 2) && effectiveRoles.filter(x => x.role == 1).length < 2;
        });
        this.critical = derived(this.effectiveRoles, (effectiveRoles) => {
            effectiveRoles.filter(x => x.role == 20).length >= 2 && effectiveRoles.filter(x => x.role == 1).length >= 2;
        });

        const begabung = relatedTalents
            .map((t) => [char.besonderheiten('Begabung Talent', t) as BesonderheitenHolder, t] as const)
            .filter(([b, id]) => {
                const stufe = b.effective.currentValue({ defaultValue: 0 });
                return (id == talentId && stufe > 0) || stufe > 1;
            })
            .map(
                ([b, id]) => [
                    getTextBesonderheit(
                        char.stammdaten.besonderheitenMap['Begabung Talent'],
                        b.effective.currentValue({ defaultValue: 0 }),
                        char,
                        id
                    ),
                    debugRoles[debugIndex++] ?? d20()
                ] as const
            ).map(([text, role], index) => {


                return {
                    type: 'substitute',
                    change: role,
                    text,
                    id: index, // we can use index because these are the first created.
                    roleIndex: 'any'
                } satisfies modifier<'available'>;
            });

        this._modifier.set(begabung);

        this.improveWithLuckCost = derived([charState.GlüksPunkte, this.tawResult, this.critical, this.succsess], ([GlüksPunkte, tawResult, critical, succsess]) => {

            if (!succsess && critical) {
                return undefined;
            }


            const missingPoints = tawResult < 0
                ? -tawResult
                : tawResult == 0
                    ? 1
                    : Math.pow(2, Math.floor(Math.log2(tawResult)) + 1) - tawResult;


            if (tawResult + missingPoints > this.taw) {
                return undefined;
            }

            return missingPoints * 2;

        });
    }


    public improveWithLuckCost: Readable<number | undefined>;
    /**
     * reduceWithLuck
     */
    public improveWithLuck(): boolean {
        const cost = get(this.improveWithLuckCost);
        if (cost == undefined || cost > get(this.charState.GlüksPunkte)) {
            return false;
        }
        this._modifier.update(x => {
            return [...x, { type: 'result', change: cost / 2, text: 'Glück verbesserung', id: Math.max(0, ...x.map(x => x.id)) + 1 }];
        });
        // instead of reducing a dice just increase tawResult up to max?
        // that is much easier
        return true;
    }


}
