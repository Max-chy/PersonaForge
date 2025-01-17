'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';

// 配置 marked 选项，支持单行换行等
marked.setOptions({
  breaks: true,
});

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function BlogDetailPage() {
  const { id } = useParams() as { id: string };
  const [blog, setBlog] = useState<BlogPost | null>(null);

  // Fetch blog data
  useEffect(() => {
    if (!id) return;

    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch blog data');
        }
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">{new Date(blog.date).toLocaleDateString()}</p>
      
      {/* 使用 marked 渲染 Markdown 为 HTML */}
      <article
        className="mt-6 prose" // 使用 TailwindCSS 的 `prose` 样式优化 Markdown 渲染效果
        dangerouslySetInnerHTML={{ __html: marked(blog.content) }}
      ></article>

      <div className="mt-6 flex gap-4">
        {/* Link back to home */}
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300">
          Return to Home
        </Link>

        {/* Link to the edit page using dynamic route */}
        <Link
          href={`/blog/${id}/edit`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </Link>
      </div>
    </main>
  );
}