import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
export const Comment = mongoose.model("comment", commentSchema);
