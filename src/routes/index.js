import { authMiddleware } from "../middlewares/auth/index.js";
import chatRouter from "./chat.js";
import newsRouter from "./news.js";

export const routes = [
  {
    path: "/chat",
    router: chatRouter
  },
  {
    path: "/news",
    router: newsRouter
  }
];
