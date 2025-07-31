import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./routes/auth.route";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// API end points
app.use("/api/auth", authRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB. Server not started.");
  }
};

startServer();
