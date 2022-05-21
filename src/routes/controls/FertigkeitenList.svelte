<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { onMount } from 'svelte';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import FertigeitenControl from './FertigeitenControl.svelte';

	export let data: Data;
	export let char: Charakter;
</script>

{#each Object.keys(data.fertigkeitenCategoryMap) as key}
	<header>
		<b>{key}</b>
	</header>

	{#each Object.keys(data.fertigkeitenCategoryMap[key]) as t}
		<FertigeitenControl {char} {data} fertigkeit={data.fertigkeitenMap[t]} />
	{/each}
{/each}

<style lang="scss">
	.next {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		* {
			width: 200px;
		}
	}
</style>
