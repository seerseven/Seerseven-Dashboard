<script>
	import {
		Home,
		Layout,
		Calculator,
		Ruler,
		FileText,
		Code,
		Palette,
		Clipboard,
		BookImage
	} from 'lucide-svelte/icons';

	const tabs = [
		{ name: 'Home', href: '/', icon: Home },
		{ name: 'Products', href: '/products', icon: BookImage },
		{ name: 'Gradient Generator', href: '/gradient-generator', icon: Palette },
		{ name: 'Conversion Tables', href: '/conversion-tables', icon: Calculator },
		{ name: 'Tab 3', href: '/tab-3', icon: Layout },
		{ name: 'Tab 4', href: '/tab-4', icon: FileText },
		{ name: 'Tab 5', href: '/tab-5', icon: Code },
		{ name: 'Tab 6', href: '/tab-6', icon: Ruler },
		{ name: 'Tab 7', href: '/tab-7', icon: Clipboard }
	];

	export let isOpen;
</script>

<div
	class={`fixed left-0 top-0 flex h-screen flex-col bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-14'}`}
>
	<!-- Header with Toggle Button -->
	<div class="flex items-center justify-between p-4">
		<a href="/" class="overflow-hidden">
			<span
				class={`whitespace-nowrap text-2xl font-bold transition-opacity duration-300 ${
					isOpen ? 'opacity-100' : 'opacity-0'
				}`}
			>
				My Dashboard
			</span>
		</a>
	</div>

	<!-- Navigation Links -->
	<ul class="flex-1">
		{#each tabs as tab}
			<li class="group relative transition-all hover:bg-gray-700">
				<a href={tab.href} class="flex items-center gap-3 p-4">
					<!-- Icon: Always Visible -->
					<tab.icon class="h-5 w-5 flex-shrink-0" />

					<!-- Text with Fade Animation -->
					<span
						class={`whitespace-nowrap transition-opacity duration-300 ${
							isOpen ? 'opacity-100' : 'opacity-0'
						}`}
					>
						{tab.name}
					</span>
				</a>

				<!-- Tooltip when sidebar is collapsed -->
				{#if !isOpen}
					<span
						class="absolute left-full ml-2 rounded bg-gray-700 p-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					>
						{tab.name}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
</div>
