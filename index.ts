//fNqsrpAUmHIox43t;
import express, {Application} from 'express';
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import { loginUser } from "./controllers/adminController";
import {Request, Response} from 'express';
import bodyParser from "body-parser";


const app:Application = express();
mongoose.connect(
  "mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority"
).then(()=>{
  console.log("the database connection was successful");
}).catch((err:any)=>{
  console.log(err)
})
app.use(bodyParser.json());
// Authentication endpoint
app.post('/login', loginUser);
app.use(blogRoutes);
app.use(messagesRoutes);
app.use(express.json());

const port:number| string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
