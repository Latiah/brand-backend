import express, {Application} from 'express';
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import {User} from './models/admin'
import {Request, Response, NextFunction} from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { loginValidations } from './validation/validations';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerJsdoc=YAML.load("./yamal.yaml")
const app:Application = express();
mongoose.connect(
  "mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority"
).then(()=>{
  console.log("the database connection was successful");
}).catch((err:any)=>{
  console.log(err)
})
app.use(bodyParser.json());


app.use(blogRoutes);
app.use(messagesRoutes);
app.use(express.json());

const saltRounds = 10; // Number of salt rounds for bcrypt
app.post("/auth/register", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;
 const valid = loginValidations(req.body);
 if (valid.error) {
   res.status(400).json(valid);
 }
    // ** destructure the information from user;
    const {  email, password } = user;

    // ** Check the email all ready exist  in database or not ;
    // ** Import the user model from "./models/user";

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already used",
      });
     // return;
    }

    // ** if not create a new user ;
    // !! Don't save the password as plain text in db . I am saving just for demonstration.
    // ** You can use bcrypt to hash the plain password.
 const hashedPassword = await bcrypt.hash(password, saltRounds);
    // now create the user;
    const newUser = await User.create({
      
      email,
      password:hashedPassword,
    });

    // Send the newUser as  response;
    res.status(200).json({
      status: 200,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    // console the error to debug
    console.log(error);

    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});
app.post("/auth/login", async (req, res) => {
  try {
    // ** Get The User Data From Body ;
    const user = req.body;
  const valid = loginValidations(req.body);
  if (valid.error) {
    res.status(400).json(valid);
  }
    // ** destructure the information from user;
    const { email, password } = user;

    // ** Check the (email/user) exist  in database or not ;
    const isUserExist = await User.findOne({
      email
    });

    // ** if there is not any user we will send user not found;
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
      return;
    }

    // ** if the (user) exist  in database we will check the password is valid or not ;
    // **  compare the password in db and the password sended in the request body
const isPasswordMatched = await
bcrypt.compare(password, isUserExist.password);    

    // ** if not matched send response that wrong password;

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }



    // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

    // ** This is our JWT Token
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      "YOUR_SECRET",
      {
        expiresIn: "1d",
      }
    );

    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

//swagger setup


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

const port:number| string = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
