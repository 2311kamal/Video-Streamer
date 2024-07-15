// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDb from "./db/index.js";

dotenv.config({ path: "./env" });
const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("Error: ", error);
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`listening on prot ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error :", error);
//     throw error;
//   }
// })();
 
connectDb();
