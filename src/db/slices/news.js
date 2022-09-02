
import dbHelper from "../helper.js";

const newsSlice = {
    get(page, rowsPerPage) {
        return dbHelper.exec(
            "SELECT id, description, date, getFirstImage(id) AS image FROM news " + 
            "LIMIT ?, ?",
            [page * rowsPerPage - rowsPerPage, +rowsPerPage]
        );
    },
    search(query) {
        return dbHelper.exec(
            "SELECT id, description, date, getFirstImage(id) AS image FROM news " +
            "WHERE description LIKE CONCAT('%', ?, '%')",
            [query]
        )
    },
    getInfo(id){
        return dbHelper.exec(
            "SELECT * FROM news " +
            "WHERE id = ?",
            [id]
        );
    },
    getImages(newsId) {
        return dbHelper.exec(
            "SELECT title FROM news_images " +
            "WHERE news_id = ?",
            [newsId]
        );
    }
};

export default newsSlice;