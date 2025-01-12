import { connectDB } from "../../../../../lib/db";
import Blog from "../../../../../lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";

// GET method to fetch a blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Corrected type for params
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await params to extract the id

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required." }, { status: 400 });
    }

    await connectDB();
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Failed to fetch the blog." },
      { status: 500 }
    );
  }
}

// PUT method to update a blog by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Corrected type for params
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await params to extract the id

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required." }, { status: 400 });
    }

    await connectDB();
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { message: "Failed to update the blog." },
      { status: 500 }
    );
  }
}

// DELETE method to delete a blog by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Corrected type for params
): Promise<NextResponse> {
  try {
    const { id } = await params; // Await params to extract the id

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required." }, { status: 400 });
    }

    await connectDB();
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete the blog." },
      { status: 500 }
    );
  }
}