<script lang="ts">
	import { map } from 'mathjs';
	import type { BesonderheitDefinition_besonderheit } from 'src/data/nota.g';
	import {
		getText,
		getTextBesonderheit,
		getTextTalent,
		intersect,
		renderRequirementMap,
		sortLocalisable,
		withIndex
	} from 'src/misc/misc';
	import {
		Charakter,
		isBesonderheitenHolder,
		substractCost,
		type CharacterChange,
		type Cost,
		type MissingRequirements
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import { stringify } from 'uuid';
	import KostenControl from '../../controls/KostenControl.svelte';
	import TooltipControl from '../../controls/tooltipControl.svelte';
	import ChangeView from './../../controls/ChangeView.svelte';

	export let key: string[];
	export let data: Data;
	export let char: Charakter;

	export let selectedFilter: 'available' | 'purchased' | 'all';

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
	export let parameter: Writable<(string | number)[] | undefined>;

	// let addFuture: Readable<CharacterChange> | undefined;

	// $: {
	// if (key === 'Wohlhabend')

	let addFuture: Readable<Promise<CharacterChange>>;
	let removeFuture: Readable<Promise<CharacterChange>>;
	$: {
		if (useFuture && entry) {
			const b = char.besonderheiten(...key);
			if (isBesonderheitenHolder(b)) {
				addFuture = char.getSimulation(
					'besonderheit',
					(other) => {
						const b = other.besonderheiten(...key);
						if (isBesonderheitenHolder(b) && entry != undefined)
							b.purchased.update((n) =>
								Math.max(0, Math.min(entry!.Stufe.length, Math.max(n + 1, $fixed + 1)))
							);
					},
					key
				);

				removeFuture = char.getSimulation(
					'besonderheit',
					(other) => {
						const b = other.besonderheiten(...key);
						if (isBesonderheitenHolder(b) && entry != undefined)
							b.purchased.update((n) => Math.max(0, Math.min(entry!.Stufe.length, n - 1)));
					},
					key
				);
			}
		}
	}

	let entry: BesonderheitDefinition_besonderheit;
	$: entry = data.besonderheitenMap[key[0]];

	let currentParameterValues: string[] = [];

	$: {
		currentParameterValues = [];
		let keyIndex = 1;
		let parameterIndex = 1;
		if (entry != undefined) {
			for (let i = 0; i < (entry.Parameter.length ?? 0); i++) {
				const p = entry.Parameter[i];

				if (p['#'] == 'Talent') {
					currentParameterValues[i] = key[keyIndex];
					keyIndex++;
				} else if (p['#'] == 'Auswahl') {
					currentParameterValues[i] = key[keyIndex];
					keyIndex++;
				} else if (p['#'] == 'Text') {
					currentParameterValues[i] = $parameter?.[parameterIndex].toString() ?? '';
					parameterIndex++;
				} else if (p['#'] == 'Zahl') {
					currentParameterValues[i] = $parameter?.[parameterIndex].toString() ?? '';
					parameterIndex++;
				}
			}
		}
	}
</script>

<!-- {#if addFuture} -->
{#if (key.length == 1 || $purchased > 0 || $fixed > 0) && ((selectedFilter == 'purchased' && ($purchased > 0 || $fixed > 0)) || (selectedFilter == 'available' && $missingNextLevel.length == 0 && $purchased < entry.Stufe.length && $effective < entry.Stufe.length && $fixed < entry.Stufe.length) || selectedFilter == 'all')}
	<div>
		<h4>
			{getTextBesonderheit(entry, $effective, char, data, ...currentParameterValues)}
			<small style="float: right;"><KostenControl cost={$cost} {data} {char} inline /></small>
		</h4>

		<div>
			{#if $purchased < entry.Stufe.length && $fixed < entry.Stufe.length}
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
							{getTextBesonderheit(entry, $purchased + 1, char)} hinzufügen
						{:else}
							Auf {getTextBesonderheit(entry, Math.max($purchased + 1, $fixed + 1), char)} verbessern
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
						{#if $missingNextLevel && $missingNextLevel.length > 0}
							<ul>
								{#each $missingNextLevel as m}
									<li class="missing">
										{renderRequirementMap(m, data, { type: 'besonderheit', value: entry }, char)}
									</li>
								{/each}
							</ul>
						{/if}
						{#await $addFuture}
							<span aria-busy="true" />
						{:then f}
							<ChangeView
								change={f}
								{data}
								{char}
								exclude={{ type: 'besonderheit', id: key }}
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
							{getTextBesonderheit(entry, $purchased, char)} entfernen
						{:else}
							Auf {getTextBesonderheit(entry, $purchased - 1, char)} reduzieren
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
							<ChangeView change={f} {data} {char} exclude={{ type: 'besonderheit', id: key }} />
						{/await}
					</div>
				</TooltipControl>
			{/if}
		</div>

		<p>
			{getText(entry.Stufe[Math.max($effective - 1, 0)]?.Beschreibung)}
		</p>
		<details>
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
		</details>

		{#if Object.values($missing).length > 0}
			<ul>
				{#each $missing as m}
					<li class="missing">
						{renderRequirementMap(m, data, { type: 'besonderheit', value: entry }, char)}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

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
