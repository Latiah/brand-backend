import {Request, Response} from 'express';
import {Message} from "../models/messages";

const Add_message=(req:Request, res:Response)=>{
     const message = new Message({
    name: "WIZARD",
    email: "ishcha@2gmail.com",
    message: "hi hi there? ",
  });
  message
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"error occured adding a message"})
    });
}

const All_messages=(req:Request, res:Response)=>{
   Message.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"error occured while retrieving all messages"})
    });
}
const single_message=(req:Request, res:Response)=>{
    Message.findById("65cc05b5683d32cc181484b1")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({ error: "error occured retrieving one message" });
      });
}

const delete_message=(req:Request, res:Response)=>{
    Message.findByIdAndDelete("65cc066094d754d96c8fd3c1")
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({error:"error occured while deleting a message"})
      });
}
export{
    Add_message, All_messages, single_message, delete_message
}