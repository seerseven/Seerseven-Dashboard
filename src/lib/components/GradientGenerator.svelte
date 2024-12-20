<script lang="ts">
	let { color1, color2 } = $state({
		color1: '#ff0000',
		color2: '#0000ff'
	});

	let gradientFn = $derived(() => `bg-gradient-to-r from-[${color1}] to-[${color2}]`);
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Gradient Generator</h2>
	<input type="color" bind:value={color1} class="input mb-2" />
	<input type="color" bind:value={color2} class="input mb-2" />
	<p class="mt-2">
		Gradient: <code>{gradientFn()}</code>
	</p>
	<div class={`mt-4 h-12 w-full rounded ${gradientFn()}`}></div>
</div>
