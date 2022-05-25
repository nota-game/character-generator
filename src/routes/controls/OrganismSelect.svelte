<script lang="ts">
	import type { _Art, _Art1, _Art2, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';
	import { derived, writable, type Readable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { getText } from '../misc';
	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';
	import Tree from './tree/tree.svelte';

	export let data: Data;
	export let char: Charakter;

	let current = char.organismus?.l.Id;

	const w = char.organismusStore;
	const wc = derived(w, (x) => x?.l?.Spielbar?.Kosten);

	const tree = Object.fromEntries(
		data?.Instance.Daten.Organismen.Gattung.flatMap((x) =>
			x.Art.flatMap((y) =>
				y.Morphe.Morph.flatMap((z) =>
					z.Lebensabschnitte.Lebensabschnitt.filter((l) => l.Spielbar).map((l) => {
						const newLocal: selection = {
							l: l,
							m: z,
							a: y,
							g: x
						};

						return [l.Id, newLocal];
					})
				)
			)
		)
	);
	$: {
		char.organismus = current ? tree[current] : undefined;
	}

	type selection =
		| {
				l: _Lebensabschnitt;
				m: _Morph;
				a: _Art2;
				g: _Gattung;
		  }
		| undefined;
</script>

{#each data?.Instance.Daten.Organismen.Gattung as g}
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
						<input type="radio" value={l.Id} bind:group={current} />
						{getText(l.Name)}
					</label>
					{getText(l.Beschreibung)}
					<KostenControl
						cost={l.Spielbar.Kosten}
						{data}
						{char}
						paid={current === l.Id}
						replaceCost={wc}
					/>
				{/if}
			{/each}
		{/each}
	{/each}
{/each}
