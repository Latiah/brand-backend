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

const blogValidationSchema = Joi.object({
  title: Joi.string().required().min(5).max(20),
  description: Joi.string().required().min(10).max(100),
  photo: Joi.string(),
});

