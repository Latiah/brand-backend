import express, {Router} from "express";
import {Request, Response} from 'express';
import {verifyToken} from '../middleWare/authMiddleware';
import * as blogController from "../controllers/blogController";
import {blogValidations} from '../validation/validations';

const router :Router= express.Router();
router.post("/add-blog", verifyToken, blogController.Add_blog);
router.get("/all-blogs",  verifyToken, blogController.All_blogs);
router.get("/single-blog/:id", verifyToken, blogController.single_blog);
router.delete("/delete-blog/:id", verifyToken, blogController.delete_blog);
router.put(
  "/update-blog/:id", 
  verifyToken,
  blogController.update_blog
);
export default router;