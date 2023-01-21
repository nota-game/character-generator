<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type {
		Charakter,
		CostKey,
		EigenschaftMetaKey,
		EigenschaftTypes,
		TypeOfKey
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';

	export let data: Data;
	export let char: Charakter;

	export let filterGruppe: string;
	export let key: string;

	export let effective: Readable<number | undefined>;
	export let type: Readable<EigenschaftTypes | undefined>;
	export let raw: Writable<number | undefined>;
	export let meta: Readable<TypeOfKey<EigenschaftMetaKey>>;
	export let cost: Readable<TypeOfKey<CostKey<'eigenschaft'>>>;
</script>

{#if filterGruppe == $meta?.gruppe}
<div>
    {getText($meta.Name)}
    
</div>
{/if}
