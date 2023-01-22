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

	import { dealay, distinct, filterNull, getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import { Data } from 'src/models/Data';
	// import KostenControl from './KostenControl.svelte';
	// import Tree from './tree/tree.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import { filter, log, map, min, number, string, xgcd } from 'mathjs';
	// import Armor from './armor.svelte';
	import { init } from 'svelte/internal';
	// import EntwicklungReihe from './../../controls/organismus/EntwicklungReihe.svelte';
	import EigenschaftView from './eigenschaftView.svelte';
	// import Char from '../char.svelte';

	export let data: Data;
	export let char: Charakter;

	// let current = char?.morphId;

	// $: morphStore = char?.morphStore;
	// // $: organismStore = char?.organismusStore;
	// $: selectedOrganism = $organismStore;
	// $: selectedMorph = $morphStore;
	let ageArray = [0];
	$: age = ageArray[0];

	let morphStore = char.morphIdStore;
	let artStore = char.artIdStore;
	let gattungStore = char.gattungsIdStore;
	const lebensAbschnitte = char.lebensAbschnitteStore;

	$: organism = $morphStore ? data.morphLookup[$morphStore] : undefined;

	ageArray[0] = get(char.ageStore);

	$: setAge(ageArray[0]);
	let setAgePromise: Promise<void> | undefined;
	async function setAge(age: number) {
		if (setAgePromise) {
			return;
		}
		setAgePromise = dealay(2000);
		await setAgePromise;
		setAgePromise = undefined;
		char.ageStore.set(ageArray[0]);
	}

</script>

{#if data && char}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<article>
		<label>
			<h3>Alter</h3>
			<RangeSlider
				all="label"
				float
				formatter={(v) => v}
				handleFormatter={(v) => {
					let l = Data.age2Lebensabschnitte(v, organism?.morph, organism?.art, organism?.gattung);
					const year = Math.floor(v);
					const month = Math.round((v - year) * 12);
					const age = month == 0 ? ` (${year} Jahre)` : ` (${year} Jahre und ${month} Monate)`;

					if (l === undefined) return age;
					else
						return (
							distinct(l.map((x) => (x ? getText(x.Name, char) : '')))
								.filter((x) => x != '')
								.join(', ') + age
						);
				}}
				bind:values={ageArray}
				pips
				pipstep={120}
				step={1 / 12}
				min={Math.min(
					...(organism?.morph.Lebensabschnitte.Lebensabschnitt.map((x) => x.startAlter) ?? [])
				)}
				max={Math.max(
					...(organism?.morph.Lebensabschnitte.Lebensabschnitt.map((x) => x.endAlter ?? 0) ?? []),
					...(organism?.morph.Lebensabschnitte.Lebensabschnitt.map((x) => x.startAlter) ?? [])
				)}
			/>
		</label>
		{#if $lebensAbschnitte}
			{#each filterNull( [$lebensAbschnitte.morph, $lebensAbschnitte.art, $lebensAbschnitte.gattung] ) as l}
				{getText(l.Name, char)}
				{#if l.Spielbar}
					<!-- <KostenControl cost={l.Spielbar.Kosten} {data} {char} /> -->
				{/if}
				{getText(l.Beschreibung, char)}
			{/each}
		{/if}
	</article>

	{#each data.Instance.Daten.Organismen.EigenschaftenGruppen.Gruppe as gruppe}
		<article>
			<h2>
				{getText(gruppe.Name)}
			</h2>
			{#each Object.entries(char.eigenschaften) as [key, eigenschaft]}
				<EigenschaftView {data} {char} {...eigenschaft} {key} filterGruppe={gruppe.id} />
			{/each}
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- <label> -->
			<!-- {#if propStore && $propStore && propTypeStore && $propTypeStore} -->
			<!-- {#if $propTypeStore[key]?.type == 'calc'} -->
			<!-- {@const reihe = $propTypeStore[key]} -->
			<!-- <label> -->
			<!-- <h4> -->
			<!-- {getText(reihe.Name)} -->
			<!-- </h4> -->
			<!-- </label> -->
			<!-- {$propStore[key].toLocaleString()} -->
			<!-- {reihe.einheit} -->
			<!-- {:else if $propTypeStore[key]?.type == 'reihe'} -->
			<!-- {@const reihe = $propTypeStore[key]} -->
			<!-- <EntwicklungReihe {char} {data} {reihe} /> -->
			<!-- {/if} -->
			<!-- {/if} -->
			<!-- </label> -->
		</article>
	{/each}

	<!-- {#each selectedMorph.Entwiklung.Reihe ?? [] as r}
			<EntwicklungReihe {char} {data} reihe={r} />
		{/each} -->
{/if}

<style lang="scss">
	label {
		padding: 1rem;
	}
	h4 {
		margin-top: 2rem;
		margin-bottom: 0.25rem;
		small {
			font-weight: normal;
			font-style: normal;
		}
	}
</style>
