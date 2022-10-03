<script lang="ts">
	import StoreManager from '../../misc/StoreManager2';

	const x = new StoreManager();

	const keyTaB1 = x.key('/talent/Singen/TaB').of<number>();
	const keyTaA1 = x.key('/talent/Singen/TaA').of<number>();
	const keyTaW1 = x.key('/talent/Singen/TaW').of<number>();

	const keyTaB2 = x.key('/talent/Tanzen/TaB').of<number>();
	const keyTaA2 = x.key('/talent/Tanzen/TaA').of<number>();
	const keyTaW2 = x.key('/talent/Tanzen/TaW').of<number>();

	const ww1 = x.derived(keyTaW1, [keyTaA1, keyTaB1], ([a, b]) => {
		return a + b;
	});
	const ww2 = x.derived(keyTaW2, [keyTaA2, keyTaB2], ([a, b]) => {
		return a + b;
	});
	const w1 = x.writable(keyTaB1, 3);
	const w2 = x.writable(keyTaB2, 3);

	const wa1 = x.writable(keyTaA1, 6);
	const wa2 = x.writable(keyTaA2, 6);
	
	const bE = x.key('bE').of<number>();
	const aE = x.key('aE').of<number>();
	const b = x.key('b').of<number>();
	const a = x.key('a').of<number>();

		


	// const ww2 = x.writable(keyTaA2, 6);
	// const w2 = x.writable(keyb, 'abc');
	const w3 = x.readable(x.key('/**/TaW').of<any>());
	const w4 = x.derived(x.key('/xxx/TaW').of<any>(),x.key('/talent/*/TaW').of<Record<string,{TaW:number}>>(), x=> 4);

		w4.subscribe(x=>console.log("w4"))
		w3.subscribe(x=>console.log("w3"))
		w2.subscribe(x=>console.log("w2"))
		w1.subscribe(x=>console.log("w1"))

	function click() {
		w1.update((x) => {
			console.log('increast');
			return x +1;
		});
	}
	function click2() {
		w2.update((x) => {
			console.log('increast');
			return x +1;
		});
	}
</script>

<h1>Hello Worlde</h1>

<div>
	{$w1}
	{$wa1}
</div>
<div>
	{$w2}
	{$wa2}
</div>
<div>
	{JSON.stringify($w3)}
</div>
<div>
{JSON.stringify($w4)}
</div>

<button on:click={click}>Press me</button>
<button on:click={click2}>Press me</button>
