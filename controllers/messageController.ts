import {Request, Response} from 'express';
import {Message} from "../models/messages";
import {messageValidations} from "../validation/validations"

const Add_message=async(req:Request, res:Response)=>{
  try {
      const valid = messageValidations(req.body);
      if (valid.error) {
        res.status(400).json(valid);
      }
      console.log(valid.error);
    const {name, email, mesage} = req.body; 
    const message = await Message.create({name, email, mesage}); 

    res.status(200).json(message); 
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
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
  const {id}=req.params
    Message.findById(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({ error: "error occured retrieving one message" });
      });
}

const delete_message=(req:Request, res:Response)=>{
  const {id} =req.params
    Message.findByIdAndDelete(id)
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