<script lang="ts">
	let { a, b } = $state({ a: 0, b: 0 });
	let result = $derived(() => a + b);
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Calculator</h2>
	<input type="number" bind:value={a} placeholder="Enter first number" class="input mb-2" />
	<input type="number" bind:value={b} placeholder="Enter second number" class="input mb-2" />
	<p class="mt-2">Result: {result}</p>
</div>
