"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { RiSendPlaneFill, RiUpload2Line, RiCloseLine } from "react-icons/ri";
import Image from "next/image";

export default function ChatBox({ userID, setReceiverID, chatHook, users }) {
  const {
    messages,
    text,
    setText,
    imagePreviews,
    handleSend,
    handleImageUpload,
    removeImage,
  } = chatHook;

  const scrollRef = useRef(null);
  const [search, setSearch] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return [];
    return users.filter((u) =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const handleSelectUser = (user) => {
    setReceiverID(user.userID);
    setActiveUser(user);
    setSearch(""); // clear search
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Search / User List */}
      <div className="p-4 border-b border-gray-200 relative">
        <input
          type="text"
          placeholder="Search by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-700 placeholder:text-neutral-400"
        />

        {/* Search dropdown only while typing */}
        {search.trim() !== "" && filteredUsers.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto z-10">
            {filteredUsers.map((user) => {
              const isActive = activeUser?.userID === user.userID;
              return (
                <div
                  key={user.userID}
                  onClick={() => handleSelectUser(user)}
                  className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md mb-1
                    ${
                      isActive
                        ? "bg-green-700 text-white"
                        : "hover:bg-green-100 hover:text-green-700"
                    }
                  `}
                >
                  <span>{user.username}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Display active user */}
      {activeUser && (
        <div className="p-2 px-4 bg-green-700 text-white text-sm flex items-center">
          Selected: {activeUser.username}
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100"
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex flex-col max-w-xs md:max-w-md ${
              msg.senderID === userID
                ? "ml-auto items-end"
                : "mr-auto items-start"
            }`}
          >
            <span className="text-xs text-gray-400 mb-1">{msg.senderID}</span>
            {msg.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {msg.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="attachment"
                    width={150}
                    height={150}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            )}
            {msg.text && (
              <div
                className={`px-3 py-2 rounded-lg ${
                  msg.senderID === userID
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        {imagePreviews.length > 0 && (
          <div className="flex space-x-2 mb-2 overflow-x-auto">
            {imagePreviews.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={img}
                  alt="preview"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-gray-800 bg-opacity-60 text-white rounded-full p-1 hover:bg-red-500"
                >
                  <RiCloseLine size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="p-2 cursor-pointer text-neutral-400 hover:text-green-700">
            <RiUpload2Line size={26} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-700 placeholder:text-neutral-400"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-green-700 text-white rounded-full hover:bg-green-800"
          >
            <RiSendPlaneFill size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
