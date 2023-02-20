<script lang="ts">
	import { type BesonderheitenHolder, type Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

	import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import {
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

	export let char: Charakter;
	export let data: Data;

	let selectedTalent: string | undefined;

	let roleEntrys: roleEntry[] = [];
	$: roleEntrys = [];

	type rolePropertys = {
		role: number;
		target: number;
		substituted?: number;
		ignored?: true;
		name: Lokalisierungen_misc;
	};
	type roleEntry = {
		talent: TalentDefinition_talent;
		roles: rolePropertys[];
		taw: number;
		tawResult: number;
		quality: number;
		begabung: (readonly [string, number])[];
	};
	function role(talentId: string, probe: _Probe): roleEntry {
		const talent = data.talentMap[talentId];
		const taw = char.talente[talentId].effective.currentValue({ defaultValue: 0 });
		let tawResult = taw;

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
						d()
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
				const role = d();

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
					taw -
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
			talent,
			roles,
			taw,
			tawResult,
			quality,
			begabung
		};
		console.log('roleEntry', roleEntry);
		// roleEntrys.push(roleEntry);
		roleEntrys = [roleEntry, ...roleEntrys];
		return roleEntry;

		function d() {
			return Math.floor(Math.random() * 20) + 1;
		}
	}
</script>

<aside>
	{#each roleEntrys as entry}
		<div>
			<div>
				{getText(entry.talent.Name)}
			</div>
			<div>
				{#each entry.begabung as [b, n]}
					<small>
						{b} <span style="float: right;">{n}</span>
					</small><br />
				{/each}
			</div>
			<table class="probe-werte">
				<tr>
					{#each entry.roles as r}
						<td>
							{getText(r.name, char)}
						</td>
					{/each}
				</tr>
				<tr>
					{#each entry.roles as r}
						<td>
							<span class:miss={(r.substituted ?? r.role) < r.target}>
								{#if r.substituted === undefined}
									{r.role}
								{:else}
									<del>{r.role}</del>{r.substituted}
								{/if}
								≥ {r.target}
							</span>
						</td>
					{/each}
				</tr>
			</table>

			<strong>
				Qualität: {#if entry.roles.filter((x) => (x.substituted ?? x.role) == 1).length > 1}
					<span class="miss">Patzer</span>
				{:else if entry.roles.filter((x) => (x.substituted ?? x.role) == 20).length > 1}
					<span class="luky">Glück {entry.quality}<small>({entry.tawResult})</small></span>
				{:else if entry.tawResult < 0}
					<span class="miss">Fehlschlag</span>
				{:else}
					<span>{entry.quality}<small>({entry.tawResult})</small></span>
				{/if}
			</strong>
		</div>
	{/each}
</aside>
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
							<tr on:click={() => (selectedTalent = selectedTalent == t ? undefined : t)}>
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
													role(t, p);
												}}
											>
												Role</a
											>
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

	aside {
		background-color: var(--card-background-color);
		position: fixed;
		left: 8px;

		width: calc((100vw - var(--content-size)) / 2 - 30px);
		max-width: 20;
		max-height: 40rem;
		overflow: auto;
		& > div {
			margin-bottom: 1rem;
			padding: 0.5rem;
			border-bottom: 1px var(--muted-border-color) solid;
		}
		.probe-werte {
		}
	}
</style>
