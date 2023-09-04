import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";

class UserMiddleware {
  public async isUserExsist(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new ApiError("User not found", 422);
      }

      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
