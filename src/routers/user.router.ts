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
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  userController.updateById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userController.deleteById,
);

export const userRouter = router;
