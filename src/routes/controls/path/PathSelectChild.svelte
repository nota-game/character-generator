<script lang="ts">
	import { i } from 'mathjs';

	import type { _Art, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';
	import { onMount } from 'svelte';
	import { noop, onDestroy, prevent_default } from 'svelte/internal';
	import { derived, writable, type Readable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import {
		distinct,
		getText,
		getTextBesonderheit,
		getTextFertigkeit,
		renderRequirement
	} from './../../misc';
	import type { Charakter } from './../../models/Character';
	import type { Data } from './../../models/Data';
	import KostenControl from './../KostenControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let path: string | undefined;
	export let gruppe: string | undefined;
	export let lvl: string | undefined;
	let can = false;
	let has = false;
	let fin = noop;
	let fin2 = noop;
	onMount(() => {
		if (!char || !gruppe || !path || !lvl) return;
		fin = char.canPathChoosenStore(gruppe, path, lvl).subscribe((x) => {
			can = x;
		});
		fin = char.canPathUnChoosenStore(gruppe, path, lvl).subscribe((x) => {
			has = x;
		});
	});

	const level = char?.pathChoosenTimesStore(gruppe ?? '', path ?? '', lvl ?? '');

	$: simulationCanStore = can
		? char?.getSimulation((x) => x.addPath(gruppe ?? '', path ?? '', lvl ?? ''), lvl + 'add')
		: undefined;
	$: simulationHasStore = has
		? char?.getSimulation((x) => x.removePath(gruppe ?? '', path ?? '', lvl ?? ''), lvl + 'remove')
		: undefined;

	let l = data?.Instance.Daten.Pfade.filter((x) => x.Id == gruppe)[0]
		?.Pfad.filter((x) => x.Id == path)[0]
		?.Levels.Level.filter((x) => x.Id == lvl)[0];
	onDestroy(() => {
		fin();
		fin2();
	});
</script>

{#if char && l && ImageData && data}
	<div class="container" class:compact={!can && !has}>
		{#if can}
			<div class="up">
				<a
					on:click={(e) => {
						e.preventDefault();
						char?.addPath(gruppe ?? '', path ?? '', lvl ?? '');
					}}
					href="#">+ (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={false} />)</a
				>
			</div>
		{/if}
		{#if has}
			<div class="down">
				<a
					on:click={(e) => {
						e.preventDefault();
						char?.removePath(gruppe ?? '', path ?? '', lvl ?? '');
					}}
					href="#">- (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={true} />)</a
				>
			</div>
		{/if}
		<div style="display: flex; flex-direction: row; justify-content:space-between ;">
			<h4 style="margin-bottom: 1em;">
				{l?.Name ? getText(l?.Name, char) : l?.Id} ({$level}/{l?.WiederhoteNutzung})
			</h4>
		</div>

		<!-- {changedTalentsCan} -->
		{#if simulationCanStore && $simulationCanStore}
			<p class:hideOver={has}>
				{#each $simulationCanStore.changedTalents as t}
					<div class:hideOver={has}>
						{getText(data.talentMap[t.key].Name)}
						{#if t.new != t.old}
							{t.old}=>{t.new}
						{/if}
						{#if t.newEp - t.oldEp != 0}
							(+{t.newEp - t.oldEp} EP)
						{/if}
					</div>
				{/each}

				{#each $simulationCanStore.changedFertigkeiten as t}
					{#if t.old != t.new}
						<div class:hideOver={has}>
							{#if t.old != 0}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.old,char)} =>
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new,char)}
							{:else}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new,char)}
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
					{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
						<div class:hideOver={has}>
							<span style="text-decoration: wavy;">
								{#if t.oldIgnored != 0}
									{getTextFertigkeit(data.fertigkeitenMap[t.key], t.oldIgnored,char)} =>
									{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored,char)}
								{:else}
									{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored,char)}
								{/if}
							</span>

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
				{/each}

				{#each $simulationCanStore.changedBestonderheiten as t}
					{#if t.old != t.new}
						<div class:hideOver={has}>
							{#if t.old != 0}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.old,char)} =>
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.new,char)}
							{:else}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.new,char)}
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
					{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
						<div class:hideOver={has}>
							<span style="text-decoration: wavy;">
								{#if t.oldIgnored != 0}
									{getTextBesonderheit(data.besonderheitenMap[t.key], t.oldIgnored,char)} =>
									{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored,char)}
								{:else}
									{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored,char)}
								{/if}
							</span>

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
				{/each}
			</p>
			{#if $simulationCanStore.requirements.added.length > 0}
				<p>
					Einige Voraussetzungen sind nicht erfüllt, daher können Talente niedriger,bzw.
					Fertigkeiten, und Besonderheiten nicht Aktiv sein.
				</p>
			{/if}
			{#each $simulationCanStore.requirements.added as t}
				<div class:hideOver={has}>
					{renderRequirement(t, data)}
				</div>
			{/each}
			{#if $simulationCanStore.requirements.removed.length > 0}
				<p>Hierdurch werden einige Voraussetzungen erfüllt.</p>
			{/if}
			{#each $simulationCanStore.requirements.removed as t}
				<div class:hideOver={has}>
					<span style="text-decoration: line-through;">
						{renderRequirement(t, data)}
					</span>
				</div>
			{/each}
		{/if}
		{#if simulationHasStore && $simulationHasStore}
			<p class="showOver">
				{#each $simulationHasStore.changedTalents as t}
					<div>
						{getText(data.talentMap[t.key].Name)}
						{#if t.new != t.old}
							{t.old}=>{t.new}
						{/if}
						{#if t.newEp - t.oldEp != 0}
							({t.newEp - t.oldEp} EP)
						{/if}
					</div>
				{/each}

				{#each $simulationHasStore.changedFertigkeiten as t}
					{#if t.old != t.new}
						<div>
							{#if t.new != 0}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.old, char)} =>
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new, char)}
							{:else}
								<span style="text-decoration: line-through;">
									{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new, char)}
								</span>
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
					{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
						<div>
							{#if t.newIgnored != 0}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.oldIgnored, char)} =>
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored, char)}
							{:else}
								<span style="text-decoration: line-through;">
									{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored, char)}
								</span>
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
				{/each}

				{#each $simulationHasStore.changedBestonderheiten as t}
					{#if t.old != t.new}
						<div>
							{#if t.new != 0}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.old, char)} =>
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.new, char)}
							{:else}
								<span style="text-decoration: line-through;">
									{getTextBesonderheit(data.besonderheitenMap[t.key], t.new, char)}
								</span>
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
					{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
						<div>
							{#if t.newIgnored != 0}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.oldIgnored, char)} =>
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored, char)}
							{:else}
								<span style="text-decoration: line-through;">
									{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored, char)}
								</span>
							{/if}

							<!-- {#if t.newEp - t.oldEp != 0} -->
							<!-- (+{t.newEp - t.oldEp} EP) -->
							<!-- {/if} -->
						</div>
					{/if}
				{/each}
			</p>
			{#if $simulationHasStore.requirements.added.length > 0}
				<p class="showOver">
					Einige Voraussetzungen sind nicht erfüllt, daher können Talente niedriger,bzw.
					Fertigkeiten, und Besonderheiten nicht Aktiv sein.
				</p>
			{/if}
			{#each $simulationHasStore.requirements.added as t}
				<div class="showOver">
					{renderRequirement(t, data)}
				</div>
			{/each}
			{#if $simulationHasStore.requirements.removed.length > 0}
				<p class="showOver">Hierdurch entfallen einige Voraussetzungen.</p>
			{/if}
			{#each $simulationHasStore.requirements.removed as t}
				<div class="showOver">
					<span style="text-decoration: line-through;">
						{renderRequirement(t, data)}
					</span>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style lang="scss">
	.container {
		position: relative;
		min-height: 10rem;
		height: 10rem;
		padding: 4px;
	}
	.container:hover {
		position: relative;
		min-height: 10rem;
		height: unset;
		padding: 4px;
	}
	.compact,
	.compact:hover {
		height: 2.5rem !important;
		min-height: 2.5rem;
	}
	.down {
		right: 0px;
		top: 1.5em;
		position: absolute;
	}
	.up {
		right: 0px;
		position: absolute;
	}

	p:empty {
		display: none;
	}

	.hideOver {
		display: block;
	}

	.showOver {
		display: none;
	}

	.down:hover ~ .showOver {
		display: block;
	}
	.down:hover ~ .hideOver {
		display: none;
	}
</style>
