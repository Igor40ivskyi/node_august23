import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.findAll);

router.get("/:userId", userController.findById);

router.post("/", userMiddleware.isCreateValid, userController.create);

router.put("/:userId", userController.updateById);

router.delete("/:userId", userController.deleteById);

export const userRouter = router;
