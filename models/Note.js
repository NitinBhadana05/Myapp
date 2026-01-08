import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
