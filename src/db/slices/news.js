import dbHelper from "../helper.js";

const newsSlice = {
    getNews() {
        return dbHelper.exec(
            "SELECT id, title, description, date, getFirstImage(id) AS image FROM news"
        );
    }
};

export default newsSlice;