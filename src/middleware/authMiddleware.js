import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async(req, res, next) => {
  try {
    const { authToken } = req.cookies;
    if(!authToken) return res.status(401).json({ message: "Unauthorized!" });

    // 1: token, 2: signature => secret key
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    // return payload.

    if(!decoded.id) return res.status(401).json({ message: "Unauthorized!" });

    const user = await User.findOne({ _id: decoded.id });

    if(!user) return res.status(401).json({ message: "Unauthorized!" });

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};



export { authMiddleware };