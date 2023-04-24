<script lang="ts">
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';
	import { ConnectionGM } from './connection';
	import { base } from '$app/paths';
	import ExportView from 'src/view/exportView.svelte';
	import { get as svelteGet, type Readable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { getAgeText, getText, getTextBesonderheit, tail } from 'src/misc/misc';
	import { isBesonderheitenHolder, type Charakter } from 'src/models/Character';
	import PlayerData from './playerData.svelte';
	import { Tab, TabList, TabPanel, Tabs } from 'svelte-tabs';
	import PlayerBattleData from './playerBattleData.svelte';
	import Battle from './battle.svelte';

	let server: string | undefined = 'http://localhost:5035';

	let connection: ConnectionGM | undefined;
	$: isConnected = connection?.isConected;
	let exportText: string | undefined;
	$: users = connection?.Users;

	onMount(async () => {
		let params = new URLSearchParams(document.location.search);
		const updateParams = async () => {
			const gm = params.get('gm');
			const server = params.get('server');
			const group = params.get('group');

			if (server && gm && group) {
				if (connection) {
					await connection.Close();
				}
				connection = new ConnectionGM(server, gm, group);
				connection.SendToAll({ type: 'requestChar' });
			}
		};
		const pushState = history.pushState;
		history.pushState = function (data: any, unused: string, url?: string | URL | null) {
			pushState.apply(history, [data, unused, url]);
			params = new URLSearchParams(document.location.search);
			updateParams();
		};
		await updateParams();
	});

	onDestroy(async () => {
		if (connection) {
			await connection.Close();
		}
	});

	function shareChar(user: string) {
		if (!connection) {
			return;
		}
		const url = `${base}/play?server=${encodeURIComponent(
			connection.url
		)}&playerId=${encodeURIComponent(user)}&groupId=${encodeURIComponent(connection.group)}`;
		if (url) {
			const shareData = {
				url: url,
				text: `Join Game`
			};
			if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
				navigator.share(shareData);
			} else {
				exportText = new URL(shareData.url, document.baseURI).href;
			}
		}
	}

	function get<T>(value: Readable<T>): T;
	function get<T>(value: undefined): undefined;
	function get<T>(value: Readable<T> | undefined): T | undefined {
		if (value == undefined) {
			return undefined;
		}
		return svelteGet(value);
	}

	async function connect() {
		if (!server) {
			return;
		}
		const result = await fetch(`${server}/createGroup`);

		if (result.ok) {
			const { gm, group } = (await result.json()) as { gm: string; group: string };
			const url = new URL(`${base}/gm`, document.baseURI);

			url.searchParams.append('gm', gm);
			url.searchParams.append('group', group);
			url.searchParams.append('server', server);

			goto(url);
			// connection = new ConnectionGM(server, data.gm, data.group);
		}
	}
</script>

<ExportView bind:exportText />

<main class="container">
	{#if connection}
		{#if $isConnected}
			Connected
		{:else}
			Connecting…
		{/if}
		<Tabs initialSelectedIndex={1}>
			<TabList>
				<Tab>Übersicht</Tab>
				<Tab>Kampf</Tab>
			</TabList>

			<TabPanel>
				{#each Object.values($users ?? {}) as u}
					<article>
						<div>
							{#if !u.playerName}
								<button on:click={() => shareChar(u.id)}>Share Player Invite</button>
								<a
									rel="noreferrer"
									href={`${base}/play?server=${encodeURIComponent(
										connection.url
									)}&playerId=${encodeURIComponent(u.id)}&groupId=${encodeURIComponent(
										connection.group
									)}`}
									target="_blank">Add Player</a
								>
							{:else}
								<header>
									{#if u.char?.nameStore}
										<hgroup>
											<h1>
												{get(u.char.nameStore)}
											</h1>
											<h2>
												{u.playerName}
											</h2>
										</hgroup>
									{:else}
										<h2>
											{u.playerName}
										</h2>
									{/if}
								</header>
								{#if u.char && u.playerName}
									<PlayerData user={u} />
								{/if}
							{/if}
						</div>
					</article>
				{/each}

				<button on:click={() => connection?.AddPlayer()}>Add User</button>
			</TabPanel>

			<TabPanel>
				<Battle {connection} />
			</TabPanel>
		</Tabs>
	{:else}
		<input type="text" bind:value={server} />
		<button on:click={() => connect()}>Connect</button>
	{/if}
</main>

<style lang="scss">
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
