<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { Data } from '../models/Data';
	import { Charakter, EIGENRSCHAFTEN, type CharakterData } from '../models/Character';
	import { getText, getTextBesonderheit, getTextFertigkeit, getTextTalent } from '../misc';

	import Hitman from '../controls/hitman.svelte';
	import { local } from '../storage';
	import { get, writable } from 'svelte/store';
	import Armor from '../controls/armor.svelte';
	import { doPaged } from '../controls/paged';
	import { noop } from 'svelte/internal';
	import CloseCombatWeapon from '../controls/CloseCombatWeapon.svelte';
	import { kldivergence } from 'mathjs';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let ready = false;

	onMount(async () => {
		ready = true;
		const currentChar = local<CharakterData>('c' + window.location.hash.slice(1));
		const j = get(currentChar);
		if (j) {
			data = await Data.init(false, j?.stammdatenId);
			if (data) {
				if (j) {
					char = new Charakter(data, j);
				}
			}
		}
		dev.set(!window.location.pathname.includes('character-generator'));
		id.set(window.location.hash.slice(1) ?? '');
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

<div id="target" />

<div id="source" style="display: none;">
	{#if data && char}
		<!-- <div class="header">
		<table style="margin: auto; height: 100%; ">
			<tr>
				<td> <h1>Nota</h1></td>
			</tr>
			<tr />
		</table>
	</div> -->

		<table class="stammdaten">
			<tr><td>Name </td><td>{char.name}</td></tr>
			<tr
				><td>Gattung/Art</td><td>
					{getText(char.organismus?.gattung.Name)}
					{getText(char.organismus?.art.Art)}
					({getText(char.organismus?.art.Name)})
					{getText(char.organismus?.morph.Name)}
					({getText(char.organismus?.lebensabschnitt.Name)})</td
				></tr
			>
			{#each Object.keys(data.pfadCategoryMap) as p}
				<tr
					><td>{p}</td><td>
						{Object.keys(data.pfadCategoryMap[p])
							.filter((ps) => Object.keys(char?.pfadLevel[p]?.[ps] ?? {}).length > 0)
							.sort()
							.reduce((p, c) => (p == '' ? c : `${p}, ${c}`), '')}
					</td></tr
				>
			{/each}
		</table>

		<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
			<table class="eigenschaften" style="grid-column: 1;">
				<thead>
					<th>Eigenschaften</th>
					<th style="text-align: center;">Grund</th>
					<th style="text-align: center;">Mod</th>
					<th>Aktuell</th>
				</thead>
				<tr
					><td>Konstitution</td><td>
						{char.eigenschaftenData.Konstitution.current -
							char.eigenschaftenData.Konstitution.modified}</td
					><td
						>{char.eigenschaftenData.Konstitution.modified
							? char.eigenschaftenData.Konstitution.modified
							: ''}</td
					><td> {char.eigenschaftenData.Konstitution.current}</td></tr
				>
				<tr
					><td>Stärke</td><td>
						{char.eigenschaftenData.Stärke.current - char.eigenschaftenData.Stärke.modified}</td
					><td
						>{char.eigenschaftenData.Stärke.modified
							? char.eigenschaftenData.Stärke.modified
							: ''}</td
					><td> {char.eigenschaftenData.Stärke.current}</td></tr
				>
				<tr
					><td>Gewandtheit</td><td>
						{char.eigenschaftenData.Gewandtheit.current -
							char.eigenschaftenData.Gewandtheit.modified}</td
					><td
						>{char.eigenschaftenData.Gewandtheit.modified
							? char.eigenschaftenData.Gewandtheit.modified
							: ''}</td
					><td> {char.eigenschaftenData.Gewandtheit.current}</td></tr
				>
				<tr
					><td>Feinmotorik</td><td>
						{char.eigenschaftenData.Feinmotorik.current -
							char.eigenschaftenData.Feinmotorik.modified}</td
					><td
						>{char.eigenschaftenData.Feinmotorik.modified
							? char.eigenschaftenData.Feinmotorik.modified
							: ''}</td
					><td> {char.eigenschaftenData.Feinmotorik.current}</td></tr
				>
				<tr
					><td>Antipathie</td><td>
						{char.eigenschaftenData.Antipathie.current -
							char.eigenschaftenData.Antipathie.modified}</td
					><td
						>{char.eigenschaftenData.Antipathie.modified
							? char.eigenschaftenData.Antipathie.modified
							: ''}</td
					><td> {char.eigenschaftenData.Antipathie.current}</td></tr
				>
				<tr
					><td>Sympathie</td><td>
						{char.eigenschaftenData.Sympathie.current -
							char.eigenschaftenData.Sympathie.modified}</td
					><td
						>{char.eigenschaftenData.Sympathie.modified
							? char.eigenschaftenData.Sympathie.modified
							: ''}</td
					><td> {char.eigenschaftenData.Sympathie.current}</td></tr
				>
				<tr
					><td>Klugheit</td><td>
						{char.eigenschaftenData.Klugheit.current - char.eigenschaftenData.Klugheit.modified}</td
					><td
						>{char.eigenschaftenData.Klugheit.modified
							? char.eigenschaftenData.Klugheit.modified
							: ''}</td
					><td> {char.eigenschaftenData.Klugheit.current}</td></tr
				>
				<tr
					><td>Intuition</td><td>
						{char.eigenschaftenData.Intuition.current -
							char.eigenschaftenData.Intuition.modified}</td
					><td
						>{char.eigenschaftenData.Intuition.modified
							? char.eigenschaftenData.Intuition.modified
							: ''}</td
					><td> {char.eigenschaftenData.Intuition.current}</td></tr
				>
				<tr
					><td>Fokus</td><td>
						{char.eigenschaftenData.Fokus.current - char.eigenschaftenData.Fokus.modified}</td
					><td
						>{char.eigenschaftenData.Fokus.modified
							? char.eigenschaftenData.Fokus.modified
							: ''}</td
					><td> {char.eigenschaftenData.Fokus.current}</td></tr
				>
				<tr
					><td>Einfluss</td><td>
						{char.eigenschaftenData.Einfluss.current - char.eigenschaftenData.Einfluss.modified}</td
					><td
						>{char.eigenschaftenData.Einfluss.modified
							? char.eigenschaftenData.Einfluss.modified
							: ''}</td
					><td> {char.eigenschaftenData.Einfluss.current}</td></tr
				>
				<tr
					><td>Mut</td><td>
						{char.eigenschaftenData.Mut.current - char.eigenschaftenData.Mut.modified}</td
					><td>{char.eigenschaftenData.Mut.modified ? char.eigenschaftenData.Mut.modified : ''}</td
					><td> {char.eigenschaftenData.Mut.current}</td></tr
				>
				<tr
					><td>Glück</td><td>
						{char.eigenschaftenData.Glück.current - char.eigenschaftenData.Glück.modified}</td
					><td
						>{char.eigenschaftenData.Glück.modified
							? char.eigenschaftenData.Glück.modified
							: ''}</td
					><td> {char.eigenschaftenData.Glück.current}</td></tr
				>
			</table>
		</div>
		<div class="extra">
			{#each Object.keys(data.besonderheitenCategoryMap) as bKey}
				{#if Object.keys(data.besonderheitenCategoryMap[bKey]).some((x) => (char?.besonderheitenIgnoreRequirements[x] ?? 0) > 0)}
					<div class="list">
						<strong>{bKey}</strong>
						<ul>
							{#each Object.keys(data.besonderheitenCategoryMap[bKey]).filter((x) => (char?.besonderheitenIgnoreRequirements[x] ?? 0) > 0) as b2Key}
								<li>
									{#if (char?.besonderheiten[b2Key] ?? 0) == 0}
										<span class="light">
											{getTextBesonderheit(
												data.besonderheitenMap[b2Key],
												char?.besonderheitenIgnoreRequirements[b2Key] ?? 0
											)}
										</span>
									{:else if (char?.besonderheiten[b2Key] ?? 0) < (char?.besonderheitenIgnoreRequirements[b2Key] ?? 0)}
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key] ?? 0
										)}
										<span class="light">
											({getTextBesonderheit(
												data.besonderheitenMap[b2Key],
												char?.besonderheitenIgnoreRequirements[b2Key] ?? 0
											)})
										</span>
									{:else}
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key] ?? 0
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
				{#if Object.keys(data.fertigkeitenCategoryMap[bKey]).some((x) => (char?.fertigkeitenIgnoreRequirements[x] ?? 0) > 0)}
					<div class="list">
						<strong>{bKey}</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap[bKey]).filter((x) => (char?.fertigkeitenIgnoreRequirements[x] ?? 0) > 0) as b2Key}
								<li>
									{#if (char?.fertigkeiten[b2Key] ?? 0) == 0}
										<span class="light">
											{getTextFertigkeit(
												data.fertigkeitenMap[b2Key],
												char?.fertigkeitenIgnoreRequirements[b2Key] ?? 0
											)}
										</span>
									{:else if (char?.fertigkeiten[b2Key] ?? 0) < (char?.fertigkeitenIgnoreRequirements[b2Key] ?? 0)}
										{getTextFertigkeit(data.fertigkeitenMap[b2Key], char?.fertigkeiten[b2Key] ?? 0)}
										<span class="light">
											({getTextFertigkeit(
												data.fertigkeitenMap[b2Key],
												char?.fertigkeitenIgnoreRequirements[b2Key] ?? 0
											)})
										</span>
									{:else}
										{getTextFertigkeit(data.fertigkeitenMap[b2Key], char?.fertigkeiten[b2Key] ?? 0)}
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
					<td>KO {char.eigenschaftenData.Konstitution.current}</td>
					<td>GE {char.eigenschaftenData.Gewandtheit.current}</td>
					<td>AN {char.eigenschaftenData.Antipathie.current}</td>
					<td>KL {char.eigenschaftenData.Klugheit.current}</td>
					<td>FO {char.eigenschaftenData.Fokus.current}</td>
					<td>MU {char.eigenschaftenData.Mut.current}</td>
				</tr>
				<tr>
					<td>ST {char.eigenschaftenData.Stärke.current}</td>
					<td>FM {char.eigenschaftenData.Feinmotorik.current}</td>
					<td>SY {char.eigenschaftenData.Sympathie.current}</td>
					<td>IN {char.eigenschaftenData.Intuition.current}</td>
					<td>EI {char.eigenschaftenData.Einfluss.current}</td>
					<td>GL {char.eigenschaftenData.Glück.current}</td>
				</tr>
			</table>
		</div>
		<hr />
		<div style="column-count:2 ;">
			{#each Object.keys(data.talentCategoryMap) as tk}
				{#if Object.keys(data.talentCategoryMap[tk]).some((t) => (char?.talentEffective[t] ?? 0) > 0 || (char?.talentEffectiveIgnoreRequirements[t] ?? 0) > 0)}
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
							{#each Object.keys(data?.talentCategoryMap[tk] ?? {}).sort() as t}
								{#if char.talentEffective[t] > 0 || char.talentEffectiveIgnoreRequirements[t] > 0}
									<tr>
										<td>
											{#if char.talentBase[t] == 0}
												<span class="light"> {getTextTalent(data.talentMap[t], 'NameProbe')}</span>
											{:else}
												{getTextTalent(data.talentMap[t], 'NameProbe')}
											{/if}
										</td>
										<td>
											{#if char.talentEffective[t] < char.talentEffectiveIgnoreRequirements[t]}
												({char.talentEffectiveIgnoreRequirements[t]}!)
											{/if}

											{#if char.talentBase[t] == 0}
												<strong class="light"> {char.talentEffective[t]} TaW</strong>
											{:else}
												<strong> {char.talentEffective[t]} TaW</strong>
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
		<div class="header">
			<table style="margin: auto; border-spacing: 0.8rem ; font-size: 14pt;">
				<tr>
					<td>KO {char.eigenschaftenData.Konstitution.current}</td>
					<td>GE {char.eigenschaftenData.Gewandtheit.current}</td>
					<td>AN {char.eigenschaftenData.Antipathie.current}</td>
					<td>KL {char.eigenschaftenData.Klugheit.current}</td>
					<td>FO {char.eigenschaftenData.Fokus.current}</td>
					<td>MU {char.eigenschaftenData.Mut.current}</td>
				</tr>
				<tr>
					<td>ST {char.eigenschaftenData.Stärke.current}</td>
					<td>FM {char.eigenschaftenData.Feinmotorik.current}</td>
					<td>SY {char.eigenschaftenData.Sympathie.current}</td>
					<td>IN {char.eigenschaftenData.Intuition.current}</td>
					<td>EI {char.eigenschaftenData.Einfluss.current}</td>
					<td>GL {char.eigenschaftenData.Glück.current}</td>
				</tr>
			</table>
		</div>
		<h1>Kampf</h1>
		{@const Kampfwert = Math.floor((char.talentEffective['Kampfgespür'] ?? 0) / 2 + 3)}
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
				<Armor input={char} />
			</div>
			<div style="grid-column: 3; grid-row: 1;">
				<h6>Ausdauer & Wunden</h6>
				<Hitman {char} />

				<table class="aussdauer">
					{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as y}
						{@const au = Math.floor(
							70 -
								(2 * (char?.eigenschaftenData.Konstitution.current ?? 21) +
									(char?.eigenschaftenData.Stärke.current ?? 21))
						)}
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
					{#if Object.keys(data.besonderheitenCategoryMap[bKey]).some((x) => (char?.besonderheiten[x] ?? 0) > 0 && (data?.besonderheitenMap[x].SubKategorie ?? []).includes('Kampf'))}
						<div class="list">
							<strong>{bKey}</strong>
							<ul>
								{#each Object.keys(data.besonderheitenCategoryMap[bKey]).filter((x) => (char?.besonderheiten[x] ?? 0) > 0 && (data?.besonderheitenMap[x].SubKategorie ?? []).includes('Kampf')) as b2Key}
									<li>
										{getTextBesonderheit(
											data.besonderheitenMap[b2Key],
											char?.besonderheiten[b2Key] ?? 0
										)}
									</li>
								{/each}
							</ul>
							<hr />
						</div>
					{/if}
				{/each}

				{#if Object.keys(data.fertigkeitenCategoryMap['Kampfstiele'] ?? {}).some((x) => (char?.fertigkeiten[x] ?? 0) > 0)}
					<div class="list">
						<strong>Kampfstiele</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap['Kampfstiele']).filter((x) => (char?.fertigkeiten[x] ?? 0) > 0) as b2Key}
								<li>
									{getTextFertigkeit(data.fertigkeitenMap[b2Key], char?.fertigkeiten[b2Key] ?? 0)}
								</li>
							{/each}
						</ul>
						<hr />
					</div>
				{/if}
				{#if Object.keys(data.fertigkeitenCategoryMap['Kampf']).some((x) => (char?.fertigkeiten[x] ?? 0) > 0)}
					<div class="list">
						<strong>Fertigkeiten</strong>
						<ul>
							{#each Object.keys(data.fertigkeitenCategoryMap['Kampf']).filter((x) => (char?.fertigkeiten[x] ?? 0) > 0) as b2Key}
								<li>
									{getTextFertigkeit(data.fertigkeitenMap[b2Key], char?.fertigkeiten[b2Key] ?? 0)}
								</li>
							{/each}
						</ul>
						<hr />
					</div>
				{/if}

				{#each Object.entries(char.closeConbatWeapons)
					.filter(([k, v]) => v)
					.map(([k]) => k) as x}
					{@const p = data?.nahkampfMap[x]}
					<div class="list">
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
	:global {
		.missing {
			color: brown;
		}
		button.missing {
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
			nav {
				display: block !important;
				position: sticky;
				top: 0px;
				width: fit-content;
				padding: 2rem;
				border-bottom-right-radius: 99rem;
				z-index: 999;

				background-color: cadetblue;
				border: 1px solid blueviolet;

				a {
					color: #fff;
					font-family: Verdana, Geneva, Tahoma, sans-serif;
					text-decoration: none;
					transition: all 1000ms;
				}
				a:hover {
					color: #00f;
					font-family: Verdana, Geneva, Tahoma, sans-serif;
					text-decoration: none;
				}
			}
			:root {
				--screen-pages-spacing: 10rem;
				--color-paper: white;
				--background: lightgray;
				--muted-color: #dfdfdf;
				--background-color: white;
				--color: black;
			}
			body {
				background-color: var(--background);
				margin: 0 auto 0 auto;
			}
			.pagedjs_pages {
				display: flex;
				// max-width: var(--pagedjs-width);
				flex: 0;
				flex-wrap: wrap;
				margin: 0 auto;
				margin-top: var(--screen-pages-spacing);
			}
			.pagedjs_page {
				background: var(--color-paper);
				box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 0 3px rgba(0, 0, 0, 0.6);
				flex-shrink: 0;
				flex-grow: 0;
				margin: auto auto var(--screen-pages-spacing) auto;
			}
		}
		nav {
			display: none;
		}

		.kampf-right > div:only-child {
			grid-column: 1 / 4 !important;
		}
	}
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
			border-color: red;
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
			border-color: red;
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

	.header {
		break-before: page;
		position: running(titleRunning);
	}
</style>
