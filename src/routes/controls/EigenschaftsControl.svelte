<script lang="ts">
	import { readable, type Readable } from 'svelte/store';

	import type { CharacterChange, Charakter, Eigenschaft } from '../models/Character';
	import type { Data } from '../models/Data';
	import KostenControl from './KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let eigenschaft: Eigenschaft;

	let chareigenschaftenDataMutincreaseCostStore: Readable<CharacterChange> = readable({
		changedBestonderheiten: [],
		changedFertigkeiten: [],
		changedPunkte: [],
		changedTalents: [],
		requirements: { added: [], removed: [] }
	});

	$: initChar(char);
	let counter = 0;
	let lastChar:Charakter |undefined = undefined;
	function initChar(char: Charakter) {
		counter++;
		console.log('char ' + (eigenschaft ?? 'none'), counter);
		
		if(lastChar===char){
			console.log('char returned ' + (eigenschaft ?? 'none'), counter);
			return;
		}
		lastChar= char;
		chareigenschaftenDataMutincreaseCostStore = char.getSimulation((c) =>
			c.eigenschaftenData[eigenschaft].increase()
		);
		chareigenschaftenDataMutdecreaseCostStore = char.getSimulation((c) =>
			c.eigenschaftenData[eigenschaft].decrease()
		);
	}
	// char?.eigenschaftenData[eigenschaft].increaseCostStore;
	let chareigenschaftenDataMutdecreaseCostStore: Readable<CharacterChange> = readable({
		changedBestonderheiten: [],
		changedFertigkeiten: [],
		changedPunkte: [],
		changedTalents: [],
		requirements: { added: [], removed: [] }
	});
	// char?.eigenschaftenData[eigenschaft].decreaseCostStore;
	$: charMutStore = char?.eigenschaftenData[eigenschaft].currentStore;

	// $: {
	// 	chareigenschaftenDataMutincreaseCostStore =
	// 		char?.eigenschaftenData[eigenschaft].increaseCostStore;
	// 	chareigenschaftenDataMutdecreaseCostStore =
	// 		char?.eigenschaftenData[eigenschaft].decreaseCostStore;
	// 	charMutStore = char?.eigenschaftenData[eigenschaft].currentStore;
	// }

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
