"use client";
import { useAppContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { logout, user } = useAppContext();

  useEffect(() => {
    if (!user?.email && !user?.password) {
      redirect("/signup");
    }
  }, [user]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center flex-col gap-8">
      <Image
        src={"https://www.bluebanana.agency/favicon.ico"}
        width={200}
        height={100}
        alt="Blue banana"
      />
      <h1 className="text-xl font-bold text-blue-700">Blue Banana Agency</h1>
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
