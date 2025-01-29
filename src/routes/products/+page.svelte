<script lang="ts">
	import FileUpload from '$lib/components/products/FileUpload.svelte';
	import ProductTshirt from '$lib/components/products/Product_Tshirt.svelte';
	import ProductMug from '$lib/components/products/Product_Mug.svelte';

	let globalImage: string | null = null;
	let localImage: string | null = null; // Add this line

	function handleGlobalUpload(imageUrl: string) {
		globalImage = imageUrl;
	}
</script>

<div class="product-wrapper h-[2000px] w-full">
	<FileUpload imageUpload={handleGlobalUpload} />

	<div class="flex gap-4">
		<ProductTshirt
			{globalImage}
			bind:localImage
			left={105}
			top={90}
			width={190}
			height={250}
			stroke="transparent"
			strokeWidth={1}
		/>
		<ProductMug
			{globalImage}
			bind:localImage
			productImage="/mug.png"
			left={105}
			top={90}
			width={190}
			height={250}
			stroke="transparent"
			strokeWidth={1}
		/>
	</div>
</div>

<style>
</style>
