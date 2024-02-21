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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//fNqsrpAUmHIox43t;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const admin_1 = require("./models/admin");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority").then(() => {
    console.log("the database connection was successful");
}).catch((err) => {
    console.log(err);
});
app.use(body_parser_1.default.json());
app.use(blogRoutes_1.default);
app.use(messagesRoutes_1.default);
app.use(express_1.default.json());
app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        // ** destructure the information from user;
        const { email, password } = user;
        // ** Check the email all ready exist  in database or not ;
        // ** Import the user model from "./models/user";
        const isEmailAllReadyExist = yield admin_1.User.findOne({
            email: email,
        });
        // ** Add a condition if the user exist we will send the response as email all ready exist
        if (isEmailAllReadyExist) {
            res.status(400).json({
                status: 400,
                message: "Email all ready in use",
            });
            return;
        }
        // ** if not create a new user ;
        // !! Don't save the password as plain text in db . I am saving just for demonstration.
        // ** You can use bcrypt to hash the plain password.
        // now create the user;
        const newUser = yield admin_1.User.create({
            email,
            password,
        });
        // Send the newUser as  response;
        res.status(200).json({
            status: 201,
            success: true,
            message: " User created Successfully",
            user: newUser,
        });
    }
    catch (error) {
        // console the error to debug
        console.log(error);
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
}));
app.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        // ** destructure the information from user;
        const { email, password } = user;
        // ** Check the (email/user) exist  in database or not ;
        const isUserExist = yield admin_1.User.findOne({
            email: email,
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
        const isPasswordMatched = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) === password;
        // ** if not matched send response that wrong password;
        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }
        // ** if the email and password is valid create a token
        /*
        To create a token JsonWebToken (JWT) receive's 3 parameter
        1. Payload -  This contains the claims or data you want to include in the token.
        2. Secret Key - A secure key known only to the server used for signing the token.
        3. expiration -  Additional settings like token expiration or algorithm selection.
        */
        // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration
        // ** This is our JWT Token
        const token = jsonwebtoken_1.default.sign({ _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email }, "YOUR_SECRET", {
            expiresIn: "1d",
        });
        // send the response
        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
        });
    }
    catch (error) {
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
}));
// Middleware function for token verification
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }
    jsonwebtoken_1.default.verify(token, "YOUR_SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        // Attach decoded user information to the request object
        req.user = decoded;
        next();
    });
}
// Apply middleware to protected routes
app.get("/protected-route", verifyToken, (req, res) => {
    // Access user information from req.user
    res.json({
        success: true,
        message: "Access granted to protected route",
        user: req.user,
    });
});
// Sample protected route that requires token verification
app.post("/protected-route2", verifyToken, (req, res) => {
    // Access user information from req.user
    res.json({
        success: true,
        message: "Access granted to another protected route",
        user: req.user,
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
