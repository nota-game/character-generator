<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import Char from './char.svelte';
	import type { CharakterData } from './models/Character';

	let list: string[] = [];
	onMount(() => {
		foo = true;
		list = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));

		const data = window.location.hash.slice(2);
		const type = window.location.hash[1];
		if (type == 'i') {
			selection = data;
		}
	});
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
		window.localStorage.setItem(`c${selection}`,'')
		list = Array.from(window.localStorage, (v, i) => window.localStorage.key(i) ?? '')
			.filter((x) => x.length > 0 && x[0] == 'c')
			.map((x) => x.slice(1));
	}


</script>

<div class="head">

	<select bind:value={selection}>
		{#each list as e}
		<option value={e}>{getName(e)}</option>
		{/each}
	</select>
	<button on:click={()=>add()} >Neuer Charackter</button>
</div>

{#if selection}
	<Char charId={selection} />
{/if}

<style lang="scss">
	.head{
		margin: 1rem;
		
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		button{
			grid-column: 2;
			grid-row: 1;
		}
	}
</style>