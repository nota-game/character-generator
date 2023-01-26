<script lang="ts">
	import { Charakter, type PersistanceData } from 'src/models/Character';
	import { v4 as uuidv4 } from 'uuid';
	import { Data } from 'src/models/Data';
	import { get, writable, type Unsubscriber } from 'svelte/store';
	import { onMount } from 'svelte';
	import pako from 'pako';
	import * as base64 from 'base64-uint8';
	import { localStorageChar } from 'src/misc/storage';
	import Overview from './char/pages/overview.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import { dealay, getText } from 'src/misc/misc';
	import { map } from 'mathjs';
	import OrganismSelect from './char/pages/organism/organismSelect.svelte';
	import EigenschaftenSelect from './char/pages/eigenschaften/eigenschaftenSelect.svelte';
	import Fallback from './root/fallback.svelte';
	import { noop } from 'svelte/internal';
	import PfadSelect from './char/pages/pfade/pfadSelect.svelte';
	import BesonderheitenSelect from './char/pages/besonderheiten/besonderheitenSelect.svelte';
	import FertigkeitenSelect from './char/pages/fertigkeiten/fertigkeitenSelect.svelte';
	import TalenteSelect from './char/pages/talente/talenteSelect.svelte';
	import KostenControl from './char/controls/KostenControl.svelte';

	let data = writable<Data | undefined>(undefined);
	export let char = writable<Charakter | undefined>(undefined);

	$: pointStore = $char?.pointStore;
	$: morph = $char?.morphStore;

	let dev = writable(true);

	export let charId: string | undefined;

	let mounted = false;
	let loding = false;

	onMount(async () => {
		const isDev = !window.location.pathname.includes('character-generator');
		dev.set(isDev);

		mounted = true;
		updateChar(charId);
		let unsubscriber: Unsubscriber = noop;
		localStorageChar.subscribe(async (newCharData) => {
			loding = true;
			if (localStorageChar.getId() == undefined) {
				return;
			}
			const oldChar = get(char);
			if (
				newCharData == undefined ||
				newCharData?.id != oldChar?.id ||
				newCharData?.stammdatenId != oldChar?.stammdaten.id
			) {
				const newData = await Data.init(false, newCharData?.stammdatenId);
				if (newData) {
					unsubscriber();
					const newChar = new Charakter(newData, newCharData ?? charId ?? uuidv4());
					$data = newData;
					$char = newChar;
					unsubscriber = newChar.persistanceStore.subscribe((v) => localStorageChar.set(v));
				}
			}
			loding = false;
		});
	});

	async function updateChar(charId: string | undefined) {
		if (mounted && charId) {
			localStorageChar.updateId('c' + charId);
		}
	}

	$: updateChar(charId);

	$: persistionData = $char?.persistanceStore;
	let charLink: string;
	$: pageLink = ($dev ? '/page' : '/character-generator/page') + '#' + charId;

	$: {
		const d = JSON.stringify($persistionData ?? {});
		const packed = base64.encode(pako.deflate(d));

		charLink =
			($dev ? '/' : '/character-generator/') +
			`#d${(packed?.length ?? NaN) < d.length ? packed : d}`;
	}
</script>

{#if loding}
	<span aria-busy="true">Loding</span>
{:else if $data && $char}
	{#if pointStore && $pointStore}
		<article class="hover">
			<header>Punkte</header>
			<div>
				<strong>Punkte</strong>
				<KostenControl char={$char} data={$data} mode="points" showZeroValues />
				<a href={pageLink} rel="external">Charakterbogen</a>
			</div>
		</article>
	{/if}

	<Tabs>
		<TabList>
			<Tab>Übersicht</Tab>
			<Tab>Gattung/Art</Tab>
			{#if morph && $morph}
				<Tab>Eigenschaften</Tab>
				{#each Object.entries($data.pfadCategoryMap) as [_, value]}
					<Tab>{getText(value.Name)}</Tab>
				{/each}
				{#each $data.Instance.Daten.Besonderheiten.map((x) => x.Kategorie) as value}
					<Tab>{getText(value)}</Tab>
				{/each}
				<Tab>Talente</Tab>
				<Tab>Fertigkeiten</Tab>
				<!-- <Tab>Fallback</Tab> -->
			{/if}
		</TabList>

		<TabPanel>
			<Overview char={$char} data={$data} />
		</TabPanel>

		<TabPanel>
			<OrganismSelect char={$char} data={$data} />
		</TabPanel>
		<TabPanel>
			<EigenschaftenSelect char={$char} data={$data} />
		</TabPanel>
		{#each Object.entries($data.pfadCategoryMap) as [category]}
			<TabPanel>
				<PfadSelect char={$char} data={$data} {category} />
			</TabPanel>
		{/each}
		{#each $data.Instance.Daten.Besonderheiten.map((x) => x.KategorieId) as category}
			<TabPanel>
				<BesonderheitenSelect char={$char} data={$data} {category} />
			</TabPanel>
		{/each}
		<TabPanel>
			<TalenteSelect char={$char} data={$data} />
		</TabPanel>
		<TabPanel>
			<FertigkeitenSelect char={$char} data={$data} />
		</TabPanel>
		<!-- <TabPanel>
			<Fallback char={$char} data={$data} />
		</TabPanel> -->
	</Tabs>
{:else if !charId && mounted}
	<main>
		<article style="height: 80vh; display: grid;">
			<h1 style="margin: auto;">
				Bitte einen Charakter <label for="charSelector">Auswählen</label> oder
				<label for="newCharButton">erstellen</label>.
			</h1>
		</article>
	</main>
{:else}
	<p>Loding…</p>
{/if}

<style lang="scss">
	.hover {
		position: sticky;
		z-index: 1000;
		top: -5rem;
		border: 1px solid var(--primary);
	}
</style>
