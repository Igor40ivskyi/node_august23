import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { Token } from "../models/token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new ApiError("no token", 401);
      }

      const payload = tokenService.checkAccessToken(accessToken);

      const entity = await Token.findOne({ accessToken });
      if (!entity) {
        throw new ApiError("token is not valid", 400);
      }

      req.res.locals.tokenPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
