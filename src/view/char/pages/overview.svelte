<script lang="ts">
	import { renderRequirementMap } from 'src/misc/misc';
	import { localStorageChar } from 'src/misc/storage';
	import { Charakter, type PersistanceData } from 'src/models/Character';
	import { Data } from 'src/models/Data';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import KostenControl from '../controls/KostenControl.svelte';

	export let data: Data;
	export let char: Charakter;

	let hasNegativPoints: boolean = false;

	const missing = char.missingStore;
	const name = char.nameStore;

	let newData: Data | undefined;

	let loading = false;

	onMount(async () => {
		loading = true;
		newData = await Data.init(false);
		loading = false;
	});

	async function refresh() {
		// const newData = await Data.init(false);
		if (newData) {
			const newChar = new Charakter(newData, get(char.persistanceStore));
			localStorageChar.set(get(newChar.persistanceStore));
		}
	}
</script>

<article>
	<p>
		{#if loading}
			Stammdaten werden überprüft <span aria-busy="true" />
		{:else if char.stammdaten.id != newData?.id}
			Stammdaten veraltet,
			<a
				style="font-size: xx-large;"
				href="#"
				data-tooltip="Stammdaten aktualisieren"
				on:click={(e) => {
					e.preventDefault();
					refresh();
				}}
			>
				aktualisieren &#128472;
			</a>
		{:else}
			Stammdaten aktuell &#10003; 
		{/if}
	</p>
	<label>
		Name
		<input type="text" bind:value={$name} />
	</label>

	{#if $missing.length == 0}
		<p>Der Charakter ist Gültig.</p>
	{/if}
	<!-- 
		<p style={hasNegativPoints ? '' : 'display: none;'}>
			Es wurden zu viele Punkte ausgegeben

			<KostenControl {char} {data} bind:hasNegativ={hasNegativPoints} mode='points' showOnlyHighCost /> 
		</p> -->

	{#if $missing.length > 0}
		<ul class="missing">
			{#each $missing as m}
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
		</ul>
	{/if}
</article>
