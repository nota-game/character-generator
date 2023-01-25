<script lang="ts">
	import Chart from 'src/controls/chart.svelte';
	import { getText } from 'src/misc/misc';
	import type {
		Charakter,
		CostKey,
		EigenschaftMetaKey,
		EigenschaftTypes,
		TypeOfKey
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import QuantileChart from '../../controls/QuantileChart.svelte';
	import ReiheControle from './reiheControle.svelte';

	export let data: Data;
	export let char: Charakter;

	export let filterGruppe: string;
	export let key: string;

	export let effective: Readable<number | undefined>;
	export let type: Readable<EigenschaftTypes | undefined>;
	export let raw: Writable<number | undefined>;
	export let meta: Readable<TypeOfKey<EigenschaftMetaKey>>;
	export let cost: Readable<TypeOfKey<CostKey<'eigenschaft'>>>;

	export let hidden: boolean = false;
	$: hidden = filterGruppe != $meta?.gruppe;

	if ($raw == undefined) {
		if ($meta?.type == 'bereich') {
			$raw = $meta.default;
		}
	}
</script>

{#if filterGruppe == $meta?.gruppe}
	<div>
		<h4 style="width: 100%;">
			{getText($meta.Name)}
			{#if $meta.Abkürzung}
				<small> ({getText($meta.Abkürzung)})</small>
			{/if}
		</h4>

		{#if $meta.type == 'berechnung'}
			{Math.round(($effective ?? 0) * 100) / 100}
			{$meta.einheit}
		{:else if $meta.type == 'bereich'}
			{$effective}
			{#if $meta.diskret}
				<input type="number" max={$meta.maxInklusiv} min={$meta.minInklusiv} bind:value={$raw} />
			{:else}
				<input type="range" max={$meta.maxInklusiv} min={$meta.minInklusiv} bind:value={$raw} />
			{/if}
			{#if $meta.Verteilung && $meta.Verteilung.length > 0}
				<QuantileChart position={$raw} quantile={$meta.quantileForAge} />
			{/if}
		{:else if $meta.type == 'reihe'}
			<ReiheControle {effective} {type} {raw} {meta} {cost} {char} {data} />
		{/if}
	</div>
{/if}

<style lang="scss">
	h4 {
		position: sticky;
		top: 7rem;
		background-color: var(--card-background-color);
		z-index: 700;
		margin-top: 2rem;
		margin-bottom: 0.25rem;
		small {
			font-weight: normal;
			font-style: normal;
		}
	}
</style>
