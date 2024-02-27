import mongoose, { Schema, model, InferSchemaType } from "mongoose";


const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }
);

export const Comment = mongoose.model("Comments", CommentSchema);