import dbHelper from "./helper.js";
import adminsSlice from "./slices/admins.js";
import announcementsSlice from "./slices/announcements.js";
import authSlice from "./slices/auth.js";
import chatSlice from "./slices/chat.js";
import ideasSlice from "./slices/ideas.js";

const Db = {
  admins: adminsSlice,
  auth: authSlice,
  ideas: ideasSlice,
  announcements: announcementsSlice,
  chat: chatSlice,
  count(tableName) {
    return dbHelper.exec("SELECT COUNT(*) as rowsCount FROM ??", [tableName]);
  }
};

export default Db;
