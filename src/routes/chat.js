import { Router } from "express";
import { authMiddleware } from "../middlewares/auth/index.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

// router.get("/users", authMiddleware, getChatUsersController);
// router.get("/messages/:id", authMiddleware, validate("requiredId"), getMessagesController);
// router.get("/unread-messages-count", authMiddleware, getAllUnreadMessagesCountController);

export default router;
