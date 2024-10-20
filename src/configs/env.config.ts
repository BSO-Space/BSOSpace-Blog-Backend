import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Determine which .env file to load based on NODE_ENV
const envFilePath =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
const fullEnvPath = resolve(process.cwd(), envFilePath);

// Check if the file exists and load it
if (existsSync(fullEnvPath)) {
  const envConfig = readFileSync(fullEnvPath, "utf8").split("\n");
  envConfig.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} else {
  console.error(`Environment file not found: ${fullEnvPath}`);
  process.exit(1); // Exit if the environment file is missing
}

// Export the configuration
export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port:
    process.env.NODE_ENV === "development"
      ? process.env.DEV_BACKEND_PORT || 3000
      : process.env.PROD_BACKEND_PORT || 8000,
  databaseUrl: process.env.DATABASE_URL || "",
  pgUser: process.env.PG_USER || "",
  pgPassword: process.env.PG_PASSWORD || "",
  pgDatabase: process.env.PG_DATABASE || "",
  pgPort: process.env.PG_PORT || 5432,
  redisPort: process.env.REDIS_PORT || 6379,
  pgAdminEmail: process.env.PGADMIN_EMAIL || "",
  pgAdminPassword: process.env.PGADMIN_PASSWORD || "",
  pgAdminPort: process.env.PGADMIN_PORT || 5050,
};
