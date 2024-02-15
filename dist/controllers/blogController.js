"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add_blog = exports.delete_blog = exports.single_blog = exports.All_blogs = void 0;
const blog_1 = require("../models/blog");
const Add_blog = (req, res) => {
    const blog = new blog_1.Blog({
        title: "a guide to software engineering",
        description: "Hiii friends anyone who wants to join softwar engineering",
        photo: "engineering.png",
    });
    blog
        .save()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error ocuured while adding a blog" });
    });
};
exports.Add_blog = Add_blog;
const All_blogs = (req, res) => {
    blog_1.Blog.find()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occured while displaying all blogs" });
    });
};
exports.All_blogs = All_blogs;
const single_blog = (req, res) => {
    blog_1.Blog.findById("65cc8f6e3510e720720a11a6")
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occured while retrieving one blog" });
    });
};
exports.single_blog = single_blog;
const delete_blog = (req, res) => {
    blog_1.Blog.findByIdAndDelete("65cbed03ba3df7ad18589407")
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while deleting the blog.' });
    });
};
exports.delete_blog = delete_blog;
