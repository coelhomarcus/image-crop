import { spawn } from "child_process";
import { writeFile, unlink, readFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { tmpdir } from "os";

export interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  colors?: number; // 2-256
  optimize?: boolean;
}

export interface GifsicleResult {
  buffer: Buffer;
  size: number;
}

export async function cropGif(
  inputBuffer: Buffer,
  options: CropOptions
): Promise<GifsicleResult> {
  const { x, y, width, height, colors = 256, optimize = true } = options;

  const tempDir = tmpdir();
  const inputPath = join(tempDir, `input-${randomUUID()}.gif`);
  const outputPath = join(tempDir, `output-${randomUUID()}.gif`);

  try {
    await writeFile(inputPath, inputBuffer);

    const args: string[] = [];

    args.push("--crop", `${x},${y}+${width}x${height}`);

    if (colors < 256) {
      args.push("--colors", colors.toString());
    }

    if (optimize) {
      args.push("--optimize=3");
    }

    args.push(inputPath, "-o", outputPath);

    await runGifsicle(args);

    const outputBuffer = await readFile(outputPath);

    return {
      buffer: outputBuffer,
      size: outputBuffer.length,
    };
  } finally {
    await Promise.all([
      unlink(inputPath).catch(() => {}),
      unlink(outputPath).catch(() => {}),
    ]);
  }
}

function runGifsicle(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn("gifsicle", args);

    let stderr = "";

    process.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`gifsicle failed with code ${code}: ${stderr}`));
      }
    });

    process.on("error", (err) => {
      reject(new Error(`Failed to spawn gifsicle: ${err.message}`));
    });
  });
}

export async function checkGifsicle(): Promise<boolean> {
  return new Promise((resolve) => {
    const process = spawn("gifsicle", ["--version"]);
    process.on("close", (code) => resolve(code === 0));
    process.on("error", () => resolve(false));
  });
}
