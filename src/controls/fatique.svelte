<script lang="ts">
	import { filter, floor } from 'mathjs';
	import { filterNull, withIndex } from 'src/misc/misc';
	import type { Charakter } from 'src/models/Character';
	import type { fatiqueType } from 'src/models/CharacterState';
	import type { Data } from 'src/models/Data';
	import TooltipControl from 'src/view/char/controls/tooltipControl.svelte';
	import { noop } from 'svelte/internal';
	import { writable, type Unsubscriber } from 'svelte/store';

	export let char: Charakter;
	export let data: Data;

	let fatiqueList: ({ fatiqueType: fatiqueType; index: number } | undefined)[] = [];

	export let Blutung = writable(0);
	export let Erschöpfung = writable(0);
	export let Verausgabung = writable(0);
	export let Strapazierung = writable(0);

	let showWeitereDaten = false;

	const columnCount = 6;
	let au =
		char.eigenschaften['ausdauer'].effective.currentValue({
			defaultValue: 1
		}) ?? 1;
	let _: any;
	let BlutungUnregister: Unsubscriber = noop;
	let ErschöpfungUnregister: Unsubscriber = noop;
	let VerausgabungUnregister: Unsubscriber = noop;
	let StrapazierungUnregister: Unsubscriber = noop;
	$: [_, BlutungUnregister] = [
		BlutungUnregister(),
		Blutung.subscribe(generateUpdateFunction('Blutung'))
	];
	$: [_, ErschöpfungUnregister] = [
		ErschöpfungUnregister(),
		Erschöpfung.subscribe(generateUpdateFunction('Erschöpfung'))
	];
	$: [_, VerausgabungUnregister] = [
		VerausgabungUnregister(),
		Verausgabung.subscribe(generateUpdateFunction('Verausgabung'))
	];
	$: [_, StrapazierungUnregister] = [
		StrapazierungUnregister(),
		Strapazierung.subscribe(generateUpdateFunction('Strapazierung'))
	];

	function generateUpdateFunction(type: fatiqueType) {
		return (newNumber: number) => {
            
			const old = withIndex(fatiqueList).filter(([x]) => x?.fatiqueType == type);
            
			for (let i = old.length; i > newNumber; i--) {
                
				const [, indexToDelete] = old[ old.length-i] ?? [undefined, undefined];
				if (indexToDelete != undefined) {
                    fatiqueList[indexToDelete] = undefined;
				}
			}
			for (let i = old.length; i < newNumber; i++) {
				fatiqueList.push({ fatiqueType: type, index: i });
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

<div>
	<a
		href="#"
		on:click={(e) => {
			e.preventDefault();
			showWeitereDaten = !showWeitereDaten;
		}}>Weitere Daten</a
	>
	{#if showWeitereDaten}
		<label>
			Erschöpfung
			<input type="number" bind:value={$Erschöpfung} />
		</label>
		<label>
			Verausgabung
			<input type="number" bind:value={$Verausgabung} />
		</label>
		<label>
			Strapazierung
			<input type="number" bind:value={$Strapazierung} />
		</label>
		<label>
			Blutung
			<input type="number" bind:value={$Blutung} />
		</label>
	{/if}

	<div class="ausdauer" style="--columnCount:{columnCount}">
		{#each Array.from({ length: au / columnCount + 1 }).map((_, i) => i + 1) as y}
			{#each Array.from({ length: columnCount }).map((_, i) => i + 1) as x}
				{@const c = x - 1 + (y - 1) * 6 + 1}
				<div
					class="cell"
					class:mark={au == c - 1}
					class:critical={c <= 18}
					class:danger={c <= 24}
					style="grid-column: {x};grid-row: {y};"
				>
					{#if au >= c}
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<circle fill="transparent" cx="12" cy="12" r="12" />
							<text
								font-family="'MyriadPro-Regular'"
								font-size="12"
								x="12"
								y="12"
								text-anchor="middle"
								alignment-baseline="middle">{c}</text
							>
						</svg>
					{/if}
					<!-- <div class="circle">
						{c}
					</div> -->
				</div>
			{/each}
			{#each filterNull(fatiqueList) as f}
				{@const index = au - f.index - 1}
				{@const x = (index % 6) + 1}
				{@const y = Math.floor(index / 6) + 1}
				{#if x > 0 && y > 0}
					<div class="token-holder" style="grid-column: {x};grid-row: {y};">
						<TooltipControl>
							<div class="token {f.fatiqueType.toLocaleLowerCase()}" />
							<div slot="tooltip">
								<strong>{f.fatiqueType}</strong>
								{#if f.fatiqueType == 'Blutung'}
									<p>
										Pro Tag verliert ein Charakter Blutpunkte in höhe von 10% (abgerundet Minimum 1)
										seiner Ausdauer.
									</p>
									<p>
										Voraussetzung zum Abbau der Blutpunkte ist Ruhe und genügend Flüssigkeit und
										Nahrung. Andernfalls kann der Abbau geringer ausfallen.
									</p>
								{:else if f.fatiqueType == 'Erschöpfung'}
									<p>Können mit der Taktik Erholen abgebout werden</p>
									<p>Jeweils 6 abgebaute Punkte verusuchen Verausgabung.</p>
								{:else if f.fatiqueType == 'Verausgabung'}
									<p>Wird um einen Punkt Rast je halber Stunde abgebaut.</p>
									<p>
										Es können nicht mehr als 6 Punkte Angesammelt werden, alles darüber hinaus
										erzeugt Strapazierung.
									</p>
								{:else if f.fatiqueType == 'Strapazierung'}
									<p>Wird um einen Punkt Rast je 2 Stunden abgebaut.</p>
								{/if}
							</div>
						</TooltipControl>
					</div>
				{/if}
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.ausdauer {
		display: grid;
		grid-template-columns: repeat(var(--columnCount), 3rem [col-start]);
		gap: 0.2rem;
		width: fit-content;
		padding: 0.2rem;
		background-color: var(--border-color);
		& > .cell {
			background-color: var(--card-background-color);
		}
	}

	.aussdauer {
		border: 1px solid black;
		padding: 8px;
		border-collapse: collapse;
		margin-bottom: 8px;
		font-size: 7pt;
		table-layout: fixed;
		.mark {
			position: absolute;
			margin-left: -10px;
			margin-top: -10px;
			width: 30px;
			height: 30px;
			border: 2px solid;
			border-color: var(--primary);
			border-radius: 100%;
		}
	}

	table {
		width: fit-content;
	}
	td > svg {
		width: 2rem;
		height: 2rem;
	}
	.cell.danger {
		background-color: var(--muted-color);
	}
	.cell.critical {
		background-color: var(--muted-border-color);
	}
	.mark {
		background-color: black;
		color: transparent;
	}

	.circle {
		// border: 1px solid red;
		border-radius: 100px;
	}

	.token-holder {
		margin: auto;
		width: 100%;
		display: grid;
	}

	.token {
		align-self: center;

		justify-self: center;
		margin: auto;

		opacity: 0.11;
		width: 2rem;
		height: 2rem;

		transition: all 1s;
		background-color: var(--token-color);
		// backdrop-filter: blur(5px);

		filter: blur(2px);

		box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	}

	.token.blutung {
		--token-color: var(--del-color);
	}
	.token.erschöpfung {
		--token-color: hsl(202, 66%, 47%);
	}
	.token.verausgabung {
		--token-color: hsl(258, 66%, 47%);
	}
	.token.strapazierung {
		--token-color: hsl(330, 66%, 47%);
	}
</style>
