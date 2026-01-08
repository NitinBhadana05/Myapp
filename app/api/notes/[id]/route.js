import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  await connectDB();

  const { id } = await context.params;
  const { title, content } = await request.json();

  const note = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(note);
}

export async function DELETE(request, context) {
  await connectDB();

  const { id } = await context.params;

  await Note.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
