import dbHelper from "./helper.js";
import newsSlice from "./slices/news.js";

const Db = {
  news: newsSlice,
  count(tableName) {
    return dbHelper.exec("SELECT COUNT(*) as rowsCount FROM ??", [tableName]);
  }
};

export default Db;
