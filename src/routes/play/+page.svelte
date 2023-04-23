<script lang="ts">
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';

	import { base } from '$app/paths';
	import { ConnectionPlayer } from '../gm/connection';
	import { onMount } from 'svelte';
	import type { PersistanceData } from 'src/models/Character';
	import { goto } from '$app/navigation';

	// let connection: ConnectionPlayer | undefined;

	let params: URLSearchParams | undefined;
	let charList: string[] = [];
	let selection: string | undefined;
	let name: string | undefined;

	onMount(() => {
		params = new URLSearchParams(window.location.search);
		charList = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));
	});

	function getName(key: string) {
		const ds = window.localStorage.getItem('c' + key);
		if (ds) {
			const d = JSON.parse(ds) as PersistanceData;
			return d.name;
		}
	}

	function getValue(key: string) {
		const ds = window.localStorage.getItem('c' + key);
		if (ds) {
			const d = JSON.parse(ds) as PersistanceData;
			return d;
		}
	}

	async function selectChar() {
		if (!params || !selection || !name) {
			console.log('nope 1');
			return;
		}
		const server = params.get('server');
		const playerId = params.get('playerId');
		const groupId = params.get('groupId');
		if (server && playerId && groupId) {
			// connection = new ConnectionPlayer(server, playerId, groupId);

			const target = new URLSearchParams(params);
			target.append('playerName', name);
			const url = new URL('game', document.baseURI);
			url.hash = selection;
			url.search = target.toString();
			goto(url);
		}
	}
</script>

<main class="container">
	<article>
		<label>
			Character
			<select id="charSelector" bind:value={selection}>
				{#each charList as e}
					<option value={e}>
						{getName(e)}
					</option>
				{/each}
			</select>
		</label>
		<label>
			Spielername
			<input type="text" bind:value={name} />
		</label>
		<button
			disabled={!name || name.length < 0 || !selection || selection.length < 0}
			on:click={() => selectChar()}>Auswählen</button
		>
	</article>
</main>
