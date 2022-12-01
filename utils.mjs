import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readInput = ({ filePath, parseFn }) => {
  const file = fs.readFileSync(`${path.resolve(__dirname)}/${filePath}`, {
    encoding: "utf-8",
  });
  const input = file.split(/\n\s*\n/);
  return parseFn?.(input) || input;
};
