<script>
	import { ChevronLeft } from 'lucide-svelte/icons';

	export let isOpen; // State to control sidebar visibility
	export let toggleSidebar; // Function to toggle sidebar state
</script>

<nav class="fixed left-0 right-0 top-0 z-50 border-b border-gray-700 bg-gray-800 text-white">
	<div class="relative flex items-center justify-center px-4 py-2">
		<!-- Collapse Button -->
		<button
			onclick={toggleSidebar}
			class="absolute left-1 top-1/2 -translate-y-1/2 rounded p-2 text-white hover:bg-gray-700"
		>
			<ChevronLeft
				class={`h-6 w-6 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
			/>
		</button>

		<div class="logo absolute left-10 p-2">
			<div class="mx-auto flex flex-1 items-center justify-center gap-3">
				<img src="/logo.png" alt="Logo" class="h-8 w-8" />
				<span class="text-lg font-bold">My Dashboard</span>
			</div>
		</div>

		<!-- Right Side -->
		<div class="flex items-center gap-4">
			<button class="rounded bg-gray-700 px-3 py-2 text-sm hover:bg-gray-600"> Login </button>
		</div>
	</div>
</nav>
