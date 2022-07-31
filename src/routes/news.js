import { Router } from "express";
import { getNewsController } from "../controllers/news.js";

const router = Router();

router.get("/", getNewsController);

export default router;