import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";

class AuthMiddleware {
  public async isEmailExist(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new ApiError("Email or password is not valid", 400);
      }
      req.res.locals = { ...req.res.locals, user };
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
