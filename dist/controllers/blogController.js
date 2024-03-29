"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_blog = exports.Add_blog = exports.delete_blog = exports.single_blog = exports.All_blogs = exports.shareBlog = exports.likeBlog = void 0;
const blog_1 = require("../models/blog");
const validations_1 = require("../validation/validations");
const Add_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validations_1.blogValidations)(req.body);
        if (valid.error) {
            res.status(400).json(valid.error);
            return;
        }
        const { title, description, photo } = req.body;
        const blog = yield blog_1.Blog.create({ title, description, photo });
        res.status(201).json({ blog, message: "new blog created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.Add_blog = Add_blog;
const All_blogs = (req, res) => {
    blog_1.Blog.find()
        .then((result) => {
        res.status(200).json({ result, message: "All blogs listed" });
    })
        .catch((err) => {
        console.log(err);
        res
            .status(500)
            .json({ error: "An error occured while displaying all blogs" });
    });
};
exports.All_blogs = All_blogs;
const single_blog = (req, res) => {
    const { id } = req.params;
    blog_1.Blog.findById(id)
        .then((result) => {
        res.status(200).json({ result, message: "single blog retrieved" });
    })
        .catch((err) => {
        console.log(err);
        res
            .status(500)
            .json({ error: "An error occured while retrieving one blog" });
    });
};
exports.single_blog = single_blog;
const delete_blog = (req, res) => {
    const { id } = req.params;
    blog_1.Blog.findByIdAndDelete(id)
        .then((result) => {
        res.status(200).json({ message: "Blog was deleted successfully" });
    })
        .catch((err) => {
        console.log(err);
        res
            .status(500)
            .json({ error: "An error occurred while deleting the blog." });
    });
};
exports.delete_blog = delete_blog;
const update_blog = (req, res) => {
    const valid = (0, validations_1.blogValidations)(req.body);
    if (valid.error) {
        res.status(400).json(valid.error);
        return;
    }
    const { id } = req.params;
    const { title, description, photo } = req.body;
    blog_1.Blog.findByIdAndUpdate(id)
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res
            .status(500)
            .json({ message: "An error occurred while Updating the blog." });
    });
};
exports.update_blog = update_blog;
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const blog = yield blog_1.Blog.findById(blogId);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        blog.likes++;
        yield blog.save();
        res.json({ message: "Blog liked successfully", likes: blog.likes });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.likeBlog = likeBlog;
const shareBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const blog = yield blog_1.Blog.findById(blogId);
        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return;
        }
        blog.shares++;
        yield blog.save();
        res.json({ message: "Blog shared successfully", shares: blog.shares });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.shareBlog = shareBlog;
