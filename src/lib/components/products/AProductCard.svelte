<script lang="ts">
	import { ArrowUp, ArrowDown } from 'lucide-svelte'; // Import icons from Lucide

	let {
		globalImage = null,
		localImage = $bindable(null),
		productType = '',
		children = null,
		ProductColor = () => 'Add Custom Options Here'
	} = $props();

	// Handle file uploads
	function handleFileUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				localImage = reader.result as string;
				// Dispatch a custom DOM event for local upload
				dispatchEvent(new CustomEvent('localUpload', { detail: localImage }));
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div
	class="product-card card-bg relative flex w-[401px] flex-col rounded-lg border border-satori-blue/30 shadow-lg"
>
	<!-- White Background Area -->
	<div class="product-bg relative rounded-t-lg text-white" style="width: 400px; height: 400px;">
		<!-- Render children (e.g., canvas) -->
		<div class="absolute inset-0 z-10 rounded-lg">
			{@render children()}
		</div>
	</div>

	<!-- Card Content -->
	<div class="card-content flex flex-grow flex-col p-4">
		<div class="product-title my-2 px-1">
			<h2 class="mb-4 text-lg font-bold text-white">{productType}</h2>
		</div>

		<div class="product-color my-2">
			{@render ProductColor()}
		</div>

		<div class=" product-details my-4 hidden flex-grow">
			<p class="px-1 text-white">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt laborum eligendi id
			</p>
		</div>

		<!-- Buttons Section (Always at the Bottom) -->
		<div class="button-group mt-auto flex text-white">
			<!-- File Upload Section -->
			<div class="w-1/2 pr-2">
				<div class="relative w-full">
					<!-- Hidden file input -->
					<input
						id="file-upload"
						type="file"
						accept="image/*"
						onchange={handleFileUpload}
						class="absolute inset-0 z-0 w-full cursor-pointer opacity-0"
					/>
					<!-- Custom button for file upload -->
					<label
						for="file-upload"
						class="flex cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-slate-800/60 px-4 py-3 text-center text-sm text-white hover:bg-slate-700"
					>
						<ArrowUp class="mr-2 h-4 w-4" /> Upload Image
					</label>
				</div>
			</div>

			<!-- Download Button Section -->
			<div class="w-1/2 pl-2">
				<button
					class="flex w-full items-center justify-center rounded-md bg-green-700 p-3 text-sm text-white hover:bg-green-600"
				>
					<ArrowDown class="mr-2 h-4 w-4" /> Download Image
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	:root {
		--satori-blue-30: rgba(59, 130, 246, 0.3);
	}
	.card-bg {
		background: rgba(59, 130, 246, 0.3);
		background: linear-gradient(0deg, rgba(59, 130, 246, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
	}
	.product-bg {
		background-size: 100% 100%;
		background-position:
			0px 0px,
			0px 0px,
			0px 0px,
			0px 0px,
			0px 0px;
		background-image: radial-gradient(49% 81% at 45% 47%, #bec4cf45 0%, #073aff00 100%),
			radial-gradient(113% 91% at 17% -2%, #b7bdc9 1%, #ff000000 99%),
			radial-gradient(142% 91% at 83% 7%, #b7bdc9 1%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #747a8d 1%, #ff000000 99%),
			radial-gradient(142% 91% at 111% 84%, #3d486496 0%, #3d48643d 100%);
	}
</style>
