<script lang="ts">
	import { onMount } from 'svelte';
	import { Data } from './models/Data';
	import { Charakter, EIGENRSCHAFTEN } from './models/Character';
	import PointControl from './controls/PointControl.svelte';
	import OrganismSelect from './controls/OrganismSelect.svelte';
	import EigenschaftsControl from './controls/EigenschaftsControl.svelte';
	import PathSelect from './controls/path/PathSelect.svelte';

	import {} from '@picocss/pico/css/pico.css';
	import TalentList from './controls/TalentList.svelte';
	import FertigkeitenList from './controls/FertigkeitenList.svelte';
	import BesonderheitenList from './controls/BesonderheitenList.svelte';
	import PfadList from './controls/PfadList.svelte';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let charOrganismusStore = char?.organismusStore;
	$: charOrganismusStore = char?.organismusStore;

	let selection: string = 'Gattung/Art';

	onMount(async () => {
		data = await Data.init();
		if (data) {
			char = new Charakter(data);
		}
	});
</script>

{#if data && char}
	<nav>
		<ul>
			<li></li>
		</ul>
		<ul>
			<li>
				<input
					id="Gattung/ArtSelecs"
					type="radio"
					name="top"
					value="Gattung/Art"
					bind:group={selection}
				/>
				<label for="Gattung/ArtSelecs">Gattung/Art </label>
			</li>
			{#if $charOrganismusStore}
				<li>
					<input
						id="EigenschaftenSelecs"
						type="radio"
						name="top"
						value="Eigenschaften"
						bind:group={selection}
					/>
					<label for="EigenschaftenSelecs">Eigenschaften </label>
				</li>
				<li>
					<input id="PfadeSelecs" type="radio" name="top" value="Pfade" bind:group={selection} />
					<label for="PfadeSelecs">Pfade </label>
				</li>
				<li>
					<input
						id="TalenteSelecs"
						type="radio"
						name="top"
						value="Talente"
						bind:group={selection}
					/>
					<label for="TalenteSelecs">Talente </label>
				</li>
				<li>
					<input
						id="FertigkeitenSelecs"
						type="radio"
						name="top"
						value="Fertigkeiten"
						bind:group={selection}
					/>
					<label for="FertigkeitenSelecs">Fertigkeiten </label>
				</li>
				<li>
					<input
						id="BesonderheitenSelecs"
						type="radio"
						name="top"
						value="Besonderheiten"
						bind:group={selection}
					/>
					<label for="BesonderheitenSelecs">Besonderheiten </label>
				</li>
			{/if}
		</ul>
		<ul>
			<li />
		</ul>
	</nav>

	<article class="hover">
		<header>Punkte</header>
		<PointControl {char} {data} />
	</article>

	<main class="container">
		{#if selection == 'Gattung/Art'}
			<article>
				<OrganismSelect {char} {data} />
			</article>
		{/if}
		{#if $charOrganismusStore}
			{#if selection == 'Eigenschaften'}
				<div
					style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; "
				>
					{#each EIGENRSCHAFTEN as e}
						<EigenschaftsControl {char} {data} eigenschaft={e} />
					{/each}
				</div>
			{:else if selection == 'Pfade'}
				<PfadList {char} {data} />
			{:else if selection == 'Talente'}
				<TalentList {char} {data} />
			{:else if selection == 'Fertigkeiten'}
				<FertigkeitenList {char} {data} />
			{:else if selection == 'Besonderheiten'}
				<BesonderheitenList {char} {data} />
			{/if}
		{/if}
	</main>
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
	}
	.hover {
		width: 10rem;
		position: fixed;
		right: 50px;
		top: 5px;
		//float: right;
	}

	input {
		display: none;
		&:checked + label {
			color: var(--primary);
		}
	}
	label {
		display: inline;
	}
</style>
