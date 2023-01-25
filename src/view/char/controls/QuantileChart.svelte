<script lang="ts">
	import Chart from 'src/controls/chart.svelte';
	import type { Quantile } from 'src/models/Character';

	export let quantile: Quantile[];
	export let position: number | undefined;
	$: points = quantile
		.map((x) => [x.Wert, 50 - Math.abs(50 - x.Quantil)])
		.filter((x) => x[0] != undefined) as [number, number][];
</script>

<Chart
	unit="%"
	{position}
	data={{
		points: points,
		lable: 't'
	}}
/>
