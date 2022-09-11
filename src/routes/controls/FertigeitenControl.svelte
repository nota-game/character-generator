<script lang="ts">
	import type { FertigkeitDefinition_fertigkeit } from 'src/data/nota.g';
	import type { Readable } from 'svelte/store';
	import { getText, getTextFertigkeit } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import EigenschaftsControl from './EigenschaftsControl.svelte';
	import KostenControl from './KostenControl.svelte';
	import RequirementsControl from './RequirementsControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let fertigkeit: FertigkeitDefinition_fertigkeit | undefined;
	export let showTaken: boolean | undefined = undefined;

	let info = char?.getFertigkeitInfo(fertigkeit?.Id ?? '');
	let canBeBoght = info?.canBeBoght;
	let canBeRemoved = info?.canBeRemoved;
	let canBeSoled = info?.canBeSoled;
	let boughtLevel = info?.boughtLevel;
	let actualLevel = info?.actualLevel!;
	let buyCost = info?.buyCost;
	let sellCost = info?.sellCost;
	let removeCost = info?.removeCost;

	$: {
		info = char?.getFertigkeitInfo(fertigkeit?.Id ?? '');
		canBeBoght = info?.canBeBoght;
		canBeRemoved = info?.canBeRemoved;
		canBeSoled = info?.canBeSoled;
		boughtLevel = info?.boughtLevel;
		actualLevel = info?.actualLevel!;
		buyCost = info?.buyCost;
		sellCost = info?.sellCost;
		removeCost = info?.removeCost;
	}

	let requirementsBuy: boolean;
	let isToexpensiv: Readable<boolean>;

	function buy(amount: number, event?: PointerEvent | MouseEvent) {
		event?.preventDefault();
		if (boughtLevel && $boughtLevel !== undefined) {
			$boughtLevel += amount;
		}
		return false;
	}

	//	const charEPStore = char.getTalentEPStore(talent.Id);
	//	const charBaseValueStore = char.getTalentBaseStore(talent.Id);
	//	const charDerivatValueStore = char.getTalentDerivedStore(talent.Id);
	//	const charEffectiveValueStore = char.getTalentEffectiveStore(talent.Id);
</script>

{#if char && fertigkeit && data && boughtLevel && $boughtLevel !== undefined && buyCost && sellCost && removeCost}
	{#if showTaken === false && $boughtLevel == 0}
		<small class="right-handler"
			><a
				href="#"
				class:missing={$isToexpensiv || !requirementsBuy}
				on:click={(e) => buy(1, e)}
				disabled={$canBeBoght ? undefined : true}
				class="outline">Hinzufügen</a
			>
			<KostenControl {char} {data} cost={buyCost} bind:isToexpensiv />
		</small>
		<h3>
			{getTextFertigkeit(fertigkeit, 1, char)}
		</h3>
		<RequirementsControl
			{char}
			{data}
			bind:itFullfiled={requirementsBuy}
			requirement={fertigkeit?.Stufe[$boughtLevel]?.Voraussetzung}
		/>
		<p>
			{getText(fertigkeit.Stufe[$boughtLevel].Beschreibung, char)}
		</p>
	{:else if showTaken === true && $boughtLevel > 0}
		<small class="right-handler"
			><a
				href="#"
				on:click={(e) => buy(-($boughtLevel ?? 0), e)}
				disabled={$canBeRemoved ? undefined : true}
				class="outline">Entfernen</a
			>
			<KostenControl {char} {data} cost={removeCost} />
		</small>

		<h3>
			{#if $actualLevel == 0}
				<span class="missing">
					{getTextFertigkeit(fertigkeit, $boughtLevel, char)}
					<small> (Voraussetzung nicht erfüllt)</small></span
				>
			{:else if $actualLevel !== $boughtLevel}
				{getTextFertigkeit(fertigkeit, $actualLevel, char)}
				<small class="missing">
					(Voraussetzung für {getTextFertigkeit(fertigkeit, $boughtLevel, char)} nicht erfüllt)</small
				>
			{:else}
				{getTextFertigkeit(fertigkeit, $boughtLevel, char)}
			{/if}
		</h3>
		<RequirementsControl
			{char}
			{data}
			bind:itFullfiled={requirementsBuy}
			requirement={fertigkeit?.Stufe[$boughtLevel - 1]?.Voraussetzung}
		/>
		<p>
			{getText(fertigkeit.Stufe[$boughtLevel - 1].Beschreibung, char)}
		</p>

		{#if $canBeBoght}
			<div>
				<a
					href="#"
					data-tooltip={getText(fertigkeit.Stufe[$boughtLevel].Beschreibung, char)}
					disabled={!$canBeBoght}
					on:click={(e) => buy(1, e)}
					>Aufwerten <small
						>({getTextFertigkeit(fertigkeit, $boughtLevel + 1, char)}
						<KostenControl oneLine {char} {data} cost={buyCost} />)
					</small></a
				>
				<RequirementsControl
					{char}
					{data}
					bind:itFullfiled={requirementsBuy}
					requirement={fertigkeit?.Stufe[$boughtLevel]?.Voraussetzung}
				/>
			</div>
		{/if}
		{#if $canBeSoled && $boughtLevel > 1}
			<div>
				<a
					href="#"
					data-tooltip={getText(fertigkeit.Stufe[$boughtLevel - 2].Beschreibung, char)}
					disabled={!$canBeSoled}
					on:click={(e) => buy(-1, e)}
					>Abwerten <small
						>({getTextFertigkeit(fertigkeit, $boughtLevel - 1, char)}
						<KostenControl oneLine {char} {data} cost={sellCost} />)</small
					></a
				>
				<RequirementsControl
					{char}
					{data}
					bind:itFullfiled={requirementsBuy}
					requirement={fertigkeit?.Stufe[$boughtLevel - 2]?.Voraussetzung}
				/>
			</div>
		{/if}
	{/if}
{:else}
	<p>FAIL</p>
{/if}

<style lang="scss">
	.right-handler {
		float: right;
		text-align: right;
	}
</style>
