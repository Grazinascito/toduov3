/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { Input } from "@/components/ui/input";

const Chat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState([
    { sender: "Friend", message: "Hey! How's your work going?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  //   const sendMessage = () => {
  //     if (newMessage.trim()) {
  //       setChatMessages([
  //         ...chatMessages,
  //         { sender: "You", message: newMessage },
  //       ]);
  //       setNewMessage("");
  //     }
  //   };
  return (
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
          <Button variant="outline">
            <Send size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
