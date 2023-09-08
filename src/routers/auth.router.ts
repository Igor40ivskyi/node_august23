import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ICredentials } from "../types/token.type";
import { UserValidator } from "../validators";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
