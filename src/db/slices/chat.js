import dbHelper from "../helper.js";

const chatSlice = {
  addMessage(payload) {
    return dbHelper.exec("INSERT INTO `chatmessages` (??) VALUES(?)", [Object.keys(payload), Object.values(payload)]);
  },
  getChatUsers() {
    return dbHelper.exec(
      "SELECT DISTINCT u.`id`, u.`fullname`, u.`image` FROM `chatmessages` c LEFT JOIN `users` u ON u.`id` = c.`userId`"
    );
  },
  getChatMessages(userId) {
    return dbHelper.exec("SELECT `content`, `createdAt`, `creator` FROM `chatmessages` WHERE `userId` = ?", [userId]);
  },
  changeMessageStatuses(userId) {
    return dbHelper.exec("UPDATE `chatmessages` SET `isRead` = '1' WHERE `userId` = ? && `creator` = '0'", [userId]);
  },
  getUnreadMessagesCount() {
    return dbHelper.exec("SELECT COUNT(*) AS `unreadMessagesCount` FROM `chatmessages` WHERE `creator` = '0' AND `isRead` = '0'");
  },
  getUnreadMessagesCountByUserId(userId) {
    return dbHelper.exec(
      "SELECT COUNT(*) AS `unreadMessagesCount` FROM `chatmessages` WHERE `creator` = '0' AND `isRead` = '0' AND `userId` = ?",
      [userId]
    );
  }
};

export default chatSlice;
