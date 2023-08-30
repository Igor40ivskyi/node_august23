import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.findById(req.params.userId);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const createdUser = await userService.create(req.res.locals.user);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const { error } = UserValidator.update.validate(req.body);

      if (error) {
        throw new ApiError("skdjfkldsjfklsdjfklsdfj", 400);
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        req.body,
        {
          returnDocument: "after",
        },
      );

      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();