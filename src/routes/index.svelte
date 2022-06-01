<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import pako from 'pako';
	import * as base64 from 'base64-uint8';

	import Char from './char.svelte';
	import Armor from './controls/armor.svelte';
	import type { CharakterData } from './models/Character';

	let list: string[] = [];
	let conflift = false;
	onMount(() => {
		foo = true;
		list = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));

		const data = window.location.hash.slice(2);
		const type = window.location.hash[1];
		console.log('found import');
		console.log(type);
		if (type == 'i') {
			selection = data;
		} else if (type == 'd') {
			console.log('found import');

			const unpacked = data[0] != '{' ? pako.inflate(base64.decode(data), { to: 'string' }) : data;

			const j = JSON.parse(unpacked) as CharakterData;
			console.log('Charackter was', j);

			if (unpacked) {
				const ds = window.localStorage.getItem('c' + j.id);
				if (ds == null) {
					window.localStorage.setItem('c' + j.id, unpacked);
					selection = j.id;
				} else {
					conflift = true;
				}
			}
		}
	});

	function reset() {
		window.location.hash = '';
		conflift = false;
	}
	function override() {
		if (!conflift) return;
		const data = window.location.hash.slice(2);
		const type = window.location.hash[1];
		if (type == 'i') {
			selection = data;
		} else if (type == 'd') {
			const unpacked = data[0] != '{' ? pako.inflate(base64.decode(data), { to: 'string' }) : data;
			const j = JSON.parse(unpacked) as CharakterData;

			if (unpacked) {
				window.localStorage.setItem('c' + j.id, unpacked);
				selection = j.id;
				conflift = false;
			}
		}
	}
	function getName(key: string) {
		const ds = window.localStorage.getItem('c' + key);
		if (ds) {
			const d = JSON.parse(ds) as CharakterData;
			return d.name;
		}
	}

	let selection: string | undefined;
	let foo = false;
	$: {
		if (foo && window && window?.location && selection) {
			window.location.hash = 'i' + selection;
		}
	}

	function add() {
		selection = uuidv4();
		// hack to update
		window.localStorage.setItem(`c${selection}`, '');
		list = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));
	}
</script>

{#if conflift}
	<p>Ein Charckter mit der selben Id existiert bereits.</p>
	<button on:click={() => override()}>overrde?</button>
	<button on:click={() => reset()}>NO</button>
{:else}
	<div class="head">
		<select bind:value={selection}>
			{#each list as e}
				<option value={e}>{getName(e)}</option>
			{/each}
		</select>
		<button on:click={() => add()}>Neuer Charackter</button>
	</div>

	<Char charId={selection} />
{/if}

<style lang="scss">
	.head {
		margin: 1rem;

		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		button {
			grid-column: 2;
			grid-row: 1;
		}
	}
</style>
