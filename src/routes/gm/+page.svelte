<script lang="ts">
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';
	import { ConnectionGM } from './connection';
	import { base } from '$app/paths';
	import ExportView from 'src/view/exportView.svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let server: string | undefined = 'http://localhost:5035';

	let connection: ConnectionGM | undefined;
	let exportText: string | undefined;
	$: users = connection?.Users;

	onMount(() => {
		let params = new URLSearchParams(document.location.search);
		const updateParams = () => {
			const gm = params.get('gm');
			const server = params.get('server');
			const group = params.get('group');

			if (server && gm && group) {
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
		updateParams();
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

<main>
	{#if connection}
		Connected

		{#each Object.values($users ?? {}) as u}
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
					{u.playerName} -
					{#if u.char?.nameStore}
						{get(u.char.nameStore)}
					{/if}
				{/if}
			</div>
		{/each}

		<button on:click={() => connection?.AddPlayer()}>Add User</button>
	{:else}
		<input type="text" bind:value={server} />
		<button on:click={() => connect()}>Connect</button>
	{/if}
</main>
