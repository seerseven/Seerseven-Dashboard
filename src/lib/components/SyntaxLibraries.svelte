<script lang="ts">
	let libraries = $state([
		{ name: 'HTML', syntax: '<div></div>' },
		{ name: 'CSS', syntax: 'body { margin: 0; }' },
		{ name: 'JavaScript', syntax: 'console.log("Hello World");' }
	]);

	let selectedLibrary = $state(null);
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Code Syntax Libraries</h2>
	<ul class="list-inside list-disc">
		{#each libraries as lib}
			<li>
				<button onclick={() => (selectedLibrary = lib)} class="text-blue-500">
					{lib.name}
				</button>
			</li>
		{/each}
	</ul>
	{#if selectedLibrary}
		<pre class="mt-4 rounded bg-gray-100 p-2">
          <code>{selectedLibrary.syntax}</code>
      </pre>
	{/if}
</div>
