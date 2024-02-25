import { Request, Response } from "express";
import { Message } from "../models/messages";
import { messageValidations } from "../../validation/validations";

const Add_message = async (req: Request, res: Response) => {
  try {
    const valid = messageValidations(req.body);
    if (valid.error) {
      res.status(400).json(valid);
    }

    const { name, email, message } = req.body;
    const messages = await Message.create({ name, email, message });

    res.status(201).json({ status: 200, messages, message: "user created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const All_messages = (req: Request, res: Response) => {
  Message.find()
    .then((result) => {
      res
        .status(200)
        .json({ status: 200, result, message: "all messages retrieved" });
    })
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "error occured while retrieving all messages" });
    });
};
const single_message = (req: Request, res: Response) => {
  const { id } = req.params;
  Message.findById(id)
    .then((result) => {
      res
        .status(200)
        .json({ status: 200, result, message: "single message retrieved" });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ error: "error occured retrieving one message" });
    });
};

const delete_message = (req: Request, res: Response) => {
  const { id } = req.params;
  Message.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ message: "message was deleted successfully" });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ error: "error occured while deleting a message" });
    });
};
export { Add_message, All_messages, single_message, delete_message };
