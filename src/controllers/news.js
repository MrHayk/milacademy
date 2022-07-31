import { createController } from "../lib/lib.js";
import Db from "../db/index.js";

export const getNewsController = createController(async req => {
    const { page = 1, rowsPerPage = 5 } = req.body;
    return {
        items: await Db.news.getNews(page, rowsPerPage)
    }
});
export const getNewsInfoController = createController(async req => {
    const { id } = req.params;
    const [[newsInfo], images] = await Promise.all([
        Db.news.getNewsInfo(id),
        Db.news.getNewsImages(id)
    ]);
    return {
        ...(newsInfo || {}),
        images: images.map((el) => el.title)
    }
});