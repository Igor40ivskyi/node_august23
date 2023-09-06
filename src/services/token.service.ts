import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, "jwtAccess", { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, "jwtRefresh", { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkAccessToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, configs.JWT_ACCESS_SECRET) as ITokenPayload;
    } catch (e) {
      throw new ApiError("token is not valid", 400);
    }
  }
}

export const tokenService = new TokenService();
