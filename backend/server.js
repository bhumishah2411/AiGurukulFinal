require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const wisdomRouter = require("./routes/wisdom");
const personaRouter = require("./routes/persona");
const chatRouter = require("./routes/chat");
const quizRouter = require("./routes/quiz");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// Rate limit: 30 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many requests. Please wait a moment." },
});
app.use("/api", limiter);

// ── Routes ──────────────────────────────────────────────────
app.use("/api/wisdom", wisdomRouter);
app.use("/api/persona", personaRouter);
app.use("/api/chat", chatRouter);
app.use("/api/quiz", quizRouter);

// ── Health check ────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "AI Gurukul Backend", time: new Date() });
});

// ── Global error handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[Error]", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`\n🪔 AI Gurukul Backend running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});
