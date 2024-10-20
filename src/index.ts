import { Elysia } from "elysia";
import { config } from "./configs/env.config";

// Ensure port is a numeric value
const port = parseInt(config.port as string, 10);

if (isNaN(port)) {
  throw new Error("Port must be a valid number");
}

export const app = new Elysia()

  .get("/", () => {
    return "hi";
  })
  .listen(port);

console.log(
  `🦊 Elysia is running in ${config.nodeEnv} mode at http://localhost:${port}`
);
