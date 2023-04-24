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

	import { dealay, distinct, filterNull, getAgeText, getText } from 'src/misc/misc';
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
	import Hide from './hide.svelte';
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
		setAgePromise = dealay(10);
		await setAgePromise;
		setAgePromise = undefined;
		char.ageStore.set(ageArray[0]);
	}
</script>

{#if data && char}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<article>
		<label>
			<h2>Alter</h2>
			<RangeSlider
				all="label"
				float
				formatter={(v) => v}
				handleFormatter={(v) => {
					return `(${getAgeText(v, organism, char)})`;
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
			<div class="propPanel">
				{#each Object.entries(char.eigenschaften) as [key, eigenschaft]}
					<Hide meta={eigenschaft.meta} filterGruppe={gruppe.id}>
						<!--Stupid hack because css :empte dose not match whitespcae anymore…-->
						<div>
							<EigenschaftView {data} {char} {...eigenschaft} {key} filterGruppe={gruppe.id} />
						</div>
					</Hide>
				{/each}
			</div>
		</article>
	{/each}
{/if}

<style lang="scss">
	.propPanel {
		display: flex;
		flex-wrap: wrap;
		& > * {
			width: 50%;
			@media (max-width: 990px ) {
				width: 100%;
			}
		}
	}

	label {
		padding: 1rem;
	}
	h2 {
		position: sticky;
		top: 6rem;
		background-color: var(--card-background-color);
		z-index: 800;
	}
</style>
