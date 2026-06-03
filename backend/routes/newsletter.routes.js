import express from "express";
import { subscribe } from "../controller/newsletter.controller.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", subscribe);

export default newsletterRouter;
