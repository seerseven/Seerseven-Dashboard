<script lang="ts">
	import ProductCard from '$lib/components/products/AProductCard.svelte';
	import { colors } from '$lib/colors';
	import { Palette } from 'lucide-svelte';
	import { Canvas, FabricImage, Rect } from 'fabric';

	// Base URL for product images
	const baseUrl =
		'https://blabbttpifwpmqyddbvp.supabase.co/storage/v1/object/public/mockups/unisex-tshirt/front';

	let selectedColor = $state('White'); // Default color
	let isExpanded = $state(false); // State for the color picker

	// Dynamically compute the product image URL
	let productImage = $derived(() => `${baseUrl}/${selectedColor}.webp`);

	let {
		globalImage,
		localImage = $bindable(null),
		left = 50,
		top = 50,
		width = 200,
		height = 150,
		stroke = 'blue',
		strokeWidth = 2,
		canvasWidth = 400,
		canvasHeight = 400
	} = $props();

	let canvas: Canvas | null = null;
	let canvasElement: HTMLCanvasElement | null = null;
	let uploadedImageObject: FabricImage | null = null;

	$effect(() => {
		if (canvasElement) {
			initializeCanvas();
		}
	});

	function initializeCanvas() {
		if (canvas) {
			canvas.clear(); // Clear the canvas if it already exists
		} else if (canvasElement) {
			canvas = new Canvas(canvasElement, {
				width: canvasWidth,
				height: canvasHeight,
				backgroundColor: 'rgba(0, 0, 0, 0)',
				enableRetinaScaling: true,
				preserveObjectStacking: true
			});
		}

		addProductImage();
		addClippingRectangle();

		if (localImage || globalImage) {
			addUploadedImage(localImage || globalImage);
		}
	}

	function addProductImage() {
		const img = new Image();
		img.src = productImage();
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const fabricImg = new FabricImage(img, {
				selectable: false,
				evented: false,
				left: 0,
				top: 0,
				scaleX: canvasWidth / img.width,
				scaleY: canvasHeight / img.height
			});

			canvas?.add(fabricImg);
			canvas?.sendObjectToBack(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load product image:', productImage());
		};
	}

	function addClippingRectangle() {
		const rect = new Rect({
			left,
			top,
			width,
			height,
			fill: 'rgba(0, 0, 0, 0)', // Transparent fill
			stroke,
			strokeWidth,
			selectable: false, // Non-interactive
			evented: false
		});

		canvas?.add(rect);
		canvas?.renderAll();
	}

	function addUploadedImage(imageUrl: string) {
		if (uploadedImageObject) {
			canvas?.remove(uploadedImageObject);
		}

		const img = new Image();
		img.src = imageUrl;
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const scaleX = width / img.width;
			const scaleY = height / img.height;
			const scale = Math.min(scaleX, scaleY);

			const fabricImg = new FabricImage(img, {
				left: left + width / 2,
				top: top + height / 2,
				originX: 'center',
				originY: 'center',
				scaleX: scale,
				scaleY: scale,
				selectable: true,
				clipPath: new Rect({
					left,
					top,
					width,
					height,
					absolutePositioned: true
				})
			});

			fabricImg.set('data', { type: 'uploaded' });
			uploadedImageObject = fabricImg;

			canvas?.add(fabricImg);
			canvas?.bringObjectToFront(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load uploaded image:', imageUrl);
		};
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	function selectColor(color: string) {
		selectedColor = color;
		initializeCanvas();
		isExpanded = false;
	}
</script>

<ProductCard productType="T-Shirt" {globalImage} bind:localImage>
	<canvas
		bind:this={canvasElement}
		id="tshirt-canvas"
		class="mockup-canvas pointer-events-auto rounded-t-lg"
	></canvas>

	<!-- Color Picker Button -->
	<div class="relative">
		<!-- Expandable Color Picker Button -->
		<button
			class="absolute bottom-2 left-2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 focus:outline-none"
			onclick={toggleExpand}
			aria-expanded={isExpanded}
			aria-label="Toggle color picker"
		>
			<Palette class="h-6 w-6" />
		</button>

		<!-- Expanded Color Picker -->
		<div
			class={`absolute bottom-0 left-0 right-0 z-10 bg-slate-900 transition-all duration-300 ease-in-out ${
				isExpanded ? 'h-[calc(100%-20px)]' : 'h-0'
			}`}
			style="overflow: hidden; border-radius: 8px 8px 0 0;"
		>
			<div
				class={`grid h-full w-full grid-cols-6 gap-2 p-4 ${
					isExpanded ? 'opacity-100' : 'opacity-0'
				} transition-opacity duration-300`}
			>
				{#each colors as color}
					<div
						role="button"
						tabindex="0"
						class="h-8 w-8 cursor-pointer rounded-full border-2 border-white shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500"
						style="background-color: {color.hex}"
						onclick={() => selectColor(color.name)}
						onkeydown={(event) =>
							(event.key === 'Enter' || event.key === ' ') && selectColor(color.name)}
					></div>
				{/each}
			</div>
		</div>
	</div>
</ProductCard>

<style>
	/* Adjust grid for color picker circles */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		gap: 0.5rem;
	}
</style>
