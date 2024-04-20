"use client";

import { usePostContext } from "@/context/PostsContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FakeList = () => {
  const { posts, fetchPosts, handleClear, handleDelete, loading } =
    usePostContext();
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const records = posts.length ? (
    posts?.map((post, index) => {
      return (
        <li
          className="py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-md shadow-blue-500 border border-1 border-blue-500 rounded-md px-2"
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
              <p className="text-sm font-medium text-gray-900 truncate  max-w-xs">
                {index + 1}. {post.title}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 max-w-xs">
                {post.body}
              </p>
            </div>
            <div
              className="flex active:scale-95 items-center justify-center text-xs w-6 h-6 rounded-full cursor-pointer hover:bg-red-600"
              onClick={() => handleDelete(index)}
            >
              &#x274C;
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
      <div className="flex items-center bg-white justify-between sticky top-0  border-b border-gray-700 px-5">
        <div className="flex gap-2">
          <button
            className="flex text-2xl font-bold items-center justify-center px-2 text-blue-500  rounded-xs cursor-pointer hover:bg-white-600 rounded-md"
            onClick={() => router.back()}
          >
            &#x2190;
          </button>
          <h1 className="my-5 text-center font-extrabold ">Fake records</h1>
        </div>
        <div className="flex gap-5 ">
          <button
            className=" act-btn  bg-blue-500  hover:bg-blue-600"
            onClick={fetchPosts}
          >
            Fetch posts
          </button>
          <button
            className=" act-btn  bg-red-500  hover:bg-red-600"
            onClick={handleClear}
          >
            Clear posts
          </button>
        </div>
      </div>
      <ul className="justify-center gap-6 flex flex-wrap px-10 mt-5">
        {loading ? <div className="mx-auto my-20">Loading...</div> : records}
      </ul>
    </div>
  );
};

export default FakeList;
