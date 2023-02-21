<script lang="ts">
	import { json } from '@sveltejs/kit';
	import {
		compareRequirement,
		type CharacterChange,
		type Charakter,
		type MissingRequirements
	} from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import type { Readable, Writable } from 'svelte/store';
	import { stringify } from 'uuid';

	import {
		getText,
		getTextBesonderheit,
		getTextFertigkeit,
		getTextPfad,
		getTextTalent,
		renderRequirement,
		renderRequirementMap,
		sequenceEqual,
		tail,
		toObjectKey
	} from 'src/misc/misc';
	import KostenControl from './KostenControl.svelte';

	export let char: Charakter;
	export let change: CharacterChange;
	export let data: Data;

	export let excludeRequirments:
		| undefined
		| {
				wert: number;
				missing: MissingRequirements;
		  }[] = undefined;
	export let exclude:
		| { type: 'fertigkeit' | 'talent' | 'tag'; id: string }
		| { type: 'besonderheit'; id: string[] }
		| undefined = undefined;

	let removedRequirments = change.requirements.removed.filter((x) => {
		return !(
			excludeRequirments?.some(
				(y) => x.wert == y.wert && compareRequirement(y.missing, x.missing) == 0
			) &&
			x.missingOnType == exclude?.type &&
			x.missingOnId == exclude.id
		);
	});
	let addedRequirments = change.requirements.added.filter((x) => {
		return !(
			excludeRequirments?.some(
				(y) => x.wert == y.wert && compareRequirement(y.missing, x.missing) == 0
			) &&
			x.missingOnType == exclude?.type &&
			x.missingOnId == exclude.id
		);
	});

	let changedBestonderheiten = change.changedBestonderheiten.filter(
		(x) => exclude?.type != 'besonderheit' || !sequenceEqual(exclude.id, x.key)
	);
	let changedFertigkeiten = change.changedFertigkeiten.filter(
		(x) => exclude?.type != 'fertigkeit' || exclude.id != x.key
	);

	let changedTalents = change.changedTalents.filter(
		(x) => exclude?.type != 'talent' || exclude.id != x.key
	);
	let changedTags = change.changedTags.filter((x) => exclude?.type != 'tag' || exclude.id != x.key);
</script>

<!-- {#if addFuture} -->
<div>
	{#if change.changedCost}
		<div>
			<strong>Neue Punktewerte:</strong>
			{#if change.changedCost.length == 0}
				keine
			{:else}
				<KostenControl
					{data}
					{char}
					mode="points"
					cost={toObjectKey(
						change.changedCost,
						(x) => x.key,
						(x) => x.new
					)}
				/>
			{/if}
		</div>
	{/if}

	{#if changedTalents.filter((x) => x.old == 0 && x.old != x.new).length > 0}
		<div>Neue Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.old == 0 && x.old != x.new) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						(+{b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if changedTalents.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} von {b.old} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						(+{b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if changedTalents.filter((x) => x.old === x.new && x.newEp > x.oldEp).length > 0}
		<div>Zugewonnene EP für Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.old === x.new && x.newEp > x.oldEp) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')}
					+{b.newEp - b.oldEp} EP
				</li>
			{/each}
		</ul>
	{/if}
	{#if changedTalents.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} von von {b.old} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						({b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if changedTalents.filter((x) => x.new == 0 && x.old != x.new).length > 0}
		<div>Verlorene Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.new == 0 && x.old != x.new) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')}
					{b.old}
					{#if b.newEp - b.oldEp !== 0}
						({b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if changedTalents.filter((x) => x.old === x.new && x.newEp < x.oldEp).length > 0}
		<div>Reduzierte EP für Talente</div>
		<ul>
			{#each changedTalents.filter((x) => x.old === x.new && x.newEp < x.oldEp) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')}
					{b.newEp - b.oldEp} EP
				</li>
			{/each}
		</ul>
	{/if}

	{#if changedBestonderheiten.filter((x) => x.old == 0).length > 0}
		<div>Neue Besonderheiten</div>
		<ul>
			{#each changedBestonderheiten.filter((x) => x.old == 0) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key[0]], b.new, char,  ...tail(b.key))}</li>
			{/each}
		</ul>
	{/if}
	{#if changedBestonderheiten.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Besonderheiten</div>
		<ul>
			{#each changedBestonderheiten.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key[0]], b.new, char,  ...tail(b.key))}</li>
			{/each}
		</ul>
	{/if}
	{#if changedBestonderheiten.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Besonderheiten</div>
		<ul>
			{#each changedBestonderheiten.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key[0]], b.new, char,  ...tail(b.key))}</li>
			{/each}
		</ul>
	{/if}
	{#if changedBestonderheiten.filter((x) => x.new == 0).length > 0}
		<div>Verlorene Besonderheiten</div>
		<ul>
			{#each changedBestonderheiten.filter((x) => x.new == 0) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key[0]], b.old, char,  ...tail(b.key))}</li>
			{/each}
		</ul>
	{/if}

	{#if changedFertigkeiten.filter((x) => x.old == 0).length > 0}
		<div>Neue Fertigkeiten</div>
		<ul>
			{#each changedFertigkeiten.filter((x) => x.old == 0) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if changedFertigkeiten.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Fertigkeiten</div>
		<ul>
			{#each changedFertigkeiten.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if changedFertigkeiten.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Fertigkeiten</div>
		<ul>
			{#each changedFertigkeiten.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if changedFertigkeiten.filter((x) => x.new == 0).length > 0}
		<div>Verlorene Fertigkeiten</div>
		<ul>
			{#each changedFertigkeiten.filter((x) => x.new == 0) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.old, char)}</li>
			{/each}
		</ul>
	{/if}

	{#if changedTags.filter((x) => x.new > x.old).length > 0}
		<div>Neue Tags</div>
		<ul>
			{#each changedTags.filter((x) => x.new > x.old) as b}
				<li>{getText(data.tagMap[b.key].Name)}</li>
			{/each}
		</ul>
	{/if}
	{#if changedTags.filter((x) => x.new < x.old).length > 0}
		<div>Verlorene Tags</div>
		<ul>
			{#each changedTags.filter((x) => x.new < x.old) as b}
				<li>{getText(data.tagMap[b.key].Name)}</li>
			{/each}
		</ul>
	{/if}

	{#if addedRequirments.length > 0}
		<div class="probles">
			{#if addedRequirments.length == 1}
				Neues Problem
			{:else}
				Neue Probleme
			{/if}
			<ul class="missing">
				{#each addedRequirments as r}
					<li>
						Für
						{#if r.missingOnType == 'level'}
							{getTextPfad(
								data.pfadMap[r.missingOnId.path],
								data.levelMap[r.missingOnId.path][r.missingOnId.level],
								char
							)}
							{r.wert}
						{:else if r.missingOnType == 'fertigkeit'}
							{getTextFertigkeit(data.fertigkeitenMap[r.missingOnId], r.wert, char)}
						{:else if r.missingOnType == 'besonderheit'}
							{getTextBesonderheit(data.besonderheitenMap[r.missingOnId], r.wert, char)}
						{:else if r.missingOnType == 'talent'}
							{getTextTalent(data.talentMap[r.missingOnId], char, 'Name')}
						{/if} sind nicht alle Bedingungen erfüllt.
						{#if r.missingOnType == 'fertigkeit'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'fertigkeit', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'besonderheit'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'besonderheit', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'talent'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'talent', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'level'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'level', level: r.missingOnId.level, pfad: r.missingOnId.path },
								char
							)}
						{:else}
							{renderRequirement(r.missing, data)}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if removedRequirments.length > 0}
		<div class="probles">
			{#if removedRequirments.length == 1}
				Behobenes Problem
			{:else}
				Behobene Probleme
			{/if}
			<ul>
				{#each removedRequirments as r}
					<li>
						Für
						{#if r.missingOnType == 'level'}
							{getTextPfad(
								data.pfadMap[r.missingOnId.path],
								data.levelMap[r.missingOnId.path][r.missingOnId.level],
								char
							)}
							{r.wert}
						{:else if r.missingOnType == 'fertigkeit'}
							{getTextFertigkeit(data.fertigkeitenMap[r.missingOnId], r.wert, char)}
						{:else if r.missingOnType == 'besonderheit'}
							{getTextBesonderheit(data.besonderheitenMap[r.missingOnId], r.wert, char)}
						{:else if r.missingOnType == 'talent'}
							{getTextTalent(data.talentMap[r.missingOnId], char, 'Name')}
						{/if} wurden Probleme behoben.
						{#if r.missingOnType == 'fertigkeit'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'fertigkeit', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'besonderheit'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'besonderheit', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'talent'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'talent', value: r.missingOnId },
								char
							)}
						{:else if r.missingOnType == 'level'}
							{renderRequirementMap(
								{ missing: r.missing, wert: r.wert },
								data,
								{ type: 'level', level: r.missingOnId.level, pfad: r.missingOnId.path },
								char
							)}
						{:else}
							{renderRequirement(r.missing, data)}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.probles {
		margin: 1rem;
	}
	ul * {
		list-style-type: none;
	}
</style>
