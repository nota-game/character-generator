<script lang="ts">
	import { filter } from 'mathjs';
	import { getText, withIndex } from 'src/misc/misc';

	import type { LogSimpleRole, modifier } from 'src/models/log/LogSimpleRole';
	import TooltipControl from 'src/view/char/controls/tooltipControl.svelte';
	import type { Readable } from 'svelte/store';
	import { stringify } from 'uuid';

	export let entry: LogSimpleRole;
	export let index: number;

	$: charState = entry.charState;
	$: char = charState.char;

	$: glüksPunkte = entry.charState.GlüksPunkte;

	$: improveWithLuckCost = entry.improveWithLuckCost;
	$: quality = entry.quality;
	$: tawResult = entry.tawResult;

	$: effectiveRoles = entry.effectiveRoles;
	let modifier: Readable<readonly modifier<'used'>[]>;
	$: modifier = entry.modifier;
	$: modifierAvailable = entry.modifierAvailable;

	$: modifierQuality = $modifier.filter(
		(x): x is modifier<'used'> & { type: 'quality' } => x.type == 'quality'
	);
	$: modifierResult = $modifier.filter(
		(x): x is modifier<'used'> & { type: 'result' } => x.type == 'result'
	);
</script>

<div id="log-{index}" class="log first">
	{#if index == 0}
		<a
			href="#log-end-1"
			on:click={(e) => {
				e.preventDefault();
				document
					.getElementById('log-end-1')
					?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}}>Zum Log Springen</a
		><br />
	{/if}

	Probe auf {getText(entry.talent.Name)}
	{#if entry.difficulty > 0}
		mit Malus {entry.difficulty}
	{:else if entry.difficulty < 0}
		mit Bonus {-entry.difficulty}
	{/if}
	<strong>
		Qualität: {#if entry.roles.filter((x) => x.role == 1).length > 1}
			<span class="miss">Patzer</span>
		{:else if entry.roles.filter((x) => x.role == 20).length > 1}
			<span class="luky">Glück {entry.quality}<small>({entry.tawResult})</small></span>
		{:else if $tawResult < 0}
			<span class="miss">Fehlschlag</span>
		{:else}
			<span
				>{$quality}{#if modifierQuality.length > 0}<TooltipControl
						>*
						<div slot="tooltip">
							<ul>
								{#each modifierQuality as q}
									<li>
										{q.text}
										{q.change < 0 ? 'verschlechtert' : 'verbessert'} die Qualität um {Math.abs(
											q.change
										)}
									</li>
								{/each}
							</ul>
						</div>
					</TooltipControl>{/if}<small
					>({$tawResult}{#if modifierResult.length > 0}<TooltipControl
							>*
							<div slot="tooltip">
								<ul>
									{#each modifierResult as q}
										<li>
											{q.text}
											{q.change < 0 ? 'verschlechtert' : 'verbessert'} das Ergebnis um {Math.abs(
												q.change
											)}
										</li>
									{/each}
								</ul>
							</div>
						</TooltipControl>{/if})</small
				></span
			>
		{/if}
	</strong>
	<table class="probe-werte">
		<tr>
			{#each entry.roles as r}
				<td>
					{getText(r.name, entry.charState.char)}
				</td>
			{/each}
		</tr>
		<tr>
			{#each withIndex($effectiveRoles) as [r, rIndex]}
				<td>
					<span class:miss={r.role < r.target}>
						{r.role}{#if $modifier.some((x) => x.roleIndex == rIndex)}<TooltipControl
								>*
								<div slot="tooltip">
									<ul>
										{#each $modifier.filter((x) => x.roleIndex == rIndex) as m}
											<li>
												{#if m.type == 'substitute'}
													{m.text} ersetzt {entry.roles[rIndex].role} für {getText(
														entry.roles[rIndex].name,
														char
													)} durch {m.change}
												{:else if m.type == 'ignore'}
													{m.text} Ignoriert {entry.roles[rIndex].role} für {getText(
														entry.roles[rIndex].name,
														char
													)}
												{:else if m.type == 'modify'}
													{m.text}
													{m.change < 0 ? 'reduziert' : 'erhöt'} den Wert des {m.roleIndex}. Würfels
													für {getText(entry.roles[rIndex].name, char)} um {Math.abs(m.change)}.
												{:else}
													{m.text}
												{/if}
											</li>
										{/each}
									</ul>
								</div>
							</TooltipControl>
						{/if}
						≥ {r.target}
					</span>
				</td>
			{/each}
		</tr>
	</table>
</div>
<div class="log">
	{#if $improveWithLuckCost != undefined}
		<a
			href="#"
			on:click={(e) => {
				e.preventDefault();
				entry.improveWithLuck();
			}}>Reduzieren (-{$improveWithLuckCost} GlP)</a
		>
	{/if}
</div>
<div class="log">
    {#if $modifierAvailable.length>0}
	<details>
		<summary>Modifikatoren</summary>
		<ul>
			{#each $modifierAvailable as mod}
				<li>
					{#if mod.type == 'addedRole'}
						{mod.text} testet zusätzlich auf {getText(mod.name, char)} mit {mod.role} ≤ {mod.target}
						{#if !$modifier.some((x) => x.id == mod.id)}
							(Nicht verwendet)
						{/if}
					{:else if mod.type == 'ignore'}
						{#if mod.roleIndex == 'any'}
							{mod.text} erlaubt einen belibigen Würfel zu ignorieren.
							{#if $modifier.some((x) => x.id == mod.id)}
								Es wird der {$modifier.filter((x) => x.id == mod.id)[0].roleIndex}. Würfel
								ignoriert.
							{:else}
								(Nicht verwendet)
							{/if}
						{:else}
							{mod.text} ignoriert {getText(entry.roles[mod.roleIndex].name, char)} mit {entry
								.roles[mod.roleIndex].role} ≤ {entry.roles[mod.roleIndex].target}.
							{#if !$modifier.some((x) => x.id == mod.id)}
								(Nicht verwendet)
							{/if}
						{/if}
					{:else if mod.type == 'substitute'}
						{#if mod.roleIndex == 'any'}
							{mod.text} erlaubt einen belibigen Würfel mit {mod.change} zu ersetzen.
							{#if $modifier.some((x) => x.id == mod.id)}
								Es wird der {$modifier.filter((x) => x.id == mod.id)[0].roleIndex}. Würfel ersetzt.
							{:else}
								(Nicht verwendet)
							{/if}
						{:else}
							{mod.text} ersetzt {getText(entry.roles[mod.roleIndex].name, char)} mit {entry.roles[
								mod.roleIndex
							].role} ≤ {entry.roles[mod.roleIndex].target}.
							{#if !$modifier.some((x) => x.id == mod.id)}
								(Nicht verwendet)
							{/if}
						{/if}
					{:else if mod.type == 'result'}
						{mod.text}
						{mod.change < 0 ? 'verschlechtert' : 'verbessert'} das Ergebniss um {mod.change}.
						{#if !$modifier.some((x) => x.id == mod.id)}
							(Nicht verwendet)
						{/if}
					{:else if mod.type == 'quality'}
						{mod.text}
						{mod.change < 0 ? 'verschlechtert' : 'verbessert'} die Qualität um {mod.change}.
						{#if !$modifier.some((x) => x.id == mod.id)}
							(Nicht verwendet)
						{/if}
					{:else if mod.type == 'modify'}
						{#if mod.roleIndex == 'any'}
							{mod.text} verändert einen belibigen Würfel um {mod.change}.
							{#if $modifier.some((x) => x.id == mod.id)}
								Es wird der {$modifier.filter((x) => x.id == mod.id)[0].roleIndex}. Würfel
								Modifiziert.
							{:else}
								(Nicht verwendet)
							{/if}
						{:else}
							{mod.text} ersetzt {getText(entry.roles[mod.roleIndex].name, char)} mit {entry.roles[
								mod.roleIndex
							].role} ≤ {entry.roles[mod.roleIndex].target}.
							{#if !$modifier.some((x) => x.id == mod.id)}
								(Nicht verwendet)
							{/if}
						{/if}
					{:else}
						<small>
							{JSON.stringify(mod)}
						</small>
					{/if}
				</li>
			{/each}
		</ul>
	</details>
    {/if}
</div>

<div class="log last" id="log-end-{index}" />

<style lang="scss">
	
	.miss {
		color: var(--del-color);
	}

	.luky {
		color: var(--primary);
	}

	table:last-child {
		margin-bottom: 0px;
	}
</style>
