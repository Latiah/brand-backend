/*import mongoose, { Schema, model, InferSchemaType } from "mongoose";
import Joi from "Joi";
interface IBlog extends Document {
  title: string;
  description: string;
  photo: string;
  likes: number;
  shares: number;
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
});
type blog = InferSchemaType<typeof blogSchema>;
export const Blog = model<blog>("Blog", blogSchema);
*/
/*import mongoose, { Schema, model, Document } from "mongoose";
import Joi from "Joi";

interface IBlog extends Document {
  title: string;
  description: string;
  photo: string;
  likes: number;
  shares: number;
}

const blogSchema: Schema<IBlog> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 }
});

export const Blog = model<IBlog>("Blog", blogSchema);*/

import mongoose, { Schema, model, Document } from "mongoose";
import Joi from "Joi";

interface IBlog extends Document {
  title: string;
  description: string;
  photo: string;
  likes: number;
  shares: number;
  likedBy: string[]; // Array of user IDs who liked the blog
}

const blogSchema: Schema<IBlog> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "Users" }], // Assuming you have a User model
});

export const Blog = model<IBlog>("Blog", blogSchema);
