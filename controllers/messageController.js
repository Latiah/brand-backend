const Message = require("../models/messages");

const Add_message=(req, res)=>{
     const message = new Message({
    name: "Gloria",
    email: "inga@2gmail.com",
    message: "when can we meet? ",
  });
  message
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const All_messages=(req, res)=>{
   Message.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
const single_message=(req, res)=>{
    Message.findById("65cc066094d754d96c8fd3c1")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const delete_message=(req, res)=>{
    Message.findByIdAndDelete()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports={
    Add_message, All_messages, single_message, delete_message
}