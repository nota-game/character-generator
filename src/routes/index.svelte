<script lang="ts">
	import { onMount } from 'svelte';
	import { Parser } from 'xsd-ts';
	import nota from './../data/nota.xml?raw';
	import notaStructure from './../data/nota-structure.g.json';
	import { deserialize } from '@ungap/structured-clone';
	import type { SerializedRecord } from '@ungap/structured-clone';
	import type { element } from 'xsd-ts/dist/xsd';
	import type { Daten } from 'src/data/nota.g';
	let notaData: Daten | undefined;
	let txt: any;
	onMount(() => {
		// const data = fetch('https://nota-game.github.io/Content/vNext/data/nota.xml')
		const data = nota;

		// the result will be a replica of the original object
		const deserialized = deserialize(notaStructure as SerializedRecord) as Array<element>;
		const dat = deserialized.filter((x) => x.name.local === 'Daten')[0];
		txt = dat;
		console.log(dat);
		const parser = new Parser<Daten>(dat);
		notaData = parser.parse(data);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>{notaData?.Daten.GenerierungsDaten.GenerierungsPunkte}</p>


