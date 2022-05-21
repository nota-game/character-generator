<script lang="ts">
	import type { BesonderheitDefinition_besonderheit, FertigkeitDefinition_fertigkeit } from 'src/data/nota.g';
	import { getText } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import EigenschaftsControl from './EigenschaftsControl.svelte';
	import KostenControl from './KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let besonderheit: BesonderheitDefinition_besonderheit;

	const info = char?.getBesonderheitInfo(besonderheit.Id);

	const canBeBoght = info?.canBeBoght;
	const canBeSoled = info?.canBeSoled;
	const boughtLevel = info?.boughtLevel;
	const buyCost = info?.buyCost;
	const sellCost = info?.sellCost;
	//	const charEPStore = char.getTalentEPStore(talent.Id);
	//	const charBaseValueStore = char.getTalentBaseStore(talent.Id);
	//	const charDerivatValueStore = char.getTalentDerivedStore(talent.Id);
	//	const charEffectiveValueStore = char.getTalentEffectiveStore(talent.Id);
</script>

<article>
	<header><b>{getText(besonderheit?.Name)}</b> {$boughtLevel}</header>
	<div class="grid">
		<div>
			<button disabled={!$canBeBoght} on:click={() => $boughtLevel++}>+</button>
			<KostenControl {char} {data} cost={buyCost} />
		</div>
		<div>
			<button disabled={!$canBeSoled} on:click={() => $boughtLevel--}>-</button>
			<KostenControl {char} {data} cost={sellCost} />
		</div>
	</div>
</article>

