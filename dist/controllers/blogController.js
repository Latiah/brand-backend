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
exports.update_blog = exports.Add_blog = exports.delete_blog = exports.single_blog = exports.All_blogs = void 0;
const blog_1 = require("../models/blog");
const Add_blog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, photo } = req.body;
        const blog = yield blog_1.Blog.create({ title, description, photo });
        res.status(200).json(blog);
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
        res.status(500).json({ error: "An error occured while displaying all blogs" });
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
        res.status(200).json(result);
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
    const { id } = req.params;
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
