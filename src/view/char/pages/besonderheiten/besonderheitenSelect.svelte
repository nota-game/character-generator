<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';

	export let data: Data;
	export let char: Charakter;

	export let category: string;

	let pathsData = data.besonderheitenCategoryMap[category];
</script>

<article>
	{#each Object.entries(pathsData) as [key, value]}
		<Besonderheit {data} {key} {char} {...char.besonderheiten[key]} useFuture />
	{/each}
</article>
