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
	} from 'src/data/nota.g';
	import { derived, get, readable, writable, type Readable, type Writable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { getText } from '../misc';
	import type { Charakter, selection } from '../models/Character';
	import type { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';
	import Tree from './tree/tree.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { log, min, number } from 'mathjs';
	import Armor from './armor.svelte';
	import { init } from 'svelte/internal';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	let current = char?.organismus?.l.Id;

	let selectedMorph: MorphDefinition_lebewesen | undefined;
	let ageArray = [0];
	$: age = ageArray[0];

	$: selectedL = age2Lebensabschnitt(selectedMorph, age);

	$: {
		if (data && selectedL && char) {
			const x = data.lebensabschnittLookup[selectedL.Id];
			char.organismus = x;
		}
	}
	$: {
		if (char) initChar();
	}
	function initChar() {
		if (char && age == 0) {
			ageArray[0] = get(char.ageStore);
			selectedMorph = char.organismus?.m;
		}
	}

	$: {
		if (char) {
			char.ageStore.set(age);
		}
	}

	char?.allMissingRequirements;
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
			wc = derived(w, (x) => x?.l?.Spielbar?.Kosten ?? []);
		}
	}

	$: {
		// if (char) char.organismus = current ? data?.lebensabschnittLookup[current] : undefined;
	}

	function age2Lebensabschnitt(
		m: MorphDefinition_lebewesen,
		age: number
	): LebensabschnittDefinition_lebewesen | undefined {
		if (!m) return undefined;
		if (!age) return undefined;
		let last = m.Lebensabschnitte.Lebensabschnitt[0];
		for (const l of m.Lebensabschnitte.Lebensabschnitt) {
			if (l.startAlter > age) return last;
			last = l;
		}
		return m.Lebensabschnitte.Lebensabschnitt[m.Lebensabschnitte.Lebensabschnitt.length - 1];
	}
</script>

{#if data}
	{#each data.Instance.Daten.Organismen.Gattung ?? [] as g}
		<h2>{getText(g.Name)}</h2>
		<p>{getText(g.Beschreibung)}</p>
		{#each g.Art as a}
			<h3>{getText(a.Name)}</h3>
			<p>{getText(a.Beschreibung)}</p>
			{#each a.Morphe.Morph as m}
				<label>
					<input type="radio" value={m} bind:group={selectedMorph} />
					{getText(m.Name)}
				</label>
				<p>{getText(m.Beschreibung)}</p>
				{#if m == selectedMorph}
					<label>
						Alter
						<RangeSlider
							all="label"
							float
							formatter={(v) => v}
							handleFormatter={(v) => {
								let l = age2Lebensabschnitt(m, v);
								return (l ? getText(l.Name) : '') + ` (${v} Jahre)`;
							}}
							bind:values={ageArray}
							pips
							min={Math.min(...m.Lebensabschnitte.Lebensabschnitt.map((x) => x.startAlter))}
							max={Math.max(...m.Lebensabschnitte.Lebensabschnitt.map((x) => x.endAlter))}
						/>
					</label>
					{#if selectedL}
						{selectedL.Id}

						{getText(selectedL.Name)}
						<KostenControl cost={selectedL.Spielbar.Kosten} {data} {char} />
						{getText(selectedL.Beschreibung)}
					{/if}
				{/if}
			{/each}
		{/each}
	{/each}
{/if}
