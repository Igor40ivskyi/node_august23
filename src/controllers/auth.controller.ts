import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auht.service";
import { ITokensPair } from "../types/token.type";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authService.register(req.body);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const tokensPair = await authService.login(req.body, req.res.locals.user);

      return res.status(200).json({
        ...tokensPair,
      });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const oldTokenPair = req.res.locals.oldTokenPair;
      const tokenPayload = req.res.locals.tokenPayload;

      const tokenPair = await authService.refresh(tokenPayload, oldTokenPair);
      return res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id: userId } = req.res.locals.tokenPayload;

      await authService.changePassword(req.body, userId);

      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
