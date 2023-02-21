<script lang="ts">
	import { getText, sortLocalisable } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import TalentControl from './talentControl.svelte';

	export let data: Data;
	export let char: Charakter;

	let selectedFilter: 'support or purchased' | 'purchased' | 'all';
	selectedFilter = 'support or purchased';

	// let pathsData = data.fertigkeitenCategoryMap[category];
</script>

<article>
	<fieldset class="button-group">
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'support or purchased'}
			aria-label="Aktiv"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={selectedFilter}
			value={'purchased'}
			aria-label="Gekauft"
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
			{#each Object.entries(data.talentCategoryMap) as [key, value]}
				<Tab>
					{getText(value.Name)}
				</Tab>
			{/each}
		</TabList>
		{#each Object.values(data.talentCategoryMap) as value}
			<TabPanel>
				<table>
					{#each sortLocalisable(Object.keys(value.talente), (x) => data.talentMap[x]) as key}
						<TalentControl {selectedFilter} {data} {key} {char} {...char.talente[key]} />
					{/each}
				</table>
			</TabPanel>
		{/each}
	</Tabs>
</article>
