import dbHelper from "../helper.js";

const adminsSlice = {
  ping() {
    return dbHelper.exec("SELECT `title` FROM `categories`");
  },
  categories: {
    get(page, rowsPerPage) {
      return dbHelper.exec(
        "SELECT `id`, `title`, `parentCategoryId` FROM `categories` WHERE `parentCategoryId` IS NULL LIMIT ?,?",
        [page * rowsPerPage - rowsPerPage, +rowsPerPage]
      );
    },
    getParentCategoriesCount() {
      return dbHelper.exec("SELECT COUNT(*) as rowsCount FROM `categories` WHERE `parentCategoryId` IS NULL");
    },
    getById(id) {
      return dbHelper.exec("SELECT `id`, `title`, `parentCategoryId` FROM `categories` WHERE `id` = ?", [id]);
    },
    getChilds(parentIds) {
      return dbHelper.exec("SELECT `id`, `title`, `parentCategoryId` FROM `categories` WHERE `parentCategoryId` IN (?)", [
        parentIds
      ]);
    },
    create(payload) {
      return dbHelper.exec("INSERT INTO `categories` (??) VALUES(?)", [Object.keys(payload), Object.values(payload)]);
    },
    update(id, newTitle) {
      return dbHelper.update("categories", { title: newTitle }, id);
    },
    delete(id) {
      return dbHelper.exec("DELETE FROM `categories` WHERE `id` = ?", [id]);
    }
  },
  users: {
    get(page, rowsPerPage) {
      return dbHelper.exec(
        "SELECT users.`fullname`, users.`id`, users.`type`, users.`image`, users.`mobile`, users.`email`, users.`registrationDate` " +
          "FROM users LEFT JOIN blacklist ON users.`id` = blacklist.`userId` " +
          "WHERE  blacklist.`userId` IS NULL " +
          "LIMIT ?,?",
        [page * rowsPerPage - rowsPerPage, +rowsPerPage]
      );
    },
    count() {
      return dbHelper.exec(
        "SELECT COUNT(users.id) AS rowsCount " +
          "FROM users LEFT JOIN blacklist ON users.`id` = blacklist.`userId` " +
          "WHERE  blacklist.`userId` IS NULL"
      );
    },
    getBlacklistUsers(page, rowsPerPage) {
      return dbHelper.exec(
        "SELECT users.id, users.fullname, users.email, users.type, users.mobile, users.image, users.registrationDate " +
          "FROM blacklist LEFT JOIN users " +
          "ON blacklist.userId = users.id LIMIT ?, ?",
        [page * rowsPerPage - rowsPerPage, +rowsPerPage]
      );
    },
    blackListUserscount() {
      return dbHelper.exec(
        "SELECT count(blacklist.userId) AS rowsCount" + " FROM blacklist LEFT JOIN users" + " ON blacklist.userId = users.id"
      );
    },
    addToBlacklist(payload) {
      return dbHelper.exec("INSERT INTO `blacklist` (??) VALUES(?)", [Object.keys(payload), Object.values(payload)]);
    },
    removeFromBlacklist(payload) {
      return dbHelper.exec("DELETE FROM `blacklist` WHERE ?", [payload]);
    },
    getByNameOrEmail(option, page, rowsPerPage) {
      return dbHelper.exec(
        `SELECT users.id, users.fullname, users.email, users.mobile, users.type,
        users.image, users.registrationDate, COUNT(*) OVER() AS rowsCount FROM users
        LEFT JOIN blacklist ON blacklist.userId = users.id
        WHERE blacklist.userId IS NULL AND (users.email LIKE CONCAT('%', ?, '%') OR users.fullname LIKE CONCAT('%', ?, '%'))
        LIMIT ?, ?`,
        [option, option, page * rowsPerPage - rowsPerPage, +rowsPerPage]
      );
    },
    filter(payload, page, rowsPerPage) {
      return dbHelper.exec(
        "SELECT users.id, users.fullname, users.email, users.mobile, users.type, users.image, users.registrationDate, COUNT(*) OVER() AS rowsCount " +
          "FROM users LEFT JOIN blacklist ON blacklist.userId = users.id " +
          "WHERE (registrationDate BETWEEN ? AND ?) " +
          (payload.type ? "AND `type` = ? AND " : "AND ") +
          "blacklist.userId IS NULL " +
          "LIMIT ?,?",
        [
          payload.startDate,
          payload.endDate,
          ...(payload.type ? [payload.type] : []),
          page * rowsPerPage - rowsPerPage,
          +rowsPerPage
        ]
      );
    },
    filterBlacklistUsers(payload, page, rowsPerPage) {
      return dbHelper.exec(
        "SELECT users.id, users.fullname, users.email, users.mobile, users.type, users.image, users.registrationDate, COUNT(*) OVER() AS rowsCount FROM users " +
          "LEFT JOIN blacklist ON blacklist.userId = users.id " +
          "WHERE (registrationDate BETWEEN ? AND ?) AND blacklist.userId = users.id " +
          (payload.type ? "AND `type` = ? " : " ") +
          "LIMIT ?, ?",
        [
          payload.startDate,
          payload.endDate,
          ...(payload.type ? [payload.type] : []),
          page * rowsPerPage - rowsPerPage,
          +rowsPerPage
        ]
      );
    },
    searchBlacklistUsers(option, page, rowsPerPage) {
      return dbHelper.exec(
        `SELECT users.id, users.fullname, users.email, users.mobile, users.type,
        users.image, users.registrationDate, COUNT(*) OVER() AS rowsCount FROM users
        LEFT JOIN blacklist ON blacklist.userId = users.id
        WHERE (users.email LIKE CONCAT('%', ?, '%') OR users.fullname LIKE CONCAT('%', ?, '%')) AND blacklist.userId = users.id LIMIT ?,?`,
        [option, option, page * rowsPerPage - rowsPerPage, +rowsPerPage]
      );
    }
  }
};

export default adminsSlice;
