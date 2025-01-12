'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

// Enable single line breaks for Markdown
marked.setOptions({
  breaks: true,
});

export default function EditBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter(); // For navigation

  const handleSave = async () => {
    const res = await fetch('/api/blogs/your-blog-id', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('Blog saved!');
    } else {
      alert('Failed to save blog');
    }
  };

  const handleContentChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleReturn = () => {
    if (window.confirm('Are you sure you want to leave without saving?')) {
      router.push('/'); // Redirect to the previous page or home
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Edit Blog</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-4 p-2 border"
      />
      <MdEditor
        value={content}
        style={{ height: '500px' }}
        renderHTML={(text) => marked(text)}
        onChange={handleContentChange}
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={handleReturn}
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Return
        </button>
      </div>
    </div>
  );
}