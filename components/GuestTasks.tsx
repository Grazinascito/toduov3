"use client";

import React, { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type GuestTasksProps = {
  id: number;
  title: string;
  dueDate: Date | null;
  tag: string;
  completed: boolean;
};

const GuestTasks: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [guestTasks, setGuestTasks] = useState<GuestTasksProps[]>([
    {
      id: 1,
      title: "Review project proposal",
      dueDate: new Date("2022-08-28T14:00:00"),
      tag: "Project",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare presentation slides",
      dueDate: new Date("2022-08-27T16:00:00"),
      tag: "Presentation",
      completed: true,
    },
  ]);


  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Friends Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {guestTasks.map((task) => (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.dueDate?.toLocaleDateString()}</p>
              <p>{task.tag}</p>
              <p>{task.completed ? "Completed" : "Incomplete"}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestTasks;
