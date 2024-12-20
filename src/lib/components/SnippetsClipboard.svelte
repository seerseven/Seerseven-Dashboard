<script lang="ts">
	let { snippets, newSnippet } = $state({ snippets: [], newSnippet: '' });

	function addSnippet() {
		if (newSnippet.trim()) {
			snippets.push(newSnippet);
			newSnippet = '';
		}
	}

	function copySnippet(snippet: string) {
		navigator.clipboard.writeText(snippet);
	}
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Snippets Clipboard</h2>
	<textarea bind:value={newSnippet} placeholder="Enter snippet" class="textarea mb-2"></textarea>
	<button onclick={addSnippet} class="button mb-2 w-full">Add</button>
	<ul class="list-inside list-disc">
		{#each snippets as snippet}
			<li class="flex items-center justify-between">
				<span>{snippet}</span>
				<button onclick={() => copySnippet(snippet)} class="text-blue-500"> Copy </button>
			</li>
		{/each}
	</ul>
</div>
