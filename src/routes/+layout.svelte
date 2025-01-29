<script lang="ts">
	import '../app.scss';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let isOpen = $state(true);

	function toggleSidebar() {
		isOpen = !isOpen;
	}

	let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden bg-gray-900">
	<!-- Sidebar (Fixed in Place) -->
	<Sidebar {isOpen} />

	<!-- Main Content Wrapper -->
	<div class="ml-[var(--sidebar-width)] flex h-screen flex-1 flex-col">
		<!-- Navbar (Fixed at the Top) -->
		<Navbar {isOpen} {toggleSidebar} />

		<!-- Main Content (Scrollable) -->
		<main class="mt-16 flex-1 overflow-auto p-4">
			<div class="container mx-auto">
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	:root {
		--sidebar-width: 250px; /* Adjust this to match your sidebar width */
	}

	.container {
		max-width: 100%;
	}
</style>
