<script lang="ts" context="module">
	export type data = {
		points: [number, number][];
		lable: string;
	};
</script>

<script lang="ts">
	import { scaleLinear } from 'd3-scale';

	export let data: data | undefined = undefined;
	export let position: number | undefined = undefined;
	// $: console.log(data);
	// export let points: [number, number][] = [];
	export let unit: string;

	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

	type point = [number, number];
	function line(pointA: point, pointB: point) {
		const lengthX = pointB[0] - pointA[0];
		const lengthY = pointB[1] - pointA[1];
		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX)
		};
	}
	// https://francoisromain.medium.com/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
	function svgPath(points: point[],width:number,height:number, command: (points: point[], index: number,width:number,height:number) => string) {
		if (points == undefined) {
			return '';
		}
		// build the d attributes by looping over the points
		const d = points.reduce(
			(acc, point, i, a) =>
				i === 0
					? // if first point
					  `M ${xScale(point[0])},${yScale(point[1])}`
					: // else
					  `${acc} ${command(a, i,width,height)}`,
			''
		);
		return d;
	}

	function bezierCommand(a: point[], i: number,width:number,height:number) {
		const point = a[i];
		// start control point
		const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point, false,width,height);
		// end control point
		const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true,width,height);
		return `C ${xScale(cpsX)},${yScale(cpsY)} ${xScale(cpeX)},${yScale(cpeY)} ${xScale(
			point[0]
		)},${yScale(point[1])}`;
	}

	function controlPoint(
		current: point,
		previous: point | undefined,
		next: point | undefined,
		reverse: boolean,width:number,height:number
	) {
		// When 'current' is the first or last point of the array
		// 'previous' or 'next' don't exist.
		// Replace with 'current'
		const p = previous || current;
		const n = next || current;
		// The smoothing ratio
		const smoothing = 0.2;
		// Properties of the opposed-line
		const o = line(p, n);
		// If is end-control-point, add PI to the angle to go backward
		const angle = o.angle + (reverse ? Math.PI : 0);
		const length = o.length * smoothing;
		// The control point position is relative to the current point
		const x = current[0] + Math.cos(angle) * length;
		const y = current[1] + Math.sin(angle) * length;
		return [x, y];
	}

	// $: xScale = (x: number) => x;
	// $: yScale = (x: number) => x;
	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);


	$: minY = data?.points ? Math.min(...data.points.map((x) => x[1])) : 0;
	$: maxY = data?.points ? Math.max(...data.points.map((x) => x[1])) : 0;
	$: minX = data?.points ? Math.min(...data.points.map((x) => x[0])) : 0;
	$: maxX = data?.points ? Math.max(...data.points.map((x) => x[0])) : 0;
	$: minS =
		maxY >= 15
			? Math.floor(minY / 10) * 10
			: maxY >= 10
			? Math.floor(minY / 5) * 5
			: Math.max(0, minY - 1);
	$: maxS =
		maxY >= 15 ? Math.ceil(maxY / 10) * 10 : maxY >= 10 ? Math.ceil(maxY / 5) * 5 : maxY + 1;
	$: xTicks = [minX, maxX];
	$: yTicks = [minS, maxS];

	$: path = data ? svgPath(data.points,width,height, bezierCommand) : undefined;

	$: area = `${path}L${xScale(maxX,width,height)},${yScale(minS,width,height)}L${xScale(minX,width,height)},${yScale(minS,width,height)}Z`;



	function formatMobile(tick: number) {
		return "'" + tick.toString().slice(-2);
	}
</script>

{#if data?.points}
	<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
		<svg>
			<!-- y axis -->
			<g class="axis y-axis" transform="translate(0, {padding.top})">
				{#each yTicks as tick}
					<g class="tick tick-{tick}" transform="translate(0, {yScale(tick,width,height) - padding.bottom})">
						<line x2="100%" />
						<!-- <text y="-4">{tick} {tick == maxS ? ` ${unit}` : ''}</text> -->
					</g>
				{/each}
			</g>

			<!-- x axis -->
			<g class="axis x-axis">
				{#each xTicks as tick}
					<g class="tick tick-{tick}" transform="translate({xScale(tick,width,height)},{height})">
						<line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
						<text y="-2">{width > 380 ? tick : formatMobile(tick)}</text>
					</g>
				{/each}
			</g>
			<path class="path-area" d={area} />

			<!-- {#each data as d, ti}
		{@const i = data.length - ti - 1} -->

			<!-- data -->
			<path class="path-line" d={path} />

			<g>

				<g >
					{#if position}
						
					<g class="tick x-axis" transform="translate({xScale(position,width,height)},{height})">
						<line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
						<text y="-2">{width > 380 ? position : formatMobile(position)}</text>
					</g>
					
					<!-- <g class="tick" transform="translate(0, {yScale(p[1])})">
						<line x2="100%" />
						<text y="-4">{p[1]} {unit}</text>
					</g> -->

					<line
						transform="translate({xScale(position,width,height)},{height})"
						y1="-{height}"
						y2="-{padding.bottom}"
						x1="0"
						x2="0"
						stroke="#aaa"
					/>
					{/if}

					<!-- <text transform="translate({xScale(p[0])},{height})">cie</text> -->
				</g>

				
			</g>
			<!-- {/each} -->
		</svg>
	</div>
{/if}

<style>
	.hov {
		display: none;
	}
	.hov:hover,
	*:hover + .hov {
		display: unset;
	}

	circle {
		fill: transparent;
		stroke: var(--primary);
	}
	circle:hover {
		fill: var(--primary);
	}

	.hov .tick text {
		/* text-anchor: middle; */
		font-weight: bold;
		fill: var(--primary);
	}
	.hov .x-axis.tick text {
		text-anchor: middle;
	}

	.chart,
	h2,
	p {
		width: 100%;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: visible;
	}

	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: var(--primary);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}

	.path-area {
		fill: var(--primary-focus);
	}
</style>
