import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.findById,
);

//Як валідувати багато айдішок GENIOUS!
// router.get(
//   "/:userId/cars/:carId",
//   commonMiddleware.isIdValid("userId"),
//   commonMiddleware.isIdValid("carId"),
//   userController.findById,
// );

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateById,
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteById,
);

export const userRouter = router;
