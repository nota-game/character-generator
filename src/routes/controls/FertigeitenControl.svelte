<script lang="ts">
	import type { FertigkeitDefinition_fertigkeit } from 'src/data/nota.g';
	import { getText } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import EigenschaftsControl from './EigenschaftsControl.svelte';
	import KostenControl from './KostenControl.svelte';
	import RequirementsControl from './RequirementsControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let fertigkeit: FertigkeitDefinition_fertigkeit;

	const info = char?.getFertigkeitInfo(fertigkeit.Id);

	const canBeBoght = info?.canBeBoght;
	const canBeSoled = info?.canBeSoled;
	const boughtLevel = info?.boughtLevel;
	const buyCost = info?.buyCost;
	const sellCost = info?.sellCost;
	let requirementsBuy: boolean;

	//	const charEPStore = char.getTalentEPStore(talent.Id);
	//	const charBaseValueStore = char.getTalentBaseStore(talent.Id);
	//	const charDerivatValueStore = char.getTalentDerivedStore(talent.Id);
	//	const charEffectiveValueStore = char.getTalentEffectiveStore(talent.Id);
</script>

{#if char}
	<article>
		<header><b>{getText(fertigkeit.Name)}</b> {$boughtLevel}</header>
		<div class="grid">
			<div>
				<button disabled={!$canBeBoght} on:click={() => $boughtLevel++}>+</button>
				<KostenControl {char} {data} cost={buyCost} />
				<RequirementsControl
					{char}
					{data}
					itFullfiled={requirementsBuy}
					requirement={fertigkeit?.Stufe[$boughtLevel]?.Voraussetzung}
				/>
			</div>
			<div>
				<button disabled={!$canBeSoled} on:click={() => $boughtLevel--}>-</button>
				<KostenControl {char} {data} cost={sellCost} />
			</div>
		</div>
	</article>
{/if}
