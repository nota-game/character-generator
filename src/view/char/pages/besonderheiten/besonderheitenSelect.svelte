<script lang="ts">
	import { getText, intersect, sortLocalisable } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';
	import BesonderheitControl from './besonderheitControl.svelte';

	export let data: Data;
	export let char: Charakter;

	export let category: string;

	let pathsData = data.besonderheitenCategoryMap[category];
	let selectedFilter: 'available' | 'purchased' | 'all';
	selectedFilter =
		intersect(Object.keys(pathsData), char.besonderheiten() as string[]).length > 0
			? 'purchased'
			: 'available';
</script>

<article>
	<fieldset class="button-group">
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'available'}
			aria-label="Verfügbar"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'purchased'}
			aria-label="gekauft"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'all'}
			aria-label="Alle"
		/>
	</fieldset>

	{#if selectedFilter == 'all'}
		{#each sortLocalisable(Object.keys(pathsData), x=>data.besonderheitenMap[x]) as key}
			<BesonderheitControl
				{selectedFilter}
				{data}
				key={[key]}
				{char}
				{...char.besonderheiten(key)}
				useFuture
			/>
		{/each}
	{:else if selectedFilter == 'purchased'}
		{#each sortLocalisable(intersect(Object.keys(pathsData), char.besonderheiten()), (x) => data.besonderheitenMap[x]) as key}
			<BesonderheitControl
				{selectedFilter}
				{data}
				key={[key]}
				{char}
				{...char.besonderheiten(key)}
				useFuture
			/>
		{/each}
	{:else}
		{#each sortLocalisable(Object.keys(pathsData), x=>data.besonderheitenMap[x]) as key}
			<BesonderheitControl
				{selectedFilter}
				{data}
				key={[key]}
				{char}
				{...char.besonderheiten(key)}
				useFuture
			/>
		{/each}
	{/if}
</article>

<style lang="scss">
	
</style>
