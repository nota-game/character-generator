<script lang="ts">
	import {
		getText,
		getTextPfad,
		getTextTalent,
		renderRequirement,
		renderRequirementMap
	} from 'src/misc/misc';
	import {
		substractCost,
		type CharacterChange,
		type Charakter,
		type CostKey,
		type MissingRequirements,
		type TypeOfKey
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import KostenControl from '../../controls/KostenControl.svelte';
	import TooltipControl from '../../controls/tooltipControl.svelte';
	import ChangeView from './../../controls/ChangeView.svelte';
	import Missing from './../../controls/ChangeView.svelte';

	export let pathId: string;
	export let levelId: string;
	export let data: Data;
	export let char: Charakter;

	export let useFuture: boolean;

	export let effective: Readable<number>;
	export let purchased: Writable<number>;
	export let missing: Readable<{ wert: number; missing: MissingRequirements }[]>;
	export let missingNext: Readable<{ wert: number; missing: MissingRequirements }[]>;
	export let cost: Readable<TypeOfKey<CostKey<'pfad'>>>;
	export let costNext: Readable<TypeOfKey<CostKey<'pfad', string, 'costNext'>>>;
	export let costPreview: Readable<TypeOfKey<CostKey<'pfad', string, 'costPreview'>>>;

	$: entry = data.levelMap[pathId][levelId];
	$: entryPfad = data.pfadMap[pathId];

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture) {
			addFuture = char.getSimulation(
				'level',
				(other) => {
					other.pfad[pathId][levelId].purchased.update((n) =>
						Math.max(0, Math.min(entry.WiederhoteNutzung, n + 1))
					);
				},
				pathId,
				levelId
			);

			removeFuture = char.getSimulation(
				'level',
				(other) => {
					other.pfad[pathId][levelId].purchased.update((n) =>
						Math.max(0, Math.min(entry.WiederhoteNutzung, n - 1))
					);
				},
				pathId,
				levelId
			);
		}
	}
</script>

<!-- {#if addFuture} -->
<div>
	<h5>
		{getTextPfad(entryPfad, entry, char)} {$purchased}
		<small style="float: right;"><KostenControl cost={$cost} {data} {char} inline /></small>
	</h5>
	<div>
		{#if $purchased < entry.WiederhoteNutzung}
			<TooltipControl>

            
				<a
					href="#"
					class:missing={$missingNext.length > 0}
					on:click={(e) => {
						e.preventDefault();
						purchased.update((x) => Math.min(entry.WiederhoteNutzung, x + 1));
					}}
				>
					{#if $purchased == 0}
						hinzufügen
					{:else}
						verbessern
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
						{#each $missingNext as m}
							<li class="missing">
								{renderRequirementMap(
									m,
									data,
									{ type: 'level', level: entry, pfad: entryPfad },
									char
								)}
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
							exclude={{ type: 'besonderheit', id: entry.Id }}
							excludeRequirments={$missingNext}
						/>
					{/await}
				</div>
			</TooltipControl>
		{/if}
		<br />
		{#if $purchased > 0}
			<TooltipControl>
				<a
					href="#"
					on:click={(e) => {
						e.preventDefault();
						purchased.update((x) => Math.max(0, x - 1));
					}}
				>
					{#if $purchased == 1}
						entfernen
					{:else}
						reduzieren
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
						<ChangeView change={f} {data} {char} exclude={{ type: 'besonderheit', id: entry.Id }} />
					{/await}
				</div>
			</TooltipControl>
		{/if}
	</div>

	<p>
		{getText(entry.Beschreibung)}
	</p>
	<!-- <details>
		<summary> Details </summary>
		{#each entry.Stufe.map((value, index) => index) as index}
			{@const stufe = entry.Stufe[index]}
			<h5>
				{getTextBesonderheit(entry, index + 1)}
			</h5>
			<p>
				{getText(stufe.Beschreibung)}
			</p>
		{/each}
	</details> -->

	{#if Object.values($missing).length > 0}
		<ul>
			{#each $missing as m}
				<li class="missing">
					{renderRequirementMap(m, data, { type: 'level', level: entry, pfad: entryPfad }, char)}
				</li>
			{/each}
		</ul>
	{/if}
</div>
{#if false}
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
{/if}

<style lang="scss">
 
</style>
