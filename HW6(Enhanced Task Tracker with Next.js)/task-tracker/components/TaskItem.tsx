import Image from "next/image";
import Link from "next/link";
import { Task } from "../src/app/types";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    return (
        <li className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
            <Image
                src={task.completed ? "/checkmark.png" : "/clock.png"} // Local image
                alt="Status icon"
                width={24}
                height={24}
            />
            <Link href={`/task/${task.id}`} className="text-lg hover:underline">
                {task.title} ({task.completed ? "Completed" : "Pending"})
            </Link>
        </li>
    );
}
