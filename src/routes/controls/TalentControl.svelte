<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { derived } from 'svelte/store';
	import { getText, renderRequirement } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import BesonderheitenContro from './BesonderheitenContro.svelte';

	export let data: Data;
	export let char: Charakter;
	export let talent: TalentDefinition_talent;
	export let taken: boolean | undefined;

	const charPurchasedStore = char?.getTalentPurchasedEPStore(talent.Id);
	const charEPStore = char?.getTalentEPStore(talent.Id);
	const charBaseValueStore = char?.getTalentBaseStore(talent.Id);
	const charDerivatValueStore = char?.getTalentDerivedStore(talent.Id);
	const charEffectiveValueStore = char?.getTalentEffectiveStore(talent.Id);
	const talentEffectiveIgnoreRequirements = char?.gettalentEffectiveIgnoreRequirements(talent.Id);
	const talentMissingRequirement = char?.gettalentMissingRequirement(talent.Id);
</script>

{#if taken === ($charEPStore > 0 || $talentEffectiveIgnoreRequirements > 0) || taken === undefined}
	<div>
		{getText(data?.talentMap[talent.Id].Name)}
		<strong>{$charEffectiveValueStore} TaW</strong> ({$charEPStore} EP, {$charBaseValueStore} TaB + {$charDerivatValueStore}
		TaA{#if $talentMissingRequirement},
			<small
				class="missing"
				aria-invalid="true"
				data-tooltip={$talentMissingRequirement.map((x) => renderRequirement(x.missing, data))}
			>
				Voraussetzungen für {$talentEffectiveIgnoreRequirements} TaW nicht erfüllt</small
			>{/if})
		<input type="number" bind:value={$charPurchasedStore} />
	</div>
{/if}
