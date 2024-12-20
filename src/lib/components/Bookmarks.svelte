<script lang="ts">
	let bookmarks = $state<string[]>([]);
	let newBookmark = $state('');

	function addBookmark() {
		if (newBookmark.trim()) {
			bookmarks.push(newBookmark);
			newBookmark = '';
		}
	}

	function removeBookmark(index: number) {
		bookmarks = bookmarks.filter((_, i) => i !== index);
	}
</script>

<div class="widget rounded border p-4 shadow-lg">
	<h2 class="mb-2 text-lg font-bold">Bookmarks</h2>
	<div>
		<input
			type="text"
			bind:value={newBookmark}
			placeholder="Enter a bookmark"
			class="input mb-2 w-full"
		/>
		<button onclick={addBookmark} class="button w-full">Add</button>
	</div>
	<ul class="mt-4 list-inside list-disc">
		{#each bookmarks as bookmark, i}
			<li class="flex items-center justify-between">
				<span>{bookmark}</span>
				<button onclick={() => removeBookmark(i)} class="text-red-500">Remove</button>
			</li>
		{/each}
	</ul>
</div>
