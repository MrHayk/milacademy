import { authMiddleware } from "../middlewares/auth/index.js";
import chatRouter from "./chat.js";

export const routes = [
  {
    path: "/chat",
    router: chatRouter
  }
];
