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
	import ChangeView from '../../controls/ChangeView.svelte';
	import BesonderheitControl from './besonderheitControl.svelte';

	export let key: string[];
	export let data: Data;
	export let char: Charakter;

	export let selectedFilter: 'available' | 'purchased' | 'all';

	export let useFuture: boolean;

	let effective: Readable<number> | undefined;
	let unconditionally: Readable<number> | undefined;
	let purchased: Writable<number> | undefined;
	let fixed: Readable<number> | undefined;
	let missing: Readable<any[]> | undefined;
	let missingNextLevel: Readable<{ wert: number; missing: MissingRequirements }[]> | undefined;
	let cost: Readable<Cost> | undefined;
	let costNext: Readable<Cost> | undefined;
	let costPreview: Readable<Cost> | undefined;
	let parameter: Writable<(string | number)[] | undefined> | undefined;

	// let addFuture: Readable<CharacterChange> | undefined;

	// $: {
	// if (key === 'Wohlhabend')

	let addFuture: Readable<Promise<CharacterChange>> | undefined;
	let removeFuture: Readable<Promise<CharacterChange>> | undefined;

	let entry: BesonderheitDefinition_besonderheit;
	$: entry = data.besonderheitenMap[key[0]];
	$: parameters = entry?.Parameter.filter((x) => x['#'] == 'Auswahl' || x['#'] == 'Talent') ?? [];
	let parameterSelection: (string | number)[] = [];

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

	let selections: string[][];
	$: {
		selections = [];
		if (entry)
			for (let i = 0; i < entry.Parameter.length; i++) {
				const element = entry.Parameter[i];
				if (element['#'] == 'Auswahl') {
					const valuePairs = entry.Parameter.map((x, j) => [x, parameterSelection[j]] as const);
					const keyParameter = valuePairs
						.filter(([, currentIndex]) => currentIndex < i)
						.filter(([parameter]) => parameter['#'] == 'Talent' || parameter['#'] == 'Auswahl');
					const holder = char.besonderheiten(
						key[0],
						...keyParameter.map(([, value]) => value as string)
					);
					if (isBesonderheitenHolder(holder)) {
						throw new Error('should not happen');
					}
					const usedValues = holder ?? [];

					selections[i] = element.Auswahl.Input.Wahl.filter((x) => !usedValues.includes(x.Id)).map(
						(x) => x.Id
					);
				} else if (element['#'] == 'Talent') {
					const valuePairs = entry.Parameter.map((x, j) => [x, parameterSelection[j]] as const);
					const keyParameter = valuePairs
						.filter(([, currentIndex]) => currentIndex < i)
						.filter(([parameter]) => parameter['#'] == 'Talent' || parameter['#'] == 'Auswahl');
					const holder = char.besonderheiten(
						key[0],
						...keyParameter.map(([, value]) => value as string)
					);
					if (isBesonderheitenHolder(holder)) {
						throw new Error('should not happen');
					}
					const usedValues = holder ?? [];

					selections[i] = Object.keys(data.talentMap).filter((x) => !usedValues.includes(x));
				}
			}

		const holder = getHolderFromSelection();

		effective = holder?.effective;
		unconditionally = holder?.unconditionally;
		purchased = holder?.purchased;
		fixed = holder?.fixed;
		missing = holder?.missing;
		missingNextLevel = holder?.missingNextLevel;
		cost = holder?.cost;
		costNext = holder?.costNext;
		costPreview = holder?.costPreview;
		parameter = holder?.parameter;
	}

	$: {
		if (useFuture && entry && $fixed !== undefined) {
			// const b = char.besonderheiten(...key);
			const b = getHolderFromSelection();
			if (isBesonderheitenHolder(b)) {
				const holderKeys = getHolderKey();
				addFuture = char.getSimulation(
					'besonderheit',
					(other) => {
						const b = other.besonderheiten(...holderKeys);
						if (isBesonderheitenHolder(b) && entry != undefined)
							b.purchased.update((n) => {
								const newValue = Math.max(
									0,
									Math.min(entry!.Stufe.length, Math.max(n + 1, $fixed + 1))
								);
								return newValue;
							});
					},
					getHolderKey()
				);

				removeFuture = char.getSimulation(
					'besonderheit',
					(other) => {
						const b = other.besonderheiten(...holderKeys);

						if (isBesonderheitenHolder(b) && entry != undefined)
							b.purchased.update((n) => Math.max(0, Math.min(entry!.Stufe.length, n - 1)));
					},
					getHolderKey()
				);
			}
		}
	}

	function addParametherized() {
		if (entry) {
			const holder = getHolderFromSelection();

			if (holder) {
				const fixed = holder.fixed.currentValue({ defaultValue: 0 });
				holder.purchased.update((x) => {
					const updeted = Math.min(entry!.Stufe.length, Math.max(x + 1, fixed + 1));
					return updeted;
				});
			}
		}
	}

	function getHolderFromSelection() {
		const holder = char.besonderheiten(...getHolderKey());
		if (isBesonderheitenHolder(holder)) {
			return holder;
		} else {
			return undefined;
		}
	}

	function getHolderKey() {
		const valuePairs = entry.Parameter.map((x, i) => [x, parameterSelection[i]] as const);
		const keyParameter = valuePairs.filter(
			([parameter]) => parameter['#'] == 'Talent' || parameter['#'] == 'Auswahl'
		);

		return [key[0], ...keyParameter.map(([, value]) => value as string)];
	}
</script>

{#each withIndex(entry.Parameter) as [parameter, index]}
	{#if parameter['#'] == 'Talent'}
		{#each Object.keys(data.talentCategoryMap) as talentCategory}
			{#each sortLocalisable(Object.keys(data.talentCategoryMap[talentCategory].talente), (x) => data.talentMap[x]) as talentId}
				{@const talent = data.talentMap[talentId]}
				{@const b = char.besonderheiten(...[...key, talentId])}
				{#if isBesonderheitenHolder(b)}
					<BesonderheitControl
						{data}
						{char}
						key={[...key, talentId]}
						{useFuture}
						{selectedFilter}
						{...b}
					/>
				{:else}
					<svelte:self
						{data}
						{char}
						key={[...key, talentId]}
						{useFuture}
						{selectedFilter}
						{...char.besonderheiten(...key, talentId)}
					/>
				{/if}
			{/each}
		{/each}
	{:else if parameter['#'] == 'Zahl'}
		<input type="number" max={parameter.Zahl.max} min={parameter.Zahl.min} />
	{:else if parameter['#'] == 'Text'}
		<input type="text" />
	{:else if parameter['#'] == 'Auswahl'}
		<select>
			{#each parameter.Auswahl.Input.Wahl as wahl}
				<option value={wahl.Id}>{getText(wahl.Name)}</option>
			{/each}
		</select>
	{/if}
{/each}

{#if selectedFilter != 'purchased' && key.length == 1}
	<!-- only the first shold show the add us-->
	<h4>
		{getTextBesonderheit(entry, 1, char)}
		<small style="float: right;"><KostenControl cost={$cost} {data} {char} inline /></small>
	</h4>

	{#each withIndex(entry.Parameter) as [parameter, index]}
		{#if parameter['#'] == 'Talent'}
			<select bind:value={parameterSelection[index]}>
				{#each Object.keys(data.talentCategoryMap) as talentCategory}
					<optgroup label={getText(data.talentCategoryMap[talentCategory].Name)}>
						{#each sortLocalisable(intersect(selections[index], Object.keys(data.talentCategoryMap[talentCategory].talente)), (x) => data.talentMap[x]) as talentId}
							{@const talent = data.talentMap[talentId]}
							<option value={talentId}>{getTextTalent(talent, char, 'Name')}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		{:else if parameter['#'] == 'Zahl'}
			<input
				type="number"
				bind:value={parameterSelection[index]}
				max={parameter.Zahl.max}
				min={parameter.Zahl.min}
			/>
		{:else if parameter['#'] == 'Text'}
			<input type="text" bind:value={parameterSelection[index]} />
		{:else if parameter['#'] == 'Auswahl'}
			<select bind:value={parameterSelection[index]}>
				{#each parameter.Auswahl.Input.Wahl as wahl}
					{#if selections[index].includes(wahl.Id)}
						<option value={wahl.Id}>{getText(wahl.Name)}</option>
					{/if}
				{/each}
			</select>
		{/if}
	{/each}

	<TooltipControl>
		<!-- class:missing={$missingNextLevel.length > 0} -->
		{#if purchased !== undefined && fixed !== undefined && costNext !== undefined}
			<a
				href="#"
				on:click={(e) => {
					e.preventDefault();
					addParametherized();
				}}
			>
				{#if $purchased == 0 && $fixed == 0}
					{getTextBesonderheit(
						entry,
						$purchased + 1,
						char,
						data,
						...parameterSelection.map((x) => x.toString())
					)} hinzufügen
				{:else}
					Auf {getTextBesonderheit(
						entry,
						Math.max($purchased + 1, $fixed + 1),
						char,
						data,
						...parameterSelection.map((x) => x.toString())
					)} verbessern
				{/if}
				<small class="parenthised"
					><KostenControl cost={substractCost($costNext, $cost)} {data} {char} mode="cost" /></small
				>
			</a>
		{/if}

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
				{#if missingNextLevel !== undefined && f}
					<ChangeView
						change={f}
						{data}
						{char}
						exclude={{ type: 'besonderheit', id: getHolderKey() }}
						excludeRequirments={$missingNextLevel}
					/>
				{/if}
			{/await}
		</div>
	</TooltipControl>

	<a
		href="#"
		on:click={(e) => {
			e.preventDefault();
			addParametherized();
		}}
	>
		hinzufügen
	</a>
	<p>
		{getText(entry.Stufe[0]?.Beschreibung)}
	</p>
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
