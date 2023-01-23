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
			<span class="tooltip">
				<a
					href="#"
					class:missing={$missingNextLevel.length > 0}
					on:click={(e) => {
						e.preventDefault();
						purchased.update((x) => Math.min(entry.Stufe.length, x + 1));
					}}
				>
					{#if $purchased == 0}
						{getTextFertigkeit(entry, $purchased + 1, char)} hinzufügen
					{:else}
						Auf {getTextFertigkeit(entry, $purchased + 1, char)} verbessern
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

				<div class="tooltiptext">
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
			</span>
		{/if}
		<br />
		{#if $purchased > 0 && $purchased > $fixed}
			<span class="tooltip">
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

				<div class="tooltiptext">
					{#await $removeFuture}
						<span aria-busy="true" />
					{:then f}
						<ChangeView change={f} {data} {char} exclude={{ type: 'fertigkeit', id: entry.Id }} />
					{/await}
				</div>
			</span>
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
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
	}

	.tooltip ul * {
		list-style: none;
	}

	/* Tooltip text */
	.tooltip > .tooltiptext > * {
		overflow: auto;
		max-height: 300px;
		margin: 0px var(--spacing);
	}

	.tooltip > .tooltiptext {
		visibility: hidden;
		min-width: 220px;
		max-width: 520px;
		width: max-content;
		background-color: var(--blockquote-border-color);
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;

		/* Position the tooltip text */
		position: absolute;
		z-index: 1;
		bottom: 100%;
		left: 50%;
		margin-left: -110px;

		/* Fade in tooltip */
		opacity: 0;
		transition: opacity 0.3s;
	}

	@media screen and (max-width: 520px) {
		.tooltip > .tooltiptext {
			max-width: calc(100vw - var(--spacing) * 2);

			margin-left: calc(-1 * var(--spacing));
			left: 0px;
			min-width: unset;
		}
	}

	/* Tooltip arrow */
	.tooltip > .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 60px;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;

		border-color: var(--blockquote-border-color) transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}

	.parenthised:not(:empty)::before {
		content: '(';
	}
	.parenthised:not(:empty)::after {
		margin-left: -0.2em;
		content: ')';
	}
</style>
