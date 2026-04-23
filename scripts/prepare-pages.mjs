import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { restaurants, products, reviews, users } = require("../simple_api/api/mock.js");

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const mockApiDir = resolve(distDir, "mock-api");

const main = async () => {
  await mkdir(mockApiDir, { recursive: true });

  await copyFile(resolve(distDir, "index.html"), resolve(distDir, "404.html"));
  await writeFile(resolve(distDir, ".nojekyll"), "");
  await writeFile(
    resolve(mockApiDir, "seed.json"),
    JSON.stringify(
      {
        restaurants,
        products,
        reviews,
        users,
      },
      null,
      2,
    ),
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
