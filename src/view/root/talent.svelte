<script lang="ts">
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';

	export let key: string;
	export let data: Data;

	export let effective: Readable<number>;
	export let base: Readable<number>;
	export let support: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;

	$: entry = data.talentMap[key];
	// console.log(entry)
	// console.log(data.talentMap)
	// console.log(key)
</script>

<div>

	
	
	
	
	
	
	



	{key} 	{$effective} (Basis: {$base} Ableitung: {$support}) {$fixed + $purchased} EP
	<input type="number" bind:value={$purchased} min={0} />
	{JSON.stringify($cost)}
	{#if $missing && Object.values($missing).length > 0}
		<span class="missing"> {JSON.stringify($missing)}</span>
	{/if}
</div>

<style lang="scss">
	.missing {
		color: red;
	}
</style>
