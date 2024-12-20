<script lang="ts">
	let { value, unitFrom, unitTo, result } = $state({
		value: 0,
		unitFrom: 'Celsius',
		unitTo: 'Fahrenheit',
		result: 0
	});

	function convert() {
		if (unitFrom === 'Celsius' && unitTo === 'Fahrenheit') {
			result = (value * 9) / 5 + 32;
		} else if (unitFrom === 'Fahrenheit' && unitTo === 'Celsius') {
			result = ((value - 32) * 5) / 9;
		} else {
			result = value;
		}
	}
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Conversion Tables</h2>
	<input type="number" bind:value placeholder="Enter value" class="input mb-2" />
	<div class="mb-2 flex justify-between">
		<select bind:value={unitFrom} class="select">
			<option>Celsius</option>
			<option>Fahrenheit</option>
		</select>
		<select bind:value={unitTo} class="select">
			<option>Celsius</option>
			<option>Fahrenheit</option>
		</select>
	</div>
	<button onclick={convert} class="button w-full">Convert</button>
	<p class="mt-2">Result: {result}</p>
</div>
