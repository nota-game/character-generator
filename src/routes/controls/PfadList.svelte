<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { onMount } from 'svelte';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import FertigeitenControl from './FertigeitenControl.svelte';
import PfadControl from './PfadControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	let selected = Object.keys(data?.pfadCategoryMap ?? {})[0];
</script>

{#if data && char}
	<article>
		<header>
			{#each Object.keys(data.pfadCategoryMap) as key}
				<input id={key + 'pfad'} type="radio" bind:group={selected} value={key} />
				<label for={key + 'pfad'}>{key} </label>
			{/each}
		</header>

		{#each Object.keys(data.pfadCategoryMap) as key}
			{#if key === selected}
				{#each Object.keys(data.pfadCategoryMap[key]).sort() as t}
					<PfadControl {char} {data} pfad={data.pfadMap[t]} gruppeId={key} showTaken={true} />
				{/each}
				<hr />
				<details>
					<summary>Nicht gekauft</summary>
					{#each Object.keys(data.pfadCategoryMap[key]).sort() as t}
						<PfadControl
							{char}
							{data}
							gruppeId={key}
							pfad={data.pfadMap[t]}
							showTaken={false}
						/>
					{/each}
				</details>
			{/if}
		{/each}
	</article>
{/if}

<style lang="scss">
	hr {
		margin-top: 2rem;
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
