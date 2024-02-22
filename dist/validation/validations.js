"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidations = exports.loginValidations = exports.blogValidations = void 0;
const joi_1 = __importDefault(require("joi"));
//blog validations
const blogValidations = (blogs) => {
    const blogSchema = joi_1.default.object({
        title: joi_1.default.string().required().min(5).max(20),
        description: joi_1.default.string().required().min(10).max(100),
        photo: joi_1.default.string().required()
    });
    return blogSchema.validate(blogs);
};
exports.blogValidations = blogValidations;
//login validation
const loginValidations = (login) => {
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(5).max(10),
    });
    return loginSchema.validate(login);
};
exports.loginValidations = loginValidations;
//
const messageValidations = (messages) => {
    const messageSchema = joi_1.default.object({
        name: joi_1.default.string().required().min(5).max(20),
        email: joi_1.default.string().required().email(),
        message: joi_1.default.string().required(),
    });
    return messageSchema.validate(messages);
};
exports.messageValidations = messageValidations;
