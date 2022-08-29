<script lang="ts">
	import type { KostenDefinition_misc } from 'src/data/nota.g';
	import { element } from 'svelte/internal';
	import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
	import { getText } from '../misc';
	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let cost: KostenDefinition_misc[] | Readable<KostenDefinition_misc[] | undefined>;
	export let replaceCost:
		| KostenDefinition_misc[]
		| Readable<KostenDefinition_misc[] | undefined>
		| undefined = undefined;
	export let data: Data;
	export let char: Charakter | undefined = undefined;
	export let paid: boolean | Readable<boolean> = false;
	export let oneLine: boolean = false;
	export let onlyNegatve: boolean = false;

	function toStore<T>(t: T | Readable<T>): Readable<T> {
		if (t !== undefined && typeof (t as any).subscribe === 'function') {
			return t as any;
		}

		return writable(t as any);
	}

	let list: Readable<
		{
			abbr: string;
			name: string;
			value: number;
			missing: number;
			order: number;
			toExpensiv: boolean;
		}[]
	>;
	$: list = derived(
		[toStore(cost), toStore(replaceCost), toStore(paid), toStore(char?.punkteStore)],
		([cc, rc, p, ps]) => {
			if (!cc) return [];
			return Object.entries(
				cc.reduce((p, c) => {
					if (p[c.Id]) {
						p[c.Id] += c.Wert;
					} else {
						p[c.Id] = c.Wert;
					}
					return p;
				}, {} as Record<string, number>)
			)
				.map(([Id, Wert]) => ({ Id, Wert }))
				.map((c) => {
					const name = getText(
						data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
							.Name
					);
					const abbr = getText(
						data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == c.Id)[0]
							.Abkürzung
					);
					const type = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(
						(x) => x.Id == c.Id
					)[0].type;
					const red =
						rc
							?.filter((x) => x.Id == c.Id)
							.map((y) => y.Wert)
							.reduce((p, c) => p + c, 0) ?? 0;

					const value = red != 0 ? c.Wert - red : p ? -c.Wert : c.Wert;
					let missing = ps ? value - ps[c.Id] ?? 0 : 0;

					// let toExpensiv = missing != 0;
					let toExpensiv =
						type == 'below zero' ? missing < 0 : type == 'epual zero' ? missing != 0 : missing > 0;

					if (type == 'over zero') {
						if(missing < 0){
							missing = 0;
						}
						if (missing > 0 && ps![c.Id] < 0 && missing < -ps![c.Id]) {
							missing = 0;
							toExpensiv = false;
						}
					} else if (type == 'below zero') {
						if(missing > 0){
							missing = 0;
						}
						if (missing < 0 && ps![c.Id] > 0 && missing > -ps![c.Id]) {
							missing = 0;
							toExpensiv = false;
						}
					} else {
						if (missing < 0 && ps![c.Id] > 0 && missing > -ps![c.Id]) {
							missing = 0;
							toExpensiv = false;
						}
						if (missing > 0 && ps![c.Id] < 0 && missing < -ps![c.Id]) {
							missing = 0;
							toExpensiv = false;
						}
					}

					console.log("temp", {missing, toExpensiv,type})

					const order = data.Instance.Daten.KostenDefinitionen.KostenDefinition.map((x, i) => {
						return { i, Id: x.Id };
					}).filter((x) => x.Id == c.Id)[0].i;
					return { abbr, name, value, missing, order, toExpensiv };
				})
				.filter((x) => (onlyNegatve ? x.value < 0 : x.value != 0))
				.sort((a, b) => a.order - b.order);
		}
	);

	export let isToexpensiv: Readable<boolean> = derived(list, (l) => {
		return l.some((x) => x.toExpensiv);
	});
	$: isToexpensiv = derived(list, (l) => {
		return l.some((x) => x.toExpensiv);
	});

	//let list: { abbr: string; name: string; value: number; missing: number | undefined }[];
</script>

{#each $list as c}
	{#if oneLine}
		{#if c.missing}
			<span class="missing"
				><abbr title={c.name}>{c.abbr}</abbr>: {c.value <= 0 ? '+' : '-'}{Math.abs(c.value)} ({c.missing <= 0 ? '+' : '-'}{Math.abs(c.missing)})</span
			>
		{:else}
			<abbr title={c.name}> {c.abbr}</abbr>: {c.value <= 0 ? '+' : '-'}{Math.abs(c.value)}
		{/if}
	{:else}
		<div>
			{#if c.missing}
				<span class="missing"
					><abbr title={c.name}>{c.abbr}</abbr>: {c.value <= 0 ? '+' : '-'}{Math.abs(c.value)} ({c.missing <= 0 ? '+' : '-'}{Math.abs(c.missing)})</span
				>
			{:else}
				<abbr title={c.name}> {c.abbr}</abbr>: {c.value <= 0 ? '+' : '-'}{Math.abs(c.value)}
			{/if}
		</div>
	{/if}
{/each}
