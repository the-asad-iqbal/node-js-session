import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

// schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//  put => update =>
//  this = >schema
// call => middleware

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await hash(this.password, 10); // hashed password stored in db
    next();
  } catch (error) {
    next(error);
  }
});
// methods

userSchema.methods.isValidPassword = async function (password) {
  // 1st arg = simple password, 2nd arg = hashed password, true / false

  return await compare(password, this.password);
};

// generate Token
userSchema.methods.generateToken = function () {
  // payload => token => value store
  const token = jwt.sign(
    {
      id: this._id, // unique
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );


  return token;
};

// 7:24 pm => 7:24 => 24 hour
const User = mongoose.model("User", userSchema);
export default User;
