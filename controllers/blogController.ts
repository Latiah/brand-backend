import { Request, Response } from "express";
import { Blog } from "../models/blog";
import { blogValidations } from "../validation/validations";

const Add_blog = async (req: Request, res: Response) => {
  try {
    const valid = blogValidations(req.body);
    if (valid.error) {
      res.status(400).json(valid.error);
      return;
    }

    const { title, description, photo } = req.body;
    const blog = await Blog.create({ title, description, photo });
    res.status(201).json({ blog, message: "new blog created" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const All_blogs = (req: Request, res: Response) => {
  Blog.find()
    .then((result) => {
      res.status(200).json({ result, message: "All blogs listed" });
    })
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occured while displaying all blogs" });
    });
};

const single_blog = (req: Request, res: Response) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.status(200).json({ result, message: "single blog retrieved" });
    })
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occured while retrieving one blog" });
    });
};

const delete_blog = (req: Request, res: Response): void => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ message: "Blog was deleted successfully" });
    })
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the blog." });
    });
};
const update_blog = (req: Request, res: Response): void => {
  const valid = blogValidations(req.body);
  if (valid.error) {
    res.status(400).json(valid.error);
    return;
  }
  const { id } = req.params;
  const { title, description, photo } = req.body;
  Blog.findByIdAndUpdate(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "An error occurred while Updating the blog." });
    });
};

export const likeBlog = async (req: Request, res: Response) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    blog.likes++;
    await blog.save();

    res.json({ message: "Blog liked successfully", likes: blog.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const shareBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    blog.shares++;
    await blog.save();

    res.json({ message: "Blog shared successfully", shares: blog.shares });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { All_blogs, single_blog, delete_blog, Add_blog, update_blog };
