import type { NahkampfWaffenDefinition_kampf_ausstattung, TalentDefinition_talent, _Taktik } from "src/data/nota.g";
import { sum } from "src/misc/misc";
import type { TacticsInformation } from "src/view/game/mele/actionTacticsTacticConfig.svelte";
import { derived, type Readable } from "svelte/store";
import type { CharacterState, fatiqueType } from "../CharacterState";
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
    public readonly addedFatiqu: Readonly<Record<fatiqueType, number>>;
    
    // tacticsInformation: any;
    constructor(charState: CharacterState, weapon: NahkampfWaffenDefinition_kampf_ausstattung | undefined, tacticsInformation: TacticsInformation[], talent: TalentDefinition_talent, difficulty = 0, testIndex = 0) {
        const belastung = sum(...tacticsInformation.map(x => parseFloat(x.tactic.Belastung) + sum(...x.support.map(y => parseFloat(y.tactic.Belastung)))));
        const belastungOverTwo = Math.ceil(Math.max(0, belastung - 2));
        const taw = charState.char.talente[talent.Id].effective.currentValue({ defaultValue: 0 });
        const multiplier = Math.pow(0.5, belastungOverTwo);
        const tawTarget = Math.floor(taw * multiplier);
        const change = taw - tawTarget
        super(charState, talent, difficulty + change, testIndex);

        const au = sum(...tacticsInformation.map(x => x.tactic.Kosten + sum(...x.support.map(y => y.tactic.Kosten))));

        this.addedFatiqu = this.charState.addFatique('Erschöpfung', au, true);
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