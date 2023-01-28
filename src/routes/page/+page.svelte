<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { Data } from 'src/models/Data';
	import { Charakter } from 'src/models/Character';
	import {
		filterObjectKeys,
		getText,
		getTextBesonderheit,
		getTextFertigkeit,
		getTextTalent,
		join
	} from 'src/misc/misc';

	import Hitman from 'src/controls/hitman.svelte';

	import { writable } from 'svelte/store';
	import Armor from 'src/controls/armor.svelte';
	import { doPaged } from 'src/controls/paged';

	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import { localStorageChar } from 'src/misc/storage';
	import { filterNull } from 'src/misc/misc';
	import Nota from 'src/view/nota.svelte';
	import {} from 'src/css/theme.css';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let ready = false;

	onMount(async () => {
		ready = true;
		localStorageChar.subscribe(async (currentChar) => {
			if (currentChar) {
				data = await Data.init(false, currentChar?.stammdatenId);
				if (data) {
					if (currentChar) {
						char = new Charakter(data, currentChar);
					}
				}
			}
			dev.set(!window.location.pathname.includes('character-generator'));
			id.set(char?.id ?? '');
		});
		localStorageChar.updateId('c' + window.location.hash.slice(1));
		// const currentChar = local<CharakterData>('c' + window.location.hash.slice(1));
	});

	afterUpdate(() => {
		 render();
	});

	let renderPromise: undefined | Promise<void>;
	function render() {
		if (!ready) return;

		renderPromise = new Promise<void>(async (r) => {
			await renderPromise;
			document.getElementById('target')!.innerHTML = '';
			const flow = await doPaged(
				document.getElementById('source')?.innerHTML!,
				document.getElementById('target')!
			);
			// const flow = await doPaged(
			// undefined,
			// 	undefined
			// );
			r();
		});
	}

	let dev = writable(true);
	let id = writable('');
	let pageLink: string;

	$: pageLink = ($dev ? '/' : '/character-generator/') + '#i' + $id;
</script>

<nav>
	<a href={pageLink} role="button" rel="external">Zum Editor</a>
</nav>

<div data-theme="light" id="target" />

<div id="source" style="display: none;">
	{#if data && char}
		<div class="header">
			<div style="height: 200xp; width: 200px;">
				<Nota />
			</div>
			<!-- <table style="margin: auto; height: 100%; ">
				<tr>
					<td>
					</td>
				</tr>
				<tr />
			</table> -->
		</div>

		<table class="stammdaten">
			<tr><td>Name </td><td>{char?.nameStore.currentValue()}</td></tr>
			<tr
				><td>Gattung/Art</td><td>
					{getText(char?.gattungsStore.currentValue({ defaultValue: undefined })?.Name, char)}
					{getText(char?.artStore.currentValue({ defaultValue: undefined })?.Art, char)}
					({getText(char?.artStore.currentValue({ defaultValue: undefined })?.Name, char)})
					{getText(char?.morphStore.currentValue({ defaultValue: undefined })?.Name, char)}
					{#if (filterNull( [...Object.values(char?.lebensAbschnitteStore.currentValue( { defaultValue: undefined } ) ?? {})] )
							.map((lebensabschnitt) => getText(lebensabschnitt.Name, char))
							.filter((x) => x != '' && x != undefined) ?? []).length > 0}
						({join(
							filterNull([
								...Object.values(
									char?.lebensAbschnitteStore.currentValue({ defaultValue: undefined }) ?? {}
								)
							])
								.map((lebensabschnitt) => getText(lebensabschnitt.Name, char))
								.filter((x) => x != '' && x != undefined) ?? []
						)})
					{/if}
				</td>
			</tr>
			{#each Object.keys(data.pfadCategoryMap) as p}
				<tr
					><td>{getText(data.pfadCategoryMap[p].Name)}</td><td>
						{join(
							Object.entries(char?.pfad)
								.filter(([key, value]) => {
									return data?.pfadCategoryMap[p].levels[key] != undefined;
								})
								.filter(([key, value]) => {
									return Object.values(value).some(
										(x) => (x.effective.currentValue({ defaultValue: 0 }) ?? 0) > 0
									);
								})
								// Object.keys(data.pfadCategoryMap[p])
								// 	.filter((ps) => Object.keys(char?.pfadLevel[p]?.[ps] ?? {}).length > 0)
								.map(([x]) => getText(data?.pfadMap[x].Name, char))
								.sort()
						)}
					</td></tr
				>
			{/each}
		</table>

		<div style="column-count: 2;		column-gap: 1em;">
			<!-- <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;"> -->

			{#each data.Instance.Daten.Organismen.EigenschaftenGruppen.Gruppe as gg}
				<table class="eigenschaften">
					<thead>
						<th>{getText(gg.Name)}</th>
						<!-- <th style="text-align: center;">Grund</th> -->
						<!-- <th style="text-align: center;">Mod</th> -->
						<th>Aktuell</th>
					</thead>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == gg.id)
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						}) as eigenschaft}
						{@const meta = eigenschaft.meta.currentValue({ defaultValue: undefined })}
						{@const effective = eigenschaft.effective.currentValue({ defaultValue: undefined })}
						{#if meta && meta.type == 'bereich'}
							<tr
								><td>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
								><td>
									{#if meta.diskret}
										{effective ?? meta.default}
									{:else}
										{Math.round((effective ?? meta.default) * 100) / 100}
									{/if}
									{meta.einheit ?? ''}
								</td>
							</tr>
						{:else if meta && meta.type == 'berechnung' && effective}
							<tr
								><td>{getText(meta.Name)}</td><td>
									{Math.round(effective * 100) / 100}
									{meta.einheit ?? ''}
								</td>
							</tr>
						{:else if meta && meta.type == 'reihe' && effective}
							<tr
								><td>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
								><td>
									{Math.round(effective * 100) / 100}
									{meta.einheit ?? ''}
								</td>
							</tr>
						{:else if meta && meta.type == 'punkt' && effective == 1}
							<tr
								><td colspan="2"
									>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
								>
							</tr>
						{/if}
					{/each}
				</table>
			{/each}
		</div>
		<div class="extra">
			{#each Object.keys(data.besonderheitenCategoryMap) as bKey}
				{#if Object.keys(data.besonderheitenCategoryMap[bKey]).some((x) => (char?.besonderheiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
					<div class="list">
						<strong>{bKey}</strong>
						<ul>
							{#each Object.keys(data.besonderheitenCategoryMap[bKey]).filter((x) => (char?.besonderheiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
								<li>
									{#if (char?.besonderheiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) == 0}
										<span class="light">
											{getTextBesonderheit(
												data.besonderheitenMap[b2Key],
												char?.besonderheiten[b2Key].unconditionally.currentValue({
													defaultValue: 0
												}) ?? 0,
												char
											)}
										</span>
									{:else if (char?.besonderheiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) < (char?.besonderheiten[b2Key].unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
											char
										)}
										<span class="light">
											({getTextBesonderheit(
												data.besonderheitenMap[b2Key],
												char?.besonderheiten[b2Key].unconditionally.currentValue({
													defaultValue: 0
												}) ?? 0,
												char
											)})
										</span>
									{:else}
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
											char
										)}
									{/if}
								</li>
							{/each}
						</ul>
						<hr />
					</div>
				{/if}
			{/each}

			{#each Object.keys(data.fertigkeitenCategoryMap) as bKey}
				{#if Object.keys(data.fertigkeitenCategoryMap[bKey].fertigkeiten).some((x) => (char?.fertigkeiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
					<div class="list">
						<strong>{bKey}</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap[bKey]).filter((x) => (char?.fertigkeiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
								<li>
									{#if (char?.fertigkeiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) == 0}
										<span class="light">
											{getTextFertigkeit(
												data.fertigkeitenMap[b2Key],
												char?.fertigkeiten[b2Key].unconditionally.currentValue({
													defaultValue: 0
												}) ?? 0,
												char
											)}
										</span>
									{:else if (char?.fertigkeiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) < (char?.fertigkeiten[b2Key].unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
										{getTextFertigkeit(
											data.fertigkeitenMap[b2Key],
											char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
											char
										)}
										<span class="light">
											({getTextFertigkeit(
												data.fertigkeitenMap[b2Key],
												char?.fertigkeiten[b2Key].unconditionally.currentValue({
													defaultValue: 0
												}) ?? 0,
												char
											)})
										</span>
									{:else}
										{getTextFertigkeit(
											data.fertigkeitenMap[b2Key],
											char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
											char
										)}
									{/if}
								</li>
							{/each}
						</ul>
						<hr />
					</div>
				{/if}
			{/each}
		</div>
		<div class="header">
			<table style="margin: auto; border-spacing: 0.8rem ; font-size: 14pt;">
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 0) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 1) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
			</table>
		</div>
		<hr />
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
								{#if (char?.talente[t].effective.currentValue( { defaultValue: 0 } ) ?? 0) || (char?.talente[t].unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
									<tr>
										<td>
											{#if (char?.talente[t].base.currentValue({ defaultValue: 0 }) ?? 0) == 0}
												<span class="light">
													{getTextTalent(data.talentMap[t], char, 'NameProbe')}</span
												>
											{:else}
												{getTextTalent(data.talentMap[t], char, 'NameProbe')}
											{/if}
										</td>
										<td>
											{#if (char?.talente[t].effective.currentValue( { defaultValue: 0 } ) ?? 0) < (char?.talente[t].unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
												({char?.talente[t].unconditionally.currentValue({ defaultValue: 0 }) ?? 0}!)
											{/if}

											{#if (char?.talente[t].base.currentValue({ defaultValue: 0 }) ?? 0) == 0}
												<strong class="light">
													{char?.talente[t].effective.currentValue({ defaultValue: 0 }) ?? 0} TaW</strong
												>
											{:else}
												<strong>
													{char?.talente[t].effective.currentValue({ defaultValue: 0 }) ?? 0} TaW</strong
												>
											{/if}
										</td>
									</tr>
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
		<!-- <div class="header">
			<table style="margin: auto; border-spacing: 0.8rem ; font-size: 14pt;">
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 0) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 1) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
			</table>
		</div> -->

		<h1 class="pagebreak">Kampf</h1>
		{@const Kampfwert = Math.floor(
			(char?.talente['Kampfgespür'].effective.currentValue({ defaultValue: 0 }) ?? 0) / 2 + 3
		)}
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
			<div style="grid-column: 3; grid-row: 1;">
				<h6>Ausdauer & Wunden</h6>
				<Hitman {char} />

				<table class="aussdauer">
					{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as y}
						{@const au = char?.eigenschaften['ausdauer'].effective.currentValue({
							defaultValue: 1
						})}
						<tr>
							{#each [1, 2, 3, 4, 5, 6] as x}
								{@const c = x - 1 + (y - 1) * 6 + 1}
								{#if au == c + 1}
									<td style="background-color: black;">{c}</td>
								{:else if c <= 18}
									<td style="background-color: darkgray;">{c}</td>
								{:else if c <= 24}
									<td style="background-color: lightgray;">{c}</td>
								{:else}
									<td>{c}</td>
								{/if}
							{/each}
						</tr>
					{/each}
				</table>
			</div>
			<div
				class="kampf-info"
				style="grid-column: 2; grid-row: 1; display: flex; flex-wrap: wrap; justify-content: space-evenly ; align-content: flex-start;"
			>
				{#each Object.keys(data.besonderheitenCategoryMap) as bKey}
					{#if Object.keys(data.besonderheitenCategoryMap[bKey]).some((x) => (char?.besonderheiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0 && (data?.besonderheitenMap[x].SubKategorie ?? []).includes('Kampf'))}
						<div class="list">
							<strong>{bKey}</strong>
							<ul>
								{#each Object.keys(data.besonderheitenCategoryMap[bKey]).filter((x) => (char?.besonderheiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0 && (data?.besonderheitenMap[x].SubKategorie ?? []).includes('Kampf')) as b2Key}
									<li>
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
											char
										)}
									</li>
								{/each}
							</ul>
							<hr />
						</div>
					{/if}
				{/each}

				{#if Object.keys(data.fertigkeitenCategoryMap['Kampfstiele'] ?? {}).some((x) => (char?.fertigkeiten[x]?.effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
					<div class="list">
						<strong>Kampfstiele</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap['Kampfstiele']).filter((x) => (char?.fertigkeiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
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
				{#if Object.keys(data.fertigkeitenCategoryMap['Kampf']).some((x) => (char?.fertigkeiten[x]?.effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
					<div class="list">
						<strong>Fertigkeiten</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap['Kampf']).filter((x) => (char?.fertigkeiten[x].effective.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
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
	{:else}
		<p>Loding…</p>
	{/if}
</div>

<style lang="scss">
	// :global() {
	:global(.missing) {
		color: brown;
	}
	:global(button.missing) {
		background-color: brown;
		color: white;
	}

	@page {
		size: A4;
		margin-top: 35mm;
		margin-right: 15mm;
		margin-bottom: 25mm;
		margin-left: 15mm;
		@top-center {
			content: element(titleRunning);
		}
	}

	@media screen {
		// @media screen {
		:global(nav) {
			display: block !important;
			position: sticky;
			top: 0px;
			width: fit-content;
			padding: 2rem;
			border-bottom-right-radius: 2rem;
			z-index: 999;

			margin: var(--block-spacing-vertical) 0;
			// padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
			// border-radius: var(--border-radius);
			background: var(--card-background-color);
			box-shadow: var(--card-box-shadow);
			
			a {
				color: var(--color);
				font-family: Verdana, Geneva, Tahoma, sans-serif;
				text-decoration: none;
				transition: all 1000ms;
			}
			a:hover {
				color: var(--primary);
				font-family: Verdana, Geneva, Tahoma, sans-serif;
				text-decoration: none;
			}
		}
		:global(:root) {
			--screen-pages-spacing: 10rem;
			--color-paper: white;
			--background: lightgray;
			--muted-color: #dfdfdf;
			--background-color: white;
			// --color: black;
		}
		:global(body) {
			background-color: var(--background);
			margin: 0 auto 0 auto;
		}
		:global(.pagedjs_pages) {
			display: flex;
			// max-width: var(--pagedjs-width);
			flex: 0;
			flex-wrap: wrap;
			margin: 0 auto;
			margin-top: var(--screen-pages-spacing);
		}
		:global(.pagedjs_page) {
			background: var(--color-paper);
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 0 3px rgba(0, 0, 0, 0.6);
			flex-shrink: 0;
			flex-grow: 0;
			margin: auto auto var(--screen-pages-spacing) auto;
		}
		// }
	}
	:global(nav) {
		display: none;
	}

	:global(.kampf-right > div:only-child) {
		grid-column: 1 / 4 !important;
	}
	// }
	* {
		box-sizing: border-box;
	}

	h6 {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		margin-bottom: 8px;
		font-weight: lighter;
	}
	.aussdauer {
		border: 1px solid black;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		font-size: 7pt;
		table-layout: fixed;
		.mark {
			position: absolute;
			margin-left: -10px;
			margin-top: -10px;
			width: 30px;
			height: 30px;
			border: 2px solid;
			border-color: var(--primary);
			border-radius: 100%;
		}
		td {
			height: 34px;
			width: 34px;
			vertical-align: middle;
			text-align: center;

			border: 1px solid;
		}
	}

	.stammdaten {
		border: 1px solid black;
		width: 100%;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		td {
			height: 40px;
		}

		th,
		td {
			border-bottom: 1px solid;
			vertical-align: baseline;
		}
		td:last-child {
			border-bottom: 1px solid;
			vertical-align: bottom;
		}

		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.eigenschaften {
		width: 100%;
		break-inside: avoid;
		margin-bottom: 1rem;
		border: 1px solid black;
		padding: 8px;
		th,
		td {
			text-align: center;
		}
		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.extra {
		border: 1px solid black;
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		& > * {
			width: 48%;
		}

		hr {
			margin-top: 0px;
			break-before: avoid;
		}
		padding: 8px;
	}
	.kampf-info {
		& > * {
			width: 280px;
			margin: 0.5rem;
		}
	}
	.list {
		& > ul {
			margin-block-start: 0px;
			margin-block-end: 0.2rem;

			padding-inline-start: 0px;
			&:empty {
				display: none;
			}
			li {
				display: inline;
				font-size: smaller;
			}
			li:not(:first-child)::before {
				content: ', ';
			}
		}
	}
	table.ḱampf {
		width: 100%;
		border: 1px solid black;
		width: 100%;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		font-size: 7pt;
		table-layout: fixed;
		.mark {
			position: absolute;
			margin-left: -10px;
			margin-top: -10px;
			width: 30px;
			height: 30px;
			border: 2px solid;
			border-color: var(--primary);
			border-radius: 100%;
		}
		td {
			height: 34px;
			vertical-align: middle;
			text-align: center;

			border: 1px solid;
		}
	}
	table.talent {
		width: 100%;
		tr:nth-child(even) {
			background-color: #f8f8f8;
		}
		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.light {
		color: lightslategray;
	}

	.kampf-right {
		display: grid;
		grid-template-columns: auto 1fr auto;
		width: 99%;
	}

	.pagebreak {
		break-before: page;
	}
	.header {
		break-before: page;
		position: running(titleRunning);
	}
</style>
