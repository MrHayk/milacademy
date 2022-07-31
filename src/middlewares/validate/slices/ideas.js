import Joi from "@hapi/joi";

const ideasValidations = {
  changeStatus: Joi.object({
    id: Joi.number().required(),
    type: Joi.string().valid("approve", "reject").required(),
    rejectionReason: Joi.string()
  })
};

export default ideasValidations;
