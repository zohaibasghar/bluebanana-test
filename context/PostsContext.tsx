"use client";
import { ReactNode, createContext, useContext, useState } from "react";

interface PostContextType {
  posts: any[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  handleDelete: (index: number) => void;
  handleClear: () => void;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  loading: false,
  fetchPosts: async () => {},
  handleDelete: () => {},
  handleClear: () => {},
});
export default function PostContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await res.json();
    setPosts(json);
    setLoading(false);
  }

  const handleDelete = (index: number) => {
    const copy = [...posts];
    copy.splice(index, 1);
    setPosts(copy);
  };

  const handleClear = () => {
    setPosts([]);
  };
  return (
    <PostContext.Provider
      value={{ posts, loading, fetchPosts, handleClear, handleDelete }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}
