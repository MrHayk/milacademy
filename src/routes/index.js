import chatRouter from "./chat.js";
import newsRouter from "./news.js";
import aboutRouter from "./about.js";

export const routes = [
  {
    path: "/chat",
    router: chatRouter
  },
  {
    path: "/news",
    router: newsRouter
  },
  {
    path: "/about",
    router: aboutRouter
  }
];
