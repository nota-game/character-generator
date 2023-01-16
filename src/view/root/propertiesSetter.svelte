<script lang="ts">
	import type {
		CostKey,
		EigenschaftMetaKey,
		EigenschaftTypes,
		TypeOfKey
	} from '../../models/Character';
	import type { Readable, Writable } from 'svelte/store';
	import type {
		FormelDefintion_lebewesen,
		PunktDefintion_lebewesen,
		ReiheDefinition_lebewesen,
		StaticheDefinition_lebewesen
	} from '../../data/nota.g';

	export let key: string;
	export let raw: Writable<number | undefined>;
	export let type: Readable<EigenschaftTypes | undefined>;
	export let effective: Readable<number | undefined>;
	export let meta: Readable<TypeOfKey<EigenschaftMetaKey>>;
	export let cost: Readable<TypeOfKey<CostKey<'eigenschaft'>>>;

	// let bereichMeta: Readable<StaticheDefinition_lebewesen | undefined>;
	// let reiheMeta: Readable<ReiheDefinition_lebewesen | undefined>;

	$: {
		if (key == 'MU') {
			console.log('first');
			effective.subscribe((v) => {
				// console.log('set value', v);
			});
		}

		if ($type == 'bereich') {
			if ($raw == $effective) {
				// $raw = $effective;
			}
		}
	}
</script>

{#if $effective}
	<div>
		{#if $type == 'bereich' && $meta?.type == 'bereich'}
			{#if $effective}
				{key}
				{$effective}
				{$meta.einheit}
				<input type="number" bind:value={$raw} min={$meta?.minInklusiv} max={$meta?.maxInklusiv} />
			{/if}
		{:else if $type == 'reihe' && $meta?.type == 'reihe'}
			<label>
				{key}
				{$effective}
				{$meta.einheit}
				<br />
				<input
					type="range"
					bind:value={$raw}
					max={Math.max(
						...$meta.schwellenForAge.map((x) => x.Wert),
						...$meta.quantileForAge.map((x) => x.Wert)
					)}
					min={Math.min(
						...$meta.schwellenForAge.map((x) => x.Wert),
						...$meta.quantileForAge.map((x) => x.Wert)
					)}
				/>
			</label>
		{:else if $type == 'berechnung' && $meta?.type == 'berechnung'}
			{key}
			{$effective}
			{$meta.einheit}
		{/if}
		{JSON.stringify($cost)}
	</div>
{/if}
