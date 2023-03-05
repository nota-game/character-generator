<script lang="ts">
	import { reducedPlanckConstantDependencies } from 'mathjs';
	import { getText, tail, withIndex } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import { CharacterState, LogMessage } from 'src/models/CharacterState';
	import { LogSimpleRole } from 'src/models/log/LogSimpleRole';
	import type { Data } from 'src/models/Data';
	import SimpleRole from './log/simpleRole.svelte';
	import BattleAction from './log/battleAction.svelte';
	import { LogBattleAction } from 'src/models/log/LogBattleAction';

	export let char: Charakter;
	export let data: Data;
	export let charData: CharacterState;

	let glüksPunkte = charData.GlüksPunkte;

	let roleEntrys = charData.log;
</script>

<!-- <div class="log"> -->
{#each withIndex($roleEntrys) as [entry, index]}
	{#if entry instanceof LogMessage}
		<div id="log-{index}" class="log">
			{#if index == 0}
				<a
					class="hide-on-expand-log"
					href="#log-end-1"
					on:click={(e) => {
						e.preventDefault();
						document
							.getElementById('log-end-1')
							?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
					}}>Zum Log Springen</a
				><br />
			{/if}
			{entry.message[0]}{#if entry.message.length > 1}<a
					class="hide-on-expand-log"
					href="#log-end-1"
					on:click={(e) => {
						e.preventDefault();
						document
							.getElementById(`log-end-${index}`)
							?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
					}}>…</a
				>{/if}
		</div>
		<div class="log">
			{#each tail(entry.message) as message}
				<p>
					{message}
				</p>
			{/each}
		</div>
		<div class="log last" id="log-end-{index}" />
	{:else if entry instanceof LogBattleAction}
		<BattleAction {entry} {index} />
	{:else if entry instanceof LogSimpleRole}
		<SimpleRole {entry} {index} />
	{/if}
	<!-- </div> -->
{/each}

<style lang="scss">
	:global(.log) {
		margin-top: 0px;
		margin-bottom: 0px;
		grid-area: log;
		max-width: 30rem;
		background-color: var(--card-background-color);
		width: 100%;
		border-right: 1px solid var(--primary);
		// margin-bottom: 1rem;
		padding: 1rem;
	}
	:global(.log > p:last-child) {
		margin-bottom: 0px;
	}
	:global(.log:not(.last):empty) {
		display: none;
	}
	:global(.log.first) {
		padding-top: 2.5rem;
	}

	:global(.log:nth-of-type(1)) {
		padding-top: 0.5rem;
		border-top: 1px solid var(--primary);
		border-right: 1px solid var(--primary);
		position: sticky;
		bottom: 00px;
		// top: calc(100vh - 100px);
	}
	:global(.root.expand-log .log:nth-of-type(1)) {
		border-top: unset;
	}

	:global(.log.last) {
		border-bottom: 1px var(--muted-border-color) solid;
	}
</style>
