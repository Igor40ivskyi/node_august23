import { config } from "dotenv";

config();

export const configs = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 5002,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "AccessSecret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "RefreshSecret",
  SECRET_SALT: process.env.SECRET_SALT,
};
