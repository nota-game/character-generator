<script lang="ts">
import { derived } from 'svelte/store';

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
		
</script>

<ul>
	<li>
		{eigenschaft}
		{$charMutStore}
		<div class="next">
			<div>
				{#if $chareigenschaftenDataMutincreaseCostStore}
					<button on:click={() => char.eigenschaftenData[eigenschaft].increase()}>+</button>
					<KostenControl cost={chareigenschaftenDataMutincreaseCostStore} {data} {char}  />
				{/if}
			</div>

			<div>
				{#if $chareigenschaftenDataMutdecreaseCostStore}
					<button on:click={() => char.eigenschaftenData[eigenschaft].decrease()}>-</button>
					<KostenControl cost={chareigenschaftenDataMutdecreaseCostStore} {data} {char}  />
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
