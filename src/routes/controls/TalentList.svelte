<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import TalentControl from './TalentControl.svelte';

	export let data: Data;
	export let char: Charakter;
</script>

{#if data}
	{#each Object.keys(data.talentCategoryMap) as key}
		<header>
			<b>{key}</b>
		</header>

		{#each Object.keys(data.talentCategoryMap[key]) as t}
			<TalentControl {char} {data} talent={data.talentMap[t]} />
		{/each}
	{/each}
{/if}
