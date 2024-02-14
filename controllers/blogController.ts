import {Request, Response} from 'express';
import {Blog} from '../models/blog';

const Add_blog=(req:Request, res:Response)=>{
const blog= new Blog({
    title: "a guide to software engineering",
    description: "Hiii friends anyone who wants to join softwar engineering",
    photo: "engineering.png",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}
const All_blogs = (req:Request, res:Response)=> {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
};

const single_blog=(req:Request, res:Response) =>{
     Blog.findById("65cc8f6e3510e720720a11a6")
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}

const delete_blog=(req:Request, res:Response):void =>{
     Blog.findByIdAndDelete("65cbed03ba3df7ad18589407")
    .then((result) => {
      res.send(result);
    })
    .catch((err:any) => {
      console.log(err);
    });
}
export {
  All_blogs, single_blog, delete_blog, Add_blog
};
