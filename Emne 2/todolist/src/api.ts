export type Task = {
	id: number;
	name: string;
	done: boolean;
	comment?: string;
};

export const tasks: Task[] = [
	{
		id: 1,
		name: "Demonter gamle stolen",
		done: false,
	},
	{
		id: 2,
		name: "Kast pappen fra nye stolen",
		done: false,
		comment: "Flat den ut",
	},
];

export const generateNextId = () => Math.max(...tasks.map(t => t.id)) + 1;

export function createTask(task: Task) {
	tasks.push(task);
}

export function deleteTask(taskId: number) {
	const taskToDelete = tasks.find(t => t.id === taskId);
	if (taskToDelete) tasks.splice(tasks.indexOf(taskToDelete), 1);
}
