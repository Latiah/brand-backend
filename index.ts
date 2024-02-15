//fNqsrpAUmHIox43t;
import express, {Application} from 'express';
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import adminRoutes from "./routes/adminRoutes";

const app:Application = express();
mongoose.connect(
  "mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority"
).then(()=>{
  console.log("the database connection was successful");
}).catch((err:any)=>{
  console.log(err)
})
app.get("/", (req, res)=>{
  res.send("sent successfully");
})
app.use(blogRoutes);
app.use(messagesRoutes);
app.use(adminRoutes);


const port:number| string = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
