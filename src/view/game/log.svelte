<script lang="ts">
	import { reducedPlanckConstantDependencies } from 'mathjs';
	import { getText, withIndex } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { CharacterState, LogSimpleRole, rolePropertys } from 'src/models/CharacterState';
	import type { Data } from 'src/models/Data';

	export let char: Charakter;
	export let data: Data;
	export let charData: CharacterState;

	let glüksPunkte = charData.GlüksPunkte;

	let roleEntrys = charData.log;

	function reduce(r: rolePropertys, logEntry: LogSimpleRole) {
		if (r.substituted != undefined) {
			r.substituted--;
		} else {
			r.role--;
		}
		glüksPunkte.update((x) => x - 2);
		charData.refreshLog(logEntry);
	}
</script>

{#each withIndex($roleEntrys) as [entry, index]}
	<div class="log">
		{#if index == 0}
			<a
				href="#log-1"
				on:click={(e) => {
					e.preventDefault();
					document
						.getElementById('log-2')
						?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
				}}>Zum Log Springen</a
			>
		{/if}

		{#if entry.type == 'message'}
			<p id="log-{index}">
				{entry.message}
			</p>
		{:else if entry.type == 'simple-role'}
			<div id="log-{index}">
				{getText(entry.talent.Name)}
				{#if entry.difficulty > 0}
					mit Malus {entry.difficulty}
				{:else if entry.difficulty < 0}
					mit Bonus {-entry.difficulty}
				{/if}
			</div>
			<div>
				{#each entry.begabung as [b, n]}
					<small>
						{b} <span style="float: right;">{n}</span>
					</small><br />
				{/each}
			</div>
			<table class="probe-werte">
				<tr>
					{#each entry.roles as r}
						<td>
							{getText(r.name, char)}
						</td>
					{/each}
				</tr>
				<tr>
					{#each entry.roles as r}
						<td>
							<span class:miss={(r.substituted ?? r.role) < r.target}>
								{#if r.substituted === undefined}
									{r.role}
								{:else}
									<del>{r.role}</del>{r.substituted}
								{/if}
								≥ {r.target}
							</span>
						</td>
					{/each}
				</tr>
				{#if $glüksPunkte >= 2 && entry.roles.some((r) => (r.substituted ?? r.role) < r.target && (r.substituted ?? r.role) > 1)}
					<tr>
						{#each entry.roles as r}
							<td>
								{#if (r.substituted ?? r.role) < r.target && (r.substituted ?? r.role) > 1}
									<a
										href="#"
										on:click={(e) => {
											e.preventDefault();
											reduce(r, entry);
										}}>Reduzieren (-2 GlP)</a
									>
								{/if}
							</td>
						{/each}
					</tr>
				{/if}
			</table>

			<strong>
				Qualität: {#if entry.roles.filter((x) => (x.substituted ?? x.role) == 1).length > 1}
					<span class="miss">Patzer</span>
				{:else if entry.roles.filter((x) => (x.substituted ?? x.role) == 20).length > 1}
					<span class="luky">Glück {entry.quality}<small>({entry.tawResult})</small></span>
				{:else if entry.tawResult < 0}
					<span class="miss">Fehlschlag</span>
				{:else}
					<span>{entry.quality}<small>({entry.tawResult})</small></span>
				{/if}
			</strong>
		{/if}
	</div>
{/each}

<style lang="scss">
	.miss {
		color: var(--del-color);
	}

	.luky {
		color: var(--primary);
	}

	.log {
		max-width: 30rem;
		background-color: var(--card-background-color);
		width: 100%;
		border-right: 1px solid var(--primary);
		// margin-bottom: 1rem;
		padding: 1rem;
		padding-top: 2.5rem;
		border-bottom: 1px var(--muted-border-color) solid;
	}
	.log:nth-of-type(1) {
		padding-top: 0.5rem;
		border-top: 1px solid var(--primary);
		border-right: 1px solid var(--primary);
		position: sticky;
		bottom: 00px;
		// top: calc(100vh - 100px);
	}

	aside {
		background-color: var(--card-background-color);

		// left: 0px;
		// bottom: calc(-1 * (100% - 1px));

		width: 100%;

		width: calc((100vw - var(--content-size)) / 2 - 30px);
		max-width: 20;
		// max-height: 40rem;
		// overflow: auto;
		& > div {
			margin-bottom: 1rem;
			padding: 0.5rem;
			border-bottom: 1px var(--muted-border-color) solid;
		}
		& > :nth-child(5) {
			position: sticky;
			bottom: 00px;
			background-color: red;
		}
		.probe-werte {
		}
	}
</style>
