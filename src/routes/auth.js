import { Router } from "express";
import validate from "../middlewares/validate/index.js";
import {
  approveResetCode,
  changePasswordController,
  loginController,
  startResetPasswordController
} from "../controllers/auth.js";

const router = Router();

router.post("/login", validate("auth:login"), loginController);
router.post("/start-reset-password", validate("auth:forgotPassword"), startResetPasswordController);
router.post("/approve-reset-code", validate("auth:approveResetCode"), approveResetCode);
router.post("/change-password", validate("auth:changePassword"), changePasswordController);

export default router;
