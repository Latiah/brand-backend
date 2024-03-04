"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidations =
  exports.loginValidations =
  exports.blogValidations =
    void 0;
const Joi_1 = __importDefault(require("joi"));
//blog validations
const blogValidations = (blogs) => {
  const blogSchema = Joi_1.default.object({
    title: Joi_1.default.string().required().min(5).max(50),
    description: Joi_1.default.string().required().min(10).max(100),
    photo: Joi_1.default.string().required(),
  });
  return blogSchema.validate(blogs);
};
exports.blogValidations = blogValidations;
//login validation
const loginValidations = (login) => {
  const loginSchema = Joi_1.default.object({
    email: Joi_1.default.string().required().email(),
    password: Joi_1.default.string().required().min(5).max(10),
  });
  return loginSchema.validate(login);
};
exports.loginValidations = loginValidations;
//
const messageValidations = (messages) => {
  const messageSchema = Joi_1.default.object({
    name: Joi_1.default.string().required().min(5).max(20),
    email: Joi_1.default.string().required().email(),
    message: Joi_1.default.string().required().max(50),
  });
  return messageSchema.validate(messages);
};
exports.messageValidations = messageValidations;
