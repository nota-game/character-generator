<script lang="ts">
	import type { _Art, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';
	import { onMount } from 'svelte';
	import { noop, onDestroy } from 'svelte/internal';
	import { derived, writable, type Readable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { getText } from './../../misc';
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
		fin = char.canPathChoosen(gruppe, path, lvl).subscribe((x) => {
			can = x;
		});
		fin = char.hasPathChoosen(gruppe, path, lvl).subscribe((x) => {
			has = x;
		});
	});

	let l = data.Instance.Daten.PfadGruppen.Pfade.filter((x) => x.Id == gruppe)[0]
		?.Pfad.filter((x) => x.Id == path)[0]
		?.Levels.Level.filter((x) => x.Id == lvl)[0];
	onDestroy(() => {
		fin();
		fin2();
	});
</script>

{getText(l?.Name)}

{#if can}
	<button on:click={() => char.addPath(gruppe, path, lvl)}>+</button>
	{#if l?.Kosten}
		<KostenControl cost={l.Kosten} {data} {char} paid={false} />
	{/if}
{/if}
{#if has}
	<button on:click={() => char.removePath(gruppe, path, lvl)}>-</button>
	{#if l?.Kosten}
		<KostenControl cost={l.Kosten} {data} {char} paid={true} />
	{/if}
{/if}
