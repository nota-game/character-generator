<script lang="ts">
	import { renderRequirementMap } from "src/misc/misc";
	import type { Charakter } from "src/models/Character";
	import type { Data } from "src/models/Data";
	import Besonderheit from "./besonderheit.svelte";
	import Fertigkeit from "./fertigkeit.svelte";
	import PathLevel from "./pathLevel.svelte";
	import PropertiesSetter from "./propertiesSetter.svelte";
	import Tag from "./tag.svelte";
	import Talent from "./talent.svelte";


	export let data: Data;
	export let char: Charakter;

	$: gattungsStore = char?.gattungsIdStore;
	$: artStore = char?.artIdStore;
	$: morphStore = char?.morphIdStore;

	$: possibleGattungStore = char?.possibleGattungStore;
	$: possibleArtStore = char?.possibleArtStore;
	$: possibleMorphStore = char?.possibleMorphStore;

	$: ageStore = char?.ageStore;
	$: lebensabschnitteStore = char?.lebensAbschnitteStore;
	$: missingStore = char?.missingStore;
	$: cost = char?.pointStore;
</script>


<h1>Welcome to Nota Char-gen</h1>
<p>Alles gelöscht und neu angefange😱</p>

<hr />
{#if char}
    <!-- {#if $cost} -->
    {JSON.stringify($cost)}
    <!-- {/if} -->
    <hr />

    {#if $ageStore}
        <label>
            Alter
            <input type="number" bind:value={$ageStore} />
        </label>
    {/if}

    {#if $possibleGattungStore}
        <select bind:value={$gattungsStore}>
            {#each $possibleGattungStore as pg}
                <option value={pg}>{pg}</option>
            {/each}
        </select>
    {/if}
    {#if $possibleArtStore}
        <select bind:value={$artStore}>
            {#each $possibleArtStore as pg}
                <option value={pg}>{pg}</option>
            {/each}
        </select>
    {/if}
    {#if $possibleMorphStore}
        <select bind:value={$morphStore}>
            {#each $possibleMorphStore as pg}
                <option value={pg}>{pg}</option>
            {/each}
        </select>
    {/if}

    <hr />

    {#each Object.entries(char.eigenschaften) as [key, entry]}
        <PropertiesSetter {key} {...entry} />
    {/each}

    <hr />
    <ul>
        <li>{$gattungsStore}</li>
        <li>{$artStore}</li>
        <li>{$morphStore}</li>
    </ul>

    <hr />

    {#if data}
        {#each Object.entries(char.besonderheiten) as [key, entry]}
            <Besonderheit data={data} {key} {char} {...entry} useFuture />
        {/each}

        <hr />

        {#each Object.entries(char.fertigkeiten) as [key, entry]}
            <Fertigkeit data={data} {key} {char} {...entry} useFuture />
        {/each}

        <hr />
        {#each Object.entries(char.talente) as [key, entry]}
            <Talent data={data} {key} {char} {...entry} useFuture />
        {/each}
        <hr />
        {#each Object.entries(char.tag) as [key, entry]}
            <Tag data={data} {key} {char} {...entry} />
        {/each}
        <hr />
        {#each Object.entries(char.pfad) as [pathId, entry]}
            {#each Object.entries(entry) as [levelId, level]}
                <PathLevel data={data} {char} {pathId} {levelId} {...level} useFuture />
            {/each}
        {/each}
    {/if}

    <ul>
        {#if $missingStore && data && char}
            {#each $missingStore as m}
                {#if m.type == 'besonderheit' || m.type == 'fertigkeit'}
                    {#each m.missing as mm}
                        <li>
                            {renderRequirementMap(
                                mm,
                                data,
                                {
                                    type: m.type,
                                    value: m.id
                                },
                                char
                            )}
                        </li>
                    {/each}
                {:else if m.type == 'talent'}
                    {#each m.missing as mm}
                        <li>
                            {renderRequirementMap(
                                mm,
                                data,
                                {
                                    type: m.type,
                                    value: m.id
                                },
                                char
                            )}
                        </li>
                    {/each}
                {:else if m.type == 'level'}
                    {#each m.missing as mm}
                        <li>
                            {renderRequirementMap(
                                mm,
                                data,
                                {
                                    type: 'level',
                                    pfad: m.id.path,
                                    level: m.id.level
                                },
                                char
                            )}
                        </li>
                    {/each}
                {/if}
            {/each}
        {/if}
    </ul>
{:else}
    loading…
{/if}