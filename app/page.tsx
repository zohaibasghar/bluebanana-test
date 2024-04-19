"use client";
import { useAppContext } from "@/context";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const { logout, user } = useAppContext();

  useEffect(() => {
    if (!user.email && !user.password) {
      redirect("/signup");
    }
  }, [user]);

  return (
    <div className="flex h-[100vh] items-center justify-center flex-col gap-10">
      <Link
        href="/fakelist"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Fake List
      </Link>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
