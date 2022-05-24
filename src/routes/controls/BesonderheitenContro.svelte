<script lang="ts">
	import type {
		BesonderheitDefinition_besonderheit,
		FertigkeitDefinition_fertigkeit
	} from 'src/data/nota.g';
	import { getText } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import EigenschaftsControl from './EigenschaftsControl.svelte';
	import KostenControl from './KostenControl.svelte';
import RequirementsControl from './RequirementsControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let besonderheit: BesonderheitDefinition_besonderheit | undefined;

	const info = char?.getBesonderheitInfo(besonderheit?.Id ?? '');

	const canBeBoght = info?.canBeBoght;
	const canBeSoled = info?.canBeSoled;
	const boughtLevel = info?.boughtLevel!;
	const buyCost = info?.buyCost;
	const sellCost = info?.sellCost;

	function buy(n: number) {
		if (boughtLevel) boughtLevel.update((x) => x + n);
	}
	let requirementsBuy:boolean
	//	const charEPStore = char.getTalentEPStore(talent.Id);
	//	const charBaseValueStore = char.getTalentBaseStore(talent.Id);
	//	const charDerivatValueStore = char.getTalentDerivedStore(talent.Id);
	//	const charEffectiveValueStore = char.getTalentEffectiveStore(talent.Id);
</script>

{#if char && data && boughtLevel && sellCost && buyCost}
	<article>
		<header><b>{getText(besonderheit?.Name)}</b> {$boughtLevel}</header>
		<div class="grid">
			<div>
				<button disabled={!$canBeBoght} on:click={() => buy(1)}>+</button>
				<KostenControl {char} {data} cost={buyCost} />
				<RequirementsControl {char} {data} itFullfiled={requirementsBuy}  requirement={besonderheit?.Stufe[$boughtLevel]?.Bedingung} ></RequirementsControl>
			</div>
			<div>
				<button disabled={!$canBeSoled} on:click={() => buy(-1)}>-</button>
				<KostenControl {char} {data} cost={sellCost} />
			</div>
		</div>
	</article>
{/if}
