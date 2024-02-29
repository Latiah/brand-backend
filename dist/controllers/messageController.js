"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_message = exports.single_message = exports.All_messages = exports.Add_message = void 0;
const messages_1 = require("../models/messages");
const validations_1 = require("../validation/validations");
const Add_message = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validations_1.messageValidations)(req.body);
        if (valid.error) {
            res.status(400).json(valid);
        }
        const { name, email, message } = req.body;
        const messages = yield messages_1.Message.create({ name, email, message });
        res.status(200).json({ status: 200,
            messages,
            message: "message  was created successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.Add_message = Add_message;
const All_messages = (req, res) => {
    messages_1.Message.find()
        .then((result) => {
        res.status(200).json({ status: 200,
            result,
            message: "all messages retrieved"
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured while retrieving all messages" });
    });
};
exports.All_messages = All_messages;
const single_message = (req, res) => {
    const { id } = req.params;
    messages_1.Message.findById(id)
        .then((result) => {
        res.status(200).json({ status: 200,
            result,
            message: "single message retrieved" });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured retrieving one message" });
    });
};
exports.single_message = single_message;
const delete_message = (req, res) => {
    const { id } = req.params;
    messages_1.Message.findByIdAndDelete(id)
        .then((result) => {
        res.status(200).json({ message: "message was deleted successfully" });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "error occured while deleting a message" });
    });
};
exports.delete_message = delete_message;
