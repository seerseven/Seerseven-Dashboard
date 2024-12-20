<script lang="ts">
	let { input, output } = $state({ input: '', output: '' });

	function minifyCode() {
		output = input.replace(/\s+/g, ' ').trim();
	}
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Code Minifier</h2>
	<textarea bind:value={input} placeholder="Paste your code here" class="textarea mb-2"></textarea>
	<button onclick={minifyCode} class="button mb-2 w-full">Minify</button>
	<textarea
		bind:value={output}
		readonly
		placeholder="Minified code will appear here"
		class="textarea"
	></textarea>
</div>
