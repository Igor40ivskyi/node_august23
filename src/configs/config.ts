import { config } from "dotenv";

config();

export const configs = {
  Db_URL: process.env,
  PORT: process.env.PORT,
};
