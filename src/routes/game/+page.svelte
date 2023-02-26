<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { Data } from 'src/models/Data';
	import { Charakter } from 'src/models/Character';

	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';

	import Hitman from 'src/controls/hitman.svelte';
	import Armor from 'src/controls/armor.svelte';
	import CloseCombatWeapon from 'src/controls/CloseCombatWeapon.svelte';

	import { writable } from 'svelte/store';
	import { doPaged } from 'src/controls/paged';

	import { localStorageChar } from 'src/misc/storage';
	import { filterNull } from 'src/misc/misc';
	import Nota from 'src/view/nota.svelte';
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';
	import Mele from 'src/view/game/mele.svelte';
	import Overview from 'src/view/game/overview.svelte';
	import Talent from 'src/view/game/talent.svelte';
	import { CharacterState } from 'src/models/CharacterState';
	import Log from 'src/view/game/log.svelte';

	let data: Data | undefined;
	let char: Charakter | undefined;

	let expandLog = false;

	let charData: CharacterState | undefined;
	$: {
		if (char != undefined) {
			charData = new CharacterState(char);
		}
	}
	let ready = false;

	onMount(async () => {
		ready = true;
		localStorageChar.subscribe(async (currentChar) => {
			if (currentChar) {
				data = await Data.init(false, currentChar?.stammdatenId);
				if (data) {
					if (currentChar) {
						char = new Charakter(data, currentChar);
					}
				}
			}
			dev.set(!window.location.pathname.includes('character-generator'));
			id.set(char?.id ?? '');
		});
		localStorageChar.updateId('c' + window.location.hash.slice(1));
		// const currentChar = local<CharakterData>('c' + window.location.hash.slice(1));
	});

	afterUpdate(() => {
		// render();
	});

	let renderPromise: undefined | Promise<void>;
	function render() {
		if (!ready) return;

		renderPromise = new Promise<void>(async (r) => {
			await renderPromise;
			document.getElementById('target')!.innerHTML = '';
			const flow = await doPaged(
				document.getElementById('source')?.innerHTML!,
				document.getElementById('target')!
			);
			// const flow = await doPaged(
			// undefined,
			// 	undefined
			// );
			r();
		});
	}

	let dev = writable(true);
	let id = writable('');
	let pageLink: string;

	$: pageLink = ($dev ? '/' : '/character-generator/') + '#i' + $id;

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

<div class="root" class:expand-log={expandLog}>
	<nav>
		<a href={pageLink} role="button" rel="external">Zum Editor</a>
		<label
			>Log Expanded
			<input type="checkbox" bind:checked={expandLog} />
		</label>
	</nav>

	<main class="container">
		{#if data && char && charData}
			<Tabs>
				<TabList>
					<Tab>Übersicht</Tab>
					<Tab>Talente</Tab>
					<Tab>Kampf</Tab>
				</TabList>
				<TabPanel>
					<Overview {charData} {char} {data} />
				</TabPanel>
				<TabPanel>
					<Talent {charData} {char} {data} />
				</TabPanel>
				<TabPanel>
					<Mele {charData} {char} {data} />
					<!-- <div class="header">
			<table style="margin: auto; border-spacing: 0.8rem ; font-size: 14pt;">
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 0) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
				<tr>
					{#each Object.values(char?.eigenschaften)
						.filter((key) => key.meta.currentValue({ defaultValue: undefined })?.gruppe == 'primär')
						.sort((a, b) => {
							return (a.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0) - (b.meta.currentValue( { defaultValue: undefined } )?.Reihenfolge ?? 0);
						})
						.filter((_, i) => i % 2 == 1) as eigenschaft}
						<td
							>{getText(eigenschaft.meta.currentValue({ defaultValue: undefined })?.Abkürzung)}
							{eigenschaft.effective.currentValue({ defaultValue: undefined }) ?? 21}</td
						>
					{/each}
				</tr>
			</table>
		</div> -->
				</TabPanel>
			</Tabs>
		{:else}
			<p>Loding…</p>
		{/if}
	</main>

	{#if data && char && charData}
		{#if expandLog}
			<div class="log-container">
				<Log {char} {charData} {data} />
			</div>
		{:else}
			<Log {char} {charData} {data} />
		{/if}
	{/if}
</div>

<style lang="scss">
	:global(.root.expand-log .hide-on-expand-log) {
		display: none;
	}
	:global(.root:not(.expand-log) .show-on-expand-log) {
		display: none;
	}
	.root.expand-log {
		display: grid !important;
		grid-template-columns: 30rem 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'header header '
			'log main'
			'footer footer';
	}

	nav {
		grid-area: header;
		height: 2.5rem;
		border-bottom: 1px solid var(--primary);
	}

	.root.expand-log main {
		grid-area: main;
		overflow-x: auto;
		height: calc(100vh - 2.5rem);
	}
	.log-container {
		grid-area: log;
		height: calc(100vh - 2.5rem);
		overflow-x: auto;
	}

	// :global() {
	:global(.missing) {
		color: brown;
	}
	:global(button.missing) {
		background-color: brown;
		color: white;
	}

	:global(.kampf-right > div:only-child) {
		grid-column: 1 / 4 !important;
	}
	// }
	* {
		box-sizing: border-box;
	}

	h6 {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		margin-bottom: 8px;
		font-weight: lighter;
	}
	.aussdauer {
		border: 1px solid black;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		font-size: 7pt;
		table-layout: fixed;
		.mark {
			position: absolute;
			margin-left: -10px;
			margin-top: -10px;
			width: 30px;
			height: 30px;
			border: 2px solid;
			border-color: var(--primary);
			border-radius: 100%;
		}
		td {
			height: 34px;
			width: 34px;
			vertical-align: middle;
			text-align: center;

			border: 1px solid;
		}
	}

	.stammdaten {
		border: 1px solid black;
		width: 100%;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		td {
			height: 40px;
		}

		th,
		td {
			border-bottom: 1px solid;
			vertical-align: baseline;
		}
		td:last-child {
			border-bottom: 1px solid;
			vertical-align: bottom;
		}

		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.eigenschaften {
		width: 100%;
		break-inside: avoid;
		margin-bottom: 1rem;
		border: 1px solid black;
		padding: 8px;
		th,
		td {
			text-align: center;
		}
		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.extra {
		border: 1px solid black;
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		& > * {
			width: 48%;
		}

		hr {
			margin-top: 0px;
			break-before: avoid;
		}
		padding: 8px;
	}
	.kampf-info {
		& > * {
			width: 280px;
			margin: 0.5rem;
		}
	}
	.list {
		& > ul {
			margin-block-start: 0px;
			margin-block-end: 0.2rem;

			padding-inline-start: 0px;
			&:empty {
				display: none;
			}
			li {
				display: inline;
				font-size: smaller;
			}
			li:not(:first-child)::before {
				content: ', ';
			}
		}
	}
	table.ḱampf {
		width: 100%;
		border: 1px solid black;
		width: 100%;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		font-size: 7pt;
		table-layout: fixed;
		.mark {
			position: absolute;
			margin-left: -10px;
			margin-top: -10px;
			width: 30px;
			height: 30px;
			border: 2px solid;
			border-color: var(--primary);
			border-radius: 100%;
		}
		td {
			height: 34px;
			vertical-align: middle;
			text-align: center;

			border: 1px solid;
		}
	}
	table.talent {
		width: 100%;
		tr:nth-child(even) {
			background-color: #f8f8f8;
		}
		th:last-child,
		td:last-child {
			text-align: right;
		}
		th:first-child,
		td:first-child {
			text-align: left;
		}
	}
	.light {
		color: lightslategray;
	}

	.kampf-right {
		display: grid;
		grid-template-columns: auto 1fr auto;
		width: 99%;
	}

	.pagebreak {
		break-before: page;
	}
	.header {
		break-before: page;
		position: running(titleRunning);
	}

	:global(.svelte-tabs__tab) {
		color: var(--h1-color) !important;
	}

	:global(.svelte-tabs__selected) {
		color: var(--primary) !important;
		border-color: var(--primary) !important;
	}
	:global(.svelte-tabs__tab:hover) {
		color: var(--primary-hover) !important;
	}
	:global(.svelte-tabs__tab:focus) {
		color: var(--primary-focus) !important;
	}
</style>
