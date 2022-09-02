import { Router } from "express";
import { getAboutPageResourcesController } from "../controllers/about.js";

const router = Router();

router.get("", getAboutPageResourcesController);

export default router;