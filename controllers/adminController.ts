import {Request, Response} from 'express';
import {Admin} from "../models/admin";
import admin from '../routes/adminRoutes';
const Record_admin=(req:Request, res:Response)=>{
    const admin= new Admin({
        email:"kimtifah2@gmail.com",
        password:"4563"
    }) 

admin.save().then((result)=>{
    res.status(200).json(result);
}).catch((err:any)=>{
    console.log(err);
    res.status(500).json({error:"eror occured setting user data"})
})

if (!admin.email || !admin.password){
    res.status(500).json({error:"incorrect password or email"});
}
}
export {Record_admin};