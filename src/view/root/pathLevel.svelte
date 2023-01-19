<script lang="ts">
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import Missing from './Missing.svelte';

	export let pathId: string;
	export let levelId: string;
	export let data: Data;
	export let char: Charakter;

	export let effective: Readable<number>;
	export let purchased: Writable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;

	$: entry = data.levelMap[pathId][levelId];



	
	let addFuture = char.getSimulation(
		'level',
		(other) => {
			other.pfad[pathId][levelId].purchased.update((n) => n + 1);
		},
		pathId,levelId
	);

	let removeFuture = char.getSimulation(
		'level',
		(other) => {
			other.pfad[pathId][levelId].purchased.update((n) => n - 1);
		},
		pathId,levelId
	);
	

</script>

<div>
	<!-- {#if $effective} -->
	{pathId}-{levelId}

	{$effective}/{entry.WiederhoteNutzung} {JSON.stringify($cost)}
	{#if Object.values($missing).length > 0}
		<span class="missing"> {JSON.stringify($missing)}</span>
	{/if}
	<br />
	<button
		on:click={() => purchased.update((x) => x + 1)}
		disabled={$purchased >= entry.WiederhoteNutzung}>+</button
	>
	<span class="future"> <Missing change={$addFuture} /></span>
	<button on:click={() => purchased.update((x) => x - 1)} disabled={$purchased == 0}>-</button>
	<span class="future"> <Missing change={$removeFuture} /></span>
	<!-- {/if} -->
</div>


<style lang="scss">
	.missing {
		color: red;
	}

	.future {
		color: blue;
		margin: 1em;
		padding: 1rem;
		background-color: lightgray;
		display: none;
		position: absolute;
	}
	button:hover + .future {
		display: block;
	}
</style>
