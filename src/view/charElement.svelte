<script lang="ts">
	import { Charakter, type PersistanceData } from 'src/models/Character';
	import { Data } from 'src/models/Data';
	import { get, writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import pako from 'pako';
	import * as base64 from 'base64-uint8';
	import { local } from 'src/misc/storage';
	import Overview from './char/pages/overview.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import { getText } from 'src/misc/misc';
	import { map } from 'mathjs';
	import OrganismSelect from './char/pages/organism/organismSelect.svelte';
	import EigenschaftenSelect from './char/pages/eigenschaften/eigenschaftenSelect.svelte';
	import Fallback from './root/fallback.svelte';

	let data = writable<Data | undefined>(undefined);
	let char = writable<Charakter | undefined>(undefined);

	let dev = writable(true);

	export let charId: string | undefined;

	let mounted = false;

	onMount(async () => {
		dev.set(!window.location.pathname.includes('character-generator'));
		mounted = true;
		updateChar(charId);
	});

	async function updateChar(charId: string | undefined) {
		if (mounted && charId) {
			const currentChar = local<PersistanceData>('c' + charId);
			const j = get(currentChar);
			$data = await Data.init(false, j?.stammdatenId);
			if ($data) {
				$char = new Charakter($data, j ?? charId);

				$char?.persistanceStore.subscribe((v) => currentChar.set(v));
			}
		}
	}
	async function refresh() {
		if (mounted && charId) {
			const currentChar = local<PersistanceData>('c' + charId);
			const j = get(currentChar);
			$data = await Data.init(false);
			if ($data) {
				$char = new Charakter($data, j ?? charId);

				$char?.persistanceStore.subscribe((v) => currentChar.set(v));
			}
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

{#if $data && $char}
	<Tabs>
		<TabList>
			<Tab>Übersicht</Tab>
			<Tab>Gattung/Art</Tab>
			<Tab>Eigenschaften</Tab>
			{#each Object.entries($data.pfadCategoryMap) as [_, value]}
				<Tab>{getText(value.Name)}</Tab>
			{/each}
			{#each $data.Instance.Daten.Besonderheiten.map((x) => x.Kategorie) as value}
				<Tab>{getText(value)}</Tab>
			{/each}
			<Tab>Talente</Tab>
			<Tab>Fertigkeiten</Tab>
			<Tab>Fallback</Tab>
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
		{#each Object.entries($data.pfadCategoryMap) as [_, value]}
			<TabPanel>{getText(value.Name)}</TabPanel>
		{/each}
		{#each $data.Instance.Daten.Besonderheiten.map((x) => x.Kategorie) as value}
			<TabPanel>{getText(value)}</TabPanel>
		{/each}
		<TabPanel>Talente</TabPanel>
		<TabPanel>Fertigkeiten</TabPanel>
		<TabPanel>
			<Fallback char={$char} data={$data} />
		</TabPanel>
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
