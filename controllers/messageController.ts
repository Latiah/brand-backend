import {Request, Response} from 'express';
import {Message} from "../models/messages";

const Add_message=(req:Request, res:Response)=>{
     const message = new Message({
    name: "Richard",
    email: "ircha@2gmail.com",
    message: "hi hi there? ",
  });
  message
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}

const All_messages=(req:Request, res:Response)=>{
   Message.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}
const single_message=(req:Request, res:Response)=>{
    Message.findById("65cc066094d754d96c8fd3c1")
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}

const delete_message=(req:Request, res:Response)=>{
    Message.findByIdAndDelete("65cc066094d754d96c8fd3c1")
      .then((result) => {
        res.send(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
}
export{
    Add_message, All_messages, single_message, delete_message
}