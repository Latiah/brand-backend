"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const admin_1 = require("../models/admin");
const loginUser = (req, res) => {
    const { email, password } = req.body;
    // Find user with matching email
    const user = admin_1.users.find((user) => user.email === email);
    // If user is found and password matches, return success message
    if (user && user.password === password) {
        res.json({ message: "correct input Login successful" });
    }
    else {
        // If user is not found or password is incorrect, return error message
        res.status(401).json({ message: "Invalid email or password" });
    }
};
exports.loginUser = loginUser;
