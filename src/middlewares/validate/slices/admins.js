import Joi from "@hapi/joi";

const adminValidations = {
  ping: Joi.object({
    title: Joi.string().required(),
    title1: Joi.string().required()
  }),
  createCategory: Joi.object({
    title: Joi.string().required(),
    parentCategoryId: Joi.number()
  }),
  updateCategory: Joi.object({
    title: Joi.string().required(),
    id: Joi.number().required()
  }),
  search: Joi.object({
    page: Joi.number(),
    rowsPerPage: Joi.number(),
    query: Joi.string().min(3).required()
  }),
  userBlacklist: Joi.object({
    id: Joi.number().required(),
    type: Joi.string().valid("remove", "add").required()
  }),
  filterUsers: Joi.object({
    fromRgDate: Joi.date(),
    toRgDate: Joi.date(),
    type: Joi.string().valid("regular", "investor", "idea-man"),
    page: Joi.number(),
    rowsPerPage: Joi.number()
  })
};

export default adminValidations;
