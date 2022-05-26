<script lang="ts">
	import { getText } from '../misc';
	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let data: Data;
	export let char: Charakter;
	export let compact: boolean = false;

	let list: { abbr: string; name: string; value: number }[];

	char?.punkteStore.subscribe((s) => {
		list = Object.entries(s)
			.map((x) => ({ Id: x[0], Store: x[1] }))
			.map((c) => {
				const name = getText(
					data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
						.Name
				);
				const abbr = getText(
					data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
						.Abkürzung
				);
				const value = c.Store;

				const order = data.Instance.Daten.KostenDefinitionen.KostenDefinition.map((x, i) => {
					return { i, Id: x.Id };
				}).filter((x) => x.Id == c.Id)[0].i;
				return { abbr, name, value, order };
			})
			.sort((a, b) => a.order - b.order);
	});
</script>

{#if compact}
	{#if list}
		{#each list as c}
			{#if c.value < 0}
				<span class="missing"><abbr title={c.name}>{c.abbr}</abbr>: {c.value}</span>
			{:else}
				<abbr title={c.name}> {c.abbr}</abbr>:{c.value}
			{/if}
		{/each}
	{/if}
{:else}
	<ul>
		{#if list}
			{#each list as c}
				<li>
					{#if c.value < 0}
						<span class="missing"><abbr title={c.name}>{c.abbr}</abbr>: {c.value}</span>
					{:else}
						<abbr title={c.name}> {c.abbr}</abbr>:{c.value}
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
{/if}
