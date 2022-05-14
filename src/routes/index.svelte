<script lang="ts">
	import { onMount } from 'svelte';
	import { Data } from './models/Data';
	import { Charakter, EIGENRSCHAFTEN } from './models/Character';
	import PointControl from './controls/PointControl.svelte';
	import OrganismSelect from './controls/OrganismSelect.svelte';
	import EigenschaftsControl from './controls/EigenschaftsControl.svelte';
	import PathSelect from './controls/path/PathSelect.svelte';

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
	<div class="hover">
		<PointControl {char} {data} />
	</div>

	<OrganismSelect {char} {data} />

	{#if $charOrganismusStore}
		{#each EIGENRSCHAFTEN as e}
			<EigenschaftsControl {char} {data} eigenschaft={e} />
		{/each}
		{#each data.Instance.Daten.PfadGruppen.Pfade.map((x) => x.Id) as path}
		<h1>{path}</h1>
			<PathSelect {char} {data} gruppe={path} />
		{/each}
	{/if}
{:else}
	<p>Loding…</p>
{/if}

<style lang="scss">
	:global {
		.missing {
			color: brown;
		}
		button.missing {
			background-color: brown;
			color: white;
		}
	}
	.hover {
		padding: 8px;
		border: 1px solid black;
		position: fixed;
		right: 5px;
		top: 5px;
		//float: right;
	}
</style>
