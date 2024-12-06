import express from "express";
import cors from "cors";
import { config } from "dotenv";

import connectDB from "./src/config/dbConfig.js";
config();
connectDB();

import userRoute from "./src/routes/userRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/v1/user", userRoute);

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
