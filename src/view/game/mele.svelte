<script lang="ts">
	import { Charakter, isBesonderheitenHolder } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

	import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import { filterObjectKeys, getTextBesonderheit, getTextFertigkeit } from 'src/misc/misc';
	import Fatique from 'src/controls/fatique.svelte';
	import type { CharacterState } from 'src/models/CharacterState';

	export let char: Charakter;
	export let charData: CharacterState;
	export let data: Data;

	let Kampfwert = Math.floor(
		(char.talente['Kampfgespür'].effective.currentValue({ defaultValue: 0 }) ?? 0) / 2 + 3
	);

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
</script>

<h1 class="pagebreak">Kampf</h1>

<h6>Mali <small>(Kampfgespür/2+3)</small></h6>
<table class="ḱampf">
	<tr>
		<td />
		<td />
		<td />
		<td />
		<td
			>{#if Kampfwert == 1}
				<span class="mark" />
			{/if}
			-1</td
		>
		<td />
		<td />
		<td />
		<td />
		<td
			>{#if Kampfwert == 2}
				<span class="mark" />
			{/if}-2</td
		>
		<td />
		<td />
		<td />
		<td
			>{#if Kampfwert == 3}
				<span class="mark" />
			{/if}-3</td
		>
		<td />
		<td />
		<td />
		<td
			>{#if Kampfwert == 4}
				<span class="mark" />
			{/if}-4</td
		>
		<td />
		<td />
	</tr>
	<tr>
		<td
			>{#if Kampfwert == 5}
				<span class="mark" />
			{/if}-5</td
		>
		<td />
		<td />
		<td
			>{#if Kampfwert == 6}
				<span class="mark" />
			{/if}-6</td
		>
		<td />
		<td
			>{#if Kampfwert == 7}
				<span class="mark" />
			{/if}-7</td
		>
		<td />
		<td
			>{#if Kampfwert == 8}
				<span class="mark" />
			{/if}-8</td
		>
		<td
			>{#if Kampfwert == 9}
				<span class="mark" />
			{/if}-9</td
		>
		<td
			>{#if Kampfwert == 10}
				<span class="mark" />
			{/if}-10</td
		>
		<td
			>{#if Kampfwert == 11}
				<span class="mark" />
			{/if}-11</td
		>
		<td
			>{#if Kampfwert == 12}
				<span class="mark" />
			{/if}-12</td
		>
		<td
			>{#if Kampfwert == 13}
				<span class="mark" />
			{/if}-13</td
		>
		<td
			>{#if Kampfwert == 14}
				<span class="mark" />
			{/if}-14</td
		>
		<td
			>{#if Kampfwert == 15}
				<span class="mark" />
			{/if}-15</td
		>
		<td
			>{#if Kampfwert == 16}
				<span class="mark" />
			{/if}-16</td
		>
		<td
			>{#if Kampfwert == 17}
				<span class="mark" />
			{/if}-17</td
		>
		<td
			>{#if Kampfwert == 18}
				<span class="mark" />
			{/if}-18</td
		>
		<td
			>{#if Kampfwert == 19}
				<span class="mark" />
			{/if}-19</td
		>
		<td
			>{#if Kampfwert == 20}
				<span class="mark" />
			{/if}-20</td
		>
	</tr>
</table>
<div class="kampf-right">
	<div style="grid-column: 1; grid-row: 1;">
		<Armor input={char} {data} />
	</div>
	<div style="grid-column: 3; grid-row: 1; ">
		<h6>Ausdauer & Wunden</h6>
        <button on:click={() => charData.newRound()}>Neue Runde</button>

		<div style="display: flex; gap:1rem;">
			<Hitman {char} {...charData.wounds} />
			<Fatique {char} {data} {...charData.fatique} />
		</div>
	</div>
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
										data,
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
