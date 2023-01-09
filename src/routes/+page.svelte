<script lang="ts">
	import { Charakter } from '../models/Character';
	import { Data } from '../models/Data';
	import { onMount } from 'svelte';
	import PropertiesSetter from '../view/root/propertiesSetter.svelte';

	let char: Charakter | undefined;

	onMount(async () => {
		const data = await Data.init(false);
		if (data) {
			char = new Charakter(data, '2');
		}
	});

	$: gattungsStore = char?.gattungsIdStore;
	$: artStore = char?.artIdStore;
	$: morphStore = char?.morphIdStore;

	$: possibleGattungStore = char?.possibleGattungStore;
	$: possibleArtStore = char?.possibleArtStore;
	$: possibleMorphStore = char?.possibleMorphStore;

	$: ageStore = char?.ageStore;
	$: lebensabschnitteStore = char?.lebensAbschnitteStore;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<hr />

{#if char}
	{#if $ageStore}
		<label>
			Alter
			<input type="number" bind:value={$ageStore} />
		</label>
	{/if}

	{#if $possibleGattungStore}
		<select bind:value={$gattungsStore}>
			{#each $possibleGattungStore as pg}
				<option value={pg}>{pg}</option>
			{/each}
		</select>
	{/if}
	{#if $possibleArtStore}
		<select bind:value={$artStore}>
			{#each $possibleArtStore as pg}
				<option value={pg}>{pg}</option>
			{/each}
		</select>
	{/if}
	{#if $possibleMorphStore}
		<select bind:value={$morphStore}>
			{#each $possibleMorphStore as pg}
				<option value={pg}>{pg}</option>
			{/each}
		</select>
	{/if}

	<hr />

	{#each Object.entries(char.eigenschaften) as [key, { raw, effective, type , meta}]}
		<PropertiesSetter {key} {effective} {raw} {type} {meta} />
	{/each}

	<hr />
	<ul>
		<li>{$gattungsStore}</li>
		<li>{$artStore}</li>
		<li>{$morphStore}</li>
	</ul>
	<div>
		<pre>
        {JSON.stringify($lebensabschnitteStore, undefined, 1)}
    </pre>
	</div>
{:else}
	loding
{/if}
