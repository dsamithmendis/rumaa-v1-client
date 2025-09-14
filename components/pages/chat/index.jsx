"use client";

import { useState } from "react";
import ChatBox from "@/components/pages/chat/sub/chatbox";
import { useUsers, useChat } from "@/components/hooks/useChat";
import { useAuth } from "@/components/hooks/useAuthencation";

export default function ChatPage() {
  const userID = useAuth();
  const [receiverID, setReceiverID] = useState("");
  const users = useUsers();

  const chatHook = useChat(userID, receiverID);

  if (!userID) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 border-b border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-green-700">Rumaa Chat</h1>
        <p className="text-sm text-neutral-400">
          Logged in as: <span className="font-medium">{userID}</span>
        </p>
      </div>

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
