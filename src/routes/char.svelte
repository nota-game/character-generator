<script lang="ts">
	import { onMount } from 'svelte';
	import pako from 'pako';
	import * as base64 from 'base64-uint8';
	import { Data } from './models/Data';
	import { Charakter, EIGENRSCHAFTEN, type CharakterData } from './models/Character';
	import PointControl from './controls/PointControl.svelte';
	import OrganismSelect from './controls/OrganismSelect.svelte';
	import EigenschaftsControl from './controls/EigenschaftsControl.svelte';

	import {} from '@picocss/pico/css/pico.css';
	import TalentList from './controls/TalentList.svelte';
	import FertigkeitenList from './controls/FertigkeitenList.svelte';
	import BesonderheitenList from './controls/BesonderheitenList.svelte';
	import PfadList from './controls/PfadList.svelte';
	import { local } from './storage';
	import { get, writable, type Writable } from 'svelte/store';
	import Hitman from './controls/hitman.svelte';
	import Armor from './controls/armor.svelte';
	import AusrstungList from './controls/AusrustungList.svelte';
	import RequirementsControl from './controls/RequirementsControl.svelte';
	import { renderRequirement } from './misc';

	let data = writable<Data | undefined>(undefined);
	let char = writable<Charakter | undefined>(undefined);
	export let charId: string | undefined;

	let allMissingRequirements = $char?.allMissingRequirements;
	$: allMissingRequirements = $char?.allMissingRequirements;

	let charOrganismusStore = $char?.organismusStore;
	$: charOrganismusStore = $char?.organismusStore;

	let nameStore = $char?.nameStore;
	$: nameStore = $char?.nameStore;

	let sizeStore = $char?.sizeStore;
	$: sizeStore = $char?.sizeStore;
	let weightStore = $char?.weightStore;
	$: weightStore = $char?.weightStore;
	let weightMinStore = $char?.weightMinStore;
	$: weightMinStore = $char?.weightMinStore;
	let weightMaxStore = $char?.weightMaxStore;
	$: weightMaxStore = $char?.weightMaxStore;

	let ausdauerStore = $char?.ausdauerStore;
	$: ausdauerStore = $char?.ausdauerStore;

	let initiativeStore = $char?.initiativeStore;
	$: initiativeStore = $char?.initiativeStore;

	let geschwindigkeitStore = $char?.geschwindigkeitStore;
	$: geschwindigkeitStore = $char?.geschwindigkeitStore;

	let kraftStore = $char?.kraftStore;
	$: kraftStore = $char?.kraftStore;

	let selection: string = 'Übersicht';

	let mounted = false;

	onMount(async () => {
		dev.set(!window.location.pathname.includes('character-generator'));
		mounted = true;
		updete(charId);
	});

	async function updete(charId: string | undefined) {
		console.log('charId');
		if (mounted && charId) {
			const currentChar = local<CharakterData>('c' + charId);
			const j = get(currentChar);
			console.log(j);
			$data = await Data.init(false, j?.stammdatenId);
			if ($data) {
				$char = new Charakter($data, j ?? charId);

				$char?.DataStore.subscribe((v) => currentChar.set(v));
			}
		}
	}

	$: updete(charId);

	let hasNegativPoints: boolean = false;

	let dev = writable(true);
	let pageLink: string;
	let charLink: string;
	$: pageLink = ($dev ? '/page' : '/character-generator/page') + '#' + charId;
	let persistionData = $char?.DataStore;
	$: persistionData = $char?.DataStore;
	$: {
		const d = JSON.stringify($persistionData ?? {});
		const packed = base64.encode(pako.deflate(d));

		charLink =
			($dev ? '/' : '/character-generator/') +
			`#d${(packed?.length ?? NaN) < d.length ? packed : d}`;
	}
</script>

{#if $data && (charId === undefined || $char)}
	<!-- <Hitman char={$char}></Hitman> -->
	<!-- <Armor char={$char}></Armor> -->

	{#if $char}
		<article class="hover">
			<header>Punkte</header>
			<div>
				<PointControl char={$char} data={$data} />
			</div>
			<div>
				<strong>Punkte</strong>
				<PointControl char={$char} data={$data} compact />
			</div>
		</article>
	{/if}
	<main class="container">
		<nav>
			<ul>
				{#if $char}
					<li>
						<a
							href={pageLink}
							role="button"
							disabled={char == undefined ? true : undefined}
							rel="external">Character Blatt</a
						>
					</li>
					<li>
						<a
							href={charLink}
							role="button"
							disabled={char == undefined ? true : undefined}
							rel="external">Link {charLink?.length ?? -1}</a
						>
					</li>
				{/if}
			</ul>
			<ul>
				<li>
					<input
						id="ÜbersichtSelecs"
						type="radio"
						name="top"
						value="Übersicht"
						bind:group={selection}
					/>
					<label for="ÜbersichtSelecs">Übersicht</label>
				</li>
				{#if $char}
					<li>
						<input
							id="Gattung/ArtSelecs"
							type="radio"
							name="top"
							value="Gattung/Art"
							bind:group={selection}
						/>
						<label for="Gattung/ArtSelecs">Gattung/Art </label>
					</li>
				{/if}
				{#if $charOrganismusStore}
					<li>
						<input
							id="EigenschaftenSelecs"
							type="radio"
							name="top"
							value="Eigenschaften"
							bind:group={selection}
						/>
						<label for="EigenschaftenSelecs">Eigenschaften </label>
					</li>
					<li>
						<input id="PfadeSelecs" type="radio" name="top" value="Pfade" bind:group={selection} />
						<label for="PfadeSelecs">Pfade </label>
					</li>
					<li>
						<input
							id="TalenteSelecs"
							type="radio"
							name="top"
							value="Talente"
							bind:group={selection}
						/>
						<label for="TalenteSelecs">Talente </label>
					</li>
					<li>
						<input
							id="FertigkeitenSelecs"
							type="radio"
							name="top"
							value="Fertigkeiten"
							bind:group={selection}
						/>
						<label for="FertigkeitenSelecs">Fertigkeiten </label>
					</li>
					<li>
						<input
							id="BesonderheitenSelecs"
							type="radio"
							name="top"
							value="Besonderheiten"
							bind:group={selection}
						/>
						<label for="BesonderheitenSelecs">Besonderheiten </label>
					</li>
					<li>
						<input
							id="AusrüstungSelecs"
							type="radio"
							name="top"
							value="Ausrüstung"
							bind:group={selection}
						/>
						<label for="AusrüstungSelecs">Ausrüstung</label>
					</li>
				{/if}
			</ul>
			<ul>
				<li>
					<!-- <button
						disabled={char == undefined}
						on:click={() => {
							// if ($char)
							// 	$char.Data = {
							// 		id
							// 		besonderheiten: {},
							// 		eigenschaften: {},
							// 		fertigkeiten: {},
							// 		talentEP: {},
							// 		pfade: {},
							// 		lebensabschnittId: undefined
							// 	};
							selection = 'Gattung/Art';
						}}>Reset</button
					> -->
				</li>
			</ul>
		</nav>

		{#if selection == 'Übersicht'}
			<article>
				{#if $char}
					<p>Stammdaten {$char.stammdaten.id}</p>
					{#if $allMissingRequirements && $allMissingRequirements.length == 0 && !hasNegativPoints}
						<p>Der Charakter ist Gültig.</p>
					{/if}

					<p style={hasNegativPoints ? '' : 'display: none;'}>
						Es wurden zu viele Punkte ausgegeben

						<PointControl
							onlyNegatve
							char={$char}
							data={$data}
							bind:hasNegativ={hasNegativPoints}
						/>
					</p>
					{#if $allMissingRequirements && $allMissingRequirements.length > 0}
						<p>Es fehlen folgende Voraussetzungen</p>
						<ul>
							{#each $allMissingRequirements as r}
								<li>{renderRequirement(r, $data)}</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<p>
						Wählen Sie einen Charackter in der Auswahlbox am oberen Bildschirmrand aus oder erzeugen
						sie einen neuen
					</p>
					<p>
						Characktere werden lokal in ihrem Browser gespeichert. Sie können zurzeit nicht einfach
						übertragen werden.
					</p>
				{/if}
			</article>
		{/if}
		{#if selection == 'Gattung/Art' && $char}
			<article>
				<OrganismSelect char={$char} data={$data} />
			</article>
		{/if}
		{#if $charOrganismusStore && $char}
			{#if selection == 'Eigenschaften'}
				<article>
					<label>
						Name
						<input type="text" placeholder="Name" bind:value={$nameStore} />
					</label>

					<div
						style="display: grid; grid-template-columns: auto 1fr auto ; gap: 1rem; align-items: end; margin-bottom: var(--spacing);"
					>
						<small>{$charOrganismusStore?.l.minGröße} m</small>
						<label>
							Größe {$sizeStore} m
							<input
								type="range"
								step="0.01"
								bind:value={$sizeStore}
								min={$charOrganismusStore?.l.minGröße}
								max={$charOrganismusStore?.l.maxGröße}
								style="margin-bottom: 0px;"
							/>
						</label>
						<small>{$charOrganismusStore?.l.maxGröße} m</small>
					</div>
					<div
						style="display: grid; grid-template-columns: auto 1fr auto ; gap: 1rem; align-items: end; margin-bottom: var(--spacing);"
					>
						<small>{$weightMinStore} Kg</small>
						<label>
							Gewicht {$weightStore} Kg
							<input
								type="range"
								step="0.1"
								bind:value={$weightStore}
								min={$weightMinStore}
								max={$weightMaxStore}
								style="margin-bottom: 0px;"
							/>
						</label>
						<small>{$weightMaxStore} Kg</small>
					</div>
					AU {$ausdauerStore}
					Initiative {$initiativeStore}
					Geschwindigkeit {$geschwindigkeitStore}
					Kraft {$kraftStore}
				</article>

				<div
					style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; "
				>
					{#each EIGENRSCHAFTEN as e}
						<EigenschaftsControl bind:char={$char} data={$data} eigenschaft={e} />
					{/each}
				</div>
			{:else if selection == 'Pfade'}
				<PfadList char={$char} data={$data} />
			{:else if selection == 'Talente'}
				<TalentList char={$char} data={$data} />
			{:else if selection == 'Fertigkeiten'}
				<FertigkeitenList char={$char} data={$data} />
			{:else if selection == 'Besonderheiten'}
				<BesonderheitenList char={$char} data={$data} />
			{:else if selection == 'Ausrüstung'}
				<AusrstungList char={$char} data={$data} />
			{/if}
		{/if}
	</main>
{:else}
	<p>Loding…</p>
{/if}

<style lang="scss">
	:global {
		.missing {
			color: brown;
		}
		button.missing {
			background-color: brown;
			color: white;
		}
	}
	.hover {
		width: 10rem;
		position: sticky;
		float: right;
		right: 50px;
		top: 5px;

		div:nth-child(3) {
			display: none;
		}

		@media (max-width: 1500px) {
			float: none;
			width: unset;
			right: unset;
			top: 0px;
			z-index: 999;

			header {
				display: none;
			}
			div:nth-child(2) {
				display: none;
			}
			div:nth-child(3) {
				display: block;
			}
		}
	}

	input[type='radio'] {
		display: none;
		&:checked + label {
			color: var(--primary);
		}
	}
	label {
		display: inline;
	}
</style>
