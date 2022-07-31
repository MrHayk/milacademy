import dbHelper from "../helper.js";

const announcementsSlice = {
  get(page, rowsPerPage) {
    return Promise.all([
      dbHelper.exec(
        "SELECT a.`id`, a.`title`, getAnnouncementFirstImage(a.`id`) AS `image`, u.`fullname` AS `creator` FROM `announcements` a " +
          "LEFT JOIN `categories` c ON c.`id` = a.`categoryId` " +
          "LEFT JOIN `users` u ON u.`id` = a.`creatorId` " +
          "WHERE a.`status` = '0' " +
          "LIMIT ?, ?",
        [page * rowsPerPage - rowsPerPage, +rowsPerPage]
      ),
      dbHelper.exec("SELECT COUNT(*) AS `rowsCount` FROM `announcements` WHERE `status` = '0'")
    ]);
  },
  getById(id) {
    return dbHelper.exec(
      "SELECT a.`id`, a.`title`, a.`description`, a.`status`, a.`creatorId`, c.`title` AS `category`, u.`fullname` AS `creator` FROM `announcements` a " +
        "LEFT JOIN `categories` c ON c.`id` = a.`categoryId` " +
        "LEFT JOIN `users` u ON u.`id` = a.`creatorId` " +
        "WHERE a.`id` = ?",
      [id]
    );
  },
  getAnnouncementImagesByAnnouncementId(id) {
    return dbHelper.exec("SELECT `id`, `title` FROM `announcementimages` WHERE `announcementId` = ?", [id]);
  },
  getAnnouncementAttachmentsByAnnouncementId(id) {
    return dbHelper.exec("SELECT `id`, `title` FROM `announcementattachments` WHERE `announcementId` = ?", [id]);
  },
  changeStatus(type, id) {
    return dbHelper.update("announcements", { status: type === "approve" ? "1" : "2" }, id);
  },
  setRejectionReason(reason, announcementId) {
    return dbHelper.exec("REPLACE INTO `announcementrejections` (??) VALUES (?)", [
      ["reason", "announcementId"],
      [reason, announcementId]
    ]);
  },
  unsetRejectionReason(id) {
    return dbHelper.exec("DELETE FROM `announcementrejections` WHERE `announcementId` = ?", [id]);
  }
};

export default announcementsSlice;
