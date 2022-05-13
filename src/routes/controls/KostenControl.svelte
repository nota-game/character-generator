<script lang="ts">
	import type { Kosten, _Kosten } from 'src/data/nota.g';
	import { element } from 'svelte/internal';
	import { get, type Readable } from 'svelte/store';
	import { getText } from '../misc';
	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let cost: _Kosten[];
	export let replaceCost: _Kosten[] | Readable<_Kosten[] | undefined> | undefined = undefined;
	export let data: Data;
	export let char: Charakter | undefined = undefined;
	export let paid: boolean | Readable<boolean> = false;

	let list: { abbr: string; name: string; value: number; missing: number | undefined }[];
	let p: boolean = typeof paid === 'boolean' ? paid : get(paid);
	let rc: _Kosten[];

	if (typeof replaceCost === 'undefined' || Array.isArray(replaceCost)) {
		rc = replaceCost ?? [];
	} else {
		rc = get(replaceCost) ?? [];
		replaceCost.subscribe((x) => (rc = x ?? []));
	}

	if (typeof paid === 'boolean') {
		p = paid;
	} else {
		p = get(paid);
		paid.subscribe((x) => (p = x));
	}

	$: list = calculate(cost, data, char ? get(char.punkte) : undefined, p);
	if (char)
		char.punkte.subscribe((s) => {
			list = calculate(cost, data, s, p);
		});

	function calculate(
		cost: _Kosten[],
		data: Data,
		punkte: Record<string, number> | undefined = undefined,
		paid: boolean = false
	): { abbr: string; name: string; value: number; missing: number | undefined }[] {
		return cost
			.map((c) => {
				const name = getText(
					data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
						.Name
				);
				const abbr = getText(
					data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
						.Abkürzung
				);
				const value = c.Wert - (rc.filter((x) => x.Id == c.Id)[0]?.Wert ?? 0);
				const missing = punkte
					? paid
						? Math.max(0, (punkte[c.Id] ?? 0) + c.Wert)
						: Math.max(0, c.Wert - punkte[c.Id] ?? 0)
					: 0;
				const order = data.Instance.Daten.KostenDefinitionen.KostenDefinition.map((x, i) => {
					return { i, Id: x.Id };
				}).filter((x) => x.Id == c.Id)[0].i;
				return { abbr, name, value, missing, order };
			})
			.sort((a, b) => a.order - b.order);
	}
</script>

<ul>
	{#each list as c}
		<li>
			{#if c.missing}
				<span class="missing"
					><abbr title={c.name}>{c.abbr}</abbr>: {c.value < 0 ? '+' : ''}{-c.value} (-{c.missing})</span
				>
			{:else}
				<abbr title={c.name}> {c.abbr}</abbr>: {c.value < 0 ? '+' : ''}{-c.value}
			{/if}
		</li>
	{/each}
</ul>
