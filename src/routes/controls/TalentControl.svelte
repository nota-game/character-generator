<script lang="ts">
	import type { Ableitung_talent, Max_talent, TalentDefinition_talent } from 'src/data/nota.g';
	import { derived, get } from 'svelte/store';
	import { getText, renderRequirement } from '../misc';

	import { v4 as uuidv4 } from 'uuid';

	import type { Charakter } from '../models/Character';
	import { Data } from '../models/Data';
	import BesonderheitenContro from './BesonderheitenContro.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let talent: TalentDefinition_talent | undefined;
	export let showTaken: 'gesteigert' | 'abgeleitet' | 'nicht gekauft' | 'alle' = 'alle';

	let charPurchasedStore = char?.getTalentPurchasedEPStore(talent?.Id ?? '');
	let charEPStore = char?.getTalentEPStore(talent?.Id ?? '');
	let charBaseValueStore = char?.getTalentBaseStore(talent?.Id ?? '');
	let charDerivatValueStore = char?.getTalentDerivedStore(talent?.Id ?? '');
	let charEffectiveValueStore = char?.getTalentEffectiveStore(talent?.Id ?? '');
	let talentEffectiveIgnoreRequirements = char?.gettalentEffectiveIgnoreRequirements(
		talent?.Id ?? ''
	);
	let talentMissingRequirement = char?.gettalentMissingRequirement(talent?.Id ?? '');
	let storeBase = char?.talentBaseStore;
	let storeBaseEP = char?.talentBaseEPStore;
	let storeEffective = char?.talentEffectiveStore;
	$: {
		charPurchasedStore = char?.getTalentPurchasedEPStore(talent?.Id ?? '');
		charEPStore = char?.getTalentEPStore(talent?.Id ?? '');
		charBaseValueStore = char?.getTalentBaseStore(talent?.Id ?? '');
		charDerivatValueStore = char?.getTalentDerivedStore(talent?.Id ?? '');
		charEffectiveValueStore = char?.getTalentEffectiveStore(talent?.Id ?? '');
		talentEffectiveIgnoreRequirements = char?.gettalentEffectiveIgnoreRequirements(
			talent?.Id ?? ''
		);
		talentMissingRequirement = char?.gettalentMissingRequirement(talent?.Id ?? '');
		storeBase = char?.talentBaseStore;
		storeBaseEP = char?.talentBaseEPStore;
		storeEffective = char?.talentEffectiveStore;
	}

	const uuid = uuidv4();

	let nextLevelCost: number | undefined;
	$: {
		if (
			talent &&
			charBaseValueStore &&
			$charBaseValueStore !== undefined &&
			data &&
			charEPStore &&
			$charEPStore !== undefined
		) {
			const comp = talent.Komplexität.toLocaleLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
			const next = $charBaseValueStore + 1;
			if (next > Data.MAX_TALENT) {
				nextLevelCost = undefined;
			} else {
				const cost = data.talentCostTabel[comp][next].Kosten.Wert;
				const fix = $charEPStore;
				nextLevelCost = cost - fix;
			}
		}
	}

	type alternativ = { costTotal: number; cost: number; target: string; targetValue: number };
	let nextDerivedLevelCost: alternativ[] = [];
	$: {
		if (
			talent &&
			charBaseValueStore &&
			$charBaseValueStore !== undefined &&
			data &&
			charEPStore &&
			$charEPStore !== undefined
		) {
			function calculateAbleitung(a: Ableitung_talent) {
				const x = a.Ableitung;
				const s = data!.talentMap[x.Id];
				const current = $storeBase![x.Id];
				const currentEffective = $storeEffective![x.Id];

				return Math.floor(Math.min(current, currentEffective) / x.Anzahl);
			}
			function calculateAbleitungNext(a: Ableitung_talent, min: number) {
				const x = a.Ableitung;
				const s = data!.talentMap[x.Id];
				const current = $storeBase![x.Id];
				const currentEffective = $storeEffective![x.Id];
				if (currentEffective < current) {
					// caped
					return [];
				}
				const comp = s.Komplexität.toLocaleLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;

				const target = Math.max(min, Math.floor(current / x.Anzahl) + 1) * x.Anzahl;
				if (target > Data.MAX_TALENT) {
					return [];
				}
				const targetCostTotal = data!.talentCostTabel[comp][target];
				const targetCost = targetCostTotal.Kosten.Wert - $storeBaseEP![x.Id];
				return [
					{
						cost: targetCost,
						costTotal: targetCostTotal.Kosten.Wert,
						target: s.Id,
						targetValue: target
					} as alternativ
				];
			}

			function calculateMax(a: Max_talent): number[] {
				const x = a.Max;
				const s = (x.Ableitung?.map((y) => calculateAbleitung({ Ableitung: y })) ?? []).concat(
					x.Max?.map((y) => calculateMax({ Max: y }).reduce((p, c) => p + c, 0)) ?? []
				);
				return s.sort().reverse().slice(0, Math.min(s.length, x.Anzahl));
			}

			function calculateMaxNext(a: Max_talent, min: number): alternativ[] {
				const x = a.Max;
				const current = calculateMax(a);
				const currentMin = Math.max(
					current.length < a.Max.Anzahl ? 0 : current[current.length - 1] + 1,
					min
				);

				const s = (
					x.Ableitung?.flatMap((y) => calculateAbleitungNext({ Ableitung: y }, currentMin)) ?? []
				).concat(x.Max?.flatMap((y) => calculateMaxNext({ Max: y }, currentMin)) ?? []);
				return s;
			}

			nextDerivedLevelCost =
				(
					talent.Ableitungen?.Ableitung?.flatMap((x) =>
						calculateAbleitungNext({ Ableitung: x }, 1)
					) ?? []
				)
					.concat(talent.Ableitungen?.Max?.flatMap((x) => calculateMaxNext({ Max: x }, 1)) ?? [])

					.sort((a, b) => a.cost - b.cost) ?? [];
		}
	}

	function buy(e: MouseEvent, alternativ?: alternativ) {
		e.preventDefault();

		if (alternativ) {
			char?.getTalentPurchasedEPStore(alternativ.target).set(alternativ.costTotal);
		} else {
			const comp = talent!.Komplexität.toLocaleLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
			const next = get(charBaseValueStore!);
			const cost = data!.talentCostTabel[comp][next + 1].Kosten.Wert;
			const fix = get(charEPStore!) - get(charPurchasedStore!);
			charPurchasedStore!.set(cost - fix);
		}
	}
</script>

{#if charEPStore && talent && data}
	{#if showTaken === 'alle' || (showTaken === 'gesteigert' && ($charEPStore ?? 0) > 0) || (showTaken === 'abgeleitet' && ($charEPStore ?? 0) == 0 && ($charDerivatValueStore ?? 0) > 0) || (showTaken === 'nicht gekauft' && ($charEPStore ?? 0) == 0 && ($charDerivatValueStore ?? 0) == 0)}
		<div class="root">
			{getText(data?.talentMap[talent.Id].Name)}
			<strong>{$charEffectiveValueStore} TaW</strong> ({$charEPStore} EP, {$charBaseValueStore} TaB +
			{$charDerivatValueStore}
			TaA{#if $talentMissingRequirement},
				<small
					class="missing"
					aria-invalid="true"
					data-tooltip={$talentMissingRequirement.map((x) => renderRequirement(x.missing, data))}
				>
					Voraussetzungen für {$talentEffectiveIgnoreRequirements} TaW nicht erfüllt</small
				>{/if})
			{#if nextLevelCost != undefined}
				<a href="#" on:click={(e) => buy(e)}>+ ({nextLevelCost} EP)</a>
			{/if}
			{#if nextDerivedLevelCost.length}
				/ <a href="#" on:click={(e) => buy(e, nextDerivedLevelCost[0])}
					>+ ({nextDerivedLevelCost[0].target}
					auf {nextDerivedLevelCost[0].targetValue} für
					{nextDerivedLevelCost[0].cost} EP)</a
				>
			{/if}
			<input id={uuid} type="checkbox" checked />
			<label for={uuid} data-tooltip="Mehr infos und Optionen">?</label>
			<div class="info">
				{#if nextDerivedLevelCost.length}
					<p>Es kann günstiger sein ein abgeleitetes talent zu steigern.</p>
					<ul>
						{#each nextDerivedLevelCost as a}
							<li>
								<a href="#" on:click={(e) => buy(e, a)}
									>+ ({a.target} auf {a.targetValue} für {a.cost} EP)</a
								>
							</li>
						{/each}
					</ul>
				{/if}
				<label>
					Genutzte Ep
					<input type="number" bind:value={$charPurchasedStore} />
				</label>
			</div>
		</div>
	{/if}
{/if}

<style lang="scss">
	ul li {
		list-style-type: none;
	}
	.root {
		margin-bottom: 8px;
	}
	input[type='checkbox'] {
		display: none;
	}
	input[type='checkbox'] ~ .info {
		border-left: 1px solid var(--primary);
		padding-left: 8px;
	}
	input[type='checkbox']:checked ~ .info {
		display: none;
	}
	input[type='checkbox'] + label {
		cursor: pointer;
	}
</style>
