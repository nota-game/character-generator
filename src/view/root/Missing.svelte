<script lang="ts">
	import { json } from '@sveltejs/kit';
	import type { CharacterChange, Charakter, MissingRequirements } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import { stringify } from 'uuid';

	import { renderRequirement } from 'src/misc/misc';

	export let change: MissingRequirements;
	export let data: Data;
</script>

<!-- {#if addFuture} -->
<div>
				<div class="el">
					Für {r.missingOnType}
					{#if r.missingOnType == 'level'}
						{r.missingOnId.path} ({r.missingOnId.level})
					{:else}
						{r.missingOnId}
					{/if} wurden Probleme behoben.
					{renderRequirement(r.missing,data)}
				</div>
</div>

<style lang="scss">
	.el {
		margin: 1rem;
	}
</style>
