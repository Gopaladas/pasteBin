import express from "express";
import {
  createPaste,
  getContent,
  healthCheck,
} from "../controller/pasteBinController.js";

const binRoute = express.Router();

binRoute.post("/pastes", createPaste);
binRoute.get("/healtz", healthCheck);
binRoute.get("/pastes/:id", getContent);
export default binRoute;
