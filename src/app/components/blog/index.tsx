"use client";

// pages/thecave.js
import { Post } from "@/app/api/thecave/route";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/thecave")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-6 pt-24">
      <h1 className="text-4xl mx-auto text-center font-bold mb-4">Blog</h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>

      {posts.length === 0 && <p>Carregando artigos...</p>}

      <ul className="flex flex-row gap-6 flex-wrap">
        {posts.map((post: Post) => (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <li
              key={post.link}
              className="flex flex-1 flex-col w-85 h-80 p-6 bg-gray-800/50 rounded-2xl shadow-md border-2 border-gray-700 hover:border-blue-500 hover:scale-105 transition-transform duration-300"
            >
              <Image src={post.enclosure?.url || '/placeholder.png'} alt={post.title || 'Post Image'} width={340} height={180} className="rounded-lg mb-4 object-cover h-36 w-full"/> 
              <p
                className="text-xl font-semibold text-white line-clamp- text-ellipsis"
              >
                {post.title}
              </p>

              <p className="text-white text-sm font-extralight flex flex-1 flex-row justify-end items-end">
                {new Date(post.date || "").toLocaleDateString("pt-BR")}
              </p>
            </li>
          </a>

        ))}
      </ul>
    </div>
  );
}
