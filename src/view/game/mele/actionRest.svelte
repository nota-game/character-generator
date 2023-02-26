<script lang="ts">
	import type { CharacterState } from 'src/models/CharacterState';

	export let charData: CharacterState;

	let hours = 0.5;
	let days = 1;
</script>

<div>
	<strog style="grid-column: 1/ span 3 ; grid-row: 1; text-align: center;">Rasten</strog>
	<strog style="grid-column:  3 ; grid-row: 1; text-align: center;">Erholen</strog>
	<input bind:value={hours} type="number" style="max-width:5em; grid-column: 1; grid-row: 2;" />
	<input bind:value={days} type="number" style="max-width:5em; grid-column: 1; grid-row: 3;" />
	<button on:click={() => charData.rest(hours)} class="outline" style="grid-column: 2; grid-row: 2;"
		>Stunden</button
	>
	<button
		on:click={() => charData.restForBleeding(days)}
		class="outline"
		style="grid-column: 2; grid-row: 3;">Tage</button
	>
	<button
		on:click={() => charData.recover('full')}
		class="outline"
		style="grid-column:  3;  grid-row: 2; align-self: stretch;">Voll</button
	>
	<button
		on:click={() => charData.recover('half')}
		class="outline"
		style="grid-column:  3;  grid-row: 3; align-self: stretch;">Halb</button
	>
</div>

<style lang="scss">
	input[type='number'] {
		height: unset;
		min-width: 4em;
	}
</style>
