import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: {
    message: "Too many requests, please try again after a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
