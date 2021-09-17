const validateFiles = (files, next) => {
  const fileSize = files.size / (1024 * 1024); //CONVERTS THE FILE SIZE TO MB
  const mime = ["image/png", "image/jpg", "image/jpeg"]; // THE REQUIRED FILE TYPES
  let error;
  //CHECKS IF THE FILES MATCHES THE REQUIRED FILE TYPES
  if (!mime.includes(files.mimetype)) {
    error = "Only png, jpg and jpeg pictures type are required!";
  }

  // CHECKS IF THE FILE IS MORE THAN 2MB
  if (fileSize > 2) {
    error = "The max size needed should be 2Mb!";
  }

  return error;
};

module.exports = validateFiles;
