<script lang="ts">
	import { ArrowUp, ArrowDown } from 'lucide-svelte';

	let {
		globalImage = null,
		localImage = $bindable(null),
		productType = '',
		children = null,
		ProductColor = () => 'Add Custom Options Here'
	} = $props();

	function handleFileUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				localImage = reader.result as string;
				dispatchEvent(new CustomEvent('localUpload', { detail: localImage }));
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<!-- 🖼 Responsive Product Card -->
<div
	class="product-card card-bg border-satori-blue/30 relative flex w-full max-w-[600px] flex-col rounded-lg border shadow-lg"
>
	<!-- 🖼 Responsive Product Image/Canvas Container -->
	<div class="product-bg relative aspect-[1/1] w-full rounded-t-lg">
		<!-- Render the Canvas or Children Elements -->
		<div class="absolute inset-0 z-10 rounded-lg">
			{@render children()}
		</div>
	</div>

	<!-- 📄 Card Content -->
	<div class="card-content flex flex-grow flex-col p-4">
		<div class="product-title my-2 px-1">
			<h2 class="mb-4 text-lg font-bold text-white">{productType}</h2>
		</div>

		<!-- 🎨 Color Picker Slot -->
		<div class="product-color my-2">
			{@render ProductColor()}
		</div>

		<!-- 📜 Product Details (Optional) -->
		<div class="product-details my-4 hidden flex-grow">
			<p class="px-1 text-white">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt laborum eligendi id
			</p>
		</div>

		<!-- 📥 Upload & 📤 Download Buttons (Always at the Bottom) -->
		<div class="button-group mt-auto flex text-white">
			<!-- 📥 File Upload -->
			<div class="w-1/2 pr-2">
				<div class="relative w-full">
					<input
						id="file-upload"
						type="file"
						accept="image/*"
						onchange={handleFileUpload}
						class="absolute inset-0 z-0 w-full cursor-pointer opacity-0"
					/>
					<label
						for="file-upload"
						class="flex cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-slate-800/60 px-4 py-3 text-center text-sm text-white hover:bg-slate-700"
					>
						<ArrowUp class="mr-2 h-4 w-4" /> Upload Image
					</label>
				</div>
			</div>

			<!-- 📤 Download Button -->
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
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-image: radial-gradient(49% 81% at 45% 47%, #bec4cf45 0%, #073aff00 100%),
			radial-gradient(113% 91% at 17% -2%, #b7bdc9 1%, #ff000000 99%),
			radial-gradient(142% 91% at 83% 7%, #b7bdc9 1%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #747a8d 1%, #ff000000 99%),
			radial-gradient(142% 91% at 111% 84%, #3d486496 0%, #3d48643d 100%);
	}
</style>
