import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET → fetch all notes
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// POST → create a new note
export async function POST(request) {
  await connectDB();
  const { title, content } = await request.json();

  const note = await Note.create({
    title,
    content,
  });

  return NextResponse.json(note);
}
