<script lang="ts">
	import { identity } from 'mathjs';
	import type { LevelDefinition_misc, PfadDefinition_pfad, PfadeDefinition_pfad } from 'src/data/nota.g';
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import { time_ranges_to_array, validate_each_argument } from 'svelte/internal';
	import PfadButton from './pfadButton.svelte';
	import PfadControl from './pfadControl.svelte';
	import KostenControl from '../../controls/KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let category: string;

	let pathsData = data.pfadCategoryMap[category];

	let current: Readonly<PfadDefinition_pfad> | undefined;

	$: pathsEntry = current ? char.pfad[current.Id] : undefined;

	function anySelected(params:Readonly<PfadDefinition_pfad>) {
		// return undefined;
		return !params.Levels.Level.some(x=> char.pfad[params.Id][x.Id].purchased.currentValue()!==0);

	}

</script>

{#if current}
	<dialog open={current != undefined}>
		<article style="position: relative;">
			<header>

				<h4>{getText(current.Name)}</h4>
				<KostenControl char={char} data={data} mode="points" showZeroValues />
			</header>

			{#each current.Levels.Level as lvl}
				{@const entry = pathsEntry?.[lvl.Id]}
				
				{#if entry}
					<PfadControl {data} {char} pathId={current.Id} levelId={lvl.Id} {...entry} useFuture />
				{/if}
			{/each}

			<button class="outline close" on:click={() => (current = undefined)}></button>
		</article>
	</dialog>
{/if}
<div class="grid">

	{#each Object.entries(pathsData.levels) as [key, value]}
	<article class="pfadCard">

		<header>

			<PfadButton {char} pfad={value} click={() => (current = value)} ></PfadButton>
		</header>
		<p>

			{getText(value.Beschreibung)}
		</p>
	</article>
	{/each}
</div>

<style lang="scss">
	dialog > article {
		width: calc(100vw - var(--spacing) * 2);
	}
	.close {
		position: absolute;
		right: var(--spacing);
		top: calc(3 * var(--spacing));
	}

	.grid{
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.pfadCard{
		width: 32%;
		min-width: 250px;
		height: 350px;
		&>p{
			overflow-y: auto;
		}

	}

</style>

