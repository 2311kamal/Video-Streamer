import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
console.log(`\n\n${process.env.MONGO_URL}/${DB_NAME}\n\n`);
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error in connection: ", error);
    process.exit(1);
  }
};

export default connectDb;
