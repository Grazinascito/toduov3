/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";

import Pomodoro from "./Pomodoro";
import HostUserTasks from "./HostUserTasks";

const BodyDoublingApp: React.FC = () => {
  const [isHost, setIsHost] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Body Doubling App
      </h1>
      <Pomodoro />
      <div className="flex gap-4">
        <div className="w-full">
          <HostUserTasks />
        </div>
        <div className="w-full">
          <HostUserTasks />
        </div>
      </div>
    </div>
  );
};

export default BodyDoublingApp;
