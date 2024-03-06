"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
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
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
