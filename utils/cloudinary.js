const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// UPLOAD FILES TO THE CLOUDINARY CLOUD
exports.uploadToCloud = function (filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filename,
      function (result) {
        resolve({ url: result.secure_url, ID: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};

// DELETES THE FILES FROM THE CLOUDINARY CLOUD
exports.deleteFromCloud = function (publicID) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicID, function (result) {
      resolve(result);
    });
  });
};
