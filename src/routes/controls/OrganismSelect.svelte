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

	let current: selection;

	const w = writable(current);
	const wc = derived(w, (x) => x?.l?.Spielbar?.Kosten);

	$: {
		if (char) {
			char.organismus = current;
			w.set(current!);
		}
	}

	type selection =
		| {
				titel: string;
				l: _Lebensabschnitt;
				m: _Morph;
				a: _Art2;
				g: _Gattung;
				selected?: Readable<boolean>;
		  }
		| undefined;

	let tree = data?.Instance.Daten.Organismen.Gattung.map((x) => {
		return {
			titel: getText(x.Name),
			children: x.Art.map((y) => {
				return {
					titel: getText(y.Name),
					children: y.Morphe.Morph.map((z) => {
						return {
							titel: getText(z.Name),
							children: z.Lebensabschnitte.Lebensabschnitt.filter((l) => l.Spielbar).map((l) => {
								const newLocal: selection = {
									titel: getText(l.Name),
									l: l,
									m: z,
									a: y,
									g: x
								};
								newLocal.selected = derived(w, (x) => x == newLocal);
								return newLocal;
							})
						};
					})
				};
			})
		};
	});
</script>

<Tree {tree} let:node>
	{#if node.l}
		<label>
			<input type="radio" bind:group={current} value={node} />
			{node.titel}
		</label>
		<article>
			<KostenControl
				cost={node.l.Spielbar.Kosten}
				{data}
				{char}
				paid={node.selected}
				replaceCost={wc}
			/>
		</article>
	{:else}
		<div class="name">{node.titel}</div>
	{/if}
</Tree>
