import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/mongoDB.js";
import binRoute from "./routers/pasteBinRouter.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", binRoute);

app.listen(PORT, () => {
  console.log(`successfully running at ${PORT}`);
});
