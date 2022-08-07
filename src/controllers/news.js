import { createController } from "../lib/lib.js";
import Db from "../db/index.js";

export const getNewsController = createController(async req => {
    const { page = 1, rowsPerPage = 5 } = req.body;
    return {
        items: await Db.news.get(page, rowsPerPage)
    }
});

export const getNewsInfoController = createController(async req => {
    const { id } = req.params;
    const [[newsInfo], images] = await Promise.all([
        Db.news.getInfo(id),
        Db.news.getImages(id)
    ]);
    return {
        ...(newsInfo || {}),
        images: images.map((el) => el.title)
    }
});

export const searchNewsController = createController(async req => {
    const { query } = req.query;
    return {
        items: await Db.news.search(query)
    }
});