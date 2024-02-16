import {Request, Response} from 'express';
import {Blog} from '../models/blog';

const Add_blog = async (req: Request, res: Response) => {
  try {
    const {title, description, photo} = req.body; 
    const blog = await Blog.create({title, description, photo}); 

    res.status(200).json(blog); 
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
const All_blogs = (req:Request, res:Response)=> {
  Blog.find()
    .then((result) => {
      res.status(200).json({result, message:"All blogs listed"});
    })
    .catch((err:any) => {
      console.log(err);
      res.status(500).json({error:"An error occured while displaying all blogs"})
    });
};

const single_blog=(req:Request, res:Response) =>{
    const{id}=req.params;
  Blog.findById(id)
       .then((result) => {
         res.status(200).json({result, message:"single blog retrieved"});
       })
       .catch((err: any) => {
         console.log(err);
         res
           .status(500)
           .json({ error: "An error occured while retrieving one blog" });
       });
}

const delete_blog=(req:Request, res:Response):void =>{
  const {id}=req.params
     Blog.findByIdAndDelete(id)
       .then((result) => {
         res.status(200).json(result);
       })
       .catch((err: any) => {
         console.log(err);
         res
           .status(500)
           .json({ error: "An error occurred while deleting the blog." });
       });
  
}
export {
  All_blogs, single_blog, delete_blog, Add_blog
};
