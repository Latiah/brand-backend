"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
// Define an interface for the User document
/*interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

UserSchema.pre<UserDocument>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  //console.log("user about to be created and saved",this);
  next();
});*/
exports.User = mongoose_1.default.model("Users", UserSchema);
