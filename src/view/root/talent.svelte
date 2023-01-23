<script lang="ts">
	import { getTextTalent, renderRequirement, renderRequirementMap } from 'src/misc/misc';
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import Missing from './ChangeView.svelte';

	export let key: string;
	export let data: Data;
	export let char: Charakter;

	export let useFuture: boolean;

	export let effective: Readable<number>;
	export let base: Readable<number>;
	export let support: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;
	export let nextLevelSupport: Readable<any>;
	export let nextLevelEpCost: Readable<number>;
	export let previousLevelEpCost: Readable<number>;

	$: entry = data.talentMap[key];

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'talent',
				(other) => {
					other.talente[key].purchased.update((n) => Math.max(0, n + 1));
				},
				key
			);

			removeFuture = char.getSimulation(
				'talent',
				(other) => {
					other.talente[key].purchased.update((n) => Math.max(0, n - 1));
				},
				key
			);
		}
	}
</script>

<div>
	<!-- {key} -->

	{getTextTalent(entry, char)}

	{$effective} (Basis: {$base} Ableitung: {$support}) {$fixed + $purchased} EP

	<button on:click={() => purchased.update((x) => x + 1)}>+</button>
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

	<br />
	{JSON.stringify($nextLevelSupport, undefined, ' ')}
	<br />
	+ {$nextLevelEpCost} / {$previousLevelEpCost}
	<br />
	{#if Object.values($missing).length > 0}
		<ul>
			{#each $missing as m}
				<li class="missing">
					{renderRequirementMap(m, data, { type: 'talent', value: entry }, char)}
				</li>
			{/each}
		</ul>
	{/if}
	<br />
	<br />
</div>

<style lang="scss">


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
