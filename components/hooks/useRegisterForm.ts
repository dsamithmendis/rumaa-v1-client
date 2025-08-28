"use client";
import { useState } from "react";

export function useRegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Message: ", message);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ fullname, email, message }),
      });

      const { msg, success } = await res.json();
      setError(msg);
      setSuccess(success);

      if (success) {
        setFullname("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      setError(["Something went wrong. Try again later."]);
      setSuccess(false);
    }
  };

  return {
    fullname,
    email,
    message,
    error,
    success,
    setFullname,
    setEmail,
    setMessage,
    handleSubmit,
  };
}
