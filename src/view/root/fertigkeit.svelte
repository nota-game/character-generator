<script lang="ts">
	import { getTextFertigkeit, renderRequirement, renderRequirementMap } from 'src/misc/misc';
	import type { CharacterChange, Charakter, MissingRequirements } from 'src/models/Character';
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
	export let missing: Readable<
		{
			wert: number;
			missing: MissingRequirements;
		}[]
	>;
	export let cost: Readable<any>;

	$: entry = data.fertigkeitenMap[key];

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'fertigkeit',
				(other) => {
					other.fertigkeiten[key].purchased.update((n) =>
						Math.max(0, Math.min(entry.Stufe.length, n + 1))
					);
				},
				key
			);

			removeFuture = char.getSimulation(
				'fertigkeit',
				(other) => {
					other.fertigkeiten[key].purchased.update((n) =>
						Math.max(0, Math.min(entry.Stufe.length, n - 1))
					);
				},
				key
			);
		}
	}
</script>

<div>
	{getTextFertigkeit(entry, $effective, char)}
	{$effective}/{entry.Stufe.length} ({$purchased})
	<button
		on:click={() => purchased.update((x) => x + 1)}
		disabled={$purchased >= entry.Stufe.length}>+</button
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
	{JSON.stringify($cost)}
	{#if Object.values($missing).length > 0}
		<ul>
			{#each $missing as m}
				<li class="missing">
					{renderRequirementMap(m, data, { type: 'fertigkeit', value: entry }, char)}
				</li>
			{/each}
		</ul>
	{/if}
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
