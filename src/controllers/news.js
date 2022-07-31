import { createController } from "../lib/lib.js";
import Db from "../db/index.js";

export const getNewsController = createController(async req => {
    return {
        items: await Db.news.getNews()
    }
});