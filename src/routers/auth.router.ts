import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExsist,
  authController.login,
);

export const authRouter = router;
