"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight, Plus, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
};

type Project = {
  id: string;
  title: string;
  tasks: Task[];
  progress: number;
};

export default function HostTasks() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Hourglass",
      tasks: [
        {
          id: "1-1",
          title: "Arrange discovery meeting",
          completed: true,
          date: new Date(2023, 6, 24),
        },
        {
          id: "1-2",
          title: "Send initial project brief",
          completed: true,
          date: new Date(2023, 6, 29),
        },
        {
          id: "1-3",
          title: "Timescales",
          completed: false,
          date: new Date(2023, 7, 13),
        },
        {
          id: "1-4",
          title: "Final proposal",
          completed: false,
          date: new Date(2023, 8, 8),
        },
      ],
      progress: 68,
    },
    {
      id: "2",
      title: "Layers",
      tasks: [
        {
          id: "2-1",
          title: "Arrange discovery meeting",
          completed: true,
          date: new Date(2023, 7, 20),
        },
        {
          id: "2-2",
          title: "Send initial project brief",
          completed: false,
          date: new Date(2023, 7, 24),
        },
        {
          id: "2-3",
          title: "Quarterly timescales",
          completed: false,
          date: new Date(2023, 7, 25),
        },
      ],
      progress: 45,
    },
  ]);

  const [expandedProjects, setExpandedProjects] = useState<string[]>([
    "1",
    "2",
  ]);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<{
    projectId: string;
    taskId: string;
  } | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingProject || editingTask) {
      editInputRef.current?.focus();
    }
  }, [editingProject, editingTask]);

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          const completedTasks = updatedTasks.filter(
            (task) => task.completed
          ).length;
          const progress = Math.round(
            (completedTasks / updatedTasks.length) * 100
          );
          return { ...project, tasks: updatedTasks, progress };
        }
        return project;
      })
    );
  };

  const startEditing = (projectId: string, taskId?: string) => {
    if (taskId) {
      setEditingTask({ projectId, taskId });
    } else {
      setEditingProject(projectId);
    }
  };

  const handleEdit = (projectId: string, taskId?: string) => {
    const newTitle = editInputRef.current?.value;
    if (newTitle) {
      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project.id === projectId) {
            if (taskId) {
              const updatedTasks = project.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              );
              return { ...project, tasks: updatedTasks };
            } else {
              return { ...project, title: newTitle };
            }
          }
          return project;
        })
      );
    }
    setEditingProject(null);
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setEditingTask(null);
  };

  const addNewProject = () => {
    const newProject: Project = {
      id: `${projects.length + 1}`,
      title: "New Project",
      tasks: [],
      progress: 0,
    };
    setProjects([...projects, newProject]);
    setExpandedProjects([...expandedProjects, newProject.id]);
    setEditingProject(newProject.id);
  };

  const addNewTask = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const newTask: Task = {
            id: `${projectId}-${project.tasks.length + 1}`,
            title: "New Task",
            completed: false,
            date: new Date(),
          };
          return { ...project, tasks: [...project.tasks, newTask] };
        }
        return project;
      })
    );
  };

  const updateTaskDate = (projectId: string, taskId: string, newDate: Date) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, date: newDate } : task
          );
          return { ...project, tasks: updatedTasks };
        }
        return project;
      })
    );
  };

  return (
    <Card className="w-[450px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Tasks</CardTitle>
        <Button onClick={addNewProject} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  initial={false}
                  animate={{
                    rotate: expandedProjects.includes(project.id) ? 90 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleProject(project.id)}
                  className="cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
                {editingProject === project.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      ref={editInputRef}
                      defaultValue={project.title}
                      className="h-7 py-1 px-2 text-sm"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(project.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <h3
                    className="font-medium cursor-pointer"
                    onDoubleClick={() => startEditing(project.id)}
                  >
                    {project.title}
                  </h3>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {project.progress}%
                </span>
                <Progress value={project.progress} className="w-[100px]" />
              </div>
            </div>
            <AnimatePresence>
              {expandedProjects.includes(project.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-6 space-y-1 overflow-hidden"
                >
                  {project.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between"
                    >
                      <div
                        onClick={() => toggleTask(project.id, task.id)}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox checked={task.completed} />
                        {editingTask?.projectId === project.id &&
                        editingTask?.taskId === task.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              ref={editInputRef}
                              defaultValue={task.title}
                              className="h-7 py-1 px-2 text-sm"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(project.id, task.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEdit}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span
                            className={`cursor-pointer ${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                            onDoubleClick={() =>
                              startEditing(project.id, task.id)
                            }
                          >
                            {task.title}
                          </span>
                        )}
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-[120px] pl-3 text-left font-normal"
                          >
                            {formatDate(task.date)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={task.date}
                            onSelect={(date) =>
                              date && updateTaskDate(project.id, task.id, date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  ))}
                  <Button
                    onClick={() => addNewTask(project.id)}
                    size="sm"
                    variant="ghost"
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
