import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Blog from "../../../../lib/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch blogs." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({ title, content });
    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create blog." },
      { status: 500 }
    );
  }
}