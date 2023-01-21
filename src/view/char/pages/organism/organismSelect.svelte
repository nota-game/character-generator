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

	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	// import KostenControl from './KostenControl.svelte';
	// import Tree from './tree/tree.svelte';
	// import RangeSlider from 'svelte-range-slider-pips';
	// import { log, map, min, number, string, xgcd } from 'mathjs';
	// import Armor from './armor.svelte';
	// import { init } from 'svelte/internal';
	// import EntwicklungReihe from './../../controls/organismus/EntwicklungReihe.svelte';
	// import Char from '../char.svelte';

	export let data: Data;
	export let char: Charakter;

	// let current = char?.morphId;

	let selectedMorphId: string | undefined;
	// $: selectedGattungArtMorp = selectedMorphId ? data?.morphLookup[selectedMorphId] : undefined;
	// $: selectedMorph = selectedMorphId ? data?.morphLookup[selectedMorphId].morph : undefined;
	let ageArray = [0];
	$: age = ageArray[0];

	let morphStore = char.morphIdStore;
	let artStore = char.artIdStore;
	let gattungStore = char.gattungsIdStore;

	const organismLookup = Object.fromEntries(
		data.Instance.Daten.Organismen.Gattung.flatMap((gattung) =>
			gattung.Art.flatMap((art) =>
				art.Morphe.Morph.map((morph) => [
					morph.Id,
					{ morph: morph.Id, art: art.Id, gattung: gattung.Id }
				])
			)
		)
	);

	if ($morphStore) {
		selectedMorphId = $morphStore;
	}

	$: {
		if (selectedMorphId) {
			const { morph, art, gattung } = organismLookup[selectedMorphId];
			gattungStore.set(gattung);
			artStore.set(art);
			morphStore.set(morph);
		}
	}

	// $: selectedL = Data.age2Lebensabschnitte(age, selectedGattungArtMorp?.morph, selectedGattungArtMorp?.art, selectedGattungArtMorp?.gattung);

	// // $: {
	// // 	if (data && selectedL && char) {
	// // 		const x = data.lebensabschnittLookup[selectedL.Id];
	// // 		char.organismus = x;
	// // 	}
	// // }
	$: {
		if (char) {
			// [ageArray[0], selectedMorphId] = initChar(char, ageArray[0], selectedMorphId);
		}
	}
	// function initChar(
	// 	char: Charakter,
	// 	age: number,
	// 	selectedMorphId: string | undefined
	// ): [number, string | undefined] {
	// 	if (char) {
	// 		console.log('init', char, age, selectedMorphId);
	// 		if (age == 0) {
	// 			age = get(char.ageStore);
	// 		} else {
	// 			char.ageStore.set(age);
	// 		}
	// 		if (selectedMorphId == undefined) {
	// 			selectedMorphId = char.morphId;
	// 		} else {
	// 			char.morphId = selectedMorphId;
	// 		}
	// 	}
	// 	return [age, selectedMorphId];
	// }

	// let w: Readable<selection>;
	// let wc: Readable<KostenDefinition_misc[]>;
	// $: {
	// 	if (char) {
	// 		w = readable();
	// 		// const inputs = document.getElementsByTagName('input');
	// 		// Array.from(inputs, (x, i) => inputs.item(i)).forEach((element) => {
	// 		// 	if (element) element.checked = false;
	// 		// });

	// 		w = char?.organismusStore ?? readable();
	// 		wc = derived(w, (x) => x?.lebensabschnitt?.flatMap((y) => y.Spielbar?.Kosten ?? []) ?? []);
	// 	}
	// }

	// function age2Lebensabschnitt(
	// 	m: MorphDefinition_lebewesen | undefined,
	// 	age: number | undefined
	// ): LebensabschnittDefinition_lebewesen | undefined {
	// 	if (!m) return undefined;
	// 	if (!age) return undefined;
	// 	let last = m.Lebensabschnitte.Lebensabschnitt[0];
	// 	for (const l of m.Lebensabschnitte.Lebensabschnitt) {
	// 		if (l.startAlter > age) return last;
	// 		last = l;
	// 	}
	// 	return m.Lebensabschnitte.Lebensabschnitt[m.Lebensabschnitte.Lebensabschnitt.length - 1];
	// }
</script>

{#if data}
	{#each data.Instance.Daten.Organismen.Gattung ?? [] as g}
		<h2>{getText(g.Name, char)}</h2>
		<p>{getText(g.Beschreibung, char)}</p>
		{#each g.Art as a}
			<h3>{getText(a.Name, char)}</h3>
			<p>{getText(a.Beschreibung, char)}</p>
			{#each a.Morphe.Morph as m}
				<label>
					<input type="radio" value={m.Id} bind:group={selectedMorphId} />
					{getText(m.Name, char)}
				</label>
				<p>{getText(m.Beschreibung, char)}</p>
			{/each}
		{/each}
	{/each}
{/if}
