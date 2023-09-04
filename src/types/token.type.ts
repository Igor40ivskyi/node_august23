import { IUser } from "./user.type";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, "email" | "password">;
