import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import quizRoutes from "./routes/quizRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import assignmentRoutes from './routes/assignmentRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve media folder as static
app.use('/media', express.static(path.join(__dirname, 'data', 'media')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/quizzes", quizRoutes);
app.use("/sessions", sessionRoutes);
app.use("/assignments", assignmentRoutes);
app.use('/media', mediaRoutes);
// Health check
app.get("/healthz", (req, res) => {
  res.send("Server is healthy");
});

// Default route
app.get("/", (req, res) => {
  res.send("Anglo Diver API is running...");
});

// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
