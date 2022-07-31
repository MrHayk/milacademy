import dbHelper from "../helper.js";

const authSlice = {
  login(obj) {
    return dbHelper.exec("SELECT `password`, `reset-password-status`, `type`, `id`, `email` FROM `admins` WHERE ?", [obj]);
  },
  changeResetCodeStatus(status, id) {
    return dbHelper.update("admins", { "reset-password-status": status }, id);
  },
  changePassword(newPassword, id) {
    return dbHelper.update("admins", { password: newPassword }, id);
  }
};

export default authSlice;
