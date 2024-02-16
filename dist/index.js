"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//fNqsrpAUmHIox43t;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const adminController_1 = require("./controllers/adminController");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://kimtifah2:fNqsrpAUmHIox43t@cluster0.gw0mecl.mongodb.net/portifolio?retryWrites=true&w=majority").then(() => {
    console.log("the database connection was successful");
}).catch((err) => {
    console.log(err);
});
app.use(body_parser_1.default.json());
// Authentication endpoint
app.post('/login', adminController_1.loginUser);
app.use(blogRoutes_1.default);
app.use(messagesRoutes_1.default);
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
