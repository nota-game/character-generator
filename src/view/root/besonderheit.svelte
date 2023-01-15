<script lang="ts">
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';

	export let key: string;
	export let data: Data;

	export let effective: Readable<number>;
	export let unconditionally: Readable<number>;
	export let purchased: Writable<number>;
	export let fixed: Readable<number>;
	export let missing: Readable<any>;
	export let cost: Readable<any>;

	$: entry = data.besonderheitenMap[key];
</script>

<div>
	{key}
	{$effective}/{entry.Stufe.length}
	<input type="number" bind:value={$purchased} min={0} max={entry.Stufe.length} />
	{JSON.stringify($cost)}
	{#if Object.values($missing).length > 0}
		<span class="missing"> {JSON.stringify($missing)}</span>
	{/if}
</div>

<style lang="scss">
	.missing {
		color: red;
	}
</style>
