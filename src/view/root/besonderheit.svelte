<script lang="ts">
	import { getTextBesonderheit, renderRequirement, renderRequirementMap } from 'src/misc/misc';
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import Missing from './ChangeView.svelte';

	export let key: string;
	export let data: Data;
	export let char: Charakter;

	export let useFuture: boolean;

	export let effective: Readable<number>;
	export let unconditionally: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;

	// let addFuture: Readable<CharacterChange> | undefined;

	// $: {
	// if (key === 'Wohlhabend')

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'besonderheit',
				(other) => {
					other.besonderheiten[key].purchased.update((n) => n + 1);
				},
				key
			);

			removeFuture = char.getSimulation(
				'besonderheit',
				(other) => {
					other.besonderheiten[key].purchased.update((n) => n - 1);
				},
				key
			);
		}
	}

	$: entry = data.besonderheitenMap[key];
</script>

<!-- {#if addFuture} -->
<div>
	{getTextBesonderheit(entry, $effective, char)}
	{$effective}/{entry.Stufe.length}
	<!-- <input type="number" bind:value={$purchased} min={0} max={entry.Stufe.length} /> -->
	{JSON.stringify($cost)}


	<button
		on:click={() => purchased.update((x) => x + 1)}
		disabled={$effective >= entry.Stufe.length}>+</button
	>
	{#if addFuture}
		<span class="future">
			{#await $addFuture}
				Calculating
			{:then f}
				<Missing change={f} {data} {char} />
			{/await}
		</span>
	{/if}
	<button on:click={() => purchased.update((x) => x - 1)} disabled={$purchased == 0}>-</button>
	{#if removeFuture}
		<span class="future">
			{#await $removeFuture}
				Calculating
			{:then f}
				<Missing change={f} {data} {char} />
			{/await}
		</span>
	{/if}

	{#if Object.values($missing).length > 0}
		<ul>
			{#each $missing as m}
				<li class="missing">
					{renderRequirementMap(m, data, { type: 'besondereit', value: entry }, char)}
				</li>
			{/each}
		</ul>
	{/if}

</div>

<!-- {/if} -->
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
