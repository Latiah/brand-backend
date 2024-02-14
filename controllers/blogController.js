const Blog = require("../models/blog");

const Add_blog=(req, res)=>{
     const blog = new Blog({
    title: "a guide to software engineering",
    description: "Hiii friends anyone who wants to join softwar engineering",
    photo: "engineering.png",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
const All_blogs = (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const single_blog=(req, res) =>{
     Blog.findById("65cc8f6e3510e720720a11a6")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const delete_blog=(req, res) =>{
     Blog.findByIdAndDelete("65cbed03ba3df7ad18589407")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = {
  All_blogs, single_blog, delete_blog, Add_blog
};
