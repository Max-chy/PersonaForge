// src/app/api/blogs/[id]/route.ts

import { connectDB } from "../../../../../lib/db";
import Blog from "../../../../../lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";

// GET method to fetch a blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await the params Promise

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    await connectDB();
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch blog." },
      { status: 500 }
    );
  }
}

// PUT method to update a blog by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await the params Promise

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    await connectDB();
    const body = await request.json();
    const { title, content } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update blog." },
      { status: 500 }
    );
  }
}

// DELETE method to delete a blog by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await the params Promise

    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

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
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete blog." },
      { status: 500 }
    );
  }
}