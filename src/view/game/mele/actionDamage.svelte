<script lang="ts">
	import type { WoundServity } from 'src/controls/hitman';
	import type {
		_Schutz,
		Trefferzonen_Definition_kampf_ausstattung as Trefferzonen_Definition_kampf_ausstattung
	} from 'src/data/nota.g';
	import type { CharacterState } from 'src/models/CharacterState';
	import { get } from 'svelte/store';

	export let charData: CharacterState;

	let zone: string = 'Brust';
	let bluntDamage = 1;
	let cutDamage = 1;

	function doDamage() {
		const zoneArmor = get(charData.char.zoneArmor)[zone];

		const blunt = Math.max(
			0,
			bluntDamage -
				Math.floor((bluntDamage - zoneArmor.Dämpfung) / (zoneArmor.Flexibilität + 1)) -
				zoneArmor.Dämpfung
		);

		console.log(`${bluntDamage} -
				Math.floor((${bluntDamage} - ${zoneArmor.Dämpfung}) / (${zoneArmor.Flexibilität} + 1)) -
				${zoneArmor.Dämpfung}`);

		const cut = Math.max(0, cutDamage - Math.max(0, zoneArmor.Härte - Math.floor(bluntDamage / 2)));
		console.log({ blunt, cut });
		charData.addDamage(zone, { blunt, cut });
	}
</script>

<div class="root">
	<strog style="grid-column: 1 / span 3; grid-row: 1; text-align: center;">Schaden</strog>
	<label for="blunt-damage" style="grid-column: 1; grid-row: 2; align-self: center;">Wucht </label>
	<input
		bind:value={bluntDamage}
		id="blunt-damage"
		type="number"
		style="grid-column: 2; grid-row: 2;"
	/>
	<label for="cut-damage" style="grid-column: 1; grid-row: 3; align-self: center;">Schnitt </label>
	<input
		bind:value={cutDamage}
		id="cut-damage"
		type="number"
		style="grid-column: 2; grid-row: 3;"
	/>

	<select bind:value={zone} style="grid-column: 3; grid-row: 2;">
		<option value="Kopf">Kopf</option>
		<option value="Brust">Brust</option>
		<option value="Bauch">Bauch</option>
		<option value="RechterArm">Waffen Arm</option>
		<option value="RechtesBein">Waffen Bein</option>
		<option value="LinkesArm">Schild Arm</option>
		<option value="LinkerBein">Schild Bein</option>
	</select>

	<button on:click={() => doDamage()} class="outline" style="grid-column: 3; grid-row: 3;"
		>Schaden</button
	>
</div>

<style lang="scss">
	input[type='number'] {
		height: unset;
		min-width: 4em;
	}
	.root {
		grid-template-columns: max-content 5em 1fr;
	}
</style>
