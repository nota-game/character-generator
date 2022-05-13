<script lang="ts">
	import { onMount } from 'svelte';
	import { Data } from './models/Data';
	import { Charakter } from './models/Character';
	import PointControl from './controls/PointControl.svelte';
import OrganismSelect from './controls/OrganismSelect.svelte';

	let data: Data | undefined;
	let char: Charakter | undefined;

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

	<OrganismSelect char={char} {data} ></OrganismSelect>
{:else}
	<p>Loding…</p>
{/if}
