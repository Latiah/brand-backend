"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record_admin = void 0;
const admin_1 = require("../models/admin");
const Record_admin = (req, res) => {
    const admin = new admin_1.Admin({
        email: "kimtifah2@gmail.com",
        password: "4563"
    });
    admin.save().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "eror occured setting user data" });
    });
    if (!admin) {
        res.status(500).json({ error: "incorrect password or email" });
    }
};
exports.Record_admin = Record_admin;
