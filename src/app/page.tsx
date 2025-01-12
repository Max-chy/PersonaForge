'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <Link href="/new" className="text-blue-500">Create New Blog</Link>
      <ul className="space-y-4 mt-4">
        {blogs.map((post) => (
          <li key={post._id} className="border p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
            <Link href={`/blog/${post._id}`} className="text-blue-500">Read More</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}