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

<div class="flex h-screen">
	<!-- Sidebar -->
	<Sidebar {isOpen} />

	<!-- Main Content -->
	<div class="flex flex-1 flex-col">
		<!-- Top Navigation Bar -->
		<Navbar {isOpen} {toggleSidebar} />

		<!-- Main Page Content -->
		<main class="mt-16 p-4">
			<div class="container mx-auto">
				<!-- Consistent wrapper -->
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	html {
		overflow-y: scroll; /* Forces scrollbar visibility */
	}

	.container {
		max-width: 100%; /* Ensures content doesn't shift */
	}
</style>
