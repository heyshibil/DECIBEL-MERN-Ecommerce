import { ipKeyGenerator, rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.body?.email || ipKeyGenerator(req);
  },
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    // 429 is the standard code for 'Too Many Requests'
    res.status(429).json(options.message);
  },
});
