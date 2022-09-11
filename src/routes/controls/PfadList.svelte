<script lang="ts">
	import { xgcd } from 'mathjs';
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { onMount } from 'svelte';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import FertigeitenControl from './FertigeitenControl.svelte';
	import PfadControl from './PfadControl.svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import { getText } from '../misc';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	let selected = Object.keys(data?.pfadCategoryMap ?? {})[0];

	let anyBought = false;
	let pfadeStore = char?.pfadLevelStore;
	$: pfade = $pfadeStore;
	let defaultPfadeStore = char?.defaultPathStore;
	$: defaultPfade = $defaultPfadeStore ?? [];

	$: {
		anyBought = Object.values(pfade?.[selected] ?? {}).some((x) =>
			Object.values(x).some((y) => y > 0)
		);
	}
</script>

{#if data && char}
	<article>
		<header>
			{#each Object.keys(data.pfadCategoryMap) as key}
				<input id={key + 'pfad'} type="radio" bind:group={selected} value={key} />
				<label for={key + 'pfad'}>{getText(data.pfadCategoryMap[key].Name)} </label>
			{/each}
		</header>

		{#each Object.keys(data.pfadCategoryMap) as key}
			{#if key === selected}
				{#if !anyBought}
					<p>Wählen Sie ein Packet</p>
					{#each Object.keys(data.pfadCategoryMap[key])
						.filter((x) => defaultPfade.includes(x))
						.sort() as t}
						<PfadControl {char} {data} gruppeId={key} pfad={data.pfadMap[t]} showTaken={false} />
					{/each}
					<hr />
					<h2>Ungewöhliche Pfade</h2>
					{#each Object.keys(data.pfadCategoryMap[key])
						.filter((x) => !defaultPfade.includes(x))
						.sort() as t}
						<PfadControl {char} {data} gruppeId={key} pfad={data.pfadMap[t]} showTaken={false} />
					{/each}
				{:else}
					{#each Object.keys(data.pfadCategoryMap[key]).sort() as t}
						<PfadControl {char} {data} pfad={data.pfadMap[t]} gruppeId={key} showTaken={true} />
					{/each}
					<hr />
					<details open={!anyBought}>
						<summary>Nicht gekauft</summary>
						{#each Object.keys(data.pfadCategoryMap[key]).sort() as t}
							<PfadControl {char} {data} gruppeId={key} pfad={data.pfadMap[t]} showTaken={false} />
						{/each}
					</details>
				{/if}
			{/if}
		{/each}
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
</style>
