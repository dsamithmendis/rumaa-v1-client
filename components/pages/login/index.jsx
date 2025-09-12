"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const message =
          data.msg && Array.isArray(data.msg)
            ? data.msg.join(", ")
            : data.message || "Invalid username or password";
        setError(message);
      } else {
        if (data.userID) localStorage.setItem("userID", data.userID);
        router.push("/home");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-xl p-6 sm:p-10 bg-white rounded-xl shadow-md flex flex-col gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-4 uppercase">
          Login
        </h2>

        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
            placeholder="Username"
          />
          <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
            Username
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full border-b-2 border-gray-300 py-2.5 text-green-700 placeholder-transparent focus:border-green-700 outline-none text-sm sm:text-base"
            placeholder="Password"
          />
          <label className="absolute left-0 -top-3 text-neutral-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:text-base">
            Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-colors mt-3 text-sm sm:text-base hover:cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-600 text-sm sm:text-base mt-3">{error}</p>
        )}
      </form>
    </div>
  );
}
