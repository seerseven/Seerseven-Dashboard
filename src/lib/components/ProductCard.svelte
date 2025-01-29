<script lang="ts">
	import { Canvas, Path, Rect, FabricImage } from 'fabric';

	let { product, uploadedImage } = $props();
	let canvas: Canvas;
	let canvasElement: HTMLCanvasElement;

	// Create the license plate clipping path with width and height
	function createLicensePlateClipPath(
		left: number,
		top: number,
		width: number,
		height: number
	): Path {
		const svgPath = `
			M331.156.021L15.853.013S0-.86,0,11.471v149.725s.881,16.734,18.495,15.413l315.743.074s15.853,1.687,14.972-15.487l.035-142.679S353.174-.419,331.156.021ZM90.977,160.397l-20.849.019s-4.789.451-4.789-3.768,4.789-3.765,4.789-3.765h21.014s3.839-.248,3.839,3.881-4.005,3.633-4.005,3.633ZM90.977,22.672l-20.849.019s-4.789.451-4.789-3.768,4.789-3.765,4.789-3.765h21.014s3.839-.248,3.839,3.881-4.005,3.633-4.005,3.633ZM279.895,160.397l-20.849.019s-4.789.451-4.789-3.768,4.789-3.765,4.789-3.765h21.014s3.839-.248,3.839,3.881-4.005,3.633-4.005,3.633ZM279.895,22.672l-20.849.019s-4.789.451-4.789-3.768,4.789-3.765,4.789-3.765h21.014s3.839-.248,3.839,3.881-4.005,3.633-4.005,3.633Z
		`;

		const path = new Path(svgPath, {
			left,
			top,
			fill: null,
			stroke: 'blue',
			absolutePositioned: true,
			selectable: false,
			evented: false
		});

		// Scale the path to fit the desired width and height
		const originalWidth = 331.156; // The original width of the SVG path
		const originalHeight = 160.397; // The original height of the SVG path

		path.scaleX = width / originalWidth;
		path.scaleY = height / originalHeight;

		return path;
	}

	// Create a rectangular clipping path
	function createRectangleClipPath(): Rect {
		return new Rect({
			left: product.placementArea.left,
			top: product.placementArea.top,
			width: product.placementArea.width,
			height: product.placementArea.height,
			fill: null,
			absolutePositioned: true,
			selectable: false,
			evented: false
		});
	}

	$effect(() => {
		canvas = new Canvas(canvasElement, {
			width: 300,
			height: 300,
			backgroundColor: '#1f2937',
			enableRetinaScaling: true,
			preserveObjectStacking: true,
			fireRightClick: true,
			passive: true
		});

		addProductImage();
		addDebugOutline();

		return () => {
			canvas.dispose();
		};
	});

	$effect(() => {
		if (uploadedImage) {
			const objects = canvas.getObjects().filter((obj) => obj.get('data')?.type === 'uploaded');
			objects.forEach((obj) => canvas.remove(obj));

			addUploadedImage(uploadedImage);
		}
	});

	function addProductImage(): void {
		const img = new Image();
		img.src = product.images.base;
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const fabricImg = new FabricImage(img, {
				selectable: false,
				evented: false,
				left: 0,
				top: 0,
				scaleX: canvas.width / img.width,
				scaleY: canvas.height / img.height
			});

			canvas.add(fabricImg);
			canvas.sendObjectToBack(fabricImg);
			canvas.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load product image:', product.images.base);
		};
	}

	function addDebugOutline(): void {
		let outline;

		if (product.canvasInstructions?.type === 'licensePlate') {
			outline = createLicensePlateClipPath(
				product.placementArea.left,
				product.placementArea.top,
				product.placementArea.width,
				product.placementArea.height
			);
		} else {
			outline = new Rect({
				left: product.placementArea.left,
				top: product.placementArea.top,
				width: product.placementArea.width,
				height: product.placementArea.height,
				fill: 'rgba(0, 0, 0, 0)', // Transparent fill
				stroke: 'blue', // Blue outline for debugging
				strokeWidth: 1,
				selectable: false,
				evented: false
			});
		}

		canvas.add(outline);
		canvas.renderAll();
	}

	function addUploadedImage(url: string): void {
		const clipPath =
			product.canvasInstructions?.type === 'licensePlate'
				? createLicensePlateClipPath(
						product.placementArea.left,
						product.placementArea.top,
						product.placementArea.width,
						product.placementArea.height
					)
				: createRectangleClipPath();

		const img = new Image();
		img.src = url;
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			const scaleX = product.placementArea.width / img.width;
			const scaleY = product.placementArea.height / img.height;
			const scale = Math.min(scaleX, scaleY);

			const fabricImg = new FabricImage(img, {
				left: product.placementArea.left,
				top: product.placementArea.top,
				scaleX: scale,
				scaleY: scale,
				selectable: true,
				clipPath: clipPath // Apply the clip path
			});

			fabricImg.set('data', { type: 'uploaded' });

			canvas.add(fabricImg);
			canvas.bringObjectToFront(fabricImg);
			canvas.renderAll();
		};

		img.onerror = () => {
			console.error('Failed to load uploaded image:', url);
		};
	}
</script>

<div class="rounded bg-gray-800 p-4 shadow">
	<h3 class="text-lg font-bold text-white">{product.title}</h3>

	<div class="mt-2 flex justify-between text-sm text-gray-400">
		<span>Wholesale: ${product.wholesalePrice}</span>
		<span>Retail: ${product.retailPrice}</span>
	</div>

	<div class="relative mt-4">
		<canvas bind:this={canvasElement} class="rounded shadow"></canvas>
	</div>

	<div class="mt-4 flex items-center gap-4">
		<button class="flex-1 rounded bg-blue-600 py-2 text-white">Download</button>
		<button class="flex-1 rounded bg-green-600 py-2 text-white">Add to Cart</button>
	</div>
</div>
