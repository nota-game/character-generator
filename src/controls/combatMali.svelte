<script lang="ts">
	import { filterNull, withIndex } from 'src/misc/misc';
	import type { CharacterState, meleMaliType } from 'src/models/CharacterState';
	import TooltipControl from 'src/view/char/controls/tooltipControl.svelte';
	import Sword from 'src/view/smbols/sword.svelte';
	import { noop } from 'svelte/internal';
	import type { Unsubscriber } from 'svelte/store';

	export let charData: CharacterState;

	$: Position = charData.meleMali.Position;
	$: Schmerzen = charData.meleMali.Schmerzen;

	const maliTo = 20;
	const maliDistance = [5, 5, 4, 4, 3, 3, 2, 2, 1] as const;

	const cells = Array.from({ length: maliTo }).flatMap((_, i) => {
		const distance = maliDistance[i] ?? 0;

		return [...(Array.from({ length: distance - 1 }) as undefined[]), i + 1];
	});

	$: char = charData.char;

	$: Kampfwert = char
		? Math.floor(
				(char.talente['Kampfgespür'].effective.currentValue({ defaultValue: 0 }) ?? 0) / 2 + 3
		  )
		: 0;

	let fatiqueList: ({ maliType: meleMaliType; index: number } | undefined)[] = [];

	let _: any;
	let BlutungUnregister: Unsubscriber = noop;
	let ErschöpfungUnregister: Unsubscriber = noop;

	$: [_, BlutungUnregister] = [
		BlutungUnregister(),
		Position.subscribe(generateUpdateFunction('Position'))
	];
	$: [_, ErschöpfungUnregister] = [
		ErschöpfungUnregister(),
		Schmerzen.subscribe(generateUpdateFunction('Schmerzen'))
	];

	function generateUpdateFunction(type: meleMaliType) {
		return (newNumber: number) => {
			const old = withIndex(fatiqueList).filter(([x]) => x?.maliType == type);

			for (let i = old.length; i > newNumber; i--) {
				const [, indexToDelete] = old[old.length - i] ?? [undefined, undefined];
				if (indexToDelete != undefined) {
					fatiqueList[indexToDelete] = undefined;
				}
			}
			for (let i = old.length; i < newNumber; i++) {
				fatiqueList.push({ maliType: type, index: i });
			}
			upadateFatiqu();
		};
	}

	function upadateFatiqu() {
		const newList = filterNull(fatiqueList);
		newList.forEach((x, i) => (x.index = i));
		fatiqueList = newList;
	}
</script>

<Sword />
<div class="kampf">
	{#each withIndex(cells) as [cell, index]}
		{@const t = fatiqueList[index]}
		<div>
			{#if cell}
				{#if Kampfwert == cell}
					<span class="mark" />
				{/if}
				{cell}
			{/if}

			{#if t != undefined}
				<div class="token {t.maliType.toLocaleLowerCase()}" />
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.kampf {
		display: flex;
		gap: 0.2rem;
		padding: 0.2rem;
		flex-wrap: wrap;
		& > div {
			display: flex;
            position: relative;
			justify-content: center; /* Align horizontal */
			align-items: center; /* Align vertical */
			background-color: var(--card-background-color);
			width: 3rem;
			height: 3rem;
		}
	}
	.mark {
		position: absolute;
		// margin-left: -1.5rem;
		// margin-top: -1.5rem;
		width: calc(3rem - 4px);
		height: calc(3rem - 4px);
		border: 2px solid;
		border-color: var(--primary);
		border-radius: 100%;
	}

	.token {
		align-self: center;

		position: absolute;

		justify-self: center;
		margin: auto;

		opacity: 0.51;
		width: 1.7rem;
		height: 1.7rem;
		border-radius: 0.2rem;

		transition: all 1s;
		background-color: var(--token-color);
		// backdrop-filter: blur(5px);

		filter: blur(2px);

		box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	}

	.token.schmerzen {
		--token-color: hsl(323, 41%, 71%);
	}
	.token.position {
		--token-color: hsl(260, 8%, 37%);
	}
</style>
