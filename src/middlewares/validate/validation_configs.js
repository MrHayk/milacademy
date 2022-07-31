import commonValidations from "./slices/common.js";
import Joi from "@hapi/joi";

const validationConfigs = {
  ...formatSlice(commonValidations, "common"),
  requiredId: Joi.object({
    id: Joi.number().required()
  })
};

function formatSlice(config, key) {
  return Object.fromEntries(Object.entries(config).map(([_key, value]) => [`${key}:${_key}`, value]));
}

export default validationConfigs;
