/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Plus, Send, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function MinimalistBodyDoublingAppComponent() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete project", completed: false },
    { id: 2, title: "Read book", completed: false },
  ])
  const [friendTasks, setFriendTasks] = useState([
    { id: 1, title: "Write report", completed: false },
    { id: 2, title: "Prepare presentation", completed: true },
    { id: 3, title: "Review code", completed: false },
  ])
  const [newTask, setNewTask] = useState("")
  const [timer, setTimer] = useState(25 * 60) // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState("work") // "work" or "break"
  const [chatMessages, setChatMessages] = useState([
    { sender: "Friend", message: "Hey! How's your work going?" },
  ])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      if (timerMode === "work") {
        setTimerMode("break")
        setTimer(5 * 60) // 5 minutes break
      } else {
        setTimerMode("work")
        setTimer(25 * 60) // 25 minutes work
      }
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer, timerMode])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerMode("work")
    setTimer(25 * 60)
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: "You", message: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Body Doubling App</h1>
        
        {/* Pomodoro Timer */}
        <div className="mb-8 text-center">
          <div className="text-6xl font-bold mb-4 text-gray-700">{formatTime(timer)}</div>
          <div className="flex justify-center space-x-4">
            <Button onClick={toggleTimer} variant="outline" size="sm">
              {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <Button onClick={resetTimer} variant="outline" size="sm">
              <RotateCcw size={18} />
            </Button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {timerMode === "work" ? "Focus Time" : "Break Time"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Your Task List */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Tasks</h2>
            <div className="flex mb-4">
              <Input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="flex-grow mr-2"
              />
              <Button onClick={addTask} variant="outline" size="sm">
                <Plus size={18} />
              </Button>
            </div>
            <ul className="space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {task.title}
                    </label>
                  </div>
                  <Button onClick={() => deleteTask(task.id)} variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Friend's Task List */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Friends Tasks</h2>
            <ul className="space-y-2">
              {friendTasks.map(task => (
                <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <Checkbox
                      id={`friend-task-${task.id}`}
                      checked={task.completed}
                      disabled
                      className="mr-2"
                    />
                    <label
                      htmlFor={`friend-task-${task.id}`}
                      className={`${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {task.title}
                    </label>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {task.completed ? "Completed" : "In Progress"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Chat</h2>
          <div className="h-64 overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow-sm">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "You" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
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
        </div>
      </div>
    </div>
  )
}