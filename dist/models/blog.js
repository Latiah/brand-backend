"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    photo: String,
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
