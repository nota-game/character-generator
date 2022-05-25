<script lang="ts">
	import type { FertigkeitDefinition_fertigkeit, PfadDefinition_pfad } from 'src/data/nota.g';
	import type { Readable } from 'svelte/store';
	import { getText, getTextFertigkeit } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import EigenschaftsControl from './EigenschaftsControl.svelte';
	import KostenControl from './KostenControl.svelte';
	import PathSelectChild from './path/PathSelectChild.svelte';
	import RequirementsControl from './RequirementsControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let pfad: PfadDefinition_pfad | undefined;
	export let gruppeId: string;
	export let showTaken: boolean | undefined = undefined;

	let requirementsBuy: boolean;

	let anyTaken: boolean = false;

	char?.pfadLevelStore.subscribe((x) => {
		if (pfad) {
			anyTaken = Object.values(x[gruppeId]?.[pfad.Id]??{})?.some((y) => y > 0) ?? false;
		} else {
			anyTaken = false;
		}
	});
</script>

{#if char && pfad && data}
	{#if anyTaken === showTaken}
		<h3>
			{getText(pfad.Name)}
		</h3>
		<RequirementsControl
			{char}
			{data}
			bind:itFullfiled={requirementsBuy}
			requirement={pfad?.Voraussetzung}
		/>

		{getText(pfad.Beschreibung)}
		<!-- <div style="display: flex; flex-wrap: wrap; flex-direction: column; justify-content: space-between;"> -->
		<div class="columns">
			{#if pfad.Levels?.Level}
				{#each pfad.Levels.Level as lvl}
					<div
						style="border: 1px solid var(--primary); margin: 8px; padding: 4px; break-inside:avoid ;"
					>
						<PathSelectChild {char} {data} path={pfad.Id} gruppe={gruppeId} lvl={lvl.Id} />
					</div>
				{/each}
				<!--
				
				{#each t.Levels.Level as l}
				{/each}
			-->
			{/if}
		</div>
	{/if}
{:else}
	<p>FAIL</p>
{/if}

<style lang="scss">
	.right-handler {
		float: right;
		text-align: right;
	}
	.columns {
		column-count: 3;
	}
	.columns > *:only-child {
		display: inline-block;
	}
</style>
