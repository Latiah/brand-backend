//verifyToken;
import express, { Router } from "express";
//import {Request, Response} from 'express';
import { verifyToken } from "../middleWare/authMiddleware";
import * as messageController from "../src/controllers/messageController";

const messag: Router = express.Router();
messag.post("/Add-message", messageController.Add_message);
messag.get("/All-messages",  verifyToken, messageController.All_messages);
messag.get(
  "/single-message/:id",
verifyToken,
  messageController.single_message
);

messag.delete(
  "/delete-message/:id",
verifyToken,
  messageController.delete_message
);
export default messag;
