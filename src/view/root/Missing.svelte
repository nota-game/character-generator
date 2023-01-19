<script lang="ts">
	import type { CharacterChange, Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';

	export let change: CharacterChange;
</script>

<!-- {#if addFuture} -->
<div>
	{#if change.changedCost}
		<div>
			{JSON.stringify(Object.fromEntries(change.changedCost.map((x) => [x.key, x.differece])))}
		</div>
	{/if}
	{#if change.requirements.added.length > 0}
		Neue Probleme
		<div>
			{JSON.stringify(change.requirements.added)}
		</div>
	{/if}
	{#if change.requirements.removed.length > 0}
		Behobene Probleme
		<div>
			{JSON.stringify(change.requirements.removed)}
		</div>
	{/if}
</div>

