<script lang="ts">
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';
	import type SimplePeer from 'simple-peer';
	import Connection from './connection.svelte';
	import { PeerConnection } from 'src/models/Connection';

	let messageToSend = '';
	let messages: string[] = [];

	let peer: PeerConnection = new PeerConnection((data) => {
		messages = [data, ...messages];
	});

	let isConnected = peer.IsConnected;
</script>

<main>
	<Connection connection={peer} />
	{#if $isConnected}
		<input type="text" bind:value={messageToSend} />

		<button
			disabled={messageToSend.length == 0}
			on:click={() => {
				peer.send(messageToSend);
				messageToSend = '';
			}}>Send</button
		>

		{#each messages as m}
			<div>
				{m}
			</div>
		{/each}
	{/if}
</main>
