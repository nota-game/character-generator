<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';
	import Fertigkeit from 'src/view/root/fertigkeit.svelte';
	import Talent from 'src/view/root/talent.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import TalentControl from './talentControl.svelte';

	export let data: Data;
	export let char: Charakter;

	// let pathsData = data.fertigkeitenCategoryMap[category];
</script>

<article>
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

                    {#each Object.keys(value.talente) as key}
					<TalentControl {data} {key} {char} {...char.talente[key]} />
                    {/each}
                </table>
			</TabPanel>
		{/each}
	</Tabs>
</article>
