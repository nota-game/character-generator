<script lang="ts">
	import { getText } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { CharacterState } from 'src/models/CharacterState';
	import type { Data } from 'src/models/Data';

	export let char: Charakter;
	export let data: Data;
	export let charData: CharacterState;

	let roleEntrys = charData.log;
</script>

{#each $roleEntrys as entry}
	<div class="log">
		{#if entry.type == 'message'}
			{entry.message}
		{:else if entry.type == 'simple-role'}
			<div>
				{getText(entry.talent.Name)}
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
	.log {
        max-width: 30rem;
		background-color: var(--card-background-color);
		width: 100%;
        border-right: 1px solid var(--primary);
		// margin-bottom: 1rem;
		padding: 1.0rem;
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
	.log:nth-of-type(1)::before {
        content: 'Log';
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
