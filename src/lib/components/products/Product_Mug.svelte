<script lang="ts">
	import ProductCard from '$lib/components/products/AProductCard.svelte';
	import { Canvas, FabricImage, Rect } from 'fabric';

	let {
		globalImage,
		localImage = $bindable(null),
		productImage,
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
	let lastImageUrl: string | null = null;

	$effect(() => {
		// Reinitialize canvas if the DOM changes (e.g., HMR)
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
		const imgSrc = localImage || globalImage;
		if (imgSrc) {
			addUploadedImage(imgSrc);
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

			canvas?.add(fabricImg);
			canvas?.sendObjectToBack(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load product image:', productImage);
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
		lastImageUrl = imageUrl;

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

			canvas?.add(fabricImg);
			canvas?.bringObjectToFront(fabricImg);
			canvas?.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load uploaded image:', imageUrl);
		};
	}
</script>

<ProductCard productType="Coffee Mug" {globalImage} bind:localImage>
	<canvas
		bind:this={canvasElement}
		id="mug-canvas"
		class="mockup-canvas pointer-events-auto rounded-t-lg"
	></canvas>
</ProductCard>
