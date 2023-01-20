<script lang="ts">
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import Missing from './Missing.svelte';

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

	$: entry = data.talentMap[key];

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'talent',
				(other) => {
					other.talente[key].purchased.update((n) => n + 1);
				},
				key
			);

			removeFuture = char.getSimulation(
				'talent',
				(other) => {
					other.talente[key].purchased.update((n) => n - 1);
				},
				key
			);
		}
	}
</script>

<div>
	{key}
	{$effective} (Basis: {$base} Ableitung: {$support}) {$fixed + $purchased} EP

	<button on:click={() => purchased.update((x) => x + 1)}>+</button>
	{#if addFuture}
		<span class="future">
			{#await $addFuture}
				Calculating
			{:then f}
				<Missing change={f} />
			{/await}
		</span>
	{/if}
	<button on:click={() => purchased.update((x) => x - 1)} disabled={$purchased == 0}>-</button>
	{#if removeFuture}
		<span class="future">
			{#await $removeFuture}
				Calculating
			{:then f}
				<Missing change={f} />
			{/await}
		</span>
	{/if}

	{JSON.stringify($cost)}
	{#if $missing && Object.values($missing).length > 0}
		<span class="missing"> {JSON.stringify($missing)}</span>
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
