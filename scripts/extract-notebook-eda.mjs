import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const notebookPath = join(process.cwd(), "notebooks", "DMproject.ipynb");
const outputDir = join(process.cwd(), "public", "eda");

const figureMap = [
  { cellIndex: 22, fileName: "sex-distribution.png" },
  { cellIndex: 25, fileName: "smoking-distribution.png" },
  { cellIndex: 29, fileName: "drinking-distribution.png" },
  { cellIndex: 31, fileName: "age-by-drinking.png" },
  { cellIndex: 33, fileName: "age-by-smoking.png" },
  { cellIndex: 42, fileName: "outlier-counts.png" },
];

function extractPngFromCell(cell) {
  for (const output of cell.outputs || []) {
    const png = output?.data?.["image/png"];
    if (!png) continue;
    const base64 = Array.isArray(png) ? png.join("") : png;
    return Buffer.from(base64, "base64");
  }
  return null;
}

const notebook = JSON.parse(readFileSync(notebookPath, "utf8"));
mkdirSync(outputDir, { recursive: true });

for (const figure of figureMap) {
  const cell = notebook.cells?.[figure.cellIndex];
  if (!cell) {
    throw new Error(`Missing notebook cell ${figure.cellIndex}`);
  }

  const imageBuffer = extractPngFromCell(cell);
  if (!imageBuffer) {
    throw new Error(`No PNG output found in notebook cell ${figure.cellIndex}`);
  }

  writeFileSync(join(outputDir, figure.fileName), imageBuffer);
}

console.log(`Exported ${figureMap.length} EDA figures to public/eda.`);
