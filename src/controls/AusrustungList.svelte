<script lang="ts">
	import { map, sort } from 'mathjs';

	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { filterObjectKeys, getText, getTextTalent } from 'src/misc/misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import Armor from './armor.svelte';
	import AusrustungElement from './AusrustungElement.svelte';
	import CloseCombatWeapon from './CloseCombatWeapon.svelte';
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

	// import TalentControl from './TalentControl.svelte';

	export let data: Data;
	export let char: Charakter;
	let selected: 'Nahkampf' | 'Fernkampf' | 'Rüstung' = 'Nahkampf';

	const closeConbatWeapons = filterObjectKeys(
		char.equipment,
		(value) => value.type == 'closeCombatWeapon'
	);
	const distanceWeapons = filterObjectKeys(
		char.equipment,
		(value) => value.type == 'longRangeWeapon'
	);
	const armor = filterObjectKeys(char.equipment, (value) => value.type == 'armor');
</script>

{#if data && char}
	<article>
		<Tabs>
			<TabList>
				<Tab>Nahkampf</Tab>
				<Tab>Fernkampf</Tab>
				<Tab>Rüstung</Tab>
			</TabList>

			<TabPanel>
				{#each [...new Set(Object.values(data.nahkampfMap).flatMap((x) => x.Talente?.Talent.map((y) => y.Id) ?? []))].sort( (a, b) => (getText(data?.talentMap[a].Name) < getText(data?.talentMap[b].Name) ? -1 : 1) ) as t}
					<hgroup>
						<h1>{getTextTalent(data.talentMap[t], char, 'Name')}</h1>
						<h2>{getTextTalent(data.talentMap[t], char, 'Probe')}</h2>
					</hgroup>

					{#each Object.keys(data.nahkampfMap).sort() as w}
						{@const item = data?.nahkampfMap[w]}
						{#if item?.Talente?.Talent.map((x) => x.Id).includes(t)}
							<hr />
							<AusrustungElement {...char.equipment[w]} {char} {data} key={w} />
						{/if}
					{/each}
				{/each}
			</TabPanel>
			<TabPanel>
				<h1>Under Construction</h1>
				{#each Object.keys(data.fernkampfMap).sort() as t}
					{@const item = data?.fernkampfMap[t]}
					<hr />
					<AusrustungElement {...char.equipment[t]} {char} {data} key={t} />
				{/each}
			</TabPanel>
			<TabPanel>
				{#each Object.keys(data.RüstungMap).sort() as t}
					{@const item = data?.RüstungMap[t]}
					<hr />
					<AusrustungElement {...char.equipment[t]} {char} {data} key={t} />
				{/each}
			</TabPanel>
		</Tabs>
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
