import mongoose, {Schema, model, InferSchemaType} from 'mongoose';
const adminSchema:Schema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

type admin=InferSchemaType<typeof adminSchema>;
export const Admin=model<admin>("Admin", adminSchema);