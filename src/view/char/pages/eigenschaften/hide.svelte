<script lang="ts">
	import { boolean } from 'mathjs';
	import type { EigenschaftMetaKey, TypeOfKey } from 'src/models/Character';
	import type { Readable } from 'svelte/store';

	export let meta: Readable<TypeOfKey<EigenschaftMetaKey>>;
	export let filterGruppe: string;

	let hidden: boolean;
	$: hidden = filterGruppe != $meta?.gruppe;
</script>

{#if !hidden}
	<slot />
{/if}
