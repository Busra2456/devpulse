import { Router } from "express";

import { userController } from "./user.controller";
import { USER_ROLE } from "../../types/index";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userController.createUser);
router.get('/',auth(USER_ROLE.contributor, USER_ROLE.maintainer),userController.getAllUsers);
router.get("/:id",userController.getSingleUser);
router.put("/:id",auth(USER_ROLE.contributor, USER_ROLE.maintainer),userController.updateUser);
router.delete("/:id",auth(USER_ROLE.contributor, USER_ROLE.maintainer),userController.deleteUser);

export const userRoute = router;