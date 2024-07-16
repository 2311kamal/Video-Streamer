// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import { app } from "./app.js";



dotenv.config({ path: "./env" });

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

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection failed:", error);
  });
