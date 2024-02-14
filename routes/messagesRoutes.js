const express=require('express');
const messag=express.Router();
const messageController=require('../controllers/messageController');
messag.get("/Add-message", messageController.Add_message);
messag.get("/All-messages", messageController.All_messages);
messag.get("/single-message", messageController.single_message);

messag.delete("/delete-message", messageController.delete_message);
 module.exports=messag;