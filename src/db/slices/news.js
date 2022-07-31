import dbHelper from "../helper.js";

const newsSlice = {
    getNews(page, rowsPerPage) {
        return dbHelper.exec(
            "SELECT id, title, description, date, getFirstImage(id) AS image FROM news " + 
            "LIMIT ?, ?",
            [page * rowsPerPage - rowsPerPage, +rowsPerPage]
        );
    },
    getNewsInfo(id){
        return dbHelper.exec(
            "SELECT * FROM news " +
            "WHERE id = ?",
            [id]
        );
    },
    getNewsImages(newsId) {
        return dbHelper.exec(
            "SELECT title FROM news_images " +
            "WHERE news_id = ?",
            [newsId]
        );
    }
};

export default newsSlice;