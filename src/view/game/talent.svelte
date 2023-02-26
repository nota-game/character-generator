<script lang="ts">
	import { type BesonderheitenHolder, type Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

	import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import {
		d20,
		distinct,
		filterNull,
		filterObjectKeys,
		getText,
		getTextBesonderheit,
		getTextFertigkeit,
		getTextTalent,
		join,
		tail,
		withIndex,
		zip
	} from 'src/misc/misc';
	import Nota from '../nota.svelte';
	import type {
		AbleitungsAuswahl_talent,
		Lokalisierungen_misc,
		TalentDefinition_talent,
		_Probe
	} from 'src/data/nota.g';
	import { HtmlTag, subscribe } from 'svelte/internal';
	import { json } from '@sveltejs/kit';
	import type { CharacterState, rolePropertys } from 'src/models/CharacterState';

	export let char: Charakter;
	export let data: Data;
	export let charData: CharacterState;

	let selectedTalent: string | undefined;

	let difficulty: number = 0;
</script>

<div style="column-count:2 ;">
	{#each Object.keys(data.talentCategoryMap) as tk}
		{#if Object.keys(data.talentCategoryMap[tk].talente).some((t) => (char?.talente[t]?.effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0 || (char?.talente[t]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
			<table class="talent">
				<thead>
					<tr>
						<th colspan="2" style="padding-top: 0.5em;padding-bottom: 0.5em; font-size: large;">
							{tk}</th
						>
					</tr>
					<tr>
						<th> Name </th>
						<th> TaW </th>
					</tr>
				</thead>
				<tbody>
					{#each Object.keys(data?.talentCategoryMap[tk]?.talente ?? {}).sort() as t}
						{@const talent = char.talente[t]}
						{@const entry = data.talentMap[t]}
						{#if (talent.effective.currentValue( { defaultValue: 0 } ) ?? 0) || (talent.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
							<tr
								style="cursor: pointer;"
								on:click={() => (selectedTalent = selectedTalent == t ? undefined : t)}
							>
								<td>
									{#if (talent.base.currentValue({ defaultValue: 0 }) ?? 0) == 0}
										<span class="light"> {getTextTalent(entry, char, 'NameProbe')}</span>
									{:else}
										{getTextTalent(entry, char, 'NameProbe')}
									{/if}
								</td>
								<td>
									{#if (talent.effective.currentValue( { defaultValue: 0 } ) ?? 0) < (talent.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
										({talent.unconditionally.currentValue({ defaultValue: 0 }) ?? 0}!)
									{/if}

									{#if (talent.base.currentValue({ defaultValue: 0 }) ?? 0) == 0}
										<strong class="light">
											{talent.effective.currentValue({ defaultValue: 0 }) ?? 0} TaW</strong
										>
									{:else}
										<strong> {talent.effective.currentValue({ defaultValue: 0 }) ?? 0} TaW</strong>
									{/if}
								</td>
							</tr>
							{#if selectedTalent == t}
								<tr>
									<td colspan="2">
										{#each withIndex(entry.Probe) as [p, index]}
											Probe auf {join(
												p.Eigenschaft.map((x) =>
													getText(
														char.eigenschaften[x.Name ?? '']?.meta.currentValue({
															defaultValue: undefined
														})?.Abkürzung
													)
												),
												'•'
											)}

											<a
												href="#"
												on:click={(e) => {
													e.preventDefault();
													charData.simpleSkillCheck(t, difficulty, index);
												}}
											>
												Einfache Probe</a
											>
											<label>
												Erschwerniss
												<input type="number" bind:value={difficulty} />
											</label>
										{/each}
									</td>
								</tr>
							{/if}
						{/if}
					{/each}
				</tbody>
			</table>
		{:else}
			<table class="talent">
				<thead>
					<tr>
						<th colspan="2" style="padding-top: 0.5em;padding-bottom: 0.5em; font-size: large;">
							{tk}</th
						>
					</tr>
				</thead>
				<tbody>
					<tr> <td> Keine Erlernten Talente </td></tr>
				</tbody>
			</table>
		{/if}
	{/each}
</div>

<style lang="scss">
	aside {
		--content-size: 100%;
	}

	@media (min-width: 576px) {
		aside {
			--aside-size: 0px;

			--content-size: 510px;
			padding-right: 0;
			padding-left: 0;
		}
	}
	@media (min-width: 768px) {
		aside {
			--content-size: 700px;
		}
	}
	@media (min-width: 992px) {
		aside {
			--content-size: 920px;
		}
	}
	@media (min-width: 1200px) {
		aside {
			--content-size: 1130px;
		}
	}
</style>
