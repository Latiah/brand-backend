import mongoose, {Schema, model, InferSchemaType}
from 'mongoose';
const blogSchema:Schema= new Schema({
    title:{
        type:String,
        required:true
    },
description:{
    type:String,
    required:true
},
photo:{
    type:String,
    required:true
}    
})
type blog=InferSchemaType<typeof blogSchema>
export const Blog=model<blog>('Blog', blogSchema);
