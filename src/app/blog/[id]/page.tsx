'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function BlogDetailPage() {
  const { id } = useParams() as { id: string };
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">{new Date(blog.date).toLocaleDateString()}</p>
      <article className="mt-6">{blog.content}</article>

      <div className="mt-6 flex gap-4">
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300">
          Return to Home
        </Link>
        <Link href={`/blog/${blog._id}/edit`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit
        </Link>
      </div>
    </main>
  );
}