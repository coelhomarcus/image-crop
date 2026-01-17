import express from "express";
import cors from "cors";
import gifRoutes from "./routes/gif.js";
import { checkGifsicle } from "./services/gifsicle.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/gif", gifRoutes);

app.get("/", (_req, res) => {
  res.json({ 
    service: "gif-processor",
    version: "1.0.0",
    endpoints: {
      health: "/api/gif/health",
      crop: "POST /api/gif/crop"
    }
  });
});

async function start() {
  const gifsicleAvailable = await checkGifsicle();
  if (!gifsicleAvailable) {
    console.error("⚠️  gifsicle not found!");
  }

  app.listen(PORT, () => {
    console.log(`🚀 GIF Processor running on http://localhost:${PORT}`);
  });
}

start();
