import express, { Router } from "express";
import YAML from "yamljs";
import { Request, Response } from "express";
import { verifyToken } from "../middleWare/authMiddleware";
import * as blogController from "../src/controllers/blogController";
import { blogValidations } from "../validation/validations";

const router: Router = express.Router();

router.post("/add-blog", blogController.Add_blog);

router.get("/all-blogs", blogController.All_blogs);

router.get("/single-blog/:id", blogController.single_blog);
router.delete("/delete-blog/:id",  blogController.delete_blog);

router.put("/update-blog/:id", blogController.update_blog);
export default router;
