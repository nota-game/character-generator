<script lang="ts">
	import { identity } from 'mathjs';
	import type { LevelDefinition_misc, PfadDefinition_pfad } from 'src/data/nota.g';
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import PathLevel from 'src/view/root/pathLevel.svelte';
	import { validate_each_argument } from 'svelte/internal';
	import PfadControl from './pfadControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let category: string;

	let pathsData = data.pfadCategoryMap[category];

	let current: Readonly<PfadDefinition_pfad> | undefined;

	$: pathsEntry = current ? char.pfad[current.Id] : undefined;
</script>

{#if current}
	<dialog open={current != undefined}>
		<article style="position: relative;">
			<h4>{getText(current.Name)}</h4>

			{#each current.Levels.Level as lvl}
				{@const entry = pathsEntry?.[lvl.Id]}
				<h5>{getText(lvl.Name)}</h5>
				{#if entry}
					<PfadControl {data} {char} pathId={current.Id} levelId={lvl.Id} {...entry} useFuture />
				{/if}
			{/each}

			<button class="outline close" on:click={() => (current = undefined)}></button>
		</article>
	</dialog>
{/if}

{#each Object.entries(pathsData.levels) as [key, value]}
	<button on:click={() => (current = value)}>
		{getText(value.Name)}
	</button>
{/each}

<style lang="scss">
	dialog > article {
		width: calc(100vw - var(--spacing) * 2);
	}
	.close {
		position: absolute;
		right: var(--spacing);
		top: calc(3 * var(--spacing));
	}
</style>
