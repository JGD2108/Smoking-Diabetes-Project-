import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const astroPackagePath = require.resolve("astro/package.json");
const astroBin = path.join(path.dirname(astroPackagePath), "astro.js");

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..", "..");
const tempRoot = path.join(projectRoot, ".pages-build");
const outputDir = path.join(projectRoot, "dist-pages");
const [githubOwner = "JGD2108", githubRepo = "Smoking-Diabetes-Project-"] = (
  process.env.GITHUB_REPOSITORY || "JGD2108/Smoking-Diabetes-Project-"
).split("/");

async function setupTempProject() {
  await rm(tempRoot, { recursive: true, force: true });
  await rm(outputDir, { recursive: true, force: true });

  await mkdir(tempRoot, { recursive: true });
  await cp(path.join(projectRoot, "src"), path.join(tempRoot, "src"), { recursive: true });
  await cp(path.join(projectRoot, "public"), path.join(tempRoot, "public"), { recursive: true });
  await cp(path.join(projectRoot, "package.json"), path.join(tempRoot, "package.json"));
  await cp(path.join(projectRoot, "tsconfig.json"), path.join(tempRoot, "tsconfig.json"));

  await rm(path.join(tempRoot, "src", "pages", "api"), { recursive: true, force: true });

  const pagesConfig = `import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://${githubOwner}.github.io",
  base: "/${githubRepo}",
});
`;

  await writeFile(path.join(tempRoot, "astro.config.mjs"), pagesConfig, "utf8");
}

function runAstroBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [astroBin, "build", "--root", tempRoot, "--outDir", outputDir],
      {
        cwd: projectRoot,
        stdio: "inherit",
        env: {
          ...process.env,
          PUBLIC_DEPLOYMENT_TARGET: "github-pages",
        },
      },
    );

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`GitHub Pages build failed with exit code ${code}`));
    });
  });
}

async function finalizeOutput() {
  await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");
}

async function main() {
  await setupTempProject();
  await runAstroBuild();
  await finalizeOutput();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
