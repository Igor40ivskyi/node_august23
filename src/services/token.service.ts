import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ETokenType } from "../enums/token.type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
