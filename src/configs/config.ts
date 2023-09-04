import { config } from "dotenv";

config();

export const configs = {
  Db_URL: process.env,
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SECRET_SALT,
};
