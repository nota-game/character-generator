<script lang="ts">
	import { onMount } from 'svelte';
	import { Parser } from 'xsd-ts';
	import nota from './../data/nota.xml?raw';
	import notaStructure from './../data/nota-structure.g.json';
	import { deserialize } from '@ungap/structured-clone';
	import type { SerializedRecord } from '@ungap/structured-clone';
	import type { element } from 'xsd-ts/dist/xsd';
	import type { Daten } from 'src/data/nota.g';
	import { Data } from './models/Data';

	onMount(() => {
		// const data = fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')
		const data = nota;

		// the result will be a replica of the original object
		const deserialized = deserialize(notaStructure as SerializedRecord) as Array<element>;
		const dat = deserialized.filter((x) => x.name.local === 'Daten')[0];
		console.log(dat);
		const parser = new Parser<Daten>(dat);
		const notaData = parser.parse(data);
		if (notaData) {
			Data.init(notaData);
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if Data.IsInitilized}
	<p>{Data.Instance.Daten.GenerierungsDaten.Kosten.filter((x) => x.Id === 'GP')[0]?.Wert}</p>
{:else}
	<p>Loding…</p>
{/if}
