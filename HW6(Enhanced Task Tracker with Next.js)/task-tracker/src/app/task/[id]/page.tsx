"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Task } from "../../types";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Task not found");
        return res.json();
      })
      .then((data: Task) => setTask(data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p className="text-red-500">Task not found.</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>

      <Image src="/task.png" alt="Task image" width={300} height={200} className="my-4" />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigator.clipboard.writeText(task.title)}
      >
        Copy Task Title
      </button>

      <button className="mt-4 block text-blue-600" onClick={() => router.push("/")}>
        Back to Tasks
      </button>
    </div>
  );
}
