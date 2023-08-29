import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
    }
  },
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.userId);
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  },
);

app.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> => {
    try {
      const { error } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
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

      res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  },
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json(err.message);
});

app.listen(configs.PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/august_node2023");
  console.log(`Server has started on port ${configs.PORT}`);
});
