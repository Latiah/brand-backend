import express, {Router} from "express";
import {Request, Response} from 'express';
import * as blogController from "../controllers/blogController";
const router :Router= express.Router();
router.post("/add-blog", blogController.Add_blog);
router.get("/all-blogs", blogController.All_blogs);
router.get("/single-blog/:id", blogController.single_blog);
router.delete("/delete-blog/:id", blogController.delete_blog);
export default router;