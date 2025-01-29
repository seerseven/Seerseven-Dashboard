// src/lib/types.ts
export type ScheduleDay = { in: number | null; out: number | null; hours: number };

export type Employee = {
	name: string;
	payRate: number;
	totalHours: number;
	totalCost: number;
	schedule: Record<string, ScheduleDay>;
};
