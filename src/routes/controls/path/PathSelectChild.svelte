<script lang="ts">
	import { i } from 'mathjs';

	import type { _Art, _Gattung, _Lebensabschnitt, _Morph } from 'src/data/nota.g';
	import { onMount } from 'svelte';
	import { noop, onDestroy, prevent_default } from 'svelte/internal';
	import { derived, writable, type Readable } from 'svelte/store';
	import type { choise } from 'xsd-ts/dist/xsd';

	import { distinct, getText, getTextBesonderheit, getTextFertigkeit } from './../../misc';
	import { Charakter } from './../../models/Character';
	import type { Data } from './../../models/Data';
	import KostenControl from './../KostenControl.svelte';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let path: string | undefined;
	export let gruppe: string | undefined;
	export let lvl: string | undefined;
	let can = false;
	let has = false;
	let fin = noop;
	let fin2 = noop;
	onMount(() => {
		if (!char || !gruppe || !path || !lvl) return;
		fin = char.canPathChoosenStore(gruppe, path, lvl).subscribe((x) => {
			can = x;
		});
		fin = char.canPathUnChoosenStore(gruppe, path, lvl).subscribe((x) => {
			has = x;
		});
	});

	const level = char?.pathChoosenTimesStore(gruppe ?? '', path ?? '', lvl ?? '');

	let charDataStor = char?.DataStore;
	let copyHas: Charakter | undefined;
	let copyCan: Charakter | undefined;
	$: {
		if (char && data && charDataStor && $charDataStor && (has || can)) {
			const copyData = JSON.stringify({ ...$charDataStor, id: '0' });

			if (has) {
				copyHas = new Charakter(data, JSON.parse(copyData));
				copyHas.removePath(gruppe ?? '', path ?? '', lvl ?? '');
			} else {
				copyHas = undefined;
			}
			if (can) {
				copyCan = new Charakter(data, JSON.parse(copyData));
				copyCan.addPath(gruppe ?? '', path ?? '', lvl ?? '');
			} else {
				copyCan = undefined;
			}
		} else {
			copyHas = undefined;
			copyCan = undefined;
		}
	}

	let changedTalentsCan:
		| {
				key: string;
				new: number;
				old: number;
				newEp: number;
				oldEp: number;
		  }[]
		| undefined;
	let changedTalentsHas:
		| {
				key: string;
				new: number;
				old: number;
				newEp: number;
				oldEp: number;
		  }[]
		| undefined;
	let changedFertigkeitenCan:
		| {
				key: string;
				new: number;
				old: number;
				newIgnored: number;
				oldIgnored: number;
		  }[]
		| undefined;
	let changedFertigkeitenHas:
		| {
				key: string;
				new: number;
				old: number;
				newIgnored: number;
				oldIgnored: number;
		  }[]
		| undefined;
	let changedBestonderheitenCan:
		| {
				key: string;
				new: number;
				old: number;
				newIgnored: number;
				oldIgnored: number;
		  }[]
		| undefined;
	let changedBestonderheitenHas:
		| {
				key: string;
				new: number;
				old: number;
				newIgnored: number;
				oldIgnored: number;
		  }[]
		| undefined;

	$: {
		if (copyCan && char) {
			const current = copyCan;
			const talentKeys = distinct(
				Object.keys(current.talentEffective).concat(Object.keys(char.talentEffective))
			);
			changedTalentsCan = talentKeys
				.map((key) => {
					return {
						key: key,
						new: current.talentEffective[key],
						old: char!.talentEffective[key],
						newEp: current.talentBaseEP[key] + current.getTalentPurchasedEP(key),
						oldEp: char!.talentBaseEP[key] + char!.getTalentPurchasedEP(key)
					};
				})
				.filter((x) => x.old != x.new || x.oldEp != x.newEp);

			const fertigkeitenKeys = distinct(
				Object.keys(current.fertigkeiten)
					.concat(Object.keys(char.fertigkeiten))
					.concat(Object.keys(current.fertigkeitenIgnoreRequirements))
					.concat(Object.keys(char.fertigkeitenIgnoreRequirements))
			);

			changedFertigkeitenCan = fertigkeitenKeys
				.map((key) => {
					return {
						key: key,
						new: current.fertigkeiten[key] ?? 0,
						old: char!.fertigkeiten[key] ?? 0,
						newIgnored: current.fertigkeitenIgnoreRequirements[key] ?? 0,
						oldIgnored: char!.fertigkeitenIgnoreRequirements[key] ?? 0
					};
				})
				.filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);
			const besonderheitenKeys = distinct(
				Object.keys(current.besonderheiten)
					.concat(Object.keys(char.besonderheiten))
					.concat(Object.keys(current.besonderheitenIgnoreRequirements))
					.concat(Object.keys(char.besonderheitenIgnoreRequirements))
			);

			changedBestonderheitenCan = besonderheitenKeys
				.map((key) => {
					return {
						key: key,
						new: current.besonderheiten[key] ?? 0,
						old: char!.besonderheiten[key] ?? 0,
						newIgnored: current.besonderheitenIgnoreRequirements[key] ?? 0,
						oldIgnored: char!.besonderheitenIgnoreRequirements[key] ?? 0
					};
				})
				.filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);
		} else {
			changedTalentsCan = undefined;
			changedFertigkeitenCan = undefined;
			changedBestonderheitenCan= undefined;
		}
		if (copyHas && char) {
			const current = copyHas;
			const talentKeys = distinct(
				Object.keys(current.talentEffective).concat(Object.keys(char.talentEffective))
			);
			changedTalentsHas = talentKeys
				.map((key) => {
					return {
						key: key,
						new: current.talentEffective[key],
						old: char!.talentEffective[key],
						newEp: current.talentBaseEP[key] + current.getTalentPurchasedEP(key),
						oldEp: char!.talentBaseEP[key] + char!.getTalentPurchasedEP(key)
					};
				})
				.filter((x) => x.old != x.new || x.oldEp != x.newEp);

			const fertigkeitenKeys = distinct(
				Object.keys(current.fertigkeiten)
					.concat(Object.keys(char.fertigkeiten))
					.concat(Object.keys(current.fertigkeitenIgnoreRequirements))
					.concat(Object.keys(char.fertigkeitenIgnoreRequirements))
			);

			changedFertigkeitenHas = fertigkeitenKeys
				.map((key) => {
					return {
						key: key,
						new: current.fertigkeiten[key] ?? 0,
						old: char!.fertigkeiten[key] ?? 0,
						newIgnored: current.fertigkeitenIgnoreRequirements[key] ?? 0,
						oldIgnored: char!.fertigkeitenIgnoreRequirements[key] ?? 0
					};
				})
				.filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);
			const besonderheitenKeys = distinct(
				Object.keys(current.fertigkeiten)
					.concat(Object.keys(char.fertigkeiten))
					.concat(Object.keys(current.fertigkeitenIgnoreRequirements))
					.concat(Object.keys(char.fertigkeitenIgnoreRequirements))
			);

			changedBestonderheitenHas = besonderheitenKeys
				.map((key) => {
					return {
						key: key,
						new: current.besonderheiten[key] ?? 0,
						old: char!.besonderheiten[key] ?? 0,
						newIgnored: current.besonderheitenIgnoreRequirements[key] ?? 0,
						oldIgnored: char!.besonderheitenIgnoreRequirements[key] ?? 0
					};
				})
				.filter((x) => x.old != x.new || x.oldIgnored != x.newIgnored);
		} else {
			changedTalentsHas = undefined;
			changedFertigkeitenHas = undefined;
			changedBestonderheitenHas = undefined;
		}
	}

	let l = data?.Instance.Daten.Pfade.filter((x) => x.Id == gruppe)[0]
		?.Pfad.filter((x) => x.Id == path)[0]
		?.Levels.Level.filter((x) => x.Id == lvl)[0];
	onDestroy(() => {
		fin();
		fin2();
	});
</script>

{#if char && l && ImageData && data}
	<div>
		{#if can}
			<div class="up">
				<a
					on:click={(e) => {
						e.preventDefault();
						char?.addPath(gruppe ?? '', path ?? '', lvl ?? '');
					}}
					href="#">+ (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={false} />)</a
				>
			</div>
		{/if}
		{#if has}
			<div class="down">
				<a
					on:click={(e) => {
						e.preventDefault();
						char?.removePath(gruppe ?? '', path ?? '', lvl ?? '');
					}}
					href="#">- (<KostenControl cost={l.Kosten} {data} {char} oneLine paid={true} />)</a
				>
			</div>
		{/if}
		<div style="display: flex; flex-direction: row; justify-content:space-between ;">
			<h4>
				{getText(l?.Name)} ({$level}/{l?.WiederhoteNutzung})
				<small>{l?.Id}</small>
			</h4>
		</div>

		<!-- {changedTalentsCan} -->
		{#if changedTalentsCan}
			{#each changedTalentsCan as t}
				<div class:hideOver={has}>
					{getText(data.talentMap[t.key].Name)}
					{#if t.new != t.old}
						{t.old}=>{t.new}
					{/if}
					{#if t.newEp - t.oldEp != 0}
						(+{t.newEp - t.oldEp} EP)
					{/if}
				</div>
			{/each}
		{/if}
		{#if changedFertigkeitenCan}
			{#each changedFertigkeitenCan as t}
				{#if t.old != t.new}
					<div class:hideOver={has}>
						{#if t.old != 0}
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.old)} =>
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new)}
						{:else}
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new)}
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
				{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
					<div class:hideOver={has}>
						<span style="text-decoration: wavy;">
							{#if t.oldIgnored != 0}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.oldIgnored)} =>
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored)}
							{:else}
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored)}
							{/if}
						</span>

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
			{/each}
		{/if}
		{#if changedBestonderheitenCan}
			{#each changedBestonderheitenCan as t}
				{#if t.old != t.new}
					<div class:hideOver={has}>
						{#if t.old != 0}
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.old)} =>
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.new)}
						{:else}
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.new)}
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
				{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
					<div class:hideOver={has}>
						<span style="text-decoration: wavy;">
							{#if t.oldIgnored != 0}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.oldIgnored)} =>
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored)}
							{:else}
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored)}
							{/if}
						</span>

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
			{/each}
		{/if}
		{#if changedTalentsHas}
			{#each changedTalentsHas as t}
				<div class="showOver">
					{getText(data.talentMap[t.key].Name)}
					{#if t.new != t.old}
						{t.old}=>{t.new}
					{/if}
					{#if t.newEp - t.oldEp != 0}
						({t.newEp - t.oldEp} EP)
					{/if}
				</div>
			{/each}
		{/if}
		{#if changedFertigkeitenHas}
			{#each changedFertigkeitenHas as t}
				{#if t.old != t.new}
					<div class="showOver">
						{#if t.new != 0}
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.old)} =>
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new)}
						{:else}
							<span style="text-decoration: line-through;">
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.new)}
							</span>
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
				{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
					<div class="showOver">
						{#if t.newIgnored != 0}
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.oldIgnored)} =>
							{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored)}
						{:else}
							<span style="text-decoration: line-through;">
								{getTextFertigkeit(data.fertigkeitenMap[t.key], t.newIgnored)}
							</span>
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
			{/each}
		{/if}
		{#if changedBestonderheitenHas}
			{#each changedBestonderheitenHas as t}
				{#if t.old != t.new}
					<div class="showOver">
						{#if t.new != 0}
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.old)} =>
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.new)}
						{:else}
							<span style="text-decoration: line-through;">
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.new)}
							</span>
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
				{#if t.oldIgnored != t.newIgnored && t.new != t.newIgnored}
					<div class="showOver">
						{#if t.newIgnored != 0}
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.oldIgnored)} =>
							{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored)}
						{:else}
							<span style="text-decoration: line-through;">
								{getTextBesonderheit(data.besonderheitenMap[t.key], t.newIgnored)}
							</span>
						{/if}

						<!-- {#if t.newEp - t.oldEp != 0} -->
						<!-- (+{t.newEp - t.oldEp} EP) -->
						<!-- {/if} -->
					</div>
				{/if}
			{/each}
		{/if}
		
	</div>
{/if}

<style lang="scss">
	.handel {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		* {
			min-width: 6rem;
		}
	}

	.hideOver {
		display: block;
	}

	.showOver {
		display: none;
	}

	.down:hover ~ .showOver {
		display: block;
	}
	.down:hover ~ .hideOver {
		display: none;
	}
</style>
