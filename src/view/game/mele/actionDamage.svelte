<script lang="ts">
	import type { CharacterState } from 'src/models/CharacterState';

	export let charData: CharacterState;

</script>
<div>
    <strog style="grid-column: 1 / span 3; grid-row: 1; text-align: center;">Schaden</strog>
    <label for="blunt-damage" style="grid-column: 1; grid-row: 2; align-self: center;"
        >Wucht
    </label>
    <input id="blunt-damage" type="number" style="max-width:5em; grid-column: 2; grid-row: 2;" />
    <label for="cut-damage" style="grid-column: 1; grid-row: 3; align-self: center;"
        >Schnitt
    </label>
    <input id="cut-damage" type="number" style="max-width:5em; grid-column: 2; grid-row: 3;" />

    <select style="grid-column: 3; grid-row: 2;">
        <option value="Kopf">Kopf</option>
        <option value="Brust">Brust</option>
        <option value="Bauch">Bauch</option>
        <option value="WaffenArm">Waffen Arm</option>
        <option value="WaffenBein">Waffen Bein</option>
        <option value="SchildArm">Schild Arm</option>
        <option value="SchildBein">Schild Bein</option>
    </select>

    <button class="outline" style="grid-column: 3; grid-row: 3;">Schaden</button>
</div>


<style lang="scss">
	input[type='number'] {
		height: unset;
		min-width: 4em;
	}
</style>
