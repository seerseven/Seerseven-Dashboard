<script lang="ts">
	let { imageUpload } = $props(); // Expecting a callback function to be passed as a prop.

	let imageFile: File | null = null;
	let imageUrl: string | null = null;

	function handleFileUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file && file.type.startsWith('image/')) {
			imageFile = file;
			imageUrl = URL.createObjectURL(file);

			// Call the provided callback with the uploaded image URL
			imageUpload?.(imageUrl);
		}
	}
</script>

<div class="rounded bg-gray-800 p-4 shadow">
	<!-- Associate the label with the input -->
	<label for="upload-input" class="block text-sm font-medium text-gray-200">
		Upload Your Design
	</label>
	<input
		id="upload-input"
		type="file"
		accept="image/*"
		class="mt-2 block w-full text-sm text-gray-300 file:border-0 file:bg-gray-700 file:text-gray-400"
		onchange={handleFileUpload}
	/>
</div>
