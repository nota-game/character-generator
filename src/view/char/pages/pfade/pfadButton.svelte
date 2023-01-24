<script lang="ts">
	import type { PfadDefinition_pfad } from 'src/data/nota.g';
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import { derived } from 'svelte/store';

	export let char: Charakter;

	export let pfad: Readonly<PfadDefinition_pfad>;

	export let click: () => void;

	let sum = derived(
		pfad?.Levels.Level.map((x) => char.pfad[pfad.Id][x.Id].purchased),
		(stores) => !stores.some((x) => x > 0)
	);
</script>

<button class:outline={$sum} on:click={click}>
	{getText(pfad.Name)}
</button>
