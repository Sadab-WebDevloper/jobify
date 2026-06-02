import express from "express";
import {
  applyJob,
  deleteApplicant,
  getApplicant,
  getAppliedJob,
  updateStatus,
} from "../controller/application.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const applicationRoute = express.Router();

applicationRoute.post("/applyJob/:id", auth, applyJob);
applicationRoute.get("/getAppliedJob", auth, getAppliedJob);
applicationRoute.get("/getApplicant/:id", auth, getApplicant);
applicationRoute.put("/updateStatus/:id", auth, updateStatus);
applicationRoute.delete("/deleteApplicant/:id", auth, deleteApplicant);

export default applicationRoute;
