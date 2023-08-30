import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.findAll);

router.post("/", userMiddleware.isCreateValid, userController.create);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.findById,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.updateById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteById,
);

export const userRouter = router;