<script lang="ts">
	import { renderRequirementMap } from 'src/misc/misc';
	import { localStorageChar } from 'src/misc/storage';
	import { Charakter, type PersistanceData } from 'src/models/Character';
	import { Data } from 'src/models/Data';
	import { get } from 'svelte/store';

	export let data: Data;
	export let char: Charakter;

	const missing = char.missingStore;
	const name = char.nameStore;

	async function refresh() {
		const newData = await Data.init(false);
		if (newData) {
			const newChar = new Charakter(newData, get(char.persistanceStore));
			localStorageChar.set(get(newChar.persistanceStore));
		}
	}
</script>

<article>
	{#if char}
		<p>
			Stammdaten {char.stammdaten.id}
			<a
				style="font-size: xx-large;"
				href="#"
				data-tooltip="Stammdaten aktualisieren"
				on:click={(e) => {
					e.preventDefault();
					refresh();
				}}
			>
				&#128472;
			</a>
		</p>

		<label>
			Name
			<input type="text" bind:value={$name} />
		</label>

		{#if $missing.length == 0}
			<p>Der Charakter ist Gültig.</p>
		{/if}

		<!-- <p style={hasNegativPoints ? '' : 'display: none;'}>
            Es wurden zu viele Punkte ausgegeben

            <PointControl
                onlyNegatve
                char={char}
                data={$data}
                bind:hasNegativ={hasNegativPoints}
            />
        </p> -->

		{#if $missing.length > 0}
			<ul>
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
	{:else}
		<p>
			Wählen Sie einen Charackter in der Auswahlbox am oberen Bildschirmrand aus oder erzeugen sie
			einen neuen
		</p>
		<p>
			Characktere werden lokal in ihrem Browser gespeichert. Sie können zurzeit nicht einfach
			übertragen werden.
		</p>
	{/if}
</article>
