"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const Pomodoro: React.FC = () => {
  const [timer, setTimer] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("work");
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

  return (
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
  );
};

export default Pomodoro;
