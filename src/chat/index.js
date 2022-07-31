import { Server } from "socket.io";
import { authSocketMiddleware, forUsersSocketMiddleware } from "../middlewares/auth/index.js";
import EventEmitter from "events";
import { SOCKET_KEYWORDS } from "../lib/lib.js";
import Db from "../db/index.js";

// TODO: cors-origins

const { MODERATOR_RECEIVED_MESSAGE, MODERATOR_SENT_MESSAGE, USER_RECEIVED_MESSAGE, MODERATOR_READ_MESSAGES } = SOCKET_KEYWORDS;
const emitter = new EventEmitter();

export const createWebSocket = server => {
  const io = new Server(server, {
    cors: {
      origins: ["*"]
    }
  });

  const forUsers = io.of("/forUsers").use(forUsersSocketMiddleware);
  const chat = io.of("/forAdmins").use(authSocketMiddleware);
  const global = io.of("/global").use(authSocketMiddleware);

  forUsers.on("connect", socket => {
    socket.on(MODERATOR_RECEIVED_MESSAGE, ({ message, userId }) => {
      emitter.emit("newMessage", { message, userId });
    });
  });

  chat.on("connect", socket => {
    socket.on(MODERATOR_SENT_MESSAGE, ({ message, userId }) => {
      emitter.emit("sendMessage", { message, userId });
    });
    socket.on(MODERATOR_READ_MESSAGES, async ({ userId }) => {
      await Db.chat.changeMessageStatuses(userId);
      global.emit("unread-messages-count", await getUnreadMessagesCount());
    });
  });

  emitter.on("newMessage", async ({ message, userId }) => {
    chat.emit(MODERATOR_RECEIVED_MESSAGE, message, userId);
    await Db.chat.addMessage({ content: message.content, userId, creator: "0", isRead: "0" });
    global.emit("unread-messages-count", await getUnreadMessagesCount());
  });
  emitter.on("sendMessage", ({ message, userId }) => {
    forUsers.emit(USER_RECEIVED_MESSAGE, { message, userId });
  });

  global.on("connect", async socket => {
    socket.emit("unread-messages-count", await getUnreadMessagesCount());
  });
};

async function getUnreadMessagesCount() {
  const [{ unreadMessagesCount }] = await Db.chat.getUnreadMessagesCount();
  return unreadMessagesCount;
}
