/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { addParticipant, createSession } from "@/lib/services/sessions";
import { useUser } from "@/lib/context/UserContext";
import Pomodoro from "./Pomodoro";
import HostUserTasks from "./HostUserTasks";
import GuestTasks from "./GuestTasks";

const BodyDoublingApp: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [isHost, setIsHost] = useState<boolean>(false);
  const { currentUser, setCurrentUser } = useUser();

  useEffect(() => {
    // Mock setting the user for demonstration purposes, replace with real user data
    if (!currentUser) {
      setCurrentUser({ id: "user-uuid-1", username: "mockUser" });
    }

    if (currentUser) {
      if (!sessionId) {
        const sessionTitle = "New Session"; // Or dynamically get this input
        createSession(currentUser.id, sessionTitle).then((session) => {
          if (session) {
            setIsHost(true);
            console.log("Session created:", session);
          }
        });
      } else {
        addParticipant(sessionId, currentUser.id).then(() => {
          setIsHost(false);
        });
      }
    }
  }, [sessionId, currentUser, setCurrentUser]);

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
          <GuestTasks />
        </div>
      </div>
    </div>
  );
};

export default BodyDoublingApp;
