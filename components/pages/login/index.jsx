"use client";

import { useLoginForm } from "@/components/hooks/useLoginForm";

export default function LoginPage() {
  const { username, password, error, setUsername, setPassword, handleSubmit } =
    useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-xl p-6 sm:p-10 bg-white rounded-xl shadow-md flex flex-col gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-4 uppercase">
          Login
        </h2>

        {/* Username */}
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

        {/* Password */}
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-colors mt-3 text-sm sm:text-base hover:cursor-pointer"
        >
          Login
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm sm:text-base mt-3">{error}</p>
        )}
      </form>
    </div>
  );
}
