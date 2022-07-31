import { _UNKNOWN_DB_ERROR_ } from "../lib/error-handler/error-codes.js";
import db from "./config.js";

const dbHelper = {
  exec(query, params = []) {
    return new Promise((rslv, rjct) => {
      if (params && params.length > 0) {
        query = db.format(query, params);
      }
      console.log(query);
      db.query(query, (err, res) => {
        if (err) {
          console.log(err);
          rjct({
            code: _UNKNOWN_DB_ERROR_
          });
        } else rslv(res);
      });
    });
  },
  async update(tableName, payload, id) {
    const sqlQuery = "UPDATE ?? SET ? WHERE id = ?";
    await this.exec(sqlQuery, [tableName, payload, id]);
    return {
      message: `Data updated successfully`
    };
  }
};

export default dbHelper;
