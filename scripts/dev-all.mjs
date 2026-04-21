import { spawn } from "node:child_process";
import process from "node:process";

const commands = [
  {
    label: "api",
    args: ["--prefix", "simple_api", "start"],
  },
  {
    label: "web",
    args: ["run", "dev", "--", "--host", "127.0.0.1"],
  },
];

const spawnCommand = (args) => {
  if (process.platform === "win32") {
    return spawn(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "npm", ...args], {
      stdio: "inherit",
    });
  }

  return spawn("npm", args, {
    stdio: "inherit",
  });
};

const children = commands.map(({ label, args }) => {
  const child = spawnCommand(args);

  child.on("error", (error) => {
    console.error(`[${label}] failed to start`, error);
  });

  return child;
});

let isShuttingDown = false;

const stopChildren = () => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

for (const child of children) {
  child.on("exit", (code) => {
    if (!isShuttingDown) {
      stopChildren();
      process.exitCode = code ?? 0;
    }
  });
}

process.on("SIGINT", stopChildren);
process.on("SIGTERM", stopChildren);
