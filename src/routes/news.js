import { Router } from "express";
import { getNewsController } from "../controllers/news.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getNewsController);

export default router;