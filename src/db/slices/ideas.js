import dbHelper from "../helper.js";

const ideasSlice = {
  get(page, rowsPerPage) {
    return Promise.all([
      dbHelper.exec(
        "SELECT i.`id`, i.`title`, getFirstImage(i.`id`) AS `image`, u.`fullname` AS `creator` FROM `ideas` i " +
          "LEFT JOIN `categories` c ON c.`id` = i.`categoryId` " +
          "LEFT JOIN `users` u ON u.`id` = i.`creatorId` " +
          "WHERE i.`status` = '0' " +
          "LIMIT ?, ?",
        [page * rowsPerPage - rowsPerPage, +rowsPerPage]
      ),
      dbHelper.exec("SELECT COUNT(*) AS `rowsCount` FROM `ideas` WHERE `status` = '0'")
    ]);
  },
  getById(id) {
    return dbHelper.exec(
      "SELECT i.`id`, i.`title`, i.`description`, i.`status`, i.`creatorId`, c.`title` AS `category`, u.`fullname` AS `creator` FROM `ideas` i " +
        "LEFT JOIN `categories` c ON c.`id` = i.`categoryId` " +
        "LEFT JOIN `users` u ON u.`id` = i.`creatorId` " +
        "WHERE i.`id` = ?",
      [id]
    );
  },
  getIdeaImagesByIdeaId(id) {
    return dbHelper.exec("SELECT `id`, `title` FROM `ideaimages` WHERE `ideaId` = ?", [id]);
  },
  getIdeaAttachmentsByIdeaId(id) {
    return dbHelper.exec("SELECT `id`, `title` FROM `ideaattachments` WHERE `ideaId` = ?", [id]);
  },
  changeStatus(type, id) {
    return dbHelper.update("ideas", { status: type === "approve" ? "1" : "2" }, id);
  },
  setRejectionReason(reason, ideaId) {
    return dbHelper.exec("REPLACE INTO `idearejections` (??) VALUES (?)", [
      ["reason", "ideaId"],
      [reason, ideaId]
    ]);
  },
  unsetRejectionReason(id) {
    return dbHelper.exec("DELETE FROM `idearejections` WHERE `ideaId` = ?", [id]);
  }
};

export default ideasSlice;
