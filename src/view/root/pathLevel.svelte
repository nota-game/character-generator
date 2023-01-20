<script lang="ts">
	import { getText, getTextPfad, renderRequirement, renderRequirementMap } from 'src/misc/misc';
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import Missing from './ChangeView.svelte';

	export let pathId: string;
	export let levelId: string;
	export let data: Data;
	export let char: Charakter;

	export let useFuture: boolean;

	export let effective: Readable<number>;
	export let purchased: Writable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;

	$: entry = data.levelMap[pathId][levelId];
	$: entryPfad = data.pfadMap[pathId];

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'level',
				(other) => {
					other.pfad[pathId][levelId].purchased.update((n) => n + 1);
				},
				pathId,
				levelId
			);

			removeFuture = char.getSimulation(
				'level',
				(other) => {
					other.pfad[pathId][levelId].purchased.update((n) => n - 1);
				},
				pathId,
				levelId
			);
		}
	}
</script>

<div>
	<!-- {#if $effective} -->
	{getTextPfad(entryPfad, entry, char)}

	{$effective}/{entry.WiederhoteNutzung}
	{JSON.stringify($cost)}

	<br />
	<button
		on:click={() => purchased.update((x) => x + 1)}
		disabled={$purchased >= entry.WiederhoteNutzung}>+</button
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
					{renderRequirementMap(m, data, { type: 'level', level: entry, pfad: entryPfad }, char)}
				</li>
			{/each}
		</ul>
	{/if}

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
