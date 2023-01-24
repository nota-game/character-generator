<script lang="ts">
	import type { KostenDefinition_misc } from 'src/data/nota.g';
	import { element } from 'svelte/internal';
	import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
	import { getText } from 'src/misc/misc';
	import type { Charakter, Cost } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import { mod } from 'mathjs';
	import { redirect } from '@sveltejs/kit';

	// export let cost: KostenDefinition_misc[] | Readable<KostenDefinition_misc[] | undefined>;

	export let data: Data;
	export let char: Charakter | undefined = undefined;

	export let cost: Cost | undefined = undefined;

	export let mode: 'cost' | 'none' | 'points' = 'none';
	export let showZeroValues = false;

	export let inline: boolean = false;
	export let showOnlyHighCost: boolean = false;

	export let alwaysShow: string | string[] = [];

	let pointStore = char?.pointStore;

	$: effectivePoints = { ...(mode == 'points' ? cost ?? $pointStore ?? {} : cost ?? {}) };
	$: {
		const toAdd = Array.isArray(alwaysShow) ? alwaysShow : [alwaysShow];
		for (const a of toAdd) {
			if (effectivePoints[a] === undefined) {
				effectivePoints[a] = 0;
			}
		}
	}

	function isKostToHigh(key: string) {
		if (mode == 'none') {
			return false;
		}

		const def = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter(
			(x) => x.Id == key
		)[0];

		if (mode == 'points') {
			const start = effectivePoints?.[key] ?? 0;

			if (def.type == 'epual zero') {
				return start != 0;
			} else if (def.type == 'below zero') {
				return start > 0;
			} else if (def.type == 'over zero') {
				return start < 0;
			}
			return false;
		}
		if (effectivePoints == undefined) {
			console.log('pointstore was undefinde');
			return false;
		}
		const start = $pointStore?.[key] ?? 0;

		const after = start - (cost?.[key] ?? 0);

		if (def === undefined) {
			return false;
		}
		if (def.type == 'epual zero') {
			return Math.abs(after) > Math.abs(start);
		} else if (def.type == 'below zero') {
			return after > 0 && after > start;
		} else if (def.type == 'over zero') {
			return after < 0 && after < start;
		}
		return false;
	}

	function renderValue(value: number) {
		if (mode == 'points' || mode == 'none') {
			return `${value >= 0 ? '' : '-'}${Math.abs(value)}`;
		} else {
			return `${value <= 0 ? '+' : '-'}${Math.abs(value)}`;
		}
	}
</script>

{#each Object.entries(effectivePoints) as [key, value]}
	{@const c = data.Instance.Daten.KostenDefinitionen.KostenDefinition.filter((x) => x.Id == key)[0]}

	{#if c}
		{#if showZeroValues || (value != 0 && !showOnlyHighCost) || isKostToHigh(key)}
			<span class:missing={isKostToHigh(key)}>
				<abbr title={getText(c.Name)}> {getText(c.Abkürzung)}</abbr>: {renderValue(value)}
			</span>
		{/if}
	{:else}
		{key} missing in definition?
		{JSON.stringify(data.Instance.Daten.KostenDefinitionen.KostenDefinition.map((x) => x.Id))}
	{/if}
{/each}
