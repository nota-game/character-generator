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
	import type { CharacterState, LogSimpleRole, rolePropertys } from 'src/models/CharacterState';

	export let char: Charakter;
	export let data: Data;
	export let charData: CharacterState;

	let selectedTalent: string | undefined;

	let difficulty: number = 0;

	function role(talentId: string, probe: _Probe, difficulty: number): LogSimpleRole {
		const talent = data.talentMap[talentId];
		const taw = char.talente[talentId].effective.currentValue({ defaultValue: 0 });
		const tawEffectiv = taw - difficulty;
		let tawResult = tawEffectiv;

		console.log('begin role');
		let roles: rolePropertys[] = [];

		function getAbleitungen(params: AbleitungsAuswahl_talent | undefined): string[] {
			if (params == undefined) {
				return [];
			}
			return [
				...(params.Ableitung?.map((x) => x.Id) ?? []),
				...(params.Max?.flatMap((x) => getAbleitungen(x)) ?? [])
			];
		}
		const relatedTalents = distinct([
			talentId,
			...getAbleitungen(data.talentMap[talentId].Ableitungen)
		]);

		const begabung = relatedTalents
			.map((t) => [char.besonderheiten('Begabung Talent', t) as BesonderheitenHolder, t] as const)
			.filter(([b, id]) => {
				const stufe = b.effective.currentValue({ defaultValue: 0 });
				return (id == talentId && stufe > 0) || stufe > 1;
			})
			.map(
				([b, id]) =>
					[
						getTextBesonderheit(
							data.besonderheitenMap['Begabung Talent'],
							b.effective.currentValue({ defaultValue: 0 }),
							char,
							data,
							id
						),
						d20()
					] as const
			);

		for (const e of probe.Eigenschaft) {
			if (e.Name) {
				const meta = char.eigenschaften[e.Name].meta.currentValue({ defaultValue: undefined });
				if (!meta) {
					continue;
				}

				const defaltValue = meta.type == 'bereich' ? meta.default : 21;
				const currentValue =
					char.eigenschaften[e.Name].effective.currentValue({ defaultValue: undefined }) ??
					defaltValue;
				const role = d20();

				const name = char.eigenschaften[e.Name ?? '']?.meta.currentValue({
					defaultValue: undefined
				})?.Abkürzung ?? {
					Lokalisirung: [
						{ meta: { Sprache: 'de', Geschlecht: 'Unspezifiziert' }, value: 'UNBEKANT' }
					]
				};

				roles.push({ role, target: currentValue, name });

				if (role < currentValue) {
					tawResult -= role;
				}
			}
		}

		for (let i = 0; i < begabung.length; i++) {
			// role an additional role
			const [, role] = begabung[i];
			console.log('extra role', role);

			const possibleSubstitutions = roles.filter((x) => x.target > (x.substituted ?? x.role));
			const currentOnes = roles.filter((x) => (x.substituted ?? x.role) == 1).length;
			const subs = possibleSubstitutions
				.map((x) => {
					const change =
						currentOnes > 0 && role == 1
							? -1 // cant do anything here
							: currentOnes > 1 && (x.substituted ?? x.role != 1)
							? -1 // if we have more then one 1 we need to replace that
							: currentOnes > 1
							? 1 // fix 1 there wont be a better one in this run
							: role >= x.target
							? x.substituted ?? x.role
							: (x.substituted ?? x.role) - role;
					return [change, x] as const;
				})
				.filter(([x]) => x > 0)
				.sort(([a], [b]) => b - a);
			console.log('subs', JSON.parse(JSON.stringify(subs)));
			if (subs[0]) {
				const [increse, roleToChange] = subs[0];
				console.log('substitute', JSON.parse(JSON.stringify({ increse, roleToChange })));
				roleToChange.substituted = role;
				tawResult =
					tawEffectiv -
					roles
						.filter((x) => (x.substituted ?? x.role) < x.target)
						.map((x) => x.substituted ?? x.role)
						.reduce((a, b) => a + b, 0);
			} else if (role == 20) {
				const s = roles.filter((x) => x.role != 20)[0];
				if (s) {
					s.substituted = role;
				}
			}
		}

		const quality = tawResult < 1 ? 0 : Math.floor(Math.log2(tawResult)) + 1;

		const roleEntry = {
			type: 'simple-role',
			talent,
			roles,
			taw,
			tawResult: Math.min(tawResult, taw),
			quality,
			begabung
		} satisfies LogSimpleRole;
		console.log('roleEntry', roleEntry);
		// roleEntrys.push(roleEntry);
		charData.addLog(roleEntry);
		return roleEntry;
	}
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
										{#each entry.Probe as p}
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
													role(t, p, difficulty);
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
	.miss {
		color: var(--del-color);
	}

	.luky {
		color: var(--primary);
	}

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
