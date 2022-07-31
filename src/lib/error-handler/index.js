import {
  _AUTHENTHICATION_FAILED_,
  _CANT_SEND_MAIL_,
  _FORBIDDEN_,
  _UNKNOWN_ERROR_,
  _USER_UNDEFINED_,
  _WRONG_PARAMS_
} from "./error-codes.js";

export default (err, result) => {
  const { code = _UNKNOWN_ERROR_, message = "" } = err;
  result.meta.error = { code };
  result.meta.error.message = message || getErrorMessage(code);
  result.meta.status = getStatusCode(code);
};

function getStatusCode(code) {
  const statusCodes = {
    [_AUTHENTHICATION_FAILED_]: 401,
    [_UNKNOWN_ERROR_]: 500,
    [_USER_UNDEFINED_]: 404,
    [_CANT_SEND_MAIL_]: 405,
    [_FORBIDDEN_]: 403,
    [_WRONG_PARAMS_]: 406
  };
  return statusCodes[code] || 400;
}

function getErrorMessage(code) {
  const errorMessages = {
    [_AUTHENTHICATION_FAILED_]: "Authentication failed",
    [_USER_UNDEFINED_]: "User doesn't exist",
    [_CANT_SEND_MAIL_]: "Can't send mail",
    [_FORBIDDEN_]: "Forbidden",
    [_WRONG_PARAMS_]: "Wrong params"
  };
  return errorMessages[code] || "Unknwon error!";
}
