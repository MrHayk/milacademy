import dbHelper from "../db/helper.js";
import { createController } from "../lib/lib.js";

export const getAboutPageResourcesController = createController(async (req) => {
  const { type } = req.query;
  const aboutItems = await dbHelper.exec(
    "SELECT * FROM `about` WHERE `type` = ?",
    [type]
  );
  return aboutItems.map((el) => {
    if (el.list_items) {
      return {
        ...el,
        list_items: el.list_items.split("$"),
      };
    }
    return el;
  });
});
