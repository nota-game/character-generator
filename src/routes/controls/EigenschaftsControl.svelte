<script lang="ts">
	import type { Readable } from 'svelte/store';

	import type { Charakter, Eigenschaft } from '../models/Character';
	import type { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let eigenschaft: Eigenschaft;

	let chareigenschaftenDataMutincreaseCostStore =
		char?.eigenschaftenData[eigenschaft].increaseCostStore;
	let chareigenschaftenDataMutdecreaseCostStore =
		char?.eigenschaftenData[eigenschaft].decreaseCostStore;
	let charMutStore = char?.eigenschaftenData[eigenschaft].currentStore;

	$: {
		chareigenschaftenDataMutincreaseCostStore =
			char?.eigenschaftenData[eigenschaft].increaseCostStore;
		chareigenschaftenDataMutdecreaseCostStore =
			char?.eigenschaftenData[eigenschaft].decreaseCostStore;
		charMutStore = char?.eigenschaftenData[eigenschaft].currentStore;
	}

	let isIncreaseToexpensiv: Readable<boolean>;
	let isDecreaseToexpensiv: Readable<boolean>;
</script>

<article>
	<header>
		{eigenschaft}
		{$charMutStore}
	</header>

	<div class="next">
		<div>
			{#if $chareigenschaftenDataMutincreaseCostStore}
				<button
					class:missing={$isIncreaseToexpensiv}
					on:click={() => char.eigenschaftenData[eigenschaft].increase()}>+</button
				>
				<KostenControl
					cost={chareigenschaftenDataMutincreaseCostStore}
					{data}
					{char}
					bind:isToexpensiv={isIncreaseToexpensiv}
				/>
			{/if}
		</div>

		<div>
			{#if $chareigenschaftenDataMutdecreaseCostStore}
				<button
					class:missing={$isDecreaseToexpensiv}
					on:click={() => char.eigenschaftenData[eigenschaft].decrease()}>-</button
				>
				<KostenControl
					cost={chareigenschaftenDataMutdecreaseCostStore}
					{data}
					{char}
					bind:isToexpensiv={isDecreaseToexpensiv}
				/>
			{/if}
		</div>
	</div>
</article>

<style lang="scss">
	.next {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		* {
			width: 200px;
		}
	}
</style>
