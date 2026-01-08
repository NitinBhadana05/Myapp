"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    setNotes(await res.json());
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `/api/notes/${editId}` : "/api/notes";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    setEditId(null);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Animated border wrapper */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-border">
        {/* Card */}
        <div className="w-full max-w-2xl bg-slate-800 rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            📝 Notes App
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-8">
            <input
              className="w-full bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg p-3 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] focus:shadow-lg focus:shadow-blue-500/30 hover:border-blue-400"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              className="w-full bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg p-3 h-24 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] focus:shadow-lg focus:shadow-blue-500/30 hover:border-blue-400"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
              {editId ? "Update Note" : "Add Note"}
            </button>

            {editId && (
              <p className="text-sm text-blue-400 text-center">
                Editing mode enabled
              </p>
            )}
          </form>

          {/* Notes List */}
          <ul className="space-y-4">
            {notes.length === 0 && (
              <p className="text-center text-gray-400">
                No notes yet. Add one ✨
              </p>
            )}

            {notes.map((note) => (
              <li
                key={note._id}
                className="bg-slate-700 border border-slate-600 rounded-lg p-4 hover:border-blue-400 transition"
              >
                <h2 className="text-lg font-semibold text-white">
                  {note.title}
                </h2>
                <p className="text-gray-200 mt-1">{note.content}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>

                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => editNote(note)}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteNote(note._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
