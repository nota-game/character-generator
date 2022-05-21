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

	let data: Data | undefined;
	let char: Charakter | undefined;

	let charOrganismusStore = char?.organismusStore;
	$: charOrganismusStore = char?.organismusStore;

	onMount(async () => {
		data = await Data.init();
		if (data) {
			char = new Charakter(data);
		}
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if data && char}
	<article class="hover">
		<header>Punkte</header>
		<PointControl {char} {data} />
	</article>

	<main class="container">
		<article>
			<OrganismSelect {char} {data} />
		</article>

		{#if $charOrganismusStore}
			<h1>Eigenschaften</h1>
			<div
				style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; "
			>
				{#each EIGENRSCHAFTEN as e}
					<EigenschaftsControl {char} {data} eigenschaft={e} />
				{/each}
			</div>
			{#each data.Instance.Daten.PfadGruppen.Pfade.map((x) => x.Id) as path}
				<h1>{path}</h1>
				<details>
					<summary>Gewählt</summary>
					<article>
						<PathSelect {char} {data} gruppe={path} />
					</article>
				</details>
			{/each}

			<article>
				<TalentList {char} {data} />
			</article>
			<h1>Fertigkeiten</h1>
			<FertigkeitenList {char} {data} />
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
</style>
