import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongoDB.js";
import binRoute from "./routers/pasteBinRouter.js";

dotenv.config();

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", binRoute);

export default app;
