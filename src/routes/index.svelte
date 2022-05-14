<script lang="ts">
	import { onMount } from 'svelte';
	import { Data } from './models/Data';
	import { Charakter, EIGENRSCHAFTEN } from './models/Character';
	import PointControl from './controls/PointControl.svelte';
	import OrganismSelect from './controls/OrganismSelect.svelte';
	import EigenschaftsControl from './controls/EigenschaftsControl.svelte';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let charOrganismusStore = char?.organismusStore;
	$: charOrganismusStore = char?.organismusStore;

	onMount(async () => {
		data = await Data.init();
		if (data) {
			char = new Charakter(data);
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if data && char}
	<PointControl {char} {data} />

	<OrganismSelect {char} {data} />

	{#if $charOrganismusStore}
		{#each EIGENRSCHAFTEN as e}
			<EigenschaftsControl {char} {data} eigenschaft={e} />
		{/each}
	{/if}
{:else}
	<p>Loding…</p>
{/if}
