"use client";

import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { ShareButton } from "./ShareButton";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

const Pomodoro: React.FC = () => {
  const [timer, setTimer] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("work");
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(4);
  const [focusTime, setFocusTime] = useState(25);

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
        setTimer(focusTime * 60);
      }
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, timerMode, focusTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMode("work");
    setTimer(focusTime * 60);
  };

  const handleFocusTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusTime(parseInt(e.target.value));
    setTimer(parseInt(e.target.value) * 60);
  };

  return (
    <div className=" flex items-center justify-center mb-10">
      <Card className="w-[300px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pomodoro Timer</CardTitle>
          <ShareButton />
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{formatTime(timer)}</div>
            <div className="space-x-2">
              <Button variant="outline" size="icon" onClick={toggleTimer}>
                {isActive ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={resetTimer}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white p-4 mt-2 border rounded-md">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Timer Settings
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Adjust your focus time and sessions.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="focus-time">Focus Time</Label>
                        <Input
                          id="focus-time"
                          type="number"
                          className="col-span-2 h-8"
                          value={focusTime}
                          onChange={handleFocusTimeChange}
                          min={1}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="sessions">Sessions</Label>
                        <Input
                          id="sessions"
                          type="number"
                          className="col-span-2 h-8"
                          value={sessions}
                          onChange={(e) =>
                            setSessions(parseInt(e.target.value))
                          }
                          min={1}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Focus Time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pomodoro;
