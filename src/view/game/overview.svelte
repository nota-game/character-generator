

<script lang="ts">
	import { Charakter, isBesonderheitenHolder } from 'src/models/Character';
	import type { Data } from 'src/models/Data';

    import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';
	import { filterNull, filterObjectKeys, getText, getTextBesonderheit, getTextFertigkeit, join, tail } from 'src/misc/misc';
	import Nota from '../nota.svelte';


	export let char: Charakter;
	export let data: Data;


    function getBesonderheitenKeys() {
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
</script>


<div class="header">
    <div style="height: 200xp; width: 200px;">
        <Nota />
    </div>
    <!-- <table style="margin: auto; height: 100%; ">
        <tr>
            <td>
            </td>
        </tr>
        <tr />
    </table> -->
</div>

<table class="stammdaten">
    <tr><td>Name </td><td>{char?.nameStore.currentValue()}</td></tr>
    <tr
        ><td>Gattung/Art</td><td>
            {getText(char?.gattungsStore.currentValue({ defaultValue: undefined })?.Name, char)}
            {getText(char?.artStore.currentValue({ defaultValue: undefined })?.Art, char)}
            ({getText(char?.artStore.currentValue({ defaultValue: undefined })?.Name, char)})
            {getText(char?.morphStore.currentValue({ defaultValue: undefined })?.Name, char)}
            {#if (filterNull( [...Object.values(char?.lebensAbschnitteStore.currentValue( { defaultValue: undefined } ) ?? {})] )
                    .map((lebensabschnitt) => getText(lebensabschnitt.Name, char))
                    .filter((x) => x != '' && x != undefined) ?? []).length > 0}
                ({join(
                    filterNull([
                        ...Object.values(
                            char?.lebensAbschnitteStore.currentValue({ defaultValue: undefined }) ?? {}
                        )
                    ])
                        .map((lebensabschnitt) => getText(lebensabschnitt.Name, char))
                        .filter((x) => x != '' && x != undefined) ?? []
                )})
            {/if}
        </td>
    </tr>
    {#each Object.keys(data.pfadCategoryMap) as p}
        <tr
            ><td>{getText(data.pfadCategoryMap[p].Name)}</td><td>
                {join(
                    Object.entries(char?.pfad)
                        .filter(([key, value]) => {
                            return data?.pfadCategoryMap[p].levels[key] != undefined;
                        })
                        .filter(([key, value]) => {
                            return Object.values(value).some(
                                (x) => (x.effective.currentValue({ defaultValue: 0 }) ?? 0) > 0
                            );
                        })
                        // Object.keys(data.pfadCategoryMap[p])
                        // 	.filter((ps) => Object.keys(char?.pfadLevel[p]?.[ps] ?? {}).length > 0)
                        .map(([x]) => getText(data?.pfadMap[x].Name, char))
                        .sort()
                )}
            </td></tr
        >
    {/each}
</table>

<div style="column-count: 2;		column-gap: 1em;">
    <!-- <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;"> -->

    {#each data.Instance.Daten.Organismen.EigenschaftenGruppen.Gruppe as gg}
        <table class="eigenschaften">
            <thead>
                <th>{getText(gg.Name)}</th>
                <!-- <th style="text-align: center;">Grund</th> -->
                <!-- <th style="text-align: center;">Mod</th> -->
                <th>Aktuell</th>
            </thead>
            {#each Object.values(char?.eigenschaften)
                .filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == gg.id)
                .sort((a, b) => {
                    return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
                }) as eigenschaft}
                {@const meta = eigenschaft.meta.currentValue({ defaultValue: undefined })}
                {@const effective = eigenschaft.effective.currentValue({ defaultValue: undefined })}
                {#if meta && meta.type == 'bereich'}
                    <tr
                        ><td>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
                        ><td>
                            {#if meta.diskret}
                                {effective ?? meta.default}
                            {:else}
                                {Math.round((effective ?? meta.default) * 100) / 100}
                            {/if}
                            {meta.einheit ?? ''}
                        </td>
                    </tr>
                {:else if meta && meta.type == 'berechnung' && effective}
                    <tr
                        ><td>{getText(meta.Name)}</td><td>
                            {Math.round(effective * 100) / 100}
                            {meta.einheit ?? ''}
                        </td>
                    </tr>
                {:else if meta && meta.type == 'reihe' && effective}
                    <tr
                        ><td>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
                        ><td>
                            {Math.round(effective * 100) / 100}
                            {meta.einheit ?? ''}
                        </td>
                    </tr>
                {:else if meta && meta.type == 'punkt' && effective == 1}
                    <tr
                        ><td colspan="2"
                            >{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Name)}</td
                        >
                    </tr>
                {/if}
            {/each}
        </table>
    {/each}
</div>
<div class="extra">
    {#each Object.keys(data.besonderheitenCategoryMap) as bKey}
        {#if getBesonderheitenKeys()
            .filter(([key]) => Object.keys(data?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
            .some((x) => {
                const b = char?.besonderheiten(...x);
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
                        .filter(([key]) => Object.keys(data?.besonderheitenCategoryMap[bKey] ?? {}).includes(key) ?? false)
                        .filter((x) => {
                            const b = char?.besonderheiten(...x);
                            if (isBesonderheitenHolder(b)) {
                                return b.unconditionally.currentValue({ defaultValue: 0 }) > 0;
                            } else {
                                return false;
                            }
                        }) as b2Key}
                        {@const bes = char?.besonderheiten(...b2Key)}
                        {#if isBesonderheitenHolder(bes)}
                            <li>
                                {#if (bes.effective.currentValue({ defaultValue: 0 }) ?? 0) == 0}
                                    <span class="light">
                                        {getTextBesonderheit(
                                            data.besonderheitenMap[b2Key[0]],
                                            bes.unconditionally.currentValue({
                                                defaultValue: 0
                                            }) ?? 0,
                                            char,
                                            ...tail(b2Key)
                                        )}
                                    </span>
                                {:else if (bes.effective.currentValue( { defaultValue: 0 } ) ?? 0) < (bes.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
                                    {getTextBesonderheit(
                                        data.besonderheitenMap[b2Key[0]],
                                        bes.effective.currentValue({ defaultValue: 0 }) ?? 0,
                                        char
                                    )}
                                    <span class="light">
                                        ({getTextBesonderheit(
                                            data.besonderheitenMap[b2Key[0]],
                                            bes.unconditionally.currentValue({
                                                defaultValue: 0
                                            }) ?? 0,
                                            char,
                                            ...tail(b2Key)
                                        )})
                                    </span>
                                {:else}
                                    {getTextBesonderheit(
                                        data.besonderheitenMap[b2Key[0]],
                                        bes.effective.currentValue({ defaultValue: 0 }) ?? 0,
                                        char,
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

    {#each Object.keys(data.fertigkeitenCategoryMap) as bKey}
        {#if Object.keys(data.fertigkeitenCategoryMap[bKey].fertigkeiten).some((x) => (char?.fertigkeiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0)}
            <div class="list">
                <strong>{bKey}</strong>
                <ul>
                    {#each Object.keys(data.fertigkeitenCategoryMap[bKey].fertigkeiten).filter((x) => (char?.fertigkeiten[x]?.unconditionally.currentValue( { defaultValue: 0 } ) ?? 0) > 0) as b2Key}
                        <li>
                            {#if (char?.fertigkeiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) == 0}
                                <span class="light">
                                    {getTextFertigkeit(
                                        data.fertigkeitenMap[b2Key],
                                        char?.fertigkeiten[b2Key].unconditionally.currentValue({
                                            defaultValue: 0
                                        }) ?? 0,
                                        char
                                    )}
                                </span>
                            {:else if (char?.fertigkeiten[b2Key].effective.currentValue( { defaultValue: 0 } ) ?? 0) < (char?.fertigkeiten[b2Key].unconditionally.currentValue( { defaultValue: 0 } ) ?? 0)}
                                {getTextFertigkeit(
                                    data.fertigkeitenMap[b2Key],
                                    char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
                                    char
                                )}
                                <span class="light">
                                    ({getTextFertigkeit(
                                        data.fertigkeitenMap[b2Key],
                                        char?.fertigkeiten[b2Key].unconditionally.currentValue({
                                            defaultValue: 0
                                        }) ?? 0,
                                        char
                                    )})
                                </span>
                            {:else}
                                {getTextFertigkeit(
                                    data.fertigkeitenMap[b2Key],
                                    char?.fertigkeiten[b2Key].effective.currentValue({ defaultValue: 0 }) ?? 0,
                                    char
                                )}
                            {/if}
                        </li>
                    {/each}
                </ul>
                <hr />
            </div>
        {/if}
    {/each}
</div>