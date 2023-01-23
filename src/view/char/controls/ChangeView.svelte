<script lang="ts">
	import { json } from '@sveltejs/kit';
	import type { CharacterChange, Charakter } from 'src/models/Character';
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
		renderRequirementMap
	} from 'src/misc/misc';

	export let char: Charakter;
	export let change: CharacterChange;
	export let data: Data;
</script>

<!-- {#if addFuture} -->
<div>
	{#if change.changedCost}
		<div>
			<strong>Kosten:</strong>
			{#if change.changedCost.length == 0}
				keine
			{:else}
				{JSON.stringify(Object.fromEntries(change.changedCost.map((x) => [x.key, x.differece])))}
			{/if}
		</div>
	{/if}

	{#if change.changedTalents.filter((x) => x.old == 0 && x.old != x.new).length > 0}
		<div>Neue Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.old == 0 && x.old != x.new) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						(+{b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTalents.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} von {b.old} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						(+{b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTalents.filter((x) => x.old === x.new && x.newEp > x.oldEp).length > 0}
		<div>Zugewonnene EP für Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.old === x.new && x.newEp > x.oldEp) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')}
					+{b.newEp - b.oldEp} EP
				</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTalents.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')} von von {b.old} auf {b.new}
					{#if b.newEp - b.oldEp !== 0}
						({b.newEp - b.oldEp} EP)
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTalents.filter((x) => x.new == 0 && x.old != x.new).length > 0}
		<div>Verlorene Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.new == 0 && x.old != x.new) as b}
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
	{#if change.changedTalents.filter((x) => x.old === x.new && x.newEp < x.oldEp).length > 0}
		<div>Reduzierte EP für Talente</div>
		<ul>
			{#each change.changedTalents.filter((x) => x.old === x.new && x.newEp < x.oldEp) as b}
				<li>
					{getTextTalent(data.talentMap[b.key], char, 'Name')}
					{b.newEp - b.oldEp} EP
				</li>
			{/each}
		</ul>
	{/if}

	{#if change.changedBestonderheiten.filter((x) => x.old == 0).length > 0}
		<div>Neue Besonderheiten</div>
		<ul>
			{#each change.changedBestonderheiten.filter((x) => x.old == 0) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedBestonderheiten.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Besonderheiten</div>
		<ul>
			{#each change.changedBestonderheiten.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedBestonderheiten.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Besonderheiten</div>
		<ul>
			{#each change.changedBestonderheiten.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedBestonderheiten.filter((x) => x.new == 0).length > 0}
		<div>Verlorene Besonderheiten</div>
		<ul>
			{#each change.changedBestonderheiten.filter((x) => x.new == 0) as b}
				<li>{getTextBesonderheit(data.besonderheitenMap[b.key], b.old, char)}</li>
			{/each}
		</ul>
	{/if}

	{#if change.changedFertigkeiten.filter((x) => x.old == 0).length > 0}
		<div>Neue Fertigkeiten</div>
		<ul>
			{#each change.changedFertigkeiten.filter((x) => x.old == 0) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedFertigkeiten.filter((x) => x.old != 0 && x.new > x.old).length > 0}
		<div>Verbesserte Fertigkeiten</div>
		<ul>
			{#each change.changedFertigkeiten.filter((x) => x.old != 0 && x.new > x.old) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedFertigkeiten.filter((x) => x.new != 0 && x.new < x.old).length > 0}
		<div>Verschlechterte Fertigkeiten</div>
		<ul>
			{#each change.changedFertigkeiten.filter((x) => x.new != 0 && x.new < x.old) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.new, char)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedFertigkeiten.filter((x) => x.new == 0).length > 0}
		<div>Verlorene Fertigkeiten</div>
		<ul>
			{#each change.changedFertigkeiten.filter((x) => x.new == 0) as b}
				<li>{getTextFertigkeit(data.fertigkeitenMap[b.key], b.old, char)}</li>
			{/each}
		</ul>
	{/if}

	{#if change.changedTags.filter((x) => x.new > x.old).length > 0}
		<div>Neue Tags</div>
		<ul>
			{#each change.changedTags.filter((x) => x.new > x.old) as b}
				<li>{getText(data.tagMap[b.key].Name)}</li>
			{/each}
		</ul>
	{/if}
	{#if change.changedTags.filter((x) => x.new < x.old).length > 0}
		<div>Verlorene Tags</div>
		<ul>
			{#each change.changedTags.filter((x) => x.new < x.old) as b}
				<li>{getText(data.tagMap[b.key].Name)}</li>
			{/each}
		</ul>
	{/if}

	{#if change.requirements.added.length > 0}
		<div class="probles">
			Neue Probleme {change.requirements.added.length}
			<ul>
				{#each change.requirements.added as r}
					<li>
						Für
						{#if r.missingOnType == 'level'}
							{getTextPfad(
								data.pfadMap[r.missingOnId.path],
								data.levelMap[r.missingOnId.path][r.missingOnId.level],
								char
							)} {r.wert}
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
	{#if change.requirements.removed.length > 0}
		<div class="probles">
			{#if change.requirements.removed.length == 1}
				Behobenes Problem
			{:else}
				Behobene Probleme
			{/if}
			<ul>
				{#each change.requirements.removed as r}
					<li>
						Für
						{#if r.missingOnType == 'level'}
							{getTextPfad(
								data.pfadMap[r.missingOnId.path],
								data.levelMap[r.missingOnId.path][r.missingOnId.level],
								char
							)} {r.wert}
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
</style>
