import express from "express";
import { login, signup } from "../controller/auth.controller";
import { authLimiter } from "../utils/rateLimiter";

const authRouter = express.Router();

authRouter.post("/signup", authLimiter, signup);
authRouter.post("/login", authLimiter, login);

export default authRouter;
