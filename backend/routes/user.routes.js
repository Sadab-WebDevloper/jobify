import express from "express";
import {
  forgotPassword,
  login,
  logOut,
  register,
  resetPassword,
  retriveUser,
  updateProfile,
  verifyOtp,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), register);
userRouter.post("/login", login);
userRouter.get("/logOut", logOut);
userRouter.put(
  "/profile/update",
  auth,
  upload.fields([
    { name: "file", maxCount: 1 }, // For resume
    { name: "profilePhoto", maxCount: 1 }, // For profile photo
  ]),
  updateProfile
);
userRouter.get("/me", auth, retriveUser);
userRouter.post("/forgotPass", forgotPassword);
userRouter.post("/verifyOtp", verifyOtp);
userRouter.post("/resetPassword", resetPassword);

export default userRouter;
