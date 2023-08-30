import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { UserValidator } from "../validators";

class UserMiddleware {
  isCreateValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      req.res.locals = { user: { ...value } };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
