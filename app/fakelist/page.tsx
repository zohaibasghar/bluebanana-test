"use client";
import { useAppContext } from "@/context";
import { PostsData } from "@/types";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FakeList = () => {
  const { user } = useAppContext();

  const router = useRouter();
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user.email && !user.password) {
      redirect("/signup");
    }
    fetchPosts();
  }, [user]);
  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setPosts(json);
    setLoading(false);
  };

  const handleDelete = (index: number) => {
    const copy = [...posts];
    copy.splice(index, 1);
    setPosts(copy);
  };
  const handleClear = () => {
    setPosts([]);
  };
  const records = posts.length ? (
    posts?.map((post, index) => {
      return (
        <li
          className="pb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4  shadow-lg shadow-gray-900"
          key={post.id}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                className="w-12 h-12 rounded-full"
                src="https://picsum.photos/50"
                alt="Random image"
                width={50}
                height={50}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white max-w-xs">
                {index + 1}. {post.title}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 max-w-xs">
                {post.body}
              </p>
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600"
              onClick={() => handleDelete(index)}
            >
              X
            </div>
          </div>
        </li>
      );
    })
  ) : (
    <div className="mx-auto my-20">No posts</div>
  );

  return (
    <div>
      <div className="flex items-center justify-evenly">
        <button
          className="flex text-2xl font-bold items-center justify-center px-2 text-blue-500  rounded-xs cursor-pointer hover:bg-white-600 rounded-md"
          onClick={() => router.back()}
        >
          &#x2190;
        </button>
        <button
          className="flex items-center justify-center px-2 bg-blue-500 text-white rounded-xs cursor-pointer hover:bg-blue-600"
          onClick={fetchPosts}
        >
          Fetch posts
        </button>
        <h1 className="my-10 text-center font-extrabold">Fake records</h1>
        <button
          className="flex items-center justify-center px-2 bg-red-500 text-white rounded-xs cursor-pointer hover:bg-red-600"
          onClick={handleClear}
        >
          Clear posts
        </button>
      </div>
      <ul className="justify-center gap-10 flex flex-wrap px-10">
        {loading ? <div className="mx-auto my-20">Loading...</div> : records}
      </ul>
    </div>
  );
};

export default FakeList;