const AppError = require("../middlewares/appError");

const validateInputs = (datas, next, showError) => {
  for (const key in datas) {
    if (datas[key] === "") {
      if (showError) return next(new AppError(`${key} cannot be empty!`, 400));
      delete datas[key];
    }
  }
};

module.exports = validateInputs;
