<script lang="ts">
	import { onMount } from 'svelte';

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
</script>

<select bind:value={selection}>
	{#each list as e}
		<option value={e}>{getName(e)}</option>
	{/each}
</select>

{#if selection}
	<Char charId={selection} />
{/if}
