import { Router } from "express";
import {
  filterBlacklistUsersController,
  filterController,
  getBlacklistUsersController,
  getUsersController,
  searchBlacklistUsersController,
  searchController,
  userToBlacklistController
} from "../controllers/users.js";
import validate from "../middlewares/validate/index.js";

const router = Router();

router.get("/", validate("common:pagination"), getUsersController);
router.get("/search", validate("admin:search"), searchController);
router.get("/filter", validate("admin:filterUsers"), filterController);

router.post("/blacklist/:id", validate("admin:userBlacklist"), userToBlacklistController);
router.get("/blacklist-users", validate("common:pagination"), getBlacklistUsersController);
router.get("/filter-blacklist-users", validate("admin:filterUsers"), filterBlacklistUsersController);
router.get("/search-blacklist-users", validate("admin:search"), searchBlacklistUsersController);

export default router;
