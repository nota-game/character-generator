import type { NahkampfWaffenDefinition_kampf_ausstattung, TalentDefinition_talent, _Taktik } from "src/data/nota.g";
import type { TacticsInformation } from "src/view/game/mele/actionTacticsTacticConfig.svelte";
import { derived, type Readable } from "svelte/store";
import type { CharacterState } from "../CharacterState";
import { LogSimpleRole } from "./LogSimpleRole";




export class LogBattleAction extends LogSimpleRole {
    // public readonly tacticsInformation: readonly Readonly<TacticsInformation>[];
    public readonly weapon: Readonly<NahkampfWaffenDefinition_kampf_ausstattung> | undefined;
    public readonly tacticsInformation: Readable<readonly Readonly<{
        support: {
            tactic: _Taktik;
            variables: Record<string, number>;
        }[];
        tactic: _Taktik;
        variables: Record<string, number>;
        tacticValue: number;
    }>[]>;
    // tacticsInformation: any;
    constructor(charState: CharacterState, weapon: NahkampfWaffenDefinition_kampf_ausstattung | undefined, tacticsInformation: TacticsInformation[], talent: TalentDefinition_talent, difficulty = 0, testIndex = 0) {
        super(charState, talent, difficulty, testIndex);
        this.weapon = weapon;

        this.tacticsInformation = derived(this.tawResult, taw => {
            return tacticsInformation.map(x => {
                return {
                    support: x.support.map(x => ({ tactic: x.tactic, variables: x.variables })),
                    tactic: x.tactic,
                    variables: x.variables,
                    tacticValue: x.f(taw < 0 ? 0 : taw) + taw
                }
            })
        })

    }
}