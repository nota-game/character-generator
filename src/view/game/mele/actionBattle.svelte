<script lang="ts">
	import type { CharacterState } from 'src/models/CharacterState';

	export let charData: CharacterState;

	let position = 1;
	let au = 1;
</script>

<div>
	<strog style="grid-column: 1/ span 3 ; grid-row: 1; text-align: center;">Kampf</strog>
	<input bind:value={position} type="number" style="max-width:5em; grid-column: 1; grid-row: 2;" />
	<input bind:value={au} type="number" style="max-width:5em; grid-column: 1; grid-row: 3;" />
	<button
		on:click={() => charData.addMeleMali('Position', position)}
		class="outline"
		style="grid-column: 2; grid-row: 2; white-space: nowrap;">Positions Mali</button
	>
	<button
		on:click={() => charData.addFatique('Erschöpfung', au)}
		class="outline"
		style="grid-column: 2; grid-row: 3; white-space: nowrap;">Ausdauer Verlust</button
	>
	<button
		on:click={() => charData.newRound()}
		class="outline"
		style="grid-column:  3;  grid-row: 2/ span 2; align-self: stretch;">Nächste Runde</button
	>
</div>

<style lang="scss">
	input[type='number'] {
		height: unset;
		min-width: 4em;
	}
</style>
