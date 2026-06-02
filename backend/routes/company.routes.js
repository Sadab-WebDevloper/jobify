import express from "express";
import {
  deleteCompany,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controller/company.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.post("/registerCompany", auth, registerCompany);
companyRouter.get("/getCompany", auth, getCompany);
companyRouter.get("/getCompany/:id", auth, getCompanyById);
companyRouter.put(
  "/updateCompany/:id",
  auth,
  upload.single("file"),
  updateCompany
);

companyRouter.delete("/deleteCompany/:id", auth, deleteCompany);

export default companyRouter;
