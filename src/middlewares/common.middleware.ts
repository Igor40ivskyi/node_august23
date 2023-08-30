import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public async isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!isObjectIdOrHexString(userId)) {
        throw new ApiError("user ID is not valid", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
