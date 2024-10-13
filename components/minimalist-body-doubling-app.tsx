"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Plus,
  Calendar,
  Tag,
  Play,
  Pause,
  RotateCcw,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { supabaseClient } from "../lib/services/supabase";
type Task = {
  id: number;
  title: string;
  dueDate: string;
  tag: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  isEditable: boolean;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
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
            <span>{task.dueDate}</span>
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </li>
    ))}
  </ul>
);

export default function BodyDoublingApp() {
  const [userTasks, setUserTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete UX for new landing page",
      dueDate: "30 Aug 2022 - 11:30AM",
      tag: "UX",
      completed: false,
    },
    {
      id: 2,
      title: "Hire Web3 Developer to finish web3 related functions",
      dueDate: "25 Aug 2022 - 11:30AM",
      tag: "No Tag",
      completed: false,
    },
    {
      id: 3,
      title: "Zoom call with developers team, finalize features",
      dueDate: "25 Aug 2022 - 10AM",
      tag: "Developers",
      completed: false,
    },
    {
      id: 4,
      title: "Finalize the mobile app screens with designers",
      dueDate: "25 Aug 2022 - 9:30AM",
      tag: "Design Tag",
      completed: false,
    },
  ]);
  const [friendTasks, setFriendTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review project proposal",
      dueDate: "28 Aug 2022 - 2:00PM",
      tag: "Project",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare presentation slides",
      dueDate: "27 Aug 2022 - 4:00PM",
      tag: "Presentation",
      completed: true,
    },
  ]);

  const [timer, setTimer] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("work");

  const [chatMessages, setChatMessages] = useState([
    { sender: "Friend", message: "Hey! How's your work going?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      if (timerMode === "work") {
        setTimerMode("break");
        setTimer(5 * 60);
      } else {
        setTimerMode("work");
        setTimer(25 * 60);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, timerMode]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMode("work");
    setTimer(25 * 60);
  };

  const toggleUserTaskComplete = (id: number) => {
    setUserTasks(
      userTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleFriendTaskComplete = (id: number) => {
    setFriendTasks(
      friendTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "You", message: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Body Doubling App
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-4 text-gray-700">
              {formatTime(timer)}
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <Button onClick={toggleTimer} variant="outline" size="sm">
                {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="sm">
                <RotateCcw size={18} />
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              {timerMode === "work" ? "Focus Time" : "Break Time"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Tasks</span>
                <Button size="sm">
                  <Plus size={16} className="mr-2" /> Add Task
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={userTasks}
                onToggleComplete={toggleUserTaskComplete}
                isEditable={true}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Friends Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={friendTasks}
                onToggleComplete={toggleFriendTaskComplete}
                isEditable={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "You" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.message}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow mr-2"
            />
            <Button onClick={sendMessage} variant="outline">
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
