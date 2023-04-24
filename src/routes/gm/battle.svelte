<script lang="ts">
	import { Data } from 'src/models/Data';
	import { v4 as uuidv4 } from 'uuid';
	import type { ConnectionGM, userHolderWithChar } from './connection';
	import PlayerBattleData from './playerBattleData.svelte';
	import { getText, getTextTalent } from 'src/misc/misc';
	import { CharacterState } from 'src/models/CharacterState';
	import { Charakter } from 'src/models/Character';
	import { get } from 'svelte/store';
	import { getAdjectiv } from 'src/misc/adjaktive';
	import { concat, sort, xgcd } from 'mathjs';
	import { deepEqual } from 'ts-deep-equal';

	export let connection: ConnectionGM;

	$: users = connection.Users;
	$: players = Object.values($users).filter(
		(x): x is userHolderWithChar => typeof x.playerName === 'string' && x.playerName.length > 0
	);

	$: data = players[0]?.char.stammdaten as Data | undefined;
	$: meleWeapons = Object.values(data?.nahkampfMap ?? {});

	/////////////////////////////////////////////////////////////////
	////////////////////////NPC//////////////////////////////////////
	/////////////////////////////////////////////////////////////////

	let weaponSelectionForNewNPC: string;
	let talentValueNewNPC: number[] = [];

	const npcDefaultTalnets = ['Kampfgespür', 'Ausweichen'];
	$: npcTalents = [
		...npcDefaultTalnets,
		...(data?.nahkampfMap[weaponSelectionForNewNPC]?.Talente?.Talent.map((x) => x.Id) ?? [])
	];
	let npc: CharacterState[] = [];

	$: playersAndNpc = [...players, ...npc.map((x) => ({ state: x, playerName: undefined }))].sort(
		(a, b) =>
			groups.indexOf(groupMapping[a.state.char.id] ?? '') -
			groups.indexOf(groupMapping[b.state.char.id] ?? '')
	);

	function creatNpc() {
		if (data) {
			const c = new Charakter(data, uuidv4());

			for (let i = 0; i < npcTalents.length; i++) {
				const talentId = npcTalents[i];
				while (get(c.talente[talentId].effective) < (talentValueNewNPC[i] ?? 0)) {
					const addEp = get(c.talente[talentId].nextLevelEpCost);
					c.talente[talentId].purchased.update((x) => x + addEp);
				}
			}

			const weaponId =
				weaponSelectionForNewNPC ??
				Object.keys(data.nahkampfMap)[
					Math.floor(Object.keys(data.nahkampfMap).length * Math.random())
				];

			c.equipment[weaponId].equiped.set(true);

			const male = Math.random() > 0.5;

			const adj = getAdjectiv(male ? 'male' : 'female');

			const name = male
				? `Ein ${adj} ${getText(data.nahkampfMap[weaponId].Name)} Kämpfer`
				: `Eine ${adj} ${getText(data.nahkampfMap[weaponId].Name)} Kämpferin`;
			c.nameStore.set(name);

			const state = new CharacterState(c);

			placeMapping[c.id] = places[0];
			groupMapping[c.id] = groups[1];

			npc = [...npc, state];
		}
	}

	/////////////////////////////////////////////////////////////////
	////////////////////////GRUPEN///////////////////////////////////
	/////////////////////////////////////////////////////////////////

	let groups: string[] = ['Spieler', 'Gegner'];
	let places: string[] = ['Kampfplatz'];

	let groupMapping: Record<string, (typeof groups)[number] | undefined> = {};
	let placeMapping: Record<string, (typeof places)[number] | undefined> = {};

	$: {
		for (const place of places) {
			const allHere = Object.entries(placeMapping)
				.filter(([key, value]) => value == place)
				.flatMap(([key]) => playersAndNpc.filter((x) => x.state.char.id === key));
			for (const c of allHere) {
				c.state.possibleTargets.update((oldValue) => {
					const newValue = allHere
						.map((x) => ({ id: x.state.char.id, name: get(x.state.char.nameStore) }))
						.filter((id) => groupMapping[c.state.char.id] !== groupMapping[id.id]);
					const eq = deepEqual(newValue, oldValue);
					console.log('eq', eq);
					return eq ? oldValue : newValue;
				});
			}
		}
	}
</script>

{#each places as place}
	<h4>{place}</h4>
	<div style="display: flex; gap:1rem;">
		{#each playersAndNpc as u}
			<!-- {#if u.playerName} -->
			<PlayerBattleData
				user={u}
				allGroup={groups}
				allPlace={places}
				bind:group={groupMapping[u.state.char.id]}
				bind:place={placeMapping[u.state.char.id]}
			/>

			<!-- {/if} -->
		{/each}
	</div>
{/each}

<article>
	<header>
		<button
			class="outline"
			on:click={() => {
				creatNpc();
			}}>Add NPC</button
		>
	</header>
	<select bind:value={weaponSelectionForNewNPC}>
		{#each meleWeapons as w}
			<option value={w.Id}>{getText(w.Name)}</option>
		{/each}
	</select>

	<div class="charHolder">
		{#each npcTalents as talentId, i}
			<label style="max-width: 13rem;">
				{getTextTalent(data?.talentMap[talentId])}
				<input type="number" bind:value={talentValueNewNPC[i + 1]} />
			</label>
		{/each}
	</div>
</article>

<style lang="scss">
	.charHolder {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
