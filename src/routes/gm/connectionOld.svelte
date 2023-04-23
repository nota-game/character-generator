<script lang="ts">
	import {} from '@picocss/pico/css/pico.css';
	import {} from 'src/css/theme.css';
	import pako from 'pako';

	import * as signalR from "@microsoft/signalr";

	import * as base64 from 'universal-base64';
	import * as base64Binary from 'base64-uint8';
	import SimplePeer from 'simple-peer';
	import ecoji from 'ecoji-js';

	import type { PeerConnection } from 'src/models/Connection';
	import { get } from 'svelte/store';

	import { getImage } from 'src/misc/baseImage';

	export let connection: PeerConnection;

	let peer: SimplePeer.Instance | undefined;

	let codeIncommingOffer: string = '';
	let invite: SimplePeer.SignalData | undefined;
	let codeOutgoingOffer: string = '';
	let imageOutgoingOffer: string = '';
	let offerAnswer: (data: SimplePeer.SignalData) => void | undefined;

	let codeIncommingAnswer: string = '';
	let answer: SimplePeer.SignalData | undefined;
	let codeOutgoingAnswer: string = '';

	let viewDialogInvite = false;
	let viewDialogAnswer = false;

	$: {
		if (peer != undefined && !get(connection.IsConnected)) {
			connection.registerPeer(peer);
		}
	}

	$: {
		try {
			if (codeIncommingOffer.length > 0) {
				const decoded = ecoji.decode(codeIncommingOffer);
				const parsed = JSON.parse(decoded);

				const unescape = Object.fromEntries(
					Object.entries(parsed).map(
						([key, value]) =>
							[key, typeof value == 'string' ? base64.decode(value) : value] as const
					)
				);

				invite = unescape as any;

				if (invite?.type != 'offer') {
					invite = undefined;
				}
			}
		} catch (error) {
			console.error(error);
			invite = undefined;
		}
	}
	$: {
		try {
			if (codeIncommingAnswer.length > 0) {
				const decoded = ecoji.decode(codeIncommingAnswer);
				const parsed = JSON.parse(decoded);

				const unescape = Object.fromEntries(
					Object.entries(parsed).map(
						([key, value]) =>
							[key, typeof value == 'string' ? base64.decode(value) : value] as const
					)
				);

				answer = unescape as any;

				if (answer?.type != 'answer') {
					answer = undefined;
				}
				if (answer) {
					offerAnswer(answer);
				}
			}
		} catch (error) {
			console.error(error);
			answer = undefined;
		}
	}

	function generateAnswer(invite: SimplePeer.SignalData) {
		const p = new SimplePeer({
			initiator: false,
			trickle: false,
			offerOptions:{
				offerToReceiveAudio:false,
				offerToReceiveVideo:false,
			}
		});

		p.on('error', (err) => console.log('error', err));

		p.on('signal', (data) => {
			console.log('SIGNAL', JSON.stringify(data));
			
			const escaped = Object.fromEntries(
				Object.entries(data).map(
					([key, value]) => [key, typeof value == 'string' ? base64.encode(value) : value] as const
				)
				);
				
				const str = JSON.stringify(escaped);
				console.log('SIGNAL', str);
				console.log('GZip', pako.gzip( str));
				


			const encodede = ecoji.encode(str);

			codeOutgoingAnswer = encodede;
			navigator.clipboard.writeText(codeOutgoingAnswer);
		});

		p.on('connect', () => {
			console.log('CONNECT');
			peer = p;
			p.send('whatever' + Math.random());
		});

		p.on('data', (data) => {
			console.log('data: ' + data);
		});

		p.signal(invite);
		viewDialogAnswer = true;
	}

	function generateInvite() {
		const p = new SimplePeer({
			initiator: true,
			trickle: false
		});

		p.on('error', (err) => console.log('error', err));

		p.on('signal', async (data) => {
			console.log('SIGNAL', JSON.stringify(data));

			const escaped = Object.fromEntries(
				Object.entries(data).map(
					([key, value]) => [key, typeof value == 'string' ? base64.encode(value) : value] as const
				)
			);

			const str = JSON.stringify(escaped);
			const encodede = ecoji.encode(str);

			console.log('SIGNAL', str);
				console.log('GZip', base64Binary.encode(pako.gzip( str)));
				

			const image = await getImage(str);

			imageOutgoingOffer = image.url;

			codeOutgoingOffer = encodede;
			navigator.clipboard.writeText(codeOutgoingOffer);
		});

		p.on('connect', () => {
			console.log('CONNECT');
			peer = p;
			p.send('whatever' + Math.random());
		});

		p.on('data', (data) => {
			console.log('data: ' + data);
		});
		offerAnswer = (data) => {
			p.signal(data);
		};

		viewDialogInvite = true;
	}
</script>

{#if peer == undefined}
	<article>
		<label>
			Einladungscode
			<input type="text" bind:value={codeIncommingOffer} />
		</label>

		<button
			on:click={() => {
				if (codeIncommingOffer.length > 0 && invite) {
					generateAnswer(invite);
				} else {
					generateInvite();
				}
			}}
			disabled={codeIncommingOffer.length > 0 && (invite == undefined || invite.type != 'offer')}
			>{codeIncommingOffer.length > 0 && invite
				? 'Einladung Annehmen'
				: 'Einladung Generieren'}</button
		>
	</article>

	<dialog open={viewDialogInvite}>
		{#if codeOutgoingOffer}
			<article>
				<img src={imageOutgoingOffer} alt="Code image" width="400" style="image-rendering: pixelated;" />
				<details>
					<summary> Einladungscode </summary>
					{codeOutgoingOffer}
				</details>

				<button
					class="outline clipboard"
					on:click={() => navigator.clipboard.writeText(codeOutgoingOffer)}
					>Copy to clipboard</button
				>

				<label>
					Antwort
					<input type="text" bind:value={codeIncommingAnswer} />
				</label>
			</article>
		{:else}
			<span aria-busy="true"> Generiere Einlading </span>
		{/if}
	</dialog>
	<dialog open={viewDialogAnswer}>
		{#if codeOutgoingAnswer}
			<article>
				<div>
					{codeOutgoingAnswer}
				</div>
				<button
					class="outline clipboard"
					on:click={() => navigator.clipboard.writeText(codeOutgoingAnswer)}
					>Copy to clipboard</button
				>

				<footer>
					<span aria-busy="true"> Warte auf Gegenpart </span>
				</footer>
			</article>
		{:else}
			<span aria-busy="true"> Generiere Einlading </span>
		{/if}
	</dialog>
{/if}

<style>
</style>
