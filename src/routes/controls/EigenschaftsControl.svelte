<script lang="ts">
	import { derived, type Readable } from 'svelte/store';

	import type { Charakter, Eigenschaft } from '../models/Character';
	import type { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let eigenschaft: Eigenschaft;

	const chareigenschaftenDataMutincreaseCostStore =
		char.eigenschaftenData[eigenschaft].increaseCostStore;
	const chareigenschaftenDataMutdecreaseCostStore =
		char.eigenschaftenData[eigenschaft].decreaseCostStore;
	const charMutStore = char.eigenschaftenData[eigenschaft].currentStore;

	let isIncreaseToexpensiv: Readable<boolean>;
	let isDecreaseToexpensiv: Readable<boolean>;
</script>

<ul>
	<li>
		{eigenschaft}
		{$charMutStore}
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
	</li>
</ul>

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
