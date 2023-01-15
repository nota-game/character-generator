<script lang="ts">
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';

	export let key: string;
	export let data: Data;

	export let effective: Readable<number>;

	$: entry = data.tagMap[key];
	// console.log(entry)
	// console.log(data.talentMap)
	// console.log(key)
</script>

<div>
	{#if $effective}
		{key}
	{/if}
</div>
