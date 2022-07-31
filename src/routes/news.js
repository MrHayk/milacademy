import { Router } from "express";
import { getNewsController, getNewsInfoController } from "../controllers/news.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getNewsController);
router.get("/:id", getNewsInfoController);

export default router;