import express from "express";
import passport from "passport";
import { login, signup } from "../controller/auth.controller";
import { authLimiter } from "../utils/rateLimiter";

const authRouter = express.Router();

// Local auth
authRouter.post("/signup", authLimiter, signup);
authRouter.post("/login", authLimiter, login);

// Google OAuth - Step 1: Redirect to Google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

console.log(`Client url ${process.env.CLIENT_URL}`);

// Google OAuth - Step 2: Google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
    successRedirect: process.env.CLIENT_URL + "/signup",
    session: true,
  })
);

export default authRouter;
