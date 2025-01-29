<script lang="ts">
	import ProductCard from '$lib/components/products/AProductCard.svelte';
	import { colors } from '$lib/colors';
	import { Palette } from 'lucide-svelte';
	import { Canvas, FabricImage, Rect } from 'fabric';

	// Base URL for product images
	const baseUrl =
		'https://blabbttpifwpmqyddbvp.supabase.co/storage/v1/object/public/mockups/unisex-tshirt/front';

	let selectedColor = $state('White'); // Default color

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

	function selectColor(color: string) {
		selectedColor = color;
		initializeCanvas();
	}

	let isActive = $state(false);

	function toggleShape() {
		isActive = !isActive;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			// Prevent default so space/enter doesn't scroll the page
			event.preventDefault();
			toggleShape();
		}
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
		<div
			class="icon absolute bottom-5 left-5 z-30"
			role="button"
			tabindex="0"
			onclick={toggleShape}
			onkeydown={handleKeydown}
		>
			<Palette class="h-6 w-6" />
		</div>
		<div class={`shape absolute bottom-2 left-2 z-20 ${isActive ? 'active' : ''}`}>
			<div
				class={`inner-shape mx-auto grid grid-cols-6 gap-2 overflow-y-scroll p-4 ${
					isActive ? 'open' : ''
				}`}
			>
				{#each colors as color}
					<div
						role="button"
						tabindex="0"
						class="h-8 w-8 cursor-pointer rounded-full border-2 border-white shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500"
						style="background-color: {color.hex}"
						onclick={() => {
							selectColor(color.name);
							toggleShape();
						}}
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

	.shape {
		width: 50px;
		height: 50px;
		background-color: rgb(9, 7, 21);
		border-radius: 50%;
		transition: all 500ms ease;
		cursor: pointer;
	}

	.inner-shape {
		width: 50px;
		height: 50px;
		opacity: 0;
		background-color: rgb(9, 7, 21);

		transition: all 500ms ease;
		cursor: pointer;
		--sb-track-color: #1d272b;
		--sb-thumb-color: #465365;
		--sb-size: 14px;
		overflow-y: auto;
	}

	.inner-shape::-webkit-scrollbar {
		width: var(--sb-size);
	}

	.inner-shape::-webkit-scrollbar-track {
		background: var(--sb-track-color);
		border-radius: 9px;
	}

	.inner-shape::-webkit-scrollbar-thumb {
		background: var(--sb-thumb-color);
		border-radius: 9px;
	}

	@supports not selector(::-webkit-scrollbar) {
		.inner-shape {
			scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
		}
	}
	.open {
		width: 340px;
		height: 330px;
		opacity: 1;
		padding: 1rem;
	}
	.active {
		width: 380px;
		height: 380px;
		border-radius: 1rem;
		padding: 1rem;
	}
</style>
