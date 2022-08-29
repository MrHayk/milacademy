import { Router } from "express";
import { getNewsController, getNewsInfoController, searchNewsController } from "../controllers/news.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getNewsController);
router.get("/search", searchNewsController);
router.get("/:id", getNewsInfoController);

export default router;