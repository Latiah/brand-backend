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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const admin_1 = require("./models/admin");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validations_1 = require("./validation/validations");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const swaggerJsdoc = yamljs_1.default.load("./yamal.yaml");
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
const saltRounds = 10; // Number of salt rounds for bcrypt
app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        const valid = (0, validations_1.loginValidations)(req.body);
        if (valid.error) {
            res.status(400).json(valid);
        }
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
                message: "Email already used",
            });
            // return;
        }
        // ** if not create a new user ;
        // !! Don't save the password as plain text in db . I am saving just for demonstration.
        // ** You can use bcrypt to hash the plain password.
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // now create the user;
        const newUser = yield admin_1.User.create({
            email,
            password: hashedPassword,
        });
        // Send the newUser as  response;
        res.status(200).json({
            status: 200,
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
        const valid = (0, validations_1.loginValidations)(req.body);
        if (valid.error) {
            res.status(400).json(valid);
        }
        // ** destructure the information from user;
        const { email, password } = user;
        // ** Check the (email/user) exist  in database or not ;
        const isUserExist = yield admin_1.User.findOne({
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
        const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
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
//swagger setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJsdoc));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
