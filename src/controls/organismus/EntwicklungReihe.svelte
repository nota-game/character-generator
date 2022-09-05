<script lang="ts">
	import type {
		KostenDefinitionen_misc,
		KostenDefinitions_misc,
		KostenDefinition_misc,
		Lokalisierungen_misc,
		_Reihe
	} from './../../data/nota.g';
	import { getText } from './../../routes/misc';
	import { Charakter } from './../../routes/models/Character';
	import type { Data } from './../../routes/models/Data';
	import RangeSlider from 'svelte-range-slider-pips';
	import Chart from './../../routes/controls/Chart.svelte';
	import { round } from 'mathjs';
	import KostenControl from './../../routes/controls/KostenControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	export let reihe: _Reihe | undefined;

	let selectedArray = [0];
	$: selected = selectedArray[0];

	$: age = char?.ageStore;
	// let index: number;
	// let indexVerteilung: number;
	let schwellen: { Wert: number; Name: Lokalisierungen_misc; Kosten: KostenDefinition_misc[] }[];
	let currentSchwelle: {
		Wert: number;
		Name: Lokalisierungen_misc;
		Kosten: KostenDefinition_misc[];
	};
	let quantile: { Wert: number; Quantil: number }[];
	$: {
		const a = age ? $age ?? 0 : 0;
		if (reihe)
			({ quantile, schwellen, currentSchwelle } = Charakter.applyAge(a, reihe, selectedArray[0]));
	}
	$: {
		if (char && reihe) {
			initChar(char, reihe);
		}
	}
	function initChar(char: Charakter, reihe: _Reihe) {
		const currentValue = char.getPropertyScale(reihe.id);
		if (selectedArray[0] == 0) {
			if (currentValue == 0) {
				// not yet set

				const defaultValue =
					quantile.sort((a, b) => 50 - a.Quantil - (50 - b.Quantil))[0]?.Wert ??
					(Math.max(...schwellen.map((x) => x.Wert)) - Math.min(...schwellen.map((x) => x.Wert))) /
						2 +
						Math.min(...schwellen.map((x) => x.Wert));

				char.setPropertyScale(reihe.id, defaultValue);
				selectedArray[0] = defaultValue;
			} else {
				selectedArray[0] = currentValue;
			}
		}
	}
	$: {
		if (char && reihe) {
			char.setPropertyScale(reihe.id, selectedArray[0]);
		}
	}
</script>

{#if reihe && data}
	<label>
		<h4>
			{getText(reihe.Name)}
			{#if currentSchwelle}
				{#if currentSchwelle.Name}
					<small>({getText(currentSchwelle.Name)})</small>
				{/if}
				<small><KostenControl oneLine cost={currentSchwelle.Kosten} {data} /></small>
			{/if}
		</h4>
		<input type="number" bind:value={selectedArray[0]} />
		{#if char && data && quantile.length > 1}
			{#if reihe.Verteilung && reihe.Verteilung.length > 0}
				<Chart
					unit="%"
					position={selected}
					data={{
						points: quantile
							.map((x) => [x.Wert, 50 - Math.abs(50 - x.Quantil)])
							.filter((x) => x[0] != undefined),
						lable: 't'
					}}
				/>
			{/if}
<div style="margin: 2rem;">

	<RangeSlider
	first="label"
	last="label"
	float
	formatter={(v) => `${v} ${reihe?.einheit}`}
	bind:values={selectedArray}
	pips={true}
	pipstep={Math.round(
		((Math.max(...quantile.map((x) => x.Wert)) - Math.min(...quantile.map((x) => x.Wert))) /
						5) *
						100
				)}
				step={0.01}
				min={Math.min(...quantile.map((x) => x.Wert))}
				max={Math.max(...quantile.map((x) => x.Wert))}
				/>
			</div>
		{:else if quantile.length == 1}
			{`${quantile[0].Wert} ${reihe?.einheit}`}
		{:else if quantile.length == 0}
			Keine Argaben
		{/if}
	</label>
{/if}

<style lang="scss">
	label{
		overflow-x: hidden;
		
	}
	h4 {
		margin-top: 2rem;
		margin-bottom: 0.25rem;
		small {
			font-weight: normal;
			font-style: normal;
		}
	}
</style>
