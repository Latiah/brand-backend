import Joi from "Joi";

//blog validations
export const blogValidations =(blogs:{title:string, description:string, photo:string})=>{
    const blogSchema=Joi.object({
  title: Joi.string().required().min(5).max(20),
  description: Joi.string().required().min(10).max(100),
  photo: Joi.string().required()
})
return blogSchema.validate(blogs);}
//login validation
export const loginValidations = (login:{
    email:string, password:string
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(10),
  });
  return loginSchema.validate(login)
};

//

export const messageValidations = (messages: {
  name: string;
  email: string;
  mesage: string;
}) => {
  const messageSchema = Joi.object({
    name: Joi.string().required().min(5).max(20),
    email: Joi.string().required().email(),
    mesage: Joi.string(),
  });
  return messageSchema.validate(messages);
};
