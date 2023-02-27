<script lang="ts">
	import { Charakter, isBesonderheitenHolder } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

	import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import {
		d20,
		dealay,
		filterObjectKeys,
		getTextBesonderheit,
		getTextFertigkeit
	} from 'src/misc/misc';
	import Fatique from 'src/controls/fatique.svelte';
	import type { CharacterState } from 'src/models/CharacterState';
	import CombatMali from 'src/controls/combatMali.svelte';
	import ActionBattle from './mele/actionBattle.svelte';
	import ActionDamage from './mele/actionDamage.svelte';
	import ActionRest from './mele/actionRest.svelte';

	export let char: Charakter;
	export let charData: CharacterState;
	export let data: Data;

	function getBesonderheitenKeys() {
		if (char == undefined) {
			return [];
		}

		function next(char: Charakter, path: string[]): string[][] {
			const current = char.besonderheiten(...path);
			if (Array.isArray(current)) {
				return current.flatMap((x) => next(char, [...path, x]));
			} else {
				return [path];
			}
		}

		const keys = next(char, []);

		return keys;
	}
	$: defaultErschwernis = charData.defaultErschwernis
</script>

<h6>Mali</h6>
<CombatMali {charData} />

<h6>Aktionen</h6>
<div class="action-panels">
	
	<ActionRest  {charData}/>
	<ActionDamage  {charData}/>

	<ActionBattle {charData} />
</div>

<div >
	<h6>Ausdauer & Wunden</h6>
	
	{$defaultErschwernis}

	<div style="display: flex; gap:1rem;">
		<div style="width: 20rem;">
			<Hitman {charData} />
		</div>
		<Fatique {char} {data} {...charData.fatique} />
	</div>
</div>
<div class="kampf-right">
	
	<div
		class="kampf-info"
		style="grid-column: 2; grid-row: 1; display: flex; flex-wrap: wrap; justify-content: space-evenly ; align-content: flex-start;"
	>
		{#each Object.keys(data.besonderheitenCategoryMap) as bKey}
			{#if getBesonderheitenKeys()
				.filter(([key]) => Object.keys(data?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
				.some((x) => {
					const b = char?.besonderheiten(...x);
					if (isBesonderheitenHolder(b)) {
						return b.effective.currentValue( { defaultValue: 0 } ) > 0 && (data?.besonderheitenMap[x[0]].SubKategorie ?? []).includes('Kampf');
					} else {
						return false;
					}
				})}
				<div class="list">
					<strong>{bKey}</strong>
					<ul>
						{#each getBesonderheitenKeys()
							.filter(([key]) => Object.keys(data?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
							.filter((x) => {
								const b = char?.besonderheiten(...x);
								if (isBesonderheitenHolder(b)) {
									return b.effective.currentValue( { defaultValue: 0 } ) > 0 && (data?.besonderheitenMap[x[0]].SubKategorie ?? []).includes('Kampf');
								} else {
									return false;
								}
							}) as b2Key}
							{@const bes = char?.besonderheiten(...b2Key)}
							{@const [, ...additional] = b2Key}
							{#if isBesonderheitenHolder(bes)}
								<li>
									{getTextBesonderheit(
										data.besonderheitenMap[b2Key[0]],
										bes.effective.currentValue({ defaultValue: 0 }) ?? 0,
										char,
										...additional
									)}
								</li>
							{/if}
						{/each}
					</ul>
					<hr />
				</div>
			{/if}
		{/each}

		{#if Object.keys(data.fertigkeitenCategoryMap['Kampfstiele']?.fertigkeiten ?? {}).some((x) => (char?.fertigkeiten[x]?.effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
			<div class="list">
				<strong>Kampfstiele</strong>
				<ul>
					{#each Object.keys(data.fertigkeitenCategoryMap['Kampfstiele'].fertigkeiten).filter((x) => (char?.fertigkeiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
						<li>
							{getTextFertigkeit(
								data.fertigkeitenMap[b2Key],
								char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
								char
							)}
						</li>
					{/each}
				</ul>
				<hr />
			</div>
		{/if}
		{#if Object.keys(data.fertigkeitenCategoryMap['Kampf']?.fertigkeiten ?? {}).some((x) => (char?.fertigkeiten[x]?.effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
			<div class="list">
				<strong>Fertigkeiten</strong>
				<ul>
					{#each Object.keys(data.fertigkeitenCategoryMap['Kampf']?.fertigkeiten ?? {}).filter((x) => (char?.fertigkeiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
						<li>
							{getTextFertigkeit(
								data.fertigkeitenMap[b2Key],
								char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
								char
							)}
						</li>
					{/each}
				</ul>
				<hr />
			</div>
		{/if}

		{#each Object.keys(filterObjectKeys(char.equipment, (x) => x.type == 'closeCombatWeapon' && (x.equiped.currentValue() ?? false))) as x}
			{@const p = data?.nahkampfMap[x]}
			<div class="list">
				{x}
				<CloseCombatWeapon {char} weapon={p} />
			</div>
		{/each}
	</div>
</div>

<div style="grid-column: 1; grid-row: 1;">
	<Armor input={char} {data} />
</div>

<style lang="scss">
	.action-panels {
		display: flex;
	}

	.action-panels > :global(div) {
		display: grid;
		gap: 1em;
		justify-items: stretch;
		align-items: stretch;
		background-color: var(--card-background-color);
		padding: 0.5rem;
		margin: 0.2rem;

	}

	.kampf-info {
		display: none;
	}
	.kampf {
		display: none;
	}
</style>
