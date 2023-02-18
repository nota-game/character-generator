<script lang="ts">
	import {
		getText,
		getTextBesonderheit,
		getTextFertigkeit,
		renderRequirementMap
	} from 'src/misc/misc';
	import {
		substractCost,
		type CharacterChange,
		type Charakter,
		type Cost,
		type MissingRequirements
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import KostenControl from '../../controls/KostenControl.svelte';
	import ChangeView from '../../controls/ChangeView.svelte';
	import TooltipControl from '../../controls/tooltipControl.svelte';

	export let key: string;
	export let data: Data;
	export let char: Charakter;

	export let useFuture: boolean;

	export let effective: Readable<number>;
	export let unconditionally: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<any[]>;
	export let missingNextLevel: Readable<{ wert: number; missing: MissingRequirements }[]>;
	export let cost: Readable<Cost>;
	export let costNext: Readable<Cost>;
	export let costPreview: Readable<Cost>;

	// let addFuture: Readable<CharacterChange> | undefined;

	// $: {
	// if (key === 'Wohlhabend')

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'fertigkeit',
				(other) => {
					other.fertigkeiten[key].purchased.update((n) =>
						Math.max(0, Math.min(entry.Stufe.length, Math.max(n + 1, $fixed + 1)))
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

	$: entry = data.fertigkeitenMap[key];
</script>

<!-- {#if addFuture} -->
<div>
	<h4>
		{getTextFertigkeit(entry, $effective, char)}
		<small style="float: right;"><KostenControl cost={$cost} {data} {char} inline /></small>
	</h4>

	<div>
		{#if $purchased < entry.Stufe.length}
			<TooltipControl>
				<a
					href="#"
					class:missing={$missingNextLevel.length > 0}
					on:click={(e) => {
						e.preventDefault();
						purchased.update((x) => Math.min(entry.Stufe.length, Math.max(x + 1, $fixed + 1)));
					}}
				>
					{#if $purchased == 0 && $fixed == 0}
						{getTextFertigkeit(entry, $purchased + 1, char)} hinzufügen
					{:else}
						Auf {getTextFertigkeit(entry, Math.max($purchased + 1, $fixed + 1), char)} verbessern
					{/if}
					<small class="parenthised"
						><KostenControl
							cost={substractCost($costNext, $cost)}
							{data}
							{char}
							mode="cost"
						/></small
					>
				</a>

				{#await $addFuture}
					<span aria-busy="true" />
				{:then f}
					<!-- <ChangeView change={f} {data} {char} /> -->
				{/await}

				<div slot="tooltip">
					<ul>
						{#each $missingNextLevel as m}
							<li class="missing">
								{renderRequirementMap(m, data, { type: 'fertigkeit', value: entry }, char)}
							</li>
						{/each}
					</ul>
					{#await $addFuture}
						<span aria-busy="true" />
					{:then f}
						<ChangeView
							change={f}
							{data}
							{char}
							exclude={{ type: 'fertigkeit', id: entry.Id }}
							excludeRequirments={$missingNextLevel}
						/>
					{/await}
				</div>
			</TooltipControl>
		{/if}
		<br />
		{#if $purchased > 0 && $purchased > $fixed}
			<TooltipControl>
				<a
					href="#"
					on:click={(e) => {
						e.preventDefault();
						purchased.update((x) => Math.max(0, x - 1));
					}}
				>
					{#if $purchased == 1}
						{getTextFertigkeit(entry, $purchased, char)} entfernen
					{:else}
						Auf {getTextFertigkeit(entry, $purchased - 1, char)} reduzieren
					{/if}
					<small class="parenthised"
						><KostenControl
							cost={substractCost($costPreview, $cost)}
							{data}
							{char}
							mode="cost"
						/></small
					>
				</a>
				{#await $addFuture}
					<span aria-busy="true" />
				{:then f}
					<!-- <ChangeView change={f} {data} {char} /> -->
				{/await}

				<div slot="tooltip">
					{#await $removeFuture}
						<span aria-busy="true" />
					{:then f}
						<ChangeView change={f} {data} {char} exclude={{ type: 'fertigkeit', id: entry.Id }} />
					{/await}
				</div>
			</TooltipControl>
		{/if}
	</div>

	<p>
		{getText(entry.Stufe[$effective]?.Beschreibung)}
	</p>
	<details>
		<summary> Details </summary>
		{#each entry.Stufe.map((value, index) => index) as index}
			{@const stufe = entry.Stufe[index]}
			<h5>
				{getTextFertigkeit(entry, index + 1)}
			</h5>
			<p>
				{getText(stufe.Beschreibung)}
			</p>
		{/each}
	</details>

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

<!-- {/if} -->
<style lang="scss">
	.parenthised:not(:empty)::before {
		content: '(';
	}
	.parenthised:not(:empty)::after {
		margin-left: -0.2em;
		content: ')';
	}
</style>
