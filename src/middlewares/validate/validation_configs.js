import adminValidations from "./slices/admins.js";
import authValidations from "./slices/auth.js";
import commonValidations from "./slices/common.js";
import ideasValidations from "./slices/ideas.js";
import Joi from "@hapi/joi";

const validationConfigs = {
  ...formatSlice(commonValidations, "common"),
  ...formatSlice(adminValidations, "admin"),
  ...formatSlice(authValidations, "auth"),
  ...formatSlice(ideasValidations, "ideas"),
  requiredId: Joi.object({
    id: Joi.number().required()
  })
};

function formatSlice(config, key) {
  return Object.fromEntries(Object.entries(config).map(([_key, value]) => [`${key}:${_key}`, value]));
}

export default validationConfigs;
