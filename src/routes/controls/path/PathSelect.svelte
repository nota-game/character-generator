<script lang="ts">
	import type { _Art, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';

	import type { choise } from 'xsd-ts/dist/xsd';

	import { getText } from '../../misc';
	import type { Charakter } from '../../models/Character';
	import type { Data } from '../../models/Data';
	import KostenControl from './../KostenControl.svelte';

	import PathSelectChild from './PathSelectChild.svelte';

	export let data: Data;
	export let char: Charakter;
	export let gruppe: string;
	

	console.log(data.Instance.Daten.Organismen);
	let tree = data.Instance.Daten.PfadGruppen.Pfade.filter((x) => x.Id == gruppe)[0]?.Pfad;
</script>

{#each tree as t}
	<div>
		{getText(t.Name)}
		{#if t.Levels?.Level}
			{#each t.Levels.Level as lvl}
				<PathSelectChild {char} {data} path={t.Id} {gruppe} lvl={lvl.Id} />
			{/each}
			<!--

				{#each t.Levels.Level as l}
				{/each}
			-->
		{/if}
	</div>
{/each}
