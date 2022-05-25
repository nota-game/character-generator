<script lang="ts">
	import type { _Art, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';
	import { onMount } from 'svelte';
	import { noop, onDestroy, prevent_default } from 'svelte/internal';
	import { derived, writable, type Readable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { getText, getTextBesonderheit, getTextFertigkeit } from './../../misc';
	import type { Charakter } from './../../models/Character';
	import type { Data } from './../../models/Data';
	import KostenControl from './../KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let path: string;
	export let gruppe: string;
	export let lvl: string;
	let can = false;
	let has = false;
	let fin = noop;
	let fin2 = noop;
	onMount(() => {
		fin = char.canPathChoosenStore(gruppe, path, lvl).subscribe((x) => {
			can = x;
		});
		fin = char.canPathUnChoosenStore(gruppe, path, lvl).subscribe((x) => {
			has = x;
		});
	});

	const level = char.pathChoosenTimesStore(gruppe, path, lvl);

	let l = data?.Instance.Daten.Pfade.filter((x) => x.Id == gruppe)[0]
		?.Pfad.filter((x) => x.Id == path)[0]
		?.Levels.Level.filter((x) => x.Id == lvl)[0];
	onDestroy(() => {
		fin();
		fin2();
	});
</script>

<div>
	<div style="display: flex; flex-direction: row; justify-content:space-between ;">
		<h4>
			{getText(l?.Name)} ({$level}/{l?.WiederhoteNutzung})
		</h4>
		<div>
			{#if can}
				<div>
					<a
						on:click={(e) => {
							e.preventDefault();
							char.addPath(gruppe, path, lvl);
						}}
						href="#">+ (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={false} />)</a
					>
				</div>
			{/if}
			{#if has}
				<div>
					<a
						on:click={(e) => {
							e.preventDefault();
							char.removePath(gruppe, path, lvl);
						}}
						href="#">- (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={true} />)</a
					>
				</div>
			{/if}
		</div>
	</div>
	{#if l.Talent}
		{#each l.Talent as t}
			<div>{getText(data.talentMap[t.Id].Name)} +{t.EP} EP</div>
		{/each}
	{/if}
	{#if l.Fertigkeit}
		{#each l.Fertigkeit as t}
			<div>{getTextFertigkeit(data.fertigkeitenMap[t.Id], t.Stufe)}</div>
		{/each}
	{/if}
	{#if l.Besonderheit}
		{#each l.Besonderheit as t}
			<div>{getTextBesonderheit(data.besonderheitenMap[t.Id], t.Stufe)}</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.handel {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		* {
			min-width: 6rem;
		}
	}
</style>
