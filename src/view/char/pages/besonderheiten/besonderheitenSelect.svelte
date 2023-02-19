<script lang="ts">
	import { getText, intersect, sortLocalisable } from 'src/misc/misc';
	import { isBesonderheitenHolder, type Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';
	import BesonderheitControl from './besonderheitControl.svelte';
	import BesonderheitControlMulty from './besonderheitControlMulty.svelte';

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
		{#each sortLocalisable(Object.keys(pathsData), (x) => data.besonderheitenMap[x]) as key}
			{@const b = char.besonderheiten(key)}
			{#if isBesonderheitenHolder(b)}
				<BesonderheitControl {selectedFilter} {data} key={[key]} {char} {...b} useFuture />
			{:else}
				<BesonderheitControlMulty {selectedFilter} {data} key={[key]} {char} useFuture />
			{/if}
		{/each}
	{:else if selectedFilter == 'purchased'}
		{#each sortLocalisable(intersect(Object.keys(pathsData), char.besonderheiten()), (x) => data.besonderheitenMap[x]) as key}
			{@const b = char.besonderheiten(key)}
			{#if isBesonderheitenHolder(b)}
				<BesonderheitControl {selectedFilter} {data} key={[key]} {char} {...b} useFuture />
			{:else}
				<BesonderheitControlMulty {selectedFilter} {data} key={[key]} {char} useFuture />
			{/if}
		{/each}
	{:else}
		{#each sortLocalisable(Object.keys(pathsData), (x) => data.besonderheitenMap[x]) as key}
			{@const b = char.besonderheiten(key)}
			{#if isBesonderheitenHolder(b)}
				<BesonderheitControl {selectedFilter} {data} key={[key]} {char} {...b} useFuture />
			{:else}
				<BesonderheitControlMulty {selectedFilter} {data} key={[key]} {char} useFuture />
			{/if}
		{/each}
	{/if}
</article>

<style lang="scss">
</style>
