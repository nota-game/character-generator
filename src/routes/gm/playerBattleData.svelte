<script lang="ts">
	import Hitman from 'src/controls/hitman.svelte';
	import type { userHolder } from './connection';
	import type { CharacterState } from 'src/models/CharacterState';

	export let user:
		| (userHolder & { playerName: string })
		| {
				playerName?: string;
				state: CharacterState;
		  };

	export let place: string | undefined;
	export let group: string | undefined;

	export let allPlace: string[];
	export let allGroup: string[];

	$: au = user.state.Ausdauer;

	$: name = user.state.char.nameStore;

	$: Blutung = user.state.fatique.Blutung;
	$: Erschöpfung = user.state.fatique.Erschöpfung;
	$: Strapazierung = user.state.fatique.Strapazierung;
	$: Verausgabung = user.state.fatique.Verausgabung;
</script>

<article>
	<header>
		<strong>{user.playerName ?? ''}</strong> <em>{$name}</em>
	</header>
	Ausdauer :{$au} / {user.state.MaxAussdauer} (B{$Blutung}/E{$Erschöpfung}/S{$Strapazierung}/V{$Verausgabung})

	<div style="max-width: 10rem;">
		<Hitman charData={user.state} />
	</div>
	<select bind:value={group}>
		{#each allGroup as g}
			<option value={g}> {g} </option>
		{/each}
	</select>
	<select bind:value={place}>
		{#each allPlace as g}
			<option value={g}> {g} </option>
		{/each}
	</select>
</article>

<style lang="scss">
	article {
		width: fit-content;
	}
</style>
