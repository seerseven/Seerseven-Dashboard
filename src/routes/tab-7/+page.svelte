<script lang="ts">
	import FileUpload from '$lib/components/FileUpload.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let uploadedImage: string | null = null;

	let products = [
		{
			id: 1,
			title: 'T-Shirt',
			wholesalePrice: 10,
			retailPrice: 25,
			options: ['Small', 'Medium', 'Large'],
			details: '100% cotton T-shirt available in three sizes.',
			images: {
				base: '/tshirt.png',
				mockup: '/tshirt.png',
				example: '/tshirt.png'
			},
			placementArea: {
				left: 96,
				top: 82,
				width: 107,
				height: 160
			},
			canvasInstructions: null
		},
		{
			id: 2,
			title: 'Mug',
			wholesalePrice: 5,
			retailPrice: 15,
			options: ['11oz', '15oz'],
			details: 'Durable ceramic mug with custom print options.',
			images: {
				base: '/mug.png',
				mockup: '/mug.png',
				example: '/mug.png'
			},
			placementArea: {
				left: 88,
				top: 96,
				width: 130,
				height: 130
			},
			canvasInstructions: null
		},
		{
			id: 3,
			title: 'License Plate',
			wholesalePrice: 5,
			retailPrice: 15,
			images: {
				base: '/plate.png'
			},
			placementArea: {
				left: 15,
				top: 85,
				width: 257,
				height: 126
			},
			canvasInstructions: {
				type: 'licensePlate' // Identifier for product-specific clip path
			}
		}
	];

	function handleImageUpload(imageUrl: string) {
		console.log('Uploaded Image URL:', imageUrl); // Debug
		uploadedImage = imageUrl;
	}
</script>

<div class="bg-gray-900 text-white">
	<div class="container mx-auto py-8">
		<FileUpload imageUpload={handleImageUpload} />

		<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each products as product}
				<ProductCard {product} {uploadedImage} />
			{/each}
		</div>
	</div>
</div>
