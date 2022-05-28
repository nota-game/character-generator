<script lang="ts">
	import type { BedingungsAuswahl_besonderheit, BedingungsAuswahl_misc } from 'src/data/nota.g';
	import { renderRequirement } from '../misc';

	import type { Charakter } from '../models/Character';
	import type { Data } from '../models/Data';

	export let data: Data | undefined;
	export let char: Charakter | undefined;
	export let requirement: BedingungsAuswahl_misc | BedingungsAuswahl_besonderheit | undefined;
	export let itFullfiled: boolean;

	let info = char?.getMissingRequirementsStore(requirement!);
	$: info = char?.getMissingRequirementsStore(requirement!);

	$: {
		itFullfiled = $info == undefined;
	}
</script>

{#if char && data && requirement && info && $info}
	<small class="missing">
		{renderRequirement($info, data)}
	</small>
{/if}
