import mongoose, {Schema, model, InferSchemaType}
from 'mongoose';
import Joi from 'Joi';
const blogSchema:Schema= new Schema({
    title:String,
  description:String,
photo:String,
    
});
type blog=InferSchemaType<typeof blogSchema>
export const Blog=model<blog>('Blog', blogSchema);


