import { Router } from "express";
import { getAboutPageResourcesController } from "../controllers/about.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get(
  "",
  validate("common:typeQueryParam"),
  getAboutPageResourcesController
);

export default router;
