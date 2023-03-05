<script lang="ts">
	import { number } from 'mathjs';
	import type { _AddModValueType, _Mod3, _Taktik } from 'src/data/nota.g';
	import {
		distinct,
		filterNull,
		getText,
		getTextTalent,
		removeOneOf,
		sequenceEqual,
		toObjectKey,
		zip
	} from 'src/misc/misc';
	import type { CharacterState } from 'src/models/CharacterState';
	import ActionTacticsTacticConfig2 from './actionTacticsTacticConfig2.svelte';

	export let charData: CharacterState;

	export let tactic: _Taktik;
	export let amount: number;

	export let modifierFunction: ((input: number) => number)[] = [];

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

	$: modifierFunction = Array.from({ length: amount }).map((_, i) =>
		getModifierFunction(
			tactic.Mod,
			toObjectKey(
				zip(variables, variablesSelection[i]),
				([key]) => key,
				([, value]) => value
			),
			supportModification[i].filter((x, j) => supportSelection[i][j]).flatMap((x) => x)
		)
	);

	let supportSelection: boolean[][] = [];
	$: {
		if (supportSelection == undefined || supportSelection.length != amount) {
			console.log('support collection changed');
			supportSelection = Array.from({ length: amount }).map((x) => []);
		}
	}
	let supportModification: ((input: number) => number)[][][] = [];
	$: {
		if (supportModification == undefined || supportModification.length != amount) {
			console.log('Update support', tactic.Id);
			supportModification = Array.from({ length: amount }).map((x) => []);
		}
	}

	function getVariables(mod: _Mod3 | undefined): string[] {
		function name(params: _AddModValueType): string[] {
			return distinct([
				...filterNull(params.VariableModValueType?.map((x) => x.Value) ?? []),
				...filterNull(params.AddModValueType?.flatMap(name) ?? []),
				...filterNull(params.MultiplyModValueType?.flatMap(name) ?? []),
				...filterNull(params.SubstractModValueType?.flatMap(name) ?? [])
			]);
		}

		if (mod == undefined) {
			return [];
		} else if (mod['#'] == 'AddModValueType') {
			return name(mod.AddModValueType);
		} else if (mod['#'] == 'ConcreteModValueType') {
			return [];
		} else if (mod['#'] == 'SubstractModValueType') {
			return name(mod.SubstractModValueType);
		} else if (mod['#'] == 'MultiplyModValueType') {
			return name(mod.MultiplyModValueType);
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

	function getModifierFunction(
		mod: _Mod3 | undefined,
		scope: Record<string, number>,
		subFunctions: ((input: number) => number)[]
	): (input: number) => number {
		return (input: number): number => {
			console.log('getModifier');
			const name = (params: _AddModValueType, type: 'add' | 'substact' | 'multiply'): number => {
				const x = [
					...filterNull(params.AddModValueType?.flatMap((x) => name(x, 'add')) ?? []),
					...filterNull(params.MultiplyModValueType?.flatMap((x) => name(x, 'multiply')) ?? []),
					...filterNull(params.SubstractModValueType?.flatMap((x) => name(x, 'substact')) ?? []),
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
			if (mod == undefined) {
				return 0 + other;
			} else if (mod['#'] == 'AddModValueType') {
				return sing * name(mod.AddModValueType, 'add') + other;
			} else if (mod['#'] == 'ConcreteModValueType') {
				if (mod.ConcreteModValueType.Type == 'Absolute') {
					return sing * mod.ConcreteModValueType.Value + other;
				} else {
					return (sing * mod.ConcreteModValueType.Value * input) / 100 + other;
				}
			} else if (mod['#'] == 'SubstractModValueType') {
				return sing * name(mod.SubstractModValueType, 'substact') + other;
			} else if (mod['#'] == 'MultiplyModValueType') {
				return sing * name(mod.MultiplyModValueType, 'multiply') + other;
			} else if (mod['#'] == 'VariableModValueType') {
				if (mod.VariableModValueType.Value == undefined) {
					return 0 + other;
				} else {
					return sing * scope[mod.VariableModValueType.Value] + other;
				}
			} else {
				throw new Error('Not implemented');
			}
		};
	}

	let show = false;
</script>

<span class="root">
	{#if tactic.Typ == 'Unterstützend'}
		<div style="display: grid; grid-template-columns: max-content 1fr;">
			{#each variables as v, i}
				<div style="margin-right:1em; grid-column: 1; justify-self: center; align-self: center;">
					{v}
				</div>
				<input style="grid-column: 2;" type="number" bind:value={variablesSelection[0][i]} />
			{/each}
		</div>
	{:else}
		<span class="expand" on:mouseenter={() => (show = true)}>
			{#if amount > 1}{amount}×{/if}{getText(tactic.Name)}
		</span>

		<div class:hide={!show} on:mouseleave={() => (show = false)}>
			{#if amount > 1}{amount}×{/if}{getText(tactic.Name)}
			<button class="outline"> Entfernen </button>
			{#each Array.from({ length: amount }).map((_, i) => i) as index}
				<div style="display: grid; grid-template-columns: max-content 1fr;">
					{#each variables as v, i}
						<div
							style="margin-right:1em; grid-column: 1; justify-self: center; align-self: center;"
						>
							{v}
						</div>
						<input
							style="grid-column: 2;"
							type="number"
							bind:value={variablesSelection[index][i]}
						/>
					{/each}
				</div>
				<hr />
				<div style="grid-template-columns: max-content 1fr; display: grid;">
					{#each supportTaktigen as t, i}
						<div style="grid-column: 1;">{getText(t.Name)}</div>
						<input
							bind:checked={supportSelection[index][i]}
							style="grid-column: 2;"
							type="checkbox"
							role="switch"
						/>
						{#if supportSelection[index][i]}
							<div>
								<svelte:self
									{charData}
									tactic={t}
									amount={1}
									bind:modifierFunction={supportModification[index][i]}
								/>
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</span>

<style lang="scss">
	.root {
		position: relative;
		width: fit-content;
		background-color: var(--card-background-color);
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
	.expand + div {
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

	.expand:hover + div {
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
		display: none;
	}
</style>
