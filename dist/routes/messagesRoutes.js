"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//verifyToken;
const express_1 = __importDefault(require("express"));
//import {Request, Response} from 'express';
const authMiddleware_1 = require("../middleWare/authMiddleware");
const messageController = __importStar(require("../controllers/messageController"));
const messag = express_1.default.Router();
messag.post("/Add-message", messageController.Add_message);
messag.get("/All-messages", authMiddleware_1.verifyToken, messageController.All_messages);
messag.get("/single-message/:id", authMiddleware_1.verifyToken, messageController.single_message);
messag.delete("/delete-message/:id", authMiddleware_1.verifyToken, messageController.delete_message);
exports.default = messag;
