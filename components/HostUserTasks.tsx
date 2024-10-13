import React, { useState } from "react";
import { TaskList } from "./TaskList";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import AddTaskDialog from "./AddTaskDialog";
import { TaskProps } from "@/lib/types";
 // Assuming Task type is defined in a separate file for clarity.

const HostUserTasks: React.FC = () => {
  const [userTasks, setUserTasks] = useState<TaskProps[]>([
    {
      id: 1,
      title: "Complete UX for new landing page",
      dueDate: new Date("2022-08-30T11:30:00"),
      tag: "UX",
      completed: false,
    },
    {
      id: 2,
      title: "Hire Web3 Developer to finish web3 related functions",
      dueDate: new Date("2022-08-25T11:30:00"),
      tag: "No Tag",
      completed: false,
    },
    {
      id: 3,
      title: "Zoom call with developers team, finalize features",
      dueDate: new Date("2022-08-25T10:00:00"),
      tag: "Developers",
      completed: false,
    },
    {
      id: 4,
      title: "Finalize the mobile app screens with designers",
      dueDate: new Date("2022-08-25T09:30:00"),
      tag: "Design Tag",
      completed: false,
    },
  ]);

  const handleAddTask = (title: string, dueDate: Date | null, tag: string) => {
    const newTask: TaskProps = {
      id: Date.now(),
      title,
      dueDate,
      tag,
      completed: false,
    };
    setUserTasks([...userTasks, newTask]);
  };

  const toggleUserTaskComplete = (id: number) => {
    setUserTasks(
      userTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: number) => {
    console.log(`Edit task with id: ${id}`);
  };

  const handleDeleteTask = (id: number) => {
    setUserTasks(userTasks.filter((task) => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Your Tasks</span>
          <AddTaskDialog onAddTask={handleAddTask} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={userTasks}
          onToggleComplete={toggleUserTaskComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          isEditable={true}
        />
      </CardContent>
    </Card>
  );
};

export default HostUserTasks;
