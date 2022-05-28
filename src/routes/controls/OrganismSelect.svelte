<script lang="ts">
	import type {
		KostenDefinitions_misc,
		KostenDefinition_misc,
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

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	let current = char?.organismus?.l.Id;

	let w: Readable<selection>;
	let wc: Readable<KostenDefinition_misc[]>;
	$: {
		if (char) {
			w = readable();
			const inputs = document.getElementsByTagName('input');
			Array.from(inputs, (x, i) => inputs.item(i)).forEach((element) => {
				if (element) element.checked = false;
			});
			
			w = char?.organismusStore ?? readable();
			wc = derived(w, (x) => x?.l?.Spielbar?.Kosten ?? []);
		}
	}

	$: {
		// if (char) char.organismus = current ? data?.lebensabschnittLookup[current] : undefined;
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
				<h4>{getText(m.Name)}</h4>
				<p>{getText(m.Beschreibung)}</p>
				{#each m.Lebensabschnitte.Lebensabschnitt as l}
					{#if l.Spielbar}
						<label>
							<input type="radio" value={data.lebensabschnittLookup[l.Id]} bind:group={$w} />
							{getText(l.Name)}
						</label>
						{getText(l.Beschreibung)}
						<KostenControl
							cost={l.Spielbar.Kosten}
							{data}
							{char}
							paid={current !== undefined && current === l.Id}
							replaceCost={wc}
						/>
					{/if}
				{/each}
			{/each}
		{/each}
	{/each}
{/if}
