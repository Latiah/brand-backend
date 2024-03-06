import Joi from "Joi";
//blog validations
export const blogValidations = (blogs: {
  title: string;
  description: string;
  photo: string;
}) => {
  const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    photo: Joi.string().required(),
  });
  return blogSchema.validate(blogs);
};
//login validation
export const loginValidations = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(10),
  });
  return loginSchema.validate(login);
};

//

export const messageValidations = (messages: {
  name: string;
  email: string;
  message: string;
}) => {
  const messageSchema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    message: Joi.string().required().max(100),
  });
  return messageSchema.validate(messages);
};
