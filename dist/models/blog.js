"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const Joi_1 = __importDefault(require("Joi"));
const blogSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    photo: String,
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
const blogValidationSchema = Joi_1.default.object({
    title: Joi_1.default.string().required().min(5).max(20),
    description: Joi_1.default.string().required().min(10).max(100),
    photo: Joi_1.default.string(),
});
