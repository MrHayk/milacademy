import dbHelper from "./helper.js";
import newsSlice from "./slices/news.js";

const Db = {
  news: newsSlice,
  count(tableName) {
    return dbHelper.exec("SELECT COUNT(*) as rowsCount FROM ??", [tableName]);
  },
  selectAll(tableName) {
    return dbHelper.exec("SELECT * FROM ??", [tableName]);
  },
};

export default Db;
