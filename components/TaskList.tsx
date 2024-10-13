import { Calendar, MoreHorizontal, Tag } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { TaskProps } from "@/lib/types";

type TaskListProps = {
  tasks: TaskProps[];
  onToggleComplete: (id: number) => void;
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  isEditable: boolean;
};

// TaskList component
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  isEditable,
}) => (
  <ul className="space-y-2">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm"
      >
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          disabled={!isEditable}
        />
        <div className="flex-grow">
          <p
            className={`font-medium ${
              task.completed ? "line-through" : ""
            } text-gray-700`}
          >
            {task.title}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar size={14} />
            <span>
              {task.dueDate ? task.dueDate.toLocaleDateString() : "No Due Date"}
            </span>
            <Tag size={14} />
            <span>{task.tag}</span>
          </div>
        </div>
        {isEditable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => onEditTask(task.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onDeleteTask(task.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </li>
    ))}
  </ul>
);
