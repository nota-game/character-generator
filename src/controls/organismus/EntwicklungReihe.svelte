<script lang="ts">
	import type { _Reihe } from './../../data/nota.g';
	import { getText } from './../../routes/misc';
	import type { Charakter } from './../../routes/models/Character';
	import type { Data } from './../../routes/models/Data';
	import RangeSlider from 'svelte-range-slider-pips';
	import Chart from './../../routes/controls/Chart.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	export let reihe: _Reihe | undefined;

	let selectedArray = [0];
	$: selected = selectedArray[0];

	$: age = char?.ageStore;
	let index: number;
	let indexVerteilung: number;
	let values: { Wert: number }[];
	$: {
		const a = age ? $age ?? 0 : 0;
		const tempIndex = Math.round(
			(a - (reihe?.startAlter ?? 0)) / (reihe?.step ?? 1) + (reihe?.startAlter ?? 0)
		);

		index = Math.min((reihe?.Schwelle?.[0]?.Wert?.length ?? 0) - 1, Math.max(tempIndex, 0));
		indexVerteilung = Math.min(
			(reihe?.Verteilung?.[0]?.Wert?.length ?? 0) - 1,
			Math.max(tempIndex, 0)
		);

		values =
			reihe?.Schwelle?.map((x) => ({
				...x,
				Wert: x.Wert[index]
			}))
				.sort((a, b) => a.Wert - b.Wert)
				.filter((x) => x.Wert !== undefined) ?? [];
	}
</script>

{#if reihe}
	<label>
		{getText(reihe.Name)}
		{#if char && data && values.length > 1}
			{#if reihe.Verteilung && reihe.Verteilung.length > 0}
				<Chart
					unit="%"
					position={selected}
					data={{
						points: reihe.Verteilung.map((x) => [
							x.Wert[indexVerteilung],
							50 - Math.abs(50 - x.Quantil)
						]),
						lable: 't'
					}}
				/>
			{/if}

			<RangeSlider
				first="label"
				last="label"
				float
				formatter={(v) => `${v} ${reihe?.einheit}`}
				bind:values={selectedArray}
				pips
				step={0.5}
				min={Math.min(...values.map((x) => x.Wert))}
				max={Math.max(...values.map((x) => x.Wert))}
			/>
		{:else if values.length == 1}
			{`${values[0].Wert} ${reihe?.einheit}`}
		{:else if values.length == 0}
			Keine Argaben
		{/if}
	</label>
{/if}
