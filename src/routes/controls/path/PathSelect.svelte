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

	let tree = data?.Instance.Daten.PfadGruppen.Pfade.filter((x) => x.Id == gruppe)[0]?.Pfad;
</script>

{#if tree}
	{#each tree as t}
		<details>
			<summary>
				{getText(t.Name)}
			</summary>
			<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
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
		</details>
	{/each}
{/if}
