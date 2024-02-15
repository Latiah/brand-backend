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
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"An error ocuured while adding a blog"})
    });
}
const All_blogs = (req:Request, res:Response)=> {
  Blog.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"An error occured while displaying all blogs"})
    });
};

const single_blog=(req:Request, res:Response) =>{
     Blog.findById("65cc8f6e3510e720720a11a6")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"An error occured while retrieving one blog"})
    });
}

const delete_blog=(req:Request, res:Response):void =>{
     Blog.findByIdAndDelete("65cbed03ba3df7ad18589407")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while deleting the blog.' });
    });
  
}
export {
  All_blogs, single_blog, delete_blog, Add_blog
};
