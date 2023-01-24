<script lang="ts">
	import { Charakter, type PersistanceData } from '../models/Character';
	import { Data } from '../models/Data';
	import { onMount } from 'svelte';
	import PropertiesSetter from '../view/root/propertiesSetter.svelte';
	import Besonderheit from '../view/root/besonderheit.svelte';
	import { writable } from 'svelte/store';
	import Fertigkeit from 'src/view/root/fertigkeit.svelte';
	import Talent from 'src/view/root/talent.svelte';
	import Tag from 'src/view/root/tag.svelte';
	import { filter } from 'mathjs';
	import PathLevel from 'src/view/root/pathLevel.svelte';
	import { renderRequirementMap } from 'src/misc/misc';
	import { v4 as uuidv4 } from 'uuid';
	import pako from 'pako';
	import * as base64 from 'base64-uint8';
	import CharElement from 'src/view/charElement.svelte';
	import {} from '@picocss/pico/css/pico.css';
	import Nota from 'src/view/nota.svelte';

	// let char: Charakter | undefined;

	const data = writable<undefined | Data>(undefined);

	let list: string[] = [];
	let selection: string | undefined;
	let mounted = false;
	let conflift = false;

	 let char = writable<Charakter | undefined>(undefined);

	 $: nameStore = char !== undefined ? $char?.nameStore : undefined;

	onMount(async () => {
		mounted = true;
		const dataInstance = await Data.init(false);

		list = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));

		const dataString = window.location.hash.slice(2);
		const type = window.location.hash[1];

		if (type == 'i') {
			selection = dataString;
		} else if (type == 'd') {
			console.log('found import');

			const unpacked =
				dataString[0] != '{'
					? pako.inflate(base64.decode(dataString), { to: 'string' })
					: dataString;

			const j = JSON.parse(unpacked) as PersistanceData;
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

		data.set(dataInstance);
		if (dataInstance) {
			// char = new Charakter(dataInstance, '2');
		}
	});

	function getName(key: string) {
		const ds = window.localStorage.getItem('c' + key);
		if (ds) {
			const d = JSON.parse(ds) as PersistanceData;
			return d.name;
		}
	}

	$: {
		if (mounted && window && window?.location && selection) {
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
			const j = JSON.parse(unpacked) as PersistanceData;

			if (unpacked) {
				window.localStorage.setItem('c' + j.id, unpacked);
				selection = j.id;
				conflift = false;
			}
		}
	} 
</script>

{#if conflift}
	<p>Ein Charckter mit der selben Id existiert bereits.</p>
	<button on:click={() => override()}>overrde?</button>
	<button on:click={() => reset()}>NO</button>
{:else}
	<main class="container">
		<div style="--primary-color: var(--muted-color)">
			<div style="--secondary-color: var(--primary)">
				<Nota />
			</div>
			<div class="head">
				<select id="charSelector" bind:value={selection} >
					{#each list as e}
						<option value={e}>
							{#if selection == e}
								{$nameStore}
							{:else}
								{getName(e)}
							{/if}
						</option>
					{/each}
				</select>
				<button id="newCharButton" on:click={() => add()}>Neuer Charackter</button>
			</div>

			<CharElement charId={selection} bind:char />
		</div>
	</main>
{/if}

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

	:global(.missing) {
		color: var(--form-element-invalid-border-color);
	}
	:global(a.missing:hover) {
		color: var(--form-element-invalid-active-border-color);
	}
	:global(ul *) {
		list-style: none !important;
	}
	:global(dialog) {
		z-index: 1500;
	}
</style>
