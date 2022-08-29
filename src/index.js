import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { routes } from "./routes/index.js";
import { createWebSocket } from "./chat/index.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/files", express.static(path.join(path.resolve(), "public/files")));

routes.forEach(route => {
  const middlewares = route.middlewares || [];
  app.use(route.path, ...middlewares, route.router);
});

app.get("/ping", (req, res) => {
  res.end("\\pong");
});

app.use((req, res) => {
  res.status(404).send("Url - not found!");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

createWebSocket(httpServer);
