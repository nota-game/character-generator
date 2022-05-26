<script lang="ts">
	import { sort } from 'mathjs';

	import type { TalentDefinition_talent } from 'src/data/nota.g';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';
	import TalentControl from './TalentControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	let selected = Object.keys(data?.talentCategoryMap ?? {})[0];
</script>

{#if data && char}
	<article>
		<header>
			{#each Object.keys(data.talentCategoryMap) as key}
				<input id={key} type="radio" bind:group={selected} value={key} />
				<label for={key}>{key} </label>
			{/each}
		</header>

		{#each Object.keys(data.talentCategoryMap) as key}
			{#if key === selected}
				{#each Object.keys(data.talentCategoryMap[key]).sort() as t}
					<TalentControl {char} {data} talent={data.talentMap[t]} showTaken={true} />
				{/each}
				<hr>
				<details>
					<summary>Nicht gekauft</summary>
					{#each Object.keys(data.talentCategoryMap[key]).sort() as t}
						<TalentControl {char} {data} talent={data.talentMap[t]} showTaken={false} />
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
