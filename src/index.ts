import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import "./config/passport";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined in environment variables");
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB. Server not started.");
  }
};

startServer();
