import dbHelper from "../helper.js";

const newsSlice = {
    getNews(page, rowsPerPage) {
        return dbHelper.exec(
            "SELECT id, title, description, date, getFirstImage(id) AS image FROM news " + 
            "LIMIT ?, ?",
            [page * rowsPerPage - rowsPerPage, +rowsPerPage]
        );
    }
};

export default newsSlice;