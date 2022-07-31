import { Router } from "express";
import validate from "../middlewares/validate/index.js";
import {
  getAnnouncementsController,
  changeAnnouncementStatusController,
  getAnnouncementInfoController
} from "../controllers/announcements.js";

const router = Router();

router.get("/", validate("common:pagination"), getAnnouncementsController);
router.get("/info/:id", validate("common:reqParamsId"), getAnnouncementInfoController);
router.post("/change-status", validate("ideas:changeStatus"), changeAnnouncementStatusController);

export default router;
