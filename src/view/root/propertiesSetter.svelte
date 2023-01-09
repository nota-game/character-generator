<script lang="ts">
	import type { EigenschaftTypes } from '../../models/Character';
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
	export let meta: Readable<
		| StaticheDefinition_lebewesen
		| ReiheDefinition_lebewesen
		| FormelDefintion_lebewesen
		| PunktDefintion_lebewesen
		| undefined
	>;

	let bereichMeta: Readable<StaticheDefinition_lebewesen | undefined>;

	$: {
		if (key == 'mut') {
			console.log('first');
			effective.subscribe((v) => {
				console.log('set value', v);
			});
		}

		if ($type == 'bereich') {
			if ($raw == $effective) {
				// $raw = $effective;
			}
			bereichMeta = meta as Readable<StaticheDefinition_lebewesen>;
		}
	}
</script>

<div>
	{#if $type == 'bereich'}
		{#if $effective}
			{key}
			{$effective}
			<input
				type="number"
				bind:value={$raw}
				min={$bereichMeta?.minInklusiv}
				max={$bereichMeta?.maxInklusiv}
			/>
		{/if}
	{/if}
</div>
