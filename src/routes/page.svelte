<script lang="ts">
	import { onMount } from 'svelte';
	import { Data } from './models/Data';
	import { Charakter, EIGENRSCHAFTEN, type CharakterData } from './models/Character';
	import paged from './../../node_modules/pagedjs/dist/paged.polyfill.js?raw';

	import { getText } from './misc';

	import Hitman from './controls/hitman.svelte';
	import { local } from './storage';
	import { get, writable } from 'svelte/store';
import Armor from './controls/armor.svelte';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let charOrganismusStore = char?.organismusStore;
	$: charOrganismusStore = char?.organismusStore;

	let selection: string = 'Gattung/Art';

	onMount(async () => {
		const currentChar = local<CharakterData>('currentChar');
		data = await Data.init();
		if (data) {
			char = new Charakter(data);

			const j = get(currentChar);
			if (j) {
				char.Data = j;
			}
		}
		dev.set(!window.location.pathname.includes('character-generator'));
		(window as any).PagedConfig = {
			auto: true,
			after: (flow: any) => {
				const nav = document.createElement('nav');
				let pageLink: string;
				pageLink = $dev ? '/' : '/character-generator/';
				nav.innerHTML = `
		
				<a href=${pageLink} role="button"  rel="external" 
					>Zum Editor</a
				>


`;
				console.log(document.getElementsByTagName('body')[0].childNodes[0]);
				document
					.getElementsByTagName('body')[0]
					.insertBefore(nav, document.getElementsByTagName('body')[0].childNodes[0]);
			}
		};

		eval(paged);
		// 		const nav = document.createElement('nav');
		// 		let pageLink: string;
		// 	 pageLink = $dev ? '/' : '/character-generator/';
		// 		nav.innerHTML= `

		// 				<a href=${pageLink} role="button"  rel="external"
		// 					>Editor</a
		// 				>

		// `;
		// console.log(document.getElementsByTagName('body')[0].childNodes[0])
		// document.getElementsByTagName('body')[0].insertBefore(nav,document.getElementsByTagName('body')[0].childNodes[0]);

		// (window as any).PagedConfig = {
		// 		auto: true,
		// 		after: (flow : any) => { console.log("after", flow) },
		// 	};
	});

	let dev = writable(true);
	let pageLink: string;
	$: pageLink = $dev ? '/' : '/character-generator/';
</script>

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
		<tr><td>Name </td><td>{'Platzhalter'}</td></tr>
		<tr
			><td>Gattung/Art</td><td>
				{getText(char.organismus?.g.Name)}
				{getText(char.organismus?.a.Art)}
				({getText(char.organismus?.a.Name)})
				{getText(char.organismus?.m.Name)}
				({getText(char.organismus?.l.Name)})</td
			></tr
		>
		{#each Object.keys(data.pfadCategoryMap) as p}
			<tr
				><td>{p}</td><td>
					{Object.keys(data.pfadCategoryMap[p])
						.filter((ps) => Object.keys(char.pfadLevel[p]?.[ps] ?? {}).length > 0)
						.sort()
						.reduce((p, c) => (p == '' ? c : `${p}, ${c}`), '')}
				</td></tr
			>
		{/each}
	</table>

	<table class="eigenschaften">
		<thead>
			<th>Eigenschaften</th>
			<th />
		</thead>
		<tr><td>Konstitution</td><td> {char.eigenschaftenData.Konstitution.current}</td></tr>
		<tr><td>Stärke</td><td> {char.eigenschaftenData.Stärke.current}</td></tr>
		<tr><td>Gewandtheit</td><td> {char.eigenschaftenData.Gewandtheit.current}</td></tr>
		<tr><td>Feinmotorik</td><td> {char.eigenschaftenData.Feinmotorik.current}</td></tr>
		<tr><td>Antipathie</td><td> {char.eigenschaftenData.Antipathie.current}</td></tr>
		<tr><td>Sympathie</td><td> {char.eigenschaftenData.Sympathie.current}</td></tr>
		<tr><td>Klugheit</td><td> {char.eigenschaftenData.Klugheit.current}</td></tr>
		<tr><td>Intuition</td><td> {char.eigenschaftenData.Intuition.current}</td></tr>
		<tr><td>Fokus</td><td> {char.eigenschaftenData.Fokus.current}</td></tr>
		<tr><td>Einfluss</td><td> {char.eigenschaftenData.Einfluss.current}</td></tr>
		<tr><td>Mut</td><td> {char.eigenschaftenData.Mut.current}</td></tr>
		<tr><td>Glück</td><td> {char.eigenschaftenData.Glück.current}</td></tr>
	</table>

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
			<h3 style="break-after: avoid;">{tk}</h3>
			{#if Object.keys(data.talentCategoryMap[tk]).some((t) => (char?.talentEffective[t] ?? 0) > 0 || (char?.talentEffectiveIgnoreRequirements[t] ?? 0) > 0)}
				<table class="talent">
					<thead>
						<th> Name </th>
						<th> TaW </th>
					</thead>
					<tbody>
						{#each Object.keys(data.talentCategoryMap[tk]).sort() as t}
							{#if char.talentEffective[t] > 0 || char.talentEffectiveIgnoreRequirements[t] > 0}
								<tr>
									<td>
										{#if char.talentBase[t] == 0}
											<span class="light"> {t}</span>
										{:else}
											{t}
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
				Keine Erlernten Talente
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
		<div style="grid-column: 1;">
			<Armor {char}></Armor>
		</div>
		<div style="grid-column: 2;"/>
		<div style="grid-column: 3;">
			<h6>Ausdauer & Wunden</h6>
			<Hitman {char} />

			<table class="aussdauer">
				{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as y}
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
	</div>
{:else}
	<p>Loding…</p>
{/if}

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
				top: 0px ;
				width: fit-content;
				padding: 2rem;
				border-bottom-right-radius: 99rem;
			z-index: 999;

			
				background-color: cadetblue;
				border: 1px solid blueviolet;

				a{
					color: #FFF;
					font-family: Verdana, Geneva, Tahoma, sans-serif;
					text-decoration: none;
					transition: all 1000ms;
				}
				a:hover{
					color: #00f;
					font-family: Verdana, Geneva, Tahoma, sans-serif;
					text-decoration: none;
				}


			}
			:root {
				--screen-pages-spacing: 10rem;
				--color-paper:white;
				--background:lightgray;
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
				margin-top:var(--screen-pages-spacing);
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
		width: 50%;
		padding: 8px;

		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
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
		grid-template-columns: 1fr 1fr 205px;
		width: 100%;
	}

	.header {
		break-before: page;
		position: running(titleRunning);
	}
</style>
