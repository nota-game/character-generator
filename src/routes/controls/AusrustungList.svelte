<script lang="ts">
	import { sort } from 'mathjs';

	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { getText, getTextTalent } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import TalentControl from './TalentControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	let selected: 'Nahkampf' | 'Fernkampf' | 'Rüstung' = 'Nahkampf';

	const closeConbatWeapons = char?.closeConbatWeaponsStore;
	const distanceWeapons = char?.distanceWeaponsStore;
	const armor = char?.armorStore;

</script>

{#if data && char}
	<article>
		<header>
			<input id="au1" type="radio" bind:group={selected} value="Nahkampf" />
			<label for="au1">Nahkampf </label>
			<input id="au2" type="radio" bind:group={selected} value="Fernkampf" />
			<label for="au2">Fernkampf </label>
			<input id="au3" type="radio" bind:group={selected} value="Rüstung" />
			<label for="au3">Rüstung </label>
		</header>

		{#if selected === 'Nahkampf'}
			{#each Object.keys(data.nahkampfMap).sort() as t}
				{@const item = data?.nahkampfMap[t]}
				<small class="right-handler">
					{#if $closeConbatWeapons?.[t]}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setCloseConbatWeapons(t,false);
							}}
							class="outline">Entfernen</a
						>
					{:else}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setCloseConbatWeapons(t,true);
								
							}}
							class="outline">Hinzufügen</a
						>
					{/if}
				</small>
				<hgroup>
					<h1>{getText(item?.Name)}</h1>
					<h2>
						{#each item?.Talente?.Talent ?? [] as e}
							{getTextTalent(data.talentMap[e.Id])}
						{/each}
					</h2>
				</hgroup>
				{item?.WaffenTyp}
				Distanzklasse {item?.Distanzklasse}
				Offensiv Modifikator {item?.DefensivModifizierer}
				Defensiv Modifikator {item?.OffensivModifizierer}
				Schnittschaden {item?.Schaden.Schnitt?.Schaden}
				Wuchtschaden {item?.Schaden.Wucht?.Schaden}

				{#each item?.Eigenschaften?.Eigenschaft ?? [] as e}
					{getText(data.AusrüstungsEigenschaftMap[e.Id].Name)}
				{/each}
				{getText(item?.Beschreibung)}
			{/each}
			{:else if selected === 'Fernkampf'}
			{#each Object.keys(data.fernkampfMap).sort() as t}
				{@const item = data?.fernkampfMap[t]}
				<small class="right-handler">
					{#if $distanceWeapons?.[t]}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setDistanceWeapons(t,false);
							}}
							class="outline">Entfernen</a
						>
					{:else}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setDistanceWeapons(t,true);
								
							}}
							class="outline">Hinzufügen</a
						>
					{/if}
				</small>
				<hgroup>
					<h1>{getText(item?.Name)}</h1>
					<h2>
						{#each item?.Talente?.Talent ?? [] as e}
							{getTextTalent(data.talentMap[e.Id])}
						{/each}
					</h2>
				</hgroup>
				{item?.WaffenTyp}
				Nachladezeit {item?.Nachladezeit}
				Magazin {item?.Schusseigenschaften.Magazingröße}
				Schussfrequenz {item?.Schusseigenschaften.Schussfrequenz}
				Offensiv Modifikator {item?.DefensivModifizierer}
				Defensiv Modifikator {item?.OffensivModifizierer}
				Schnittschaden {item?.Schaden.Schnitt?.Schaden}
				Wuchtschaden {item?.Schaden.Wucht?.Schaden}

				Reichweiten  {item?.Reichweiten.Reichweite}

				{#each item?.Eigenschaften?.Eigenschaft ?? [] as e}
					{getText(data.AusrüstungsEigenschaftMap[e.Id].Name)}
				{/each}
				{getText(item?.Beschreibung)}
			{/each}
			{:else if selected === 'Rüstung'}
			{#each Object.keys(data.RüstungMap).sort() as t}
				{@const item = data?.RüstungMap[t]}
				<small class="right-handler">
					{#if $armor?.[t]}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setArmor(t,false);
							}}
							class="outline">Entfernen</a
						>
					{:else}
						<a
							href="#"
							on:click={(e) => {
								e.preventDefault();
								if (char) char.setArmor(t,true);
								
							}}
							class="outline">Hinzufügen</a
						>
					{/if}
				</small>
					<h1>{getText(item?.Name)}</h1>
				
				Erschwernis {item?.Erschwernis}
				Dämpfung {item?.Schutz.Dämpfung}
				Flexibilität {item?.Schutz.Flexibilität}
				Härte {item?.Schutz.Härte}
				Trefferzonen {item?.Trefferzonen}

				{#each item?.Eigenschaften?.Eigenschaft ?? [] as e}
					{getText(data.AusrüstungsEigenschaftMap[e.Id].Name)}
				{/each}
				{getText(item?.Beschreibung)}
			{/each}
		{/if}
	</article>
{/if}

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
