import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { ITokenPair } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: { _id: Types.ObjectId }): ITokenPair {
    const accessToken = jwt.sign(payload, "JwtAccess", { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, "JwtRefresh", { expiresIn: "10d" });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
