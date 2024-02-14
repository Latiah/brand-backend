const express=require('express');
const router= express.Router();
const blogController =require('../controllers/blogController');
router.get("/add-blog", blogController.Add_blog);
router.get("/all-blogs", blogController.All_blogs);
router.get("/single-blog", blogController.single_blog);
router.delete("/delete-blog", blogController.delete_blog);
module.exports=router;