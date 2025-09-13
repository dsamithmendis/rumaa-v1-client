"use client";

import { useState, useEffect } from "react";
import ChatBox from "@/components/pages/chat/chatbox";
import { useUsers, useChat } from "@/components/hooks/useChat";

export default function Home() {
  const [userID, setUserID] = useState(null);
  const [receiverID, setReceiverID] = useState("");
  const users = useUsers();

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (!storedUserID) alert("No user logged in!");
    else setUserID(storedUserID);
  }, []);

  const chatHook = useChat(userID, receiverID);

  if (!userID) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-green-700">Rumaa Chat</h1>
        <p className="text-sm text-gray-600 mt-1">
          Logged in as: <span className="font-medium">{userID}</span>
        </p>
      </div>

      {/* ChatBox fills remaining screen */}
      <div className="flex-1">
        <ChatBox
          userID={userID}
          receiverID={receiverID}
          setReceiverID={setReceiverID}
          chatHook={chatHook}
          users={users}
        />
      </div>
    </div>
  );
}
