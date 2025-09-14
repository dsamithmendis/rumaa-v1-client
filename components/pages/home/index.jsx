"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/hooks/useAuthencation";

export default function HomePage() {
  const router = useRouter();
  const userID = useAuth();

  if (!userID) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 py-10">
      <div className="w-full max-w-md sm:max-w-xl p-6 sm:p-10 bg-white rounded-xl shadow-md flex flex-col gap-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 uppercase">
          Home
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">
          Welcome <span className="font-medium">{userID}</span>! 🎉
        </p>

        <button
          onClick={() => router.push("/chat")}
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-colors mt-3 text-sm sm:text-base hover:cursor-pointer"
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
}
