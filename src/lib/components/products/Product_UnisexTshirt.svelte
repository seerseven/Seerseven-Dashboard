<script lang="ts">
	import ProductCard from '$lib/components/products/AProductCard.svelte';
	import { colors } from '$lib/colors';

	import { Canvas, FabricImage, Rect } from 'fabric';

	// Base URL for product images
	const baseUrl =
		'https://blabbttpifwpmqyddbvp.supabase.co/storage/v1/object/public/mockups/unisex-tshirt/front';

	let selectedColor = $state('White'); // Default color

	let productImage = $derived(`${baseUrl}/${selectedColor}.webp`);

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
	let uploadedImageObject: FabricImage | null = null; // Track the uploaded image object

	$effect(() => {
		if (canvasElement) {
			initializeCanvas();
		}
	});

	function initializeCanvas() {
		if (canvas) {
			canvas.clear(); // Clear the canvas if it already exists
		} else if (canvasElement) {
			// Create a new canvas
			canvas = new Canvas(canvasElement, {
				width: canvasWidth,
				height: canvasHeight,
				backgroundColor: 'rgba(0, 0, 0, 0)',
				enableRetinaScaling: true,
				preserveObjectStacking: true
			});
		}

		// Add the product image and clipping rectangle
		addProductImage();
		addClippingRectangle();

		// Add the uploaded image if it exists
		if (localImage || globalImage) {
			addUploadedImage(localImage || globalImage);
		}
	}

	function addProductImage() {
		const img = new Image();
		img.src = productImage;
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

			// Ensure product image is at the back of the canvas
			canvas?.add(fabricImg);
			canvas?.sendObjectToBack(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load product image:', productImage);
		};
	}

	function handleColorChange(event: Event) {
		selectedColor = (event.target as HTMLSelectElement).value;
		// Only update the product image without clearing the uploaded image
		updateProductImage();
	}

	function updateProductImage() {
		// Remove the current product image
		const productImages = canvas?.getObjects().filter((obj) => !obj.get('data')?.type); // Filter non-uploaded images
		productImages?.forEach((img) => canvas?.remove(img));

		// Add the new product image
		addProductImage();
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
			// If an uploaded image already exists, update its source
			canvas?.remove(uploadedImageObject);
		}

		const img = new Image();
		img.src = imageUrl;
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			// Scale image to fit the clipping rectangle
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
			uploadedImageObject = fabricImg; // Track the uploaded image object

			canvas?.add(fabricImg);
			canvas?.bringObjectToFront(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load uploaded image:', imageUrl);
		};
	}
</script>

<ProductCard productType="T-Shirt" {globalImage} bind:localImage>
	<canvas
		bind:this={canvasElement}
		id="tshirt-canvas"
		class="mockup-canvas pointer-events-auto rounded-t-lg"
	></canvas>

	{#snippet ProductColor()}
		<div class="select-color mt-4">
			<select
				onchange={handleColorChange}
				class="w-full rounded-md border border-slate-700 bg-slate-800 p-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40"
			>
				{#each colors as color}
					<option value={color} selected={color === selectedColor}>{color}</option>
				{/each}
			</select>
		</div>
	{/snippet}
</ProductCard>
