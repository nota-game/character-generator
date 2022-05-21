<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { onMount } from 'svelte';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import BesonderheitenContro from './BesonderheitenContro.svelte';
	import FertigeitenControl from './FertigeitenControl.svelte';

	export let data: Data;
	export let char: Charakter;
</script>
{#if data}
	
{#each Object.keys(data.besonderheitenCategoryMap) as key}
<header>
		<b>{key}</b>
	</header>

	{#each Object.keys(data.besonderheitenCategoryMap[key]) as t}
		<BesonderheitenContro {char} {data} besonderheit={data.besonderheitenMap[t]} />
		{/each}
{/each}

{/if}
