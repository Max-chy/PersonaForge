'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { marked } from 'marked';

// Dynamically import the Markdown editor
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

// Enable single-line breaks for Markdown
marked.setOptions({
  breaks: true,
});

export default function EditBlogPage() {
  const { id } = useParams() as { id: string }; // Retrieve the blog ID from dynamic route
  const [title, setTitle] = useState(''); // State for the blog title
  const [content, setContent] = useState(''); // State for the blog content
  const [loading, setLoading] = useState(true); // State to manage loading state
  const router = useRouter(); // For navigating between pages

  useEffect(() => {
    // Redirect to home if the blog ID is missing
    if (!id) {
      alert('Blog ID is missing!');
      router.push('/');
      return;
    }

    // Fetch the blog data
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog');
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('Failed to load blog data');
        router.push('/');
      }
    };

    fetchBlog();
  }, [id, router]);

  // Save the updated blog
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error('Failed to save blog');
      alert('Blog saved successfully!');
      router.push(`/blog/${id}`); // Redirect to the blog detail page after saving
    } catch (error) {
      console.error(error);
      alert('Failed to save blog');
    }
  };

  // Update the content state when Markdown editor changes
  const handleContentChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  if (loading) return <div>Loading...</div>; // Show a loading state until the data is fetched

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Edit Blog</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update the title state
        placeholder="Blog Title"
        className="block w-full mb-4 p-2 border rounded"
      />
      <MdEditor
        value={content}
        style={{ height: '500px' }} // Set the editor height
        renderHTML={(text) => marked(text)} // Convert Markdown to HTML using `marked`
        onChange={handleContentChange} // Update content on editor change
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => router.push(`/blog/${id}`)} // Navigate back to the blog detail page
          className="ml-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}