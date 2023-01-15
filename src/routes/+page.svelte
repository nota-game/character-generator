<script lang="ts">
	import { Charakter } from '../models/Character';
	import { Data } from '../models/Data';
	import { onMount } from 'svelte';
	import PropertiesSetter from '../view/root/propertiesSetter.svelte';
	import Besonderheit from '../view/root/besonderheit.svelte';
	import { writable } from 'svelte/store';
	import Fertigkeit from 'src/view/root/fertigkeit.svelte';
	import Talent from 'src/view/root/talent.svelte';
	import Tag from 'src/view/root/tag.svelte';

	let char: Charakter | undefined;

	const data = writable<undefined | Data>(undefined);

	onMount(async () => {
		const dataInstance = await Data.init(false);
		data.set(dataInstance);
		if (dataInstance) {
			char = new Charakter(dataInstance, '2');
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
	$: cost = char?.costStore;
</script>

<h1>Welcome to Nota Char-gen</h1>
<p>Alles gelöscht und neu angefange😱</p>

<hr />
{#if char}
	<!-- {#if $cost} -->
	{JSON.stringify($cost)}
	<!-- {/if} -->
	<hr />

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

	{#each Object.entries(char.eigenschaften) as [key, entry]}
		<PropertiesSetter {key} {...entry} />
	{/each}

	<hr />
	<ul>
		<li>{$gattungsStore}</li>
		<li>{$artStore}</li>
		<li>{$morphStore}</li>
	</ul>

	<hr />

	{#if $data}
		{#each Object.entries(char.besonderheiten) as [key, entry]}
			<Besonderheit data={$data} {key} {...entry} />
		{/each}

		<hr />

		{#each Object.entries(char.fertigkeiten) as [key, entry]}
			<Fertigkeit data={$data} {key} {...entry} />
		{/each}

		<hr />
		{#each Object.entries(char.talente) as [key, entry]}
			<Talent data={$data} {key} {...entry} />
		{/each}
		<hr />
		{#each Object.entries(char.tag) as [key, entry]}
			<Tag data={$data} {key} {...entry} />
		{/each}
	{/if}

	<div>
		<pre>
        {JSON.stringify($lebensabschnitteStore, undefined, 1)}
    </pre>
	</div>
{:else}
	loding
{/if}
