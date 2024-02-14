//fNqsrpAUmHIox43t;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const blogRoutes=require('./routes/blogRoutes');
const messagesRoutes=require("./routes/messagesRoutes");
mongoose.connect(
  "mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority"
).then(()=>{
  console.log("the database connection was successful");
}).catch((err)=>{
  console.log(err)
})
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use(blogRoutes);
app.use(messagesRoutes);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
