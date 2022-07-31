import { Router } from "express";
import { changeIdeaStatusController, getIdeaInfoController, getIdeasController } from "../controllers/ideas.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getIdeasController);

router.get("/info/:id", validate("common:reqParamsId"), getIdeaInfoController);
router.post("/change-status", validate("ideas:changeStatus"), changeIdeaStatusController);

export default router;
