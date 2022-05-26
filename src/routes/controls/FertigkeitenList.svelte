<script lang="ts">
	import type { TalentDefinition_talent } from 'src/data/nota.g';
	import { onMount } from 'svelte';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import FertigeitenControl from './FertigeitenControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;

	let selected = Object.keys(data?.fertigkeitenCategoryMap ?? {})[0];
</script>

{#if data && char}
	<article>
		<header>
			{#each Object.keys(data.fertigkeitenCategoryMap) as key}
				<input id={key + 'fertigkeit'} type="radio" bind:group={selected} value={key} />
				<label for={key + 'fertigkeit'}>{key} </label>
			{/each}
		</header>

		{#each Object.keys(data.fertigkeitenCategoryMap) as key}
			{#if key === selected}
				{#each Object.keys(data.fertigkeitenCategoryMap[key]).sort() as t}
					<FertigeitenControl {char} {data} fertigkeit={data.fertigkeitenMap[t]} showTaken={true} />
				{/each}
				<hr />
				<details>
					<summary>Nicht gekauft</summary>
					{#each Object.keys(data.fertigkeitenCategoryMap[key]).sort() as t}
						<FertigeitenControl
							{char}
							{data}
							fertigkeit={data.fertigkeitenMap[t]}
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
