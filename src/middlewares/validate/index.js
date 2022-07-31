import { _WRONG_PARAMS_ } from "../../lib/error-handler/error-codes.js";
import { getResponseTemplate } from "../../lib/lib.js";
import validation_configs from "./validation_configs.js";

export default type => async (req, res, next) => {
  req.body = { ...req.body, ...req.query, ...req.params };
  const currentValidation = validation_configs[type];
  if (currentValidation) {
    try {
      await currentValidation.validateAsync(req.body);
    } catch (err) {
      const result = getResponseTemplate();
      result.meta.error = {
        code: _WRONG_PARAMS_,
        message: err.details[0].message.replace(/"/g, "'")
      };
      result.meta.status = 406;
      res.status(result.meta.status).json(result);
      return;
    }
  }
  next();
};
