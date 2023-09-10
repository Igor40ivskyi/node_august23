import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ETokenTypes } from "../enums/token.types.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "120s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, type: ETokenTypes): ITokenPayload {
    try {
      let secretKey;

      switch (type) {
        case ETokenTypes.Access:
          secretKey = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenTypes.Refresh:
          secretKey = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secretKey) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
