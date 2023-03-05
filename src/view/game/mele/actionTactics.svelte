<script lang="ts">
	import { number } from 'mathjs';
	import type { NahkampfWaffenDefinition_kampf_ausstattung, _Taktik } from 'src/data/nota.g';
	import { getText, getTextTalent, removeOneOf } from 'src/misc/misc';
	import type { CharacterState } from 'src/models/CharacterState';
	import ActionTacticsTacticConfig, {
		type TacticsInformation
	} from './actionTacticsTacticConfig.svelte';

	export let charData: CharacterState;

	let position = 1;
	let au = 1;

	export let modifierFunction: TacticsInformation[] = [];
	let modifierFunctionSub: TacticsInformation[][] = [];

	$: {
		// const numberOfElements = selectedTactics.length;
		modifierFunction = modifierFunctionSub.flatMap((x) => x);
		// console.log('modifierFunction ', modifierFunction(4));
	}

	$: taktigen = charData.char.stammdaten.Instance.Daten.Taktiken.Taktik;
	let selectedTactics: string[] = ['Angriff', 'Verteidigung'];
	let currentSelctionTactic: string | undefined;

	$: availableWeapons = Object.entries(charData.char.equipment)
		.filter(([, x]) => x.type == 'closeCombatWeapon' && x.equiped.currentValue() == true)
		.map(([key]) => key);

	$: selectedTacticsOrdered = Object.entries(
		selectedTactics.reduce((p, c) => {
			p[c] = (p[c] ?? 0) + 1;
			return p;
		}, {} as Record<string, number>)
	)
		.map(([x, y]) => [charData.char.stammdaten.TaktikMap[x], y] as const)
		.sort(([a], [b]) => getText(a.Name).localeCompare(getText(b.Name)));

	$: weaponSkill = availableWeapons
		.map((x) => charData.char.stammdaten.nahkampfMap[x])
		.flatMap((x) => x.Talente?.Talent.map((y) => [x, y.Id] as const) ?? []);
	// charData.char.stammdaten.nahkampfMap;
	$: belastung = selectedTactics
		.map((x) => charData.char.stammdaten.TaktikMap[x])
		.reduce((p, x) => p + parseFloat(x.Belastung), 0);
	$: ausdauer = selectedTactics
		.map((x) => charData.char.stammdaten.TaktikMap[x])
		.reduce((p, x) => p + x.Kosten, 0);

	let selectedWeaponHandler: string | undefined;
	$: selectedWeaponSkill =
		selectedWeaponHandler == undefined
			? undefined
			: (JSON.parse(selectedWeaponHandler) as readonly [string, string] | undefined);
</script>

<div class="root">
	{JSON.stringify(modifierFunction.map((x) => x.f(4)))}
	<strog style="grid-column: 1/ span 3 ; grid-row: 1; text-align: center;">Taktiken</strog>

	<select
		bind:value={selectedWeaponHandler}
		style="grid-column: 1;grid-row: 2; width: max-content;"
	>
		{#each weaponSkill as [weapon, skill]}
			<option value={JSON.stringify([weapon.Id, skill])}
				>{getText(weapon.Name)}
				<em>({getTextTalent(charData.char.stammdaten.talentMap[skill], charData.char, 'Name')})</em
				></option
			>
		{/each}
	</select>
	<select bind:value={currentSelctionTactic} style="grid-column: 2;grid-row: 2;">
		<optgroup label="Offensiv">
			{#each taktigen.filter((x) => x.Typ == 'Offensiv') as taktik}
				<option value={taktik.Id}>{getText(taktik.Name)}</option>
			{/each}
		</optgroup>
		<optgroup label="Defensiv">
			{#each taktigen.filter((x) => x.Typ == 'Defensiv') as taktik}
				<option value={taktik.Id}>{getText(taktik.Name)}</option>
			{/each}
		</optgroup>
		<optgroup label="Unterstüzend">
			{#each taktigen.filter((x) => x.Typ == 'Unterstützend') as taktik}
				<option value={taktik.Id}>{getText(taktik.Name)}</option>
			{/each}
		</optgroup>
		<optgroup label="Neutral">
			{#each taktigen.filter((x) => x.Typ == 'Neutral') as taktik}
				<option value={taktik.Id}>{getText(taktik.Name)}</option>
			{/each}
		</optgroup>
	</select>

	<button
		style="grid-column: 3;grid-row: 2;"
		disabled={currentSelctionTactic == undefined}
		class="outline"
		on:click={() => (selectedTactics = [...selectedTactics, currentSelctionTactic ?? ''])}>+</button
	>

	<button
		style="grid-column: 4;grid-row: 2;"
		class="outline"
		disabled={currentSelctionTactic == undefined ||
			!selectedTactics.includes(currentSelctionTactic)}
		on:click={() => (selectedTactics = removeOneOf(selectedTactics, currentSelctionTactic ?? ''))}
		>-</button
	>

	<div style="grid-column: 1;grid-row: 3; z-index: 0;">
		{#each selectedTacticsOrdered as [tactic, amount], i (tactic.Id)}<ActionTacticsTacticConfig
				{charData}
				{tactic}
				{amount}
				weapon={charData.char.stammdaten.nahkampfMap[selectedWeaponSkill?.[0] ?? '']}
				on:remove={() => (selectedTactics = removeOneOf(selectedTactics, tactic.Id ?? ''))}
				bind:modifierFunction={modifierFunctionSub[i]}
			/>{' '}
		{:else}
			Keine Taktik Ausgewählt
		{/each}
	</div>

	<div style="grid-column: 2;grid-row: 3;">
		{belastung} Belastung, {ausdauer} Ausdauer
	</div>

	<button
		class="outline"
		style="grid-column: 3/span 2;grid-row: 3;"
		disabled={selectedWeaponSkill == undefined}
		on:click={() =>
			charData.perforTacticAction(
				charData.char.stammdaten.nahkampfMap[selectedWeaponSkill?.[0] ?? ''],
				modifierFunction,
				selectedWeaponSkill?.[1] ?? ''
			)}>Ausführen🚧</button
	>
</div>

<style lang="scss">
	button.text {
		display: inline;
		border-radius: unset;
		font-weight: unset;
		font-size: unset;
		line-height: unset;
		text-align: unset;
		box-shadow: unset;
		background-color: unset;
		padding: unset;
		width: unset;
		border: unset;
		outline: unset;
		margin: unset;
		color: unset;
		cursor: unset;
		transition: background-color var(--transition), border-color var(--transition),
			color var(--transition), box-shadow var(--transition);
	}

	input[type='number'] {
		height: unset;
		min-width: 4em;
	}
	.root {
		grid-template-columns: min-content max-content 1fr 1fr;
	}
	.tactic-display {
		position: relative;
		white-space: nowrap;
		&:not(:first-child) {
			margin-left: 0.3em;
		}
		&:not(:last-child)::after {
			content: ',';
		}
		&::before {
			border-radius: 0.3em;
			left: 50%;
			width: 0px;
			overflow: hidden;
			height: calc(100% + 0.2em);
			// opacity: 0.5;
			background-color: rgba(19, 29, 37, 0.5);
			// background-color: rgb(from var(--card-background-color) r g b 0.5);
			position: absolute;
			color: var(--primary);
			content: '––';
			// left: 50%;
			margin: -0.1em -0.3em;
			text-align: center;
			// align-content: center;
			transition: 0.5s all;

			border-radius: var(--border-radius);
			outline: none;
			// background-color: var(--background-color);
			box-shadow: var(--box-shadow);
			// color: var(--color);
			font-size: large;
			font-weight: 900;
			line-height: var(--line-height);
			text-align: center;
			cursor: pointer;
			transition: background-color var(--transition), border-color var(--transition),
				color var(--transition), box-shadow var(--transition), width var(--transition),
				left var(--transition);
		}
		&:is([aria-current], :hover, :active, :focus) {
			&::before {
				border: 1px solid var(--muted-border-color);
				width: calc(100% + 0.6em);
				left: 0px;

				// padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
				border: var(--border-width) solid var(--border-color);
			}
		}

		&:is([aria-current], :hover, :active, :focus)::before {
			--background-color: var(--primary-hover);
			--border-color: var(--primary-hover);
			--box-shadow: var(--button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0));
			--color: var(--primary-inverse);
		}
		&:focus::before {
			--box-shadow: var(--button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)),
				0 0 0 var(--outline-width) var(--primary-focus);
		}
	}
</style>
