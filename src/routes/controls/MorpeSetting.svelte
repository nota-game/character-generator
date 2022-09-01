<script lang="ts">
	import type {
		KostenDefinitions_misc,
		KostenDefinition_misc,
		LebensabschnittDefinition_lebewesen,
		MorphDefinition_lebewesen,
		_Art,
		_Art1,
		_Art2,
		_Gattung,
		_Lebensabschnitt,
		_Morph
	} from '../../data/nota.g';
	import { derived, get, readable, writable, type Readable, type Writable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { distinct, getText } from '../misc';
	import type { Charakter, selection } from '../models/Character';
	import { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';
	import Tree from './tree/tree.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { filter, log, map, min, number, string, xgcd } from 'mathjs';
	import Armor from './armor.svelte';
	import { init } from 'svelte/internal';
	import EntwicklungReihe from './../../controls/organismus/EntwicklungReihe.svelte';
	import Char from '../char.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	// let current = char?.morphId;

	$: morphStore = char?.morphStore;
	$: organismStore = char?.organismusStore;
	$: selectedOrganism = $organismStore;
	$: selectedMorph = $morphStore;
	let ageArray = [0];
	$: age = ageArray[0];

	$: selectedL = selectedOrganism?.lebensabschnitt;

	// // $: {
	// // 	if (data && selectedL && char) {
	// // 		const x = data.lebensabschnittLookup[selectedL.Id];
	// // 		char.organismus = x;
	// // 	}
	// // }
	$: {
		if (char) {
			ageArray[0] = initChar(char, ageArray[0]);
		}
	}
	function initChar(char: Charakter, age: number): number {
		if (char) {
			if (age == 0) {
				age = get(char.ageStore);
			} else {
				char.ageStore.set(age);
			}
		}
		return age;
	}

	let w: Readable<selection>;
	let wc: Readable<KostenDefinition_misc[]>;
	$: {
		if (char) {
			w = readable();
			// const inputs = document.getElementsByTagName('input');
			// Array.from(inputs, (x, i) => inputs.item(i)).forEach((element) => {
			// 	if (element) element.checked = false;
			// });

			w = char?.organismusStore ?? readable();
			wc = derived(w, (x) => x?.lebensabschnitt?.flatMap((l) => l.Spielbar?.Kosten ?? []) ?? []);
		}
	}
</script>

{#if data}
	{#if selectedMorph}
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			Alter
			<RangeSlider
				all="label"
				float
				formatter={(v) => v}
				handleFormatter={(v) => {
					let l = Data.age2Lebensabschnitte(
						v,
						selectedOrganism?.morph,
						selectedOrganism?.art,
						selectedOrganism?.gattung
					);
					const year = Math.floor(v);
					const month = Math.round((v - year) * 12);
					const age = month == 0 ? ` (${year} Jahre)` : ` (${year} Jahre und ${month} Monate)`;

					if (l === undefined) return age;
					else
						return (
							distinct(l.map((x) => (x ? getText(x.Name) : '')))
								.filter((x) => x != '')
								.join(', ') + age
						);
				}}
				bind:values={ageArray}
				pips
				pipstep={120}
				step={1 / 12}
				min={Math.min(...selectedMorph.Lebensabschnitte.Lebensabschnitt.map((x) => x.startAlter))}
				max={Math.max(
					...selectedMorph.Lebensabschnitte.Lebensabschnitt.map((x) => x.endAlter ?? 0),
					...selectedMorph.Lebensabschnitte.Lebensabschnitt.map((x) => x.startAlter)
				)}
			/>
		</label>
		{#if selectedL}
			{#each selectedL as l}
				{getText(l.Name)}
				{#if l.Spielbar}
					<KostenControl cost={l.Spielbar.Kosten} {data} {char} />
				{/if}
				{getText(l.Beschreibung)}
			{/each}
		{/if}

		{#each selectedMorph.Entwiklung.Reihe ?? [] as r}
			<EntwicklungReihe {char} {data} reihe={r} />
		{/each}
	{/if}
{/if}
