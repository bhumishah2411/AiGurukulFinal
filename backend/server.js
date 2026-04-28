require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const wisdomRouter = require("./routes/wisdom");
const personaRouter = require("./routes/persona");
const chatRouter = require("./routes/chat");
const quizRouter = require("./routes/quiz");
const translateRouter = require("./routes/translate");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
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
app.use("/api/translate", translateRouter);

// ── Health check ────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "AI Gurukul Backend", time: new Date() });
});

app.get('/', (req, res) => {
  res.send('AI Gurukul Backend is running securely.');
});

// ── Global error handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`\n🪔 AI Gurukul Backend running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health\n`);
});
