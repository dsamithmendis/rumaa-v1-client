"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (username === "admin" && password === "admin") {
        router.push("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  return {
    username,
    password,
    error,
    setUsername,
    setPassword,
    handleSubmit,
  };
}
