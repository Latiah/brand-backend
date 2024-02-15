"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_message = exports.single_message = exports.All_messages = exports.Add_message = void 0;
const messages_1 = require("../models/messages");
const Add_message = (req, res) => {
    const message = new messages_1.Message({
        name: "winny",
        email: "ishcha@2gmail.com",
        message: "hi hi there? ",
    });
    message
        .save()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured adding a message" });
    });
};
exports.Add_message = Add_message;
const All_messages = (req, res) => {
    messages_1.Message.find()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured while retrieving all messages" });
    });
};
exports.All_messages = All_messages;
const single_message = (req, res) => {
    messages_1.Message.findById("65cc05b5683d32cc181484b1")
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured retrieving one message" });
    });
};
exports.single_message = single_message;
const delete_message = (req, res) => {
    messages_1.Message.findByIdAndDelete("65cc066094d754d96c8fd3c1")
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured while deleting a message" });
    });
};
exports.delete_message = delete_message;
