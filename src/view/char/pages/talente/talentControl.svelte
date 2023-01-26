<script lang="ts">
	import type { Ableitung_talent, Max_talent, TalentDefinition_talent } from 'src/data/nota.g';
	import { derived, get, type Readable, type Writable } from 'svelte/store';
	import {
		getText,
		getTextTalent,
		renderRequirementMap
	} from 'src/misc/misc';

	import { v4 as uuidv4 } from 'uuid';

	import type {
		Charakter,
		Cost,
		CostKey,
		MissingRequirements,
		TalentSupportIncrease,
		TypeOfKey
	} from 'src/models/Character';
	import { Data } from 'src/models/Data';
	import KostenControl from '../../controls/KostenControl.svelte';
	import TooltipControl from '../../controls/tooltipControl.svelte';
	import Missing from '../../controls/Missing.svelte';
	import { cos, format, re } from 'mathjs';
	// import BesonderheitenContro from './BesonderheitenContro.svelte';

	export let data: Data;
	export let char: Charakter;

	export let key: string;

	export let effective: Readable<number>;
	export let base: Readable<number>;
	export let support: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<{ wert: number; missing: MissingRequirements }[]>;
	export let nextLevelSupport: Readable<TalentSupportIncrease[]>;
	export let nextLevelEpCost: Readable<number>;
	export let previousLevelEpCost: Readable<number>;
	export let cost: Readable<TypeOfKey<CostKey<'talent'>>>;

	export let talent = data.talentMap[key];

	export let showTaken: 'gesteigert' | 'abgeleitet' | 'nicht gekauft' | 'alle' = 'alle';

	const uuid = uuidv4();

	function buy(e: MouseEvent, alternativ?: TalentSupportIncrease) {
		e.preventDefault();

		if (alternativ) {
			char?.talente[alternativ.id].purchased.update((x) => x + alternativ.increaseEP);
		} else {
			purchased.update((x) => x + $nextLevelEpCost);
		}
	}

	const defaultCost =
		data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.StandardKosten)[0]
			?.Id ?? 'NOT SET';
	function toCost(value: number) {
		const result = {} as Cost;
		result[defaultCost] = value;
		return result;
	}
</script>

<!-- <div class="root"> -->

<tr>
	<td>
		{getText(data?.talentMap[talent.Id].Name)}
	</td>
	<td>
		<strong>{$effective} TaW</strong>
	</td>
	<td>
		(<KostenControl showZeroValues alwaysShow="EP" cost={$cost} {data} {char} mode="none" inline />, {$base}
		TaB +
		{$support}
		TaA{#if $missing.length > 0},
			<TooltipControl>
				<small class="missing" aria-invalid="true">
					Voraussetzungen für {Math.max(...$missing.map((x) => x.wert))} TaW nicht erfüllt</small
				>
				<ul slot="tooltip">
					{#each $missing as m}
						<li class="missing">
							{renderRequirementMap(m, data, { type: 'talent', value: talent }, char)}
						</li>
					{/each}
				</ul>
			</TooltipControl>
		{/if})
	</td>
	<td>
		{#if $nextLevelEpCost != undefined}
			<a href="#" on:click={(e) => buy(e)}
				>+ <KostenControl {char} {data} cost={toCost($nextLevelEpCost)} mode="cost" /></a
			>
		{/if}
		{#if $nextLevelSupport.length}
			/ <a href="#" on:click={(e) => buy(e, $nextLevelSupport[0])}
				>+ ({getTextTalent(data.talentMap[$nextLevelSupport[0].id], char, 'Name')}
				auf {$nextLevelSupport[0].increaseTaB +
					char.talente[$nextLevelSupport[0].id].base.currentValue({ defaultValue: 0 })} für
				<KostenControl
					cost={toCost($nextLevelSupport[0].increaseEP)}
					mode="cost"
					{data}
					{char}
				/>)</a
			>
		{/if}
		<label
			for={uuid}
			data-tooltip="Mehr infos und Optionen"
			style="width: fit-content; display: inline; float: right;">?</label
		>
	</td>
</tr>
<input id={uuid} type="checkbox" checked />
<tr class="info">
	<td colspan="3">
		{#if $nextLevelSupport.length}
			<p>Es kann günstiger sein ein abgeleitetes talent zu steigern.</p>
			<ul>
				{#each $nextLevelSupport as a}
					<li>
						<a href="#" on:click={(e) => buy(e, a)}
							>+ ({getTextTalent(data.talentMap[a.id], char, 'Name')} auf {a.increaseTaB +
								char.talente[a.id].base.currentValue({ defaultValue: 0 })} für <KostenControl
								mode="cost"
								{data}
								{char}
								cost={toCost(a.increaseEP)}
							/>)</a
						>
					</li>
				{/each}
			</ul>
		{/if}
		<label>
			Genutzte Ep
			<input type="number" bind:value={$purchased} />
		</label>

		<hr />
	</td>
</tr>

<!-- </div> -->
<style lang="scss">
	ul li {
		list-style-type: none;
	}
	.root {
		margin-bottom: 8px;
	}
	input[type='checkbox'] {
		display: none;
	}
	input[type='checkbox'] + .info {
		border-left: 1px solid var(--primary);
		padding-left: 8px;
	}
	input[type='checkbox']:checked + .info {
		display: none;
	}
	input[type='checkbox'] + label {
		cursor: pointer;
	}
</style>
