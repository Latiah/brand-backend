"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// Middleware function for token verification
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }
    jsonwebtoken_1.default.verify(token, "YOUR_SECRET", (err, decoded) => {
        if (err) {
            console.log(err);
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
exports.verifyToken = verifyToken;
