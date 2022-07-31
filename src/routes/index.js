import { authMiddleware } from "../middlewares/auth/index.js";
import { adminMiddleware } from "../middlewares/admin.js";
import authRouter from "./auth.js";
import categoriesRouter from "./categories.js";
import usersRouter from "./users.js";
import ideasRouter from "./ideas.js";
import announcementsRouter from "./announcements.js";
import chatRouter from "./chat.js";

export const routes = [
  {
    path: "/auth",
    router: authRouter
  },
  {
    path: "/categories",
    router: categoriesRouter,
    middlewares: [authMiddleware, adminMiddleware("super-admin")]
  },
  {
    path: "/users",
    router: usersRouter,
    middlewares: [authMiddleware, adminMiddleware("super-admin")]
  },
  {
    path: "/ideas",
    router: ideasRouter,
    middlewares: [authMiddleware, adminMiddleware("regular")]
  },
  {
    path: "/announcements",
    router: announcementsRouter,
    middlewares: [authMiddleware, adminMiddleware("regular")]
  },
  {
    path: "/chat",
    router: chatRouter
  }
];
