<script lang="ts">
	import { getText, intersect } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { Data } from 'src/models/Data';
	import Besonderheit from 'src/view/root/besonderheit.svelte';
	import BesonderheitControl from './besonderheitControl.svelte';

	export let data: Data;
	export let char: Charakter;

	export let category: string;

	let pathsData = data.besonderheitenCategoryMap[category];
	let filter: 'available' | 'purchased' | 'all' =
		intersect(Object.keys(pathsData), char.besonderheiten() as string[]).length > 0
			? 'purchased'
			: 'available';
</script>

<article>
	<fieldset>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={filter}
			value={'available'}
			aria-label="Verfügbar"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={filter}
			value={'purchased'}
			aria-label="gekauft"
		/>
		<input
			type="radio"
			role="switch"
			name="a"
			bind:group={filter}
			value={'all'}
			aria-label="Alle"
		/>
	</fieldset>

	{#if filter == 'all'}
		{#each Object.entries(pathsData) as [key, value]}
			<BesonderheitControl {data} key={[key]} {char} {...char.besonderheiten(key)} useFuture />
		{/each}
	{:else if filter == 'purchased'}
		{#each intersect(Object.keys(pathsData), char.besonderheiten()) as key}
			<BesonderheitControl {data} key={[key]} {char} {...char.besonderheiten(key)} useFuture />
		{/each}
	{:else}
		{#each Object.keys(pathsData) as key}
			<BesonderheitControl hideMissing {data} key={[key]} {char} {...char.besonderheiten(key)} useFuture />
		{/each}
	{/if}
</article>

<style lang="scss">
	$color: #0cf;
	fieldset {
		display: grid;
		grid-auto-flow: column;
		width: 100%;
		[type='radio'] {
			border-radius: 0px;
			margin: 0px;
			width: 100%;
			border-width: var(--border-width);
			&:first-child {
				border-top-left-radius: var(--border-radius);
				border-bottom-left-radius: var(--border-radius);
			}
			&:last-child {
				border-top-right-radius: var(--border-radius);
				border-bottom-right-radius: var(--border-radius);
			}

			padding: 0.75rem 1.25rem;
			color: #fff;
			text-transform: uppercase;
			font-size: 1rem;
			letter-spacing: 0.15rem;
			transition: all 0.3s;
			position: relative;
			overflow: hidden;
			border-color: var(--form-element-focus-color);
			background-color: var(--switch-background-color);
			z-index: 1;
			&:after {
				overflow: hidden;
				content: '';

				position: absolute;
				// text-align: center;
				bottom: 0;
				left: 0;
				width: 0%;
				height: 100%;
				// background-color: $color;
				background-color: var(--switch-checked-background-color);
				transition: all 0.3s;
				z-index: -2;
			}
			&:before {
				overflow: visible;
				content: attr(aria-label);
				word-wrap: normal;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;

				height: 100%;
				background-color: transparent;
				transition: all 0.3s;
				z-index: -1;
			}
			&:checked {
				border-width: var(--border-width);

				color: #fff;
				&::after {
					width: 100%;
				}
			}
		}
	}
</style>
