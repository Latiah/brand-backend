import mongoose, {Schema, model, InferSchemaType } from 'mongoose';

const MessageSchema:Schema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})
type message= InferSchemaType<typeof MessageSchema>;
export const Message=model<message>("Message", MessageSchema);
