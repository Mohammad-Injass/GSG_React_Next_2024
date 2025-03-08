import TaskItem from "../../components/TaskItem";
import { Task } from "./types";

async function getTasks(): Promise<Task[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export default async function Home() {
  const tasks: Task[] = await getTasks();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Task Tracker</h1>
      <ul className="mt-4 space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </main>
  );
}
