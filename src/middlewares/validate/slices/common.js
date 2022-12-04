import Joi from "@hapi/joi";

const commonValidations = {
  reqParamsId: Joi.object({
    id: Joi.number().required(),
  }),
  queryParam: Joi.object({
    query: Joi.string().min(3).required(),
  }),
  pagination: Joi.object({
    page: Joi.number(),
    rowsPerPage: Joi.number(),
  }),
};

export default commonValidations;
