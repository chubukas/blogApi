const appSuccess = (code, message, res, data) => {
  res.status(code).json({
    statusCode: code,
    status: "success",
    message,
    data,
  });
};

module.exports = appSuccess;
