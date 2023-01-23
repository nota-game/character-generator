<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import BesonderheitControl from './besonderheitControl.svelte';

	export let data: Data;
	export let char: Charakter;

	export let category: string;

	let pathsData = data.besonderheitenCategoryMap[category];
</script>

<article>
	{#each Object.entries(pathsData) as [key, value]}
		<BesonderheitControl {data} {key} {char} {...char.besonderheiten[key]} useFuture />
	{/each}
</article>
