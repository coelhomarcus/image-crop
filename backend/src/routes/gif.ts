import { Router, Request, Response } from "express";
import multer from "multer";
import { cropGif, checkGifsicle } from "../services/gifsicle.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/health", async (_req: Request, res: Response) => {
  const available = await checkGifsicle();
  if (available) {
    res.json({ status: "ok", gifsicle: true });
  } else {
    res.status(503).json({ status: "error", gifsicle: false });
  }
});

router.post("/crop", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    if (file.mimetype !== "image/gif") {
      res.status(400).json({ error: "File must be a GIF" });
      return;
    }

    const x = parseInt(req.body.x, 10);
    const y = parseInt(req.body.y, 10);
    const width = parseInt(req.body.width, 10);
    const height = parseInt(req.body.height, 10);
    const colors = parseInt(req.body.colors, 10) || 256;

    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
      res.status(400).json({ error: "Invalid crop parameters" });
      return;
    }

    if (width <= 0 || height <= 0) {
      res.status(400).json({ error: "Width and height must be positive" });
      return;
    }

    const result = await cropGif(file.buffer, {
      x,
      y,
      width,
      height,
      colors: Math.min(256, Math.max(2, colors)),
    });

    res.set({
      "Content-Type": "image/gif",
      "Content-Length": result.size.toString(),
      "X-Original-Size": file.size.toString(),
      "X-Processed-Size": result.size.toString(),
    });

    res.send(result.buffer);
  } catch (error) {
    console.error("Error processing GIF:", error);
    res.status(500).json({ 
      error: "Failed to process GIF",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
