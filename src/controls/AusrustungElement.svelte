<script lang="ts">
	import { map, sort } from 'mathjs';

	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { filterObjectKeys, getText, getTextTalent } from 'src/misc/misc';
	import type { Writable } from 'svelte/store';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import Armor from './armor.svelte';
	import CloseCombatWeapon from './CloseCombatWeapon.svelte';
	// import TalentControl from './TalentControl.svelte';

	export let data: Data;
	export let char: Charakter;
	export let key: string;
	export let type: 'armor' | 'longRangeWeapon' | 'closeCombatWeapon' | 'misc';
	export let equiped: Writable<true | undefined>;

	let item =
		type == 'armor'
			? data.RüstungMap[key]
			: type == 'closeCombatWeapon'
			? data.nahkampfMap[key]
			: type == 'longRangeWeapon'
			? data.fernkampfMap[key]
			: undefined;
</script>

<small class="right-handler">
	{#if $equiped}
		<a
			href="#"
			on:click={(e) => {
				e.preventDefault();
				if (char) equiped.set(undefined);
			}}
			class="outline">Entfernen</a
		>
	{:else}
		<a
			href="#"
			on:click={(e) => {
				e.preventDefault();
				if (char) equiped.set(true);
			}}
			class="outline">Hinzufügen</a
		>
	{/if}
</small>

<h3 style="margin-top: 0px;">{getText(item?.Name)}</h3>
{#if type === 'closeCombatWeapon'}
	<CloseCombatWeapon {char} weapon={data.nahkampfMap[key]} />
{:else if type === 'longRangeWeapon'}
	{@const item = data.fernkampfMap[key]}
	<h1>Under Construction</h1>

	{item?.WaffenTyp}
	Nachladezeit {item?.Nachladezeit}
	Magazin {item?.Schusseigenschaften.Magazingröße}
	Schussfrequenz {item?.Schusseigenschaften.Schussfrequenz}
	Offensiv Modifikator {item?.DefensivModifizierer}
	Defensiv Modifikator {item?.OffensivModifizierer}
	Schnittschaden {item?.Schaden.Schnitt?.Schaden}
	Wuchtschaden {item?.Schaden.Wucht?.Schaden}

	Reichweiten {item?.Reichweiten.Reichweite}
{:else if type === 'armor'}
	<div style="float: left;">
		<Armor lanes={1} input={item?.Id} {data} />
	</div>
{/if}

{getText(item?.Beschreibung)}

{#each item?.Eigenschaften?.Eigenschaft.map((x) => data?.AusrüstungsEigenschaftMap[x.Id]) ?? [] as e}
	<h4>{getText(e?.Name)}</h4>
	{getText(e?.Beschreibung)}
{/each}
<div style="clear: left;" />

<style lang="scss">
	hr {
		margin-top: 4rem;
	}
	header {
		input {
			display: none;
			&:checked + label {
				color: var(--primary);
			}
		}
		label {
			display: inline;
		}
	}

	.right-handler {
		float: right;
		text-align: right;
	}
</style>
