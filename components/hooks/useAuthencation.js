"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (!storedUserID) {
      router.push("/login");
    } else {
      setUserID(storedUserID);
    }
  }, [router]);

  return userID;
}
