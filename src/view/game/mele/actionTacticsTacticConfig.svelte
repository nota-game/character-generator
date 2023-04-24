<script lang="ts" context="module">
	export interface TacticsInformation {
		tactic: _Taktik;
		f: (input: number) => number;
		variables: Record<string, number>;
		support: TacticsInformation[];
	}
</script>

<script lang="ts">
	import { number } from 'mathjs';
	import type {
		NahkampfWaffenDefinition_kampf_ausstattung,
		_AddModValueType,
		_Mod3,
		_Taktik
	} from 'src/data/nota.g';
	import {
		distinct,
		filterNull,
		getText,
		getTextTalent,
		intersect,
		join,
		removeOneOf,
		sequenceEqual,
		toObjectKey,
		zip
	} from 'src/misc/misc';
	import type { CharacterState } from 'src/models/CharacterState';
	import { createEventDispatcher } from 'svelte';

	export let charData: CharacterState;

	export let tactic: _Taktik;
	export let amount: number;
	export let weapon: NahkampfWaffenDefinition_kampf_ausstattung | undefined;

	export let modifierFunction: TacticsInformation[] = [];

	$: targets = charData.possibleTargets;

	const dispatch = createEventDispatcher();

	const remove = () => dispatch('remove');

	$: supportTaktigen2 = charData.char.stammdaten.Instance.Daten.Taktiken.Taktik.filter(
		(x) => x.Typ == 'Unterstützend'
	);
	let supportTaktigen: _Taktik[] = [];
	$: {
		if (
			!sequenceEqual(
				supportTaktigen.map((x) => x.Id),
				supportTaktigen2.map((x) => x.Id)
			)
		) {
			supportTaktigen = charData.char.stammdaten.Instance.Daten.Taktiken.Taktik.filter(
				(x) => x.Typ == 'Unterstützend'
			);
		}
	}

	$: variables = getVariables(tactic.Mod);

	let variablesSelection: number[][] = [];
	$: {
		if (variablesSelection == undefined || variablesSelection.length != amount) {
			variablesSelection = Array.from({ length: amount }).map((x) => []);
		}
		if (
			variablesSelection.some((x) => x.length != variables.length || x.some((y) => y == undefined))
		) {
			variablesSelection = variablesSelection.map((x) =>
				Array.from({ length: variables.length }).map((y, i) => (x?.[i] !== undefined ? x?.[i] : 0))
			);
		}
	}

	// $: console.log(`${tactic.Id} set variables`, variables);
	// $: console.log(`${tactic.Id} set variablesSelection`, variablesSelection);

	$: modifierFunction = Array.from({ length: amount }).map(
		(_, i) =>
			({
				tactic,
				f: getModifierFunction(
					tactic,
					weapon,
					toObjectKey(
						zip(variables, variablesSelection[i]),
						([key]) => key,
						([, value]) => value
					),
					supportModification[i]
						.filter((x, j) => supportSelection[i][j])
						.flatMap((x) => x)
						.map((x) => x.f)
				),
				support: supportModification[i].filter((x, j) => supportSelection[i][j]).flatMap((x) => x),
				variables: zip(variables, variablesSelection[i]).reduce((p, [key, value]) => {
					p[key] = value;
					return p;
				}, {} as Record<string, number>)
			} satisfies TacticsInformation)
	);

	let supportSelection: boolean[][] = [];
	$: {
		if (supportSelection == undefined || supportSelection.length != amount) {
			console.log('support collection changed');
			supportSelection = Array.from({ length: amount }).map((x) => []);
		}
	}
	let supportModification: TacticsInformation[][][] = [];
	$: {
		if (supportModification == undefined || supportModification.length != amount) {
			console.log('Update support', tactic.Id);
			supportModification = Array.from({ length: amount }).map((x) => []);
		}
	}

	function getVariables(mod: _Mod3 | undefined): string[] {
		function handelSubLists(params: _AddModValueType): string[] {
			return distinct([
				...filterNull(params.VariableModValueType?.map((x) => x.Value) ?? []),
				...filterNull(params.AddModValueType?.flatMap(handelSubLists) ?? []),
				...filterNull(params.MultiplyModValueType?.flatMap(handelSubLists) ?? []),
				...filterNull(params.SubstractModValueType?.flatMap(handelSubLists) ?? [])
			]);
		}

		if (mod == undefined) {
			return [];
		} else if (mod['#'] == 'AddModValueType') {
			return handelSubLists(mod.AddModValueType);
		} else if (mod['#'] == 'ConcreteModValueType') {
			return [];
		} else if (mod['#'] == 'SubstractModValueType') {
			return handelSubLists(mod.SubstractModValueType);
		} else if (mod['#'] == 'MultiplyModValueType') {
			return handelSubLists(mod.MultiplyModValueType);
		} else if (mod['#'] == 'VariableModValueType') {
			if (mod.VariableModValueType.Value == undefined) {
				return [];
			} else {
				return [mod.VariableModValueType.Value];
			}
		} else {
			throw new Error('Not implemented');
		}
	}

	function getModifierText(mod: _Mod3 | undefined): string {
		const name = (params: _AddModValueType, type: 'add' | 'substact' | 'multiply'): string => {
			const x = [
				...filterNull(params.AddModValueType?.flatMap((x) => `(${name(x, 'add')})`) ?? []),
				...filterNull(
					params.MultiplyModValueType?.flatMap((x) => `(${name(x, 'multiply')})`) ?? []
				),
				...filterNull(
					params.SubstractModValueType?.flatMap((x) => `(${name(x, 'substact')})`) ?? []
				),
				...filterNull(
					params.ConcreteModValueType?.flatMap((x) =>
						x.Type == 'Percent' ? `${x.Value}%` : x.Value.toString()
					) ?? []
				),
				...filterNull(params.VariableModValueType?.map((x) => x.Value) ?? []).flatMap((x) => x)
			];

			if (type == 'add') {
				return join(x, ' + ');
			} else if (type == 'multiply') {
				return join(x, ` × `);
			} else if (type == 'substact') {
				return join(x, ` - `);
			} else {
				throw new Error('Not Implemented');
			}
		};

		// const sing = mod?.ModifierType == 'Bonus' ? 1 : -1;
		if (mod == undefined) {
			return '';
		} else if (mod['#'] == 'AddModValueType') {
			return `${mod.ModifierType}: ${name(mod.AddModValueType, 'add')}`;
		} else if (mod['#'] == 'ConcreteModValueType') {
			if (mod.ConcreteModValueType.Type == 'Absolute') {
				return `${mod.ModifierType}: ${mod.ConcreteModValueType.Value}`;
			} else {
				return `${mod.ModifierType}: ${mod.ConcreteModValueType.Value}%`;
			}
		} else if (mod['#'] == 'SubstractModValueType') {
			return `${mod.ModifierType}: ${name(mod.SubstractModValueType, 'substact')}`;
		} else if (mod['#'] == 'MultiplyModValueType') {
			return `${mod.ModifierType}: ${name(mod.MultiplyModValueType, 'multiply')}`;
		} else if (mod['#'] == 'VariableModValueType') {
			if (mod.VariableModValueType.Value == undefined) {
				return '';
			} else {
				return `${mod.ModifierType}: ${mod.VariableModValueType.Value}`;
			}
		} else {
			throw new Error('Not implemented');
		}
	}
	function getModifierFunction(
		tactic: _Taktik | undefined,
		weapon: NahkampfWaffenDefinition_kampf_ausstattung | undefined,
		scope: Record<string, number>,
		subFunctions: ((input: number) => number)[]
	): (input: number) => number {
		const mod: _Mod3 | undefined = tactic?.Mod;
		return (input: number): number => {
			const handleSubList = (
				params: _AddModValueType,
				type: 'add' | 'substact' | 'multiply'
			): number => {
				const x = [
					...filterNull(params.AddModValueType?.flatMap((x) => handleSubList(x, 'add')) ?? []),
					...filterNull(
						params.MultiplyModValueType?.flatMap((x) => handleSubList(x, 'multiply')) ?? []
					),
					...filterNull(
						params.SubstractModValueType?.flatMap((x) => handleSubList(x, 'substact')) ?? []
					),
					...filterNull(
						params.ConcreteModValueType?.flatMap((x) =>
							x.Type == 'Percent' ? (input * x.Value) / 100 : x.Value
						) ?? []
					),
					...filterNull(params.VariableModValueType?.map((x) => x.Value) ?? []).flatMap(
						(x) => scope[x]
					)
				];

				if (type == 'add') {
					return x.reduce((p, c) => p + c, 0);
				} else if (type == 'multiply') {
					return x.reduce((p, c) => p * c, 1);
				} else if (type == 'substact') {
					return x.reduce((p, c) => p - c, 0);
				} else {
					throw new Error('Not Implemented');
				}
			};

			const sing = mod?.ModifierType == 'Bonus' ? 1 : -1;
			const other = subFunctions.map((x) => x(input)).reduce((p, c) => p + c, 0);

			let selfValue =
				mod == undefined
					? 0
					: mod['#'] == 'AddModValueType'
					? handleSubList(mod.AddModValueType, 'add')
					: mod['#'] == 'ConcreteModValueType'
					? mod.ConcreteModValueType.Type == 'Absolute'
						? mod.ConcreteModValueType.Value
						: (mod.ConcreteModValueType.Value * input) / 100
					: mod['#'] == 'SubstractModValueType'
					? handleSubList(mod.SubstractModValueType, 'substact')
					: mod['#'] == 'MultiplyModValueType'
					? handleSubList(mod.MultiplyModValueType, 'multiply')
					: mod['#'] == 'VariableModValueType'
					? mod.VariableModValueType.Value == undefined
						? 0
						: scope[mod.VariableModValueType.Value]
					: 0;

			// handle special propertys

			const weaponPropertys = weapon?.Eigenschaften?.Eigenschaft.map((x) => x.Id) ?? [];
			const tacticPropertys = tactic?.Eigenschaften?.Eigenschaft.map((x) => x.Id) ?? [];

			const matchingPropertys = intersect(weaponPropertys, tacticPropertys);
			for (let i = 0; i < matchingPropertys.length; i++) {
				if (mod?.ModifierType == 'Bonus') {
					selfValue *= 2;
				} else {
					selfValue /= 2;
				}
			}
			selfValue = Math.floor(selfValue);

			if (tactic?.Typ == 'Defensiv') {
				selfValue += weapon?.DefensivModifizierer ?? 0;
			} else if (tactic?.Typ == 'Offensiv') {
				selfValue += weapon?.OffensivModifizierer ?? 0;
			}

			if (
				(weapon?.WaffenTyp == 'Defensiv' && tactic?.Typ == 'Offensiv') ||
				(weapon?.WaffenTyp == 'Offensiv' && tactic?.Typ == 'Defensiv')
			) {
				selfValue = -Infinity;
			}

			return sing * selfValue + other;
		};
	}

	let show = false;
</script>

<span class="root"
	>{#if tactic.Typ == 'Unterstützend'}
		<div style="display: grid; grid-template-columns: max-content 1fr;">
			<small class="hide-empty" style="margin-bottom: 1em; display: block;"
				>{getModifierText(tactic.Mod)}</small
			>
			{#each variables as v, i}
				<div style="margin-right:1em; grid-column: 1; justify-self: center; align-self: center;">
					{v}
				</div>
				<input
					style="grid-column: 2; max-width: 5em;"
					type="number"
					bind:value={variablesSelection[0][i]}
				/>
			{/each}
		</div>
	{:else}
		<span class="expand" on:mouseenter={() => (show = true)}
			>{#if amount > 1}{amount}×{/if}{getText(tactic.Name)}</span
		><span class="div-hack" class:hide={!show} on:mouseleave={() => (show = false)}>
			{#if amount > 1}{amount}×{/if}{getText(tactic.Name)}
			<button class="outline" on:click={() => remove()}> Entfernen </button>
			<small class="hide-empty" style="margin-bottom: 1em; display: block;"
				>{getModifierText(tactic.Mod)}</small
			>

			{#each Array.from({ length: amount }).map((_, i) => i) as index}
				{#if tactic.Typ == 'Offensiv' && ($targets ?? []).length>1}
					<select>
						{#each $targets as a}
							<option value={a.id}>{a.name}</option>
						{/each}
					</select>
				{/if}

				<div
					style="display: grid; grid-template-columns: max-content 1fr;margin-bottom: 1em;"
					class="hide-empty"
				>
					{#each variables as v, i}
						<div
							style="margin-right:1em; grid-column: 1; justify-self: center; align-self: center;"
						>
							{v}
						</div>
						<input
							style="grid-column: 2; max-width: 5em;"
							type="number"
							bind:value={variablesSelection[index][i]}
						/>
					{/each}
				</div>

				<div style="grid-template-columns: max-content 1fr; display: grid;" class="hide-empty">
					{#each supportTaktigen as t, i}
						<div style="grid-column: 1;">{getText(t.Name)}</div>
						<input
							bind:checked={supportSelection[index][i]}
							style="grid-column: 2; max-width: 5em;"
							type="checkbox"
							role="switch"
						/>
						{#if supportSelection[index][i]}
							<div>
								<svelte:self
									{weapon}
									{charData}
									tactic={t}
									amount={1}
									bind:modifierFunction={supportModification[index][i]}
								/>
							</div>
						{/if}
					{/each}
				</div>
				<hr />
			{/each}
		</span>{/if}</span
>

<style lang="scss">
	.root {
		position: relative;
		width: fit-content;
		background-color: var(--card-background-color);
	}
	.root:not(:last-child)::after {
		content: ',';
	}
	input[type='number'] {
		height: unset;
		margin: 0px;
		min-width: 4em;
	}
	// .expand:hover {
	// 	background-color: var(--background-color);
	// 	border: 1px solid var(--table-border-color);
	// 	border-bottom: 0px;
	// 	margin: -1rem;
	// 	padding: 1rem;
	// }
	.expand {
		border-bottom: 1px dashed var(--muted-color);
	}
	.expand + * {
		top: -1rem;
		left: -1rem;
		padding: 1rem;
		// opacity: 0;
		position: absolute;
		overflow: hidden;
		// height: 0px;
		transition: 0.5s;
		background-color: var(--background-color);
		border: 1px solid var(--table-border-color);
		// border-top: 0px;
		z-index: 9999;
		height: auto;
	}

	.expand:hover + * {
		opacity: 0;
	}

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
	.hide {
		display: none !important;
	}
	.hide-empty:empty {
		display: none;
	}
	.div-hack {
		// HACK: Formater adds a newline between span and div
		//       But when div is hidden this results in a different
		//       rendering since the whitespace in source adds a
		//       whitespace on website. But we must not have one
		//       before comma (`,`).
		display: block;
	}
</style>
