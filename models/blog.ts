import mongoose, {Schema, model, InferSchemaType}
from 'mongoose';
const blogSchema:Schema= new Schema({
    title:String,
  description:String,
photo:String,
    
});
type blog=InferSchemaType<typeof blogSchema>
export const Blog=model<blog>('Blog', blogSchema);
