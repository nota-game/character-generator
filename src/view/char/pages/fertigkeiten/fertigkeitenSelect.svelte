<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import FertigkeitenControl from './fertigkeitenControl.svelte';

	export let data: Data;
	export let char: Charakter;

	// let pathsData = data.fertigkeitenCategoryMap[category];
</script>

<article>
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
				{#each Object.keys(value.fertigkeiten) as key}
					<FertigkeitenControl {data} {key} {char} {...char.fertigkeiten[key]} useFuture />
				{/each}
			</TabPanel>
		{/each}
	</Tabs>
</article>
