<script lang="ts">
	import Hitman from 'src/controls/hitman.svelte';
	import type { userHolder } from './connection';
	import { isBesonderheitenHolder, type Charakter } from 'src/models/Character';
	import { get as svelteGet, type Readable } from 'svelte/store';
	import { getAgeText, getText, getTextBesonderheit, tail } from 'src/misc/misc';

	export let user: userHolder & { playerName: string };

	$: au = user.state.Ausdauer;

	$: Blutung = user.state.fatique.Blutung;
	$: Erschöpfung = user.state.fatique.Erschöpfung;
	$: Strapazierung = user.state.fatique.Strapazierung;
	$: Verausgabung = user.state.fatique.Verausgabung;

	function getBesonderheitenKeys() {
		const char = user.char;
		if (char == undefined) {
			return [];
		}

		function next(char: Charakter, path: string[]): string[][] {
			const current = char.besonderheiten(...path);
			if (Array.isArray(current)) {
				return current.flatMap((x) => next(char, [...path, x]));
			} else {
				return [path];
			}
		}

		const keys = next(char, []);

		return keys;
	}

	function get<T>(value: Readable<T>): T;
	function get<T>(value: undefined): undefined;
	function get<T>(value: Readable<T> | undefined): T | undefined {
		if (value == undefined) {
			return undefined;
		}
		return svelteGet(value);
	}

	const morphId = get(user.char.morphIdStore);
</script>

{getAgeText(
	get(user.char?.ageStore) ?? 0,
	morphId ? user.char.stammdaten.morphLookup[morphId] : undefined,
	user.char
)}
{getText(get(user.char.artStore)?.Name, user.char)}
<small>
	({getText(get(user.char.gattungsStore)?.Name, user.char)}
	{getText(get(user.char.artStore)?.Art, user.char)}) – {getText(
		get(user.char.morphStore)?.Name,
		user.char
	)}
</small>

{#each Object.keys(user.char.stammdaten.besonderheitenCategoryMap) as bKey}
	{#if getBesonderheitenKeys()
		.filter(([key]) => Object.keys(user.char?.stammdaten?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
		.some((x) => {
			const b = user.char?.besonderheiten(...x);
			if (isBesonderheitenHolder(b)) {
				return b.unconditionally.currentValue({ defaultValue: 0 }) > 0;
			} else {
				return false;
			}
		})}
		<!-- {#if Object.keys(data.besonderheitenCategoryMap[bKey]).some((x) => (char?.besonderheiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0)} -->
		<div class="list">
			<strong>{bKey}</strong>
			<ul>
				{#each getBesonderheitenKeys()
					.filter(([key]) => Object.keys(user.char?.stammdaten?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
					.filter((x) => {
						const b = user.char?.besonderheiten(...x);
						if (isBesonderheitenHolder(b)) {
							return b.unconditionally.currentValue({ defaultValue: 0 }) > 0;
						} else {
							return false;
						}
					}) as b2Key}
					{@const bes = user.char?.besonderheiten(...b2Key)}
					{#if isBesonderheitenHolder(bes)}
						<li>
							{#if (bes.effective.currentValue({ defaultValue: 0 }) ?? 0) == 0}
								<span class="light">
									{getTextBesonderheit(
										user.char.stammdaten.besonderheitenMap[b2Key[0]],
										bes.unconditionally.currentValue({
											defaultValue: 0
										}) ?? 0,
										user.char,
										...tail(b2Key)
									)}
								</span>
							{:else if (bes.effective.currentValue( { defaultValue: 0 } ) ?? 0) < (bes.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
								{getTextBesonderheit(
									user.char.stammdaten.besonderheitenMap[b2Key[0]],
									bes.effective.currentValue({ defaultValue: 0 }) ?? 0,
									user.char
								)}
								<span class="light">
									({getTextBesonderheit(
										user.char.stammdaten.besonderheitenMap[b2Key[0]],
										bes.unconditionally.currentValue({
											defaultValue: 0
										}) ?? 0,
										user.char,
										...tail(b2Key)
									)})
								</span>
							{:else}
								{getTextBesonderheit(
									user.char.stammdaten.besonderheitenMap[b2Key[0]],
									bes.effective.currentValue({ defaultValue: 0 }) ?? 0,
									user.char,
									...tail(b2Key)
								)}
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
			<hr />
		</div>
	{/if}
{/each}

Ausdauer :{$au} / {user.state.MaxAussdauer} (B{$Blutung}/E{$Erschöpfung}/S{$Strapazierung}/V{$Verausgabung})

<div style="max-width: 10rem;">
	<Hitman charData={user.state} />
</div>
