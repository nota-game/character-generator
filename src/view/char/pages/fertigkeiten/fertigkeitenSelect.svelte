<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';
	import Fertigkeit from 'src/view/root/fertigkeit.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

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
					<Fertigkeit {data} {key} {char} {...char.fertigkeiten[key]} useFuture />
				{/each}
			</TabPanel>
		{/each}
	</Tabs>
</article>
