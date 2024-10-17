"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import DatePicker from "./DatePicker";

type AddTaskDialogProps = {
  onAddTask: (title: string, dueDate: Date | null, tag: string) => void;
};

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ onAddTask }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
  const [newTaskTag, setNewTaskTag] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle, newTaskDueDate, newTaskTag || "No Tag");
      resetForm();
      setIsAddTaskModalOpen(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsAddTaskModalOpen(false);
  };

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDueDate(null);
    setNewTaskTag("");
  };

  return (
    <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus size={16} className="mr-2" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-title" className="text-right">
              Title
            </Label>
            <Input
              id="task-title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-date" className="text-right">
              Due Date (Optional)
            </Label>
            <DatePicker
              selectedDate={newTaskDueDate}
              onDateChange={setNewTaskDueDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-tag" className="text-right">
              Tag (Optional)
            </Label>
            <Select value={newTaskTag} onValueChange={setNewTaskTag}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Tag">No Tag</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Study">Study</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
