import { connectDB } from "../../../../../lib/db";
import Blog from "../../../../../lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request to fetch a blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Extract the blog ID from the route params
  try {
    await connectDB();
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog." },
      { status: 500 }
    );
  }
}

// Handle PUT request to update a blog by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const body = await request.json(); // Parse the JSON request body
    const { title, content } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update blog." },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a blog by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectDB();
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog." },
      { status: 500 }
    );
  }
}