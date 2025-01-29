<script lang="ts">
	import AddEmployee from '$lib/components/AddEmployee.svelte';
	import Scheduler from '$lib/components/Scheduler.svelte';
	import { writable } from 'svelte/store';
	import type { Employee } from '$lib/types';

	let employees = writable<Employee[]>([]);

	// Accept partial employee data and construct a full Employee object
	function handleAddEmployee(employee: Omit<Employee, 'totalHours' | 'totalCost' | 'schedule'>) {
		employees.update((current) => [
			...current,
			{
				...employee,
				totalHours: 0,
				totalCost: 0,
				schedule: {
					Sunday: { in: null, out: null, hours: 0 },
					Monday: { in: null, out: null, hours: 0 },
					Tuesday: { in: null, out: null, hours: 0 },
					Wednesday: { in: null, out: null, hours: 0 },
					Thursday: { in: null, out: null, hours: 0 },
					Friday: { in: null, out: null, hours: 0 },
					Saturday: { in: null, out: null, hours: 0 }
				}
			}
		]);
	}
</script>

<div class="flex flex-wrap gap-4">
	<AddEmployee addEmployee={handleAddEmployee} />
	<Scheduler employees={$employees} />
</div>
