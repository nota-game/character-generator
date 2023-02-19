<script lang="ts">
	import { getText, sortLocalisable } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import FertigkeitenControl from './fertigkeitenControl.svelte';

	export let data: Data;
	export let char: Charakter;

	let selectedFilter: 'available' | 'purchased' | 'all';
	selectedFilter = 'purchased';
	// let pathsData = data.fertigkeitenCategoryMap[category];
</script>

<article>
	<fieldset class="button-group">
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'available'}
			aria-label="Verfügbar"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'purchased'}
			aria-label="gekauft"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'all'}
			aria-label="Alle"
		/>
	</fieldset>


	<Tabs>
		<TabList>
			{#each Object.entries(data.fertigkeitenCategoryMap) as [key, value]}
				<Tab>
					{getText(value.Name)}
				</Tab>
			{/each}
		</TabList>
		{#each Object.values(data.fertigkeitenCategoryMap) as value}
			<TabPanel>
				{#each sortLocalisable(Object.keys(value.fertigkeiten), x=>data.fertigkeitenMap[x]) as key}
					<FertigkeitenControl {selectedFilter} {data} {key} {char} {...char.fertigkeiten[key]} useFuture />
				{/each}
			</TabPanel>
		{/each}
	</Tabs>
</article>
