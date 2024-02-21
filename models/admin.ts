import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

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
export const User = mongoose.model("Users", UserSchema);
