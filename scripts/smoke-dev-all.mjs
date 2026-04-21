import { spawn } from "node:child_process";
import process from "node:process";

const API_HEALTHCHECK_URL =
  process.env.SMOKE_API_URL || "http://127.0.0.1:3001/api/restaurants";
const WEB_HEALTHCHECK_URL =
  process.env.SMOKE_WEB_URL || "http://127.0.0.1:5173";
const STARTUP_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS) || 60000;
const POLL_INTERVAL_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const spawnNpm = (args) => {
  if (process.platform === "win32") {
    return spawn(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "npm", ...args], {
      stdio: "inherit",
    });
  }

  return spawn("npm", args, {
    stdio: "inherit",
  });
};

const waitForUrl = async (name, url, deadline) => {
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        console.log(`${name} is ready at ${url}`);
        return;
      }
    } catch {
      // Service is not ready yet.
    }

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(`${name} did not become ready before timeout: ${url}`);
};

const stopProcessTree = async (child) => {
  if (!child.pid || child.killed) {
    return;
  }

  if (process.platform === "win32") {
    await new Promise((resolve) => {
      const killer = spawn(process.env.ComSpec || "cmd.exe", [
        "/d",
        "/s",
        "/c",
        "taskkill",
        "/pid",
        String(child.pid),
        "/t",
        "/f",
      ]);

      killer.on("exit", resolve);
      killer.on("error", resolve);
    });

    return;
  }

  child.kill("SIGTERM");
};

const devAllProcess = spawnNpm(["run", "dev:all"]);

const processExitPromise = new Promise((resolve, reject) => {
  devAllProcess.once("error", reject);
  devAllProcess.once("exit", (code) => {
    resolve(code ?? 0);
  });
});

const stopAndExit = async (exitCode) => {
  await stopProcessTree(devAllProcess);
  process.exit(exitCode);
};

process.on("SIGINT", () => {
  void stopAndExit(130);
});

process.on("SIGTERM", () => {
  void stopAndExit(143);
});

const main = async () => {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;

  const earlyExitCode = await Promise.race([
    processExitPromise,
    Promise.all([
      waitForUrl("Mock API", API_HEALTHCHECK_URL, deadline),
      waitForUrl("Frontend", WEB_HEALTHCHECK_URL, deadline),
    ]).then(() => null),
  ]);

  if (earlyExitCode !== null) {
    throw new Error(`dev:all exited before services were ready with code ${earlyExitCode}`);
  }

  console.log("Smoke test passed.");
  await stopProcessTree(devAllProcess);
};

main().catch(async (error) => {
  console.error("Smoke test failed.");
  console.error(error);
  await stopProcessTree(devAllProcess);
  process.exit(1);
});
