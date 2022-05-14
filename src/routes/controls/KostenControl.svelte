<script lang="ts">
	import type { Kosten, _Kosten } from 'src/data/nota.g';
	import { element } from 'svelte/internal';
	import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
	import { getText } from '../misc';
	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let cost: _Kosten[] | Readable<_Kosten[] | undefined>;
	export let replaceCost: _Kosten[] | Readable<_Kosten[] | undefined> | undefined = undefined;
	export let data: Data;
	export let char: Charakter | undefined = undefined;
	export let paid: boolean | Readable<boolean> = false;

	function toStore<T>(t: T | Readable<T>): Readable<T> {
		if (t !== undefined && typeof (t as any).subscribe === 'function') {
			return t as any;
		}

		return writable(t as any);
	}

	const list = derived(
		[toStore(cost), toStore(replaceCost), toStore(paid), toStore(char?.punkteStore)],
		([cc, rc, p, ps]) => {
			if (!cc) return [];
			return cc
				.map((c) => {
					const name = getText(
						data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
							.Name
					);
					const abbr = getText(
						data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
							.Abkürzung
					);
					const value = c.Wert - (rc?.filter((x) => x.Id == c.Id)[0]?.Wert ?? 0);
					let missing = ps
						? paid
							? Math.max(0, (ps[c.Id] ?? 0) + c.Wert)
							: Math.max(0, c.Wert - ps[c.Id] ?? 0)
						: 0;

					if (missing > 0 && ps![c.Id] < 0 && missing < -ps![c.Id]) {
						missing = 0;
					}

					const order = data.Instance.Daten.KostenDefinitionen.KostenDefinition.map((x, i) => {
						return { i, Id: x.Id };
					}).filter((x) => x.Id == c.Id)[0].i;
					return { abbr, name, value, missing, order };
				})
				.sort((a, b) => a.order - b.order);
		}
	);

	//let list: { abbr: string; name: string; value: number; missing: number | undefined }[];
</script>

<ul>
	{#each $list as c}
		<li>
			{#if c.missing}
				<span class="missing"
					><abbr title={c.name}>{c.abbr}</abbr>: {c.value < 0 ? '+' : '-'}{Math.abs(c.value)} (-{c.missing})</span
				>
			{:else}
				<abbr title={c.name}> {c.abbr}</abbr>: {c.value < 0 ? '+' : '-'}{Math.abs(c.value)}
			{/if}
		</li>
	{/each}
</ul>
