<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let data: Data;
	export let char: Charakter;
	export let talent: TalentDefinition_talent;

	const charPurchasedStore = char.getTalentPurchasedEPStore(talent.Id);
	const charEPStore = char.getTalentEPStore(talent.Id);
	const charBaseValueStore = char.getTalentBaseStore(talent.Id);
	const charDerivatValueStore = char.getTalentDerivedStore(talent.Id);
	const charEffectiveValueStore = char.getTalentEffectiveStore(talent.Id);
</script>

<div class="grid">
	{talent.Id}
	{$charEPStore} <input type="number" bind:value={$charPurchasedStore} />
	{$charBaseValueStore} + {$charDerivatValueStore} = {$charEffectiveValueStore}
</div>

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
