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

	let entry: BesonderheitDefinition_besonderheit | undefined;
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
	}

	function addParametherized() {
		if (entry) {
			const valuePairs = entry.Parameter.map((x, i) => [x, parameterSelection[i]] as const);
			const keyParameter = valuePairs.filter(
				([parameter]) => parameter['#'] == 'Talent' || parameter['#'] == 'Auswahl'
			);
			const holder = char.besonderheiten(
				key[0],
				...keyParameter.map(([, value]) => value as string)
			);

			if (isBesonderheitenHolder(holder)) {
				const fixed = holder.fixed.currentValue({ defaultValue: 0 });
				holder.purchased.update((x) => {
					const updeted = Math.min(entry!.Stufe.length, Math.max(x + 1, fixed + 1));
					return updeted;
				});
			}
		}
	}
</script>

{#if entry}
	{#if parameters.length + 1 > key.length}
		

		{#each withIndex(entry.Parameter) as [parameter, index]}
			{#if parameter['#'] == 'Talent'}
				{#each Object.keys(data.talentCategoryMap) as talentCategory}
					{#each sortLocalisable(Object.keys(data.talentCategoryMap[talentCategory].talente), (x) => data.talentMap[x]) as talentId}
						{@const talent = data.talentMap[talentId]}
						<svelte:self
							{data}
							{char}
							key={[...key, talentId]}
							{useFuture}
							{selectedFilter}
							{...char.besonderheiten(...key, talentId)}
						/>
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
				{getTextBesonderheit(entry, $effective, char)}
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
				{getText(entry.Stufe[Math.max($effective - 1, 0)]?.Beschreibung)}
			</p>
		{/if}
	{:else}
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
									purchased.update((x) =>
										Math.min(entry.Stufe.length, Math.max(x + 1, $fixed + 1))
									);
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
								<ul>
									{#each $missingNextLevel as m}
										<li class="missing">
											{renderRequirementMap(m, data, { type: 'besonderheit', value: entry }, char)}
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
									<ChangeView
										change={f}
										{data}
										{char}
										exclude={{ type: 'besonderheit', id: entry.Id }}
									/>
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
	{/if}
{/if}

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
