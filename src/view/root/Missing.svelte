<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { e } from 'mathjs';
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import { stringify } from 'uuid';

	export let change: CharacterChange;
</script>

<!-- {#if addFuture} -->
<div>
	{#if change.changedCost}
		<div>
			<strong>Kosten:</strong>
			{#if change.changedCost.length == 0}
				keine
			{:else}
				{JSON.stringify(Object.fromEntries(change.changedCost.map((x) => [x.key, x.differece])))}
			{/if}
		</div>
	{/if}
	{#if change.changedBestonderheiten.length > 0}
		<div>Neue Besonderheiten</div>
		<ul>
			{#each change.changedBestonderheiten as b}
				<li>{b.key} {b.new} => {b.old}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedFertigkeiten.length > 0}
		<div>Neue Fertigkeiten</div>
		<ul>
			{#each change.changedFertigkeiten as b}
				<li>{b.key} {b.new} => {b.old}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTags.length > 0}
		<div>Neue Tags</div>
		<ul>
			{#each change.changedTags as b}
				<li>{b.key} {b.new} => {b.old}</li>
			{/each}
		</ul>
	{/if}
	{#if change.requirements.added.length > 0}
		Neue Probleme {change.requirements.added.length}
		<div>
			{#each change.requirements.added as r}
				<div>
					Für {r.missingOnType}
					{#if r.missingOnType == 'level'}
						{r.missingOnId.path} ({r.missingOnId.level})
					{:else}
						{r.missingOnId}
					{/if} sind nicht alle bedingungen erfüllt.
					{JSON.stringify(r.missing)}
				</div>
			{/each}

		</div>
	{/if}
	{#if change.requirements.removed.length > 0}
		Behobene Probleme {change.requirements.removed.length}
		<div>
			{#each change.requirements.removed as r}
				<div class="el">
					Für {r.missingOnType}
					{#if r.missingOnType == 'level'}
						{r.missingOnId.path} ({r.missingOnId.level})
					{:else}
						{r.missingOnId}
					{/if} wurden Probleme behoben.
					{JSON.stringify(r.missing)}
				</div>
			{/each}

		</div>
	{/if}
</div>

<style lang="scss">
.el{
	margin: 1rem;
}
</style>