<script lang="ts">
	import ProductCard from '$lib/components/products/AProductCard.svelte';

	let globalImage: string | null = null;

	const product = {
		title: 'License Plate',
		images: {
			base: '/plate.png'
		},
		placementArea: {
			left: 20,
			top: 20,
			width: 300,
			height: 150
		}
	};
</script>

<ProductCard {product} {globalImage} />
