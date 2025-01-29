<script lang="ts">
	// Destructure `imageUpload` callback from `$props`
	let { imageUpload } = $props(); // Callback function passed from the parent component

	let imageFile: File | null = null; // Store the uploaded file
	let imageUrl: string | null = null; // Store the generated image URL for preview or further use

	function handleFileUpload(event: Event) {
		// Extract the selected file from the input event
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file && file.type.startsWith('image/')) {
			imageFile = file; // Assign the file
			imageUrl = URL.createObjectURL(file); // Create a local object URL for the file

			// Trigger the callback function passed via props with the image URL
			imageUpload?.(imageUrl);
		}
	}
</script>

<div class="my-4 rounded bg-gray-800 p-4 shadow">
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
