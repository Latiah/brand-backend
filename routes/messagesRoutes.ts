import express, {Router} from 'express';
//import {Request, Response} from 'express';
import * as messageController from '../controllers/messageController';

const messag :Router= express.Router();
messag.put("/Add-message", messageController.Add_message);
messag.get("/All-messages", messageController.All_messages);
messag.get("/single-message", messageController.single_message);

messag.delete("/delete-message", messageController.delete_message);
export default messag;