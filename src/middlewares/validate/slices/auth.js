import Joi from "@hapi/joi";

const authValidations = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/[A-Z]/, "upper-case").regex(/[1-9]/, "number").required()
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  }),
  approveResetCode: Joi.object({
    verificationCode: Joi.string().length(6).required()
  }),
  changePassword: Joi.object({
    newPassword: Joi.string().min(8).regex(/[A-Z]/, "upper-case").regex(/[1-9]/, "number").required()
  })
};

export default authValidations;
