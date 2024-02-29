import express, { Application } from "express";
import mongoose from "mongoose";
import blogRoutes from "../routes/blogRoutes";
import messagesRoutes from "../routes/messagesRoutes";
import { User } from "./models/admin";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginValidations } from "../validation/validations";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerJsdoc = YAML.load("./yamal.yaml");
const app: Application = express();

app.use(bodyParser.json());
app.use(blogRoutes);
app.use(messagesRoutes);
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to our first api " });
});

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
    const { email, password } = user;

    // ** Check the email all ready exist  in database or not ;
    

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    // ** Add a condition if the user exist we will send the response as email already exist
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already used",
      });
      // return;
    }

   
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // now create the user;
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Send the newUser as  response;
    res.status(201).json({
      status: 201,
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
   
    const user = req.body;
    const valid = loginValidations(req.body);
    if (valid.error) {
      res.status(400).json(valid);
    }
    // ** destructure the information from user;
    const { email, password } = user;

    // ** Check the (email) exist  in database or not ;
    const isUserExist = await User.findOne({
      email,
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
    // **  compare the password in db and the password sent in the request body
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );

    // ** if not matched send response that wrong password;

    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "wrong password",
      });
      return;
    }

    
    // ** This is our JWT Token
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      "YOUR_SECRET"
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

app.get("/api-docs");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

export default app;
