import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";

class UserMiddleware {
  public async isExistAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        throw new ApiError("User with this email already exists", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public async isExist(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new ApiError("user not found", 401);
      }

      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
