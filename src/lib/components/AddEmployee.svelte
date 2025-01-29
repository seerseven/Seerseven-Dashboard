<script lang="ts">
	import type { Employee } from '$lib/types';

	// Expect the parent to provide an `addEmployee` function
	export let addEmployee: (
		employee: Omit<Employee, 'totalHours' | 'totalCost' | 'schedule'>
	) => void;

	let employeeName = '';
	let payRate: number | null = null;

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (employeeName && payRate) {
			// Call the parent's addEmployee function with partial employee data
			addEmployee({ name: employeeName, payRate });
			employeeName = '';
			payRate = null;
		}
	}
</script>

<div class="rounded bg-gray-100 p-4 shadow-md">
	<h2 class="mb-4 text-xl font-bold">Add Employee</h2>
	<form onsubmit={handleSubmit} class="space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700">Employee Name</label>
			<input
				type="text"
				id="name"
				bind:value={employeeName}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				placeholder="Enter employee name"
			/>
		</div>
		<div>
			<label for="payRate" class="block text-sm font-medium text-gray-700"
				>Pay Rate (per hour)</label
			>
			<input
				type="number"
				id="payRate"
				bind:value={payRate}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				placeholder="Enter pay rate"
			/>
		</div>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white shadow"
			>Add Employee</button
		>
	</form>
</div>
