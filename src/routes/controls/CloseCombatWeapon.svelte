<script lang="ts">
	import { sort } from 'mathjs';

	import type { _Nahkampfwaffe } from 'src/data/nota.g';
	import { getText, getTextTalent } from '../misc';
	import type { Charakter } from '../models/Character';
	import Schnitt from './icons/Schnitt.svelte';
	import Wucht from './icons/Wucht.svelte';

	export let weapon: _Nahkampfwaffe | undefined;
	export let char: Charakter | undefined;

	function render(n: number | undefined) {
		if (n == undefined) {
			return '';
		}
		if (n == 0) {
			return '';
		}
		return n.toString();
	}
</script>

<table>
	<tr>
		<td>{weapon?.Id}</td>
		<td class="one ">
			<div class=" center">
				<div><Schnitt size={18} stroke="var(--color)" fill="var(--muted-color)" /></div>
				<div>
					{render(weapon?.Schaden.Schnitt?.Schaden)}
				</div>
			</div>
		</td>
		<td class="one ">
			<div class=" center">
				<div><Wucht size={18} stroke="var(--color)" fill="var(--muted-color)" /></div>
				<div>
					{render(weapon?.Schaden.Wucht?.Schaden)}
				</div>
			</div>
		</td>
		<td class="last">
			<div class=" center">
				{#if weapon?.WaffenTyp != 'Defensiv'}
					<div>Offentiv</div>
				{:else}
					<div style="text-decoration: line-through; text-decoration-color: black;">Offentiv</div>
				{/if}
				<div>
					{render(weapon?.OffensivModifizierer)}
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td style="font-size:smaller;" colspan="2">
			{#if weapon?.Eigenschaften?.Eigenschaft}
				<ul class="list">
					{#each weapon?.Eigenschaften?.Eigenschaft as t}
						<li>{getText(char?.stammdaten.AusrüstungsEigenschaftMap[t.Id].Name)}</li>{/each}
				</ul>
			{/if}
		</td>
		<td class="one ">
			<div class="center">
				<div>DK</div>
				<div>
					{render(weapon?.Distanzklasse)}
				</div>
			</div>
		</td>
		<td class="last">
			<div class=" center">
				{#if weapon?.WaffenTyp != 'Offensiv'}
					<div>Defensiv</div>
				{:else}
					<div style="text-decoration: line-through; text-decoration-color: black;">Defensiv</div>
				{/if}
				<div>
					{render(weapon?.DefensivModifizierer)}
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td style="font-size:smaller ;" colspan="4">
			{#if weapon?.Talente?.Talent}
				<ul class="list">
					{#each weapon?.Talente?.Talent.sort((a, b) => (char?.talentEffective[b.Id] ?? 0) - (char?.talentEffective[a.Id] ?? 0)) as t}
						<li>
							{getTextTalent(char?.stammdaten.talentMap[t.Id])}
							<strong style="font-size: small;">{char?.talentEffective[t.Id]}</strong>
						</li>
					{/each}
				</ul>
			{/if}
		</td>
	</tr>
</table>

<style lang="scss">
	.center {
		position: relative;
		display: grid;
		align-items: center;
		justify-items: center;
		overflow: hidden;
		height: 100%;
	}
	.center > * {
		grid-column: 1;
		grid-row: 1;
	}
	.center > *:first-child {
		z-index: 1;
		opacity: 0.6;
		color: var(--muted-color);
		font-size: smaller;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-shadow: -1px -1px 0 var(--color), 1px -1px 0 var(--color), -1px 1px 0 var(--color),
			1px 1px 0 var(--color);
	}
	.center > *:not(:first-child) {
		z-index: 2;
		font-size: x-large;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-shadow: -1px -1px 0 var(--background-color), 1px -1px 0 var(--background-color),
			-1px 1px 0 var(--background-color), 1px 1px 0 var(--background-color);
	}
	table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;
	}
	tr {
		height: 8mm;
	}
	td.one {
		width: 8mm;
	}
	td.last {
		width: 60px;
	}
	table,
	tr,
	td {
		padding: 1px;
		border: 1px solid var(--color);
	}
	ul.list {
		margin-block-start: 0px;
		margin-block-end: 0.2rem;

		padding-inline-start: 0px;
		&:empty {
			display: none;
		}
		li {
			display: inline;
		}
		li:not(:first-child)::before {
			content: ', ';
		}
	}
</style>
