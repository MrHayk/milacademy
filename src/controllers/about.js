import Db from "../db/index.js";
import { createController } from "../lib/lib.js";

export const getAboutPageResourcesController = createController(async req => {
    return {
        items: await Db.selectAll("about")
    }
});