<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Employee } from '$lib/types';

	export let employees: Employee[];

	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// Store for the generated table data
	let generatedTable = writable(false);

	// Generate time options (24-hour format with AM/PM)
	function generateTimeOptions() {
		let options = [];
		for (let i = 0; i <= 24; i++) {
			const hour = i % 12 === 0 ? 12 : i % 12;
			const period = i < 12 ? 'AM' : 'PM';
			options.push({ value: i, label: `${hour} ${period}` }); // Removed ":00"
		}
		return options;
	}

	let timeOptions = generateTimeOptions();

	// Reactive function to calculate totals
	$: employees.forEach((employee) => {
		let totalHours = 0;
		let totalCost = 0;

		days.forEach((day) => {
			const inTime = employee.schedule[day]?.in ?? null;
			const outTime = employee.schedule[day]?.out ?? null;
			const dailyHours =
				inTime !== null && outTime !== null && outTime > inTime ? outTime - inTime : 0;

			employee.schedule[day].hours = dailyHours;
			totalHours += dailyHours;
			totalCost += dailyHours * employee.payRate;
		});

		employee.totalHours = totalHours;
		employee.totalCost = totalCost;
	});

	// Function to handle the "Generate" button click
	function generateTable() {
		generatedTable.set(true);
	}
</script>

<div class="rounded bg-gray-100 p-4 shadow-md">
	<h1 class="mb-4 text-2xl font-bold">Labor Scheduler</h1>

	<table class="w-full border-collapse border border-gray-300">
		<thead>
			<tr>
				<th class="border border-gray-300 px-4 py-2">Employee Name</th>
				<th class="border border-gray-300 px-4 py-2">Pay Rate</th>
				{#each days as day}
					<th colspan="3" class="border border-gray-300 px-4 py-2">{day}</th>
				{/each}
				<th class="border border-gray-300 px-4 py-2">Total Hours</th>
				<th class="border border-gray-300 px-4 py-2">Total Cost</th>
			</tr>
			<tr>
				<th colspan="2"></th>
				{#each days as day}
					<th class="border border-gray-300 px-4 py-2">IN</th>
					<th class="border border-gray-300 px-4 py-2">OUT</th>
					<th class="border border-gray-300 px-4 py-2">HRS</th>
				{/each}
				<th colspan="2"></th>
			</tr>
		</thead>
		<tbody>
			{#each employees as employee (employee.name)}
				<tr>
					<td class="border border-gray-300 px-4 py-2">{employee.name}</td>
					<td class="border border-gray-300 px-4 py-2">${employee.payRate.toFixed(2)}</td>
					{#each days as day}
						<td class="border border-gray-300 px-4 py-2">
							<select class="w-full rounded border-gray-300" bind:value={employee.schedule[day].in}>
								<option value="">Select</option>
								{#each timeOptions as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<select
								class="w-full rounded border-gray-300"
								bind:value={employee.schedule[day].out}
							>
								<option value="">Select</option>
								{#each timeOptions as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</td>
						<td class="border border-gray-300 px-4 py-2">{employee.schedule[day].hours || 0}</td>
					{/each}
					<td class="border border-gray-300 px-4 py-2">{employee.totalHours}</td>
					<td class="border border-gray-300 px-4 py-2">${employee.totalCost.toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="2" class="border border-gray-300 px-4 py-2 font-bold">Totals</td>
				{#each days as day}
					<td colspan="3" class="border border-gray-300 px-4 py-2 font-bold">
						<!-- Display total hours and total cost for the day -->
						<div>
							Total Hours: {employees.reduce(
								(sum, emp) => sum + (emp.schedule[day]?.hours || 0),
								0
							)}
						</div>
						<div>
							Total Cost: $
							{employees
								.reduce((sum, emp) => sum + (emp.schedule[day]?.hours || 0) * emp.payRate, 0)
								.toFixed(2)}
						</div>
					</td>
				{/each}
				<td class="border border-gray-300 px-4 py-2 font-bold">
					{employees.reduce((sum, emp) => sum + emp.totalHours, 0)}
				</td>
				<td class="border border-gray-300 px-4 py-2 font-bold">
					${employees.reduce((sum, emp) => sum + emp.totalCost, 0).toFixed(2)}
				</td>
			</tr>
		</tfoot>
	</table>

	<!-- Generate button -->
	<div class="mt-4">
		<button
			class="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
			onclick={generateTable}
		>
			Generate
		</button>
	</div>

	<!-- Generated table -->
	{#if $generatedTable}
		<div class="mt-8">
			<h2 class="mb-4 text-xl font-bold">Generated Table</h2>
			<table class="w-full border-collapse border border-gray-300">
				<thead>
					<tr>
						<th class="border border-gray-300 px-4 py-2">Employee Name</th>
						{#each days as day}
							<th class="border border-gray-300 px-4 py-2">{day}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each employees as employee (employee.name)}
						<tr>
							<td class="border border-gray-300 px-4 py-2">{employee.name}</td>
							{#each days as day}
								<td class="border border-gray-300 px-4 py-2">
									{employee.schedule[day].in !== null ? employee.schedule[day].in : ''}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	/* Style for removing the dropdown arrow */
	select {
		appearance: none; /* Removes the native dropdown arrow */
		-webkit-appearance: none; /* For Safari */
		-moz-appearance: none; /* For Firefox */
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 8px;
		background: #fff; /* Ensures no background-related artifacts */
		cursor: pointer;
		width: 100%;
	}

	/* Optional: Add a consistent width for all dropdowns */
	select:focus {
		outline: none;
		border-color: #0077ff; /* Optional: Add a border color on focus */
	}
</style>
