import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoriesController
} from "../controllers/categories.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getCategoriesController);
router.post("/create", validate("admin:createCategory"), createCategoryController);
router.put("/update/:id", validate("admin:updateCategory"), updateCategoryController);
router.delete("/delete/:id", validate("common:reqParamsId"), deleteCategoryController);

export default router;
