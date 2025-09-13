"use client";

import { useState, useEffect, useRef } from "react";
import { RiSendPlaneFill, RiUpload2Line, RiCloseLine } from "react-icons/ri";

function SelectReceiver({ setReceiverID }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  return (
    <select
      onChange={(e) => setReceiverID(e.target.value)}
      className="border rounded p-2 mb-4"
    >
      <option value="">Select a user</option>
      {users.map((u) => (
        <option key={u.userID} value={u.userID}>
          {u.username}
        </option>
      ))}
    </select>
  );
}

function ChatBox({ userID }) {
  const [receiverID, setReceiverID] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!receiverID) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?receiverID=${receiverID}`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [receiverID]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() && images.length === 0) return;
    if (!receiverID) return alert("Select a receiver first!");

    const newMsg = {
      senderID: userID,
      receiverID,
      text,
      images: imagePreviews,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
      if (!res.ok) throw new Error("Failed to send message");

      setText("");
      setImages([]);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
      e.target.value = "";
    }
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col flex-1 border rounded-lg bg-white shadow p-4">
      <SelectReceiver setReceiverID={setReceiverID} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 space-y-3 bg-gray-50 rounded"
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex flex-col max-w-[75%] ${
              msg.senderID === userID
                ? "ml-auto items-end"
                : "mr-auto items-start"
            }`}
          >
            <span className="text-xs text-gray-500 mb-1 font-medium">
              {msg.senderID}
            </span>

            {msg.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {msg.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="attachment"
                    className="w-36 h-36 object-cover rounded-xl shadow-sm"
                  />
                ))}
              </div>
            )}

            {msg.text && (
              <div
                className={`p-3 rounded-xl shadow-lg break-words ${
                  msg.senderID === userID
                    ? "bg-green-100 text-green-700 rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {imagePreviews.length > 0 && (
        <div className="flex p-2 gap-2 overflow-x-auto border-t bg-gray-50 rounded mt-2">
          {imagePreviews.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <RiCloseLine size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center p-3 border-t bg-gray-100 rounded-b-lg mt-2">
        <label className="cursor-pointer mr-3 text-green-700 hover:text-green-800">
          <RiUpload2Line size={26} />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring focus:border-green-300"
        />
        <button
          onClick={handleSend}
          className="ml-3 bg-green-700 hover:bg-green-800 text-white p-3 rounded-full flex items-center justify-center shadow"
        >
          <RiSendPlaneFill size={22} />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      alert("No user logged in!");
    } else {
      setUserID(storedUserID);
    }
  }, []);

  if (!userID) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-green-700">Rumaa Chat</h1>
        <p className="text-sm text-gray-600 mt-1">
          Logged in as: <span className="font-medium">{userID}</span>
        </p>
      </div>
      <ChatBox userID={userID} />
    </div>
  );
}
