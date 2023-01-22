<script lang="ts">
	import type {
		KostenDefinitionen_misc,
		KostenDefinitions_misc,
		KostenDefinition_misc,
		Lokalisierungen_misc,
		_Reihe
	} from 'src/data/nota.g';
	import { dealay, getText } from 'src/misc/misc';
	import type {
		Charakter,
		CostKey,
		EigenschaftMetaKey,
		EigenschaftTypes,
		Quantile,
		Schwelle,
		TypeOfKey
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import RangeSlider from 'svelte-range-slider-pips';
	import Chart from 'src/controls/chart.svelte';
	import { number, round } from 'mathjs';
	import type { Readable, Writable } from 'svelte/store';
	// import KostenControl from './../../routes/controls/KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;

	export let effective: Readable<number | undefined>;
	export let type: Readable<EigenschaftTypes | undefined>;
	export let raw: Writable<number | undefined>;
	export let meta: Readable<TypeOfKey<EigenschaftMetaKey>>;
	export let cost: Readable<TypeOfKey<CostKey<'eigenschaft'>>>;

	let selectedArray = [0];
	$: selected = selectedArray[0];

	$: age = char?.ageStore;
	// let index: number;
	// let indexVerteilung: number;
	let schwellen: Schwelle[];
	//{ schwellenForAge: Schwelle[]; quantileForAge: Quantile[]; currentSchwelle: Schwelle; }
	let currentSchwelle: Schwelle | undefined;
	let quantile: Quantile[];
	$: {
		const a = age ? $age ?? 0 : 0;
		if ($meta?.type == 'reihe')
			({
				quantileForAge: quantile,
				schwellenForAge: schwellen,
				currentSchwelle: currentSchwelle
			} = $meta);
	}
	$: {
		if (char && $meta?.type == 'reihe') {
			initChar(char, $meta);
		}
	}
	function initChar(char: Charakter, reihe: _Reihe) {
		const currentValue = $raw;
		// if (selectedArray[0] == 0) {
			if (!currentValue) {
				// not yet set
				console.log($meta);
				const defaultValue =
					quantile.sort((a, b) => 50 - a.Quantil - (50 - b.Quantil))[0]?.Wert ??
					(Math.max(...schwellen.map((x) => x.Wert)) - Math.min(...schwellen.map((x) => x.Wert))) /
						2 +
						Math.min(...schwellen.map((x) => x.Wert)) ??
					0;

				$raw = defaultValue;
				selectedArray[0] = defaultValue;
			} else {
				selectedArray[0] = currentValue;
			}
		// }
	}


    // ageArray[0] = get(char.ageStore);

	$: setAge(selectedArray[0]);
	let setAgePromise: Promise<void> | undefined;
	async function setAge(age: number) {
		if (setAgePromise) {
			return;
		}
		setAgePromise = dealay(150);
		await setAgePromise;
		setAgePromise = undefined;
		raw.set(selectedArray[0]);
	}

    // $: {
	// 	if (char && reihe) {
	// 		char.setPropertyScale(reihe.id, selectedArray[0]);
	// 	}
	// }

	$: points = quantile
		.map((x) => [x.Wert, 50 - Math.abs(50 - x.Quantil)])
		.filter((x) => x[0] != undefined) as [number, number][];
</script>

{#if $meta?.type == 'reihe'}
	<label>
		<h4>
			{getText($meta.Name)}
			{#if currentSchwelle}
				{#if currentSchwelle.Name}
					<small>({getText(currentSchwelle.Name)})</small>
				{/if}
				<!-- <small><KostenControl oneLine cost={currentSchwelle.Kosten} {data} /></small> -->
			{/if}
		</h4>
		<input type="number" bind:value={selectedArray[0]} />
		{#if char && data && quantile.length > 1}
			{#if $meta.Verteilung && $meta.Verteilung.length > 0}
				<Chart
					unit="%"
					position={selectedArray[0]}
					data={{
						points: points,
						lable: 't'
					}}
				/>
			{/if}
			<div style="margin: 2rem;">
				<RangeSlider
					first="label"
					last="label"
					float
					formatter={(v) => `${v} ${$meta?.type == 'reihe' ? $meta.einheit : ''}`}
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
			{`${quantile[0].Wert} ${$meta.einheit}`}
		{:else if quantile.length == 0}
			Keine Argaben
		{/if}
	</label>
{/if}

<style lang="scss">
	label {
		// overflow-x: hidden;
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
