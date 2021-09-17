const path = require("path");
const cloudinary = require("./cloudinary");
const validateFiles = require("./validateFiles");
const fs = require("fs");

const filesUpload = async (files, next) => {
  let data = [];
  let check;

  // fuction that uploads file to cloudinary
  const uploader = async (path) => await cloudinary.uploadToCloud(path);

  // checks if files is more than one
  if (files.length > 1) {
    // maps through the arrays of files
    for (const photo of files) {
      check = validateFiles(photo, next); // validates the files
      if (typeof check !== "string") {
        const photoPath = path.join("uploads", photo.name); // creates a path for the files
        photo.mv("./uploads/" + photo.name); // move photo to uploads directory

        const newPath = await uploader(photoPath); // returns the feedback from cloudinary
        const { url, ID } = newPath; // destructure the returned data from cloudinary feedback
        // pushes file details
        data.push({
          fileName: url,
          fileId: ID,
        });

        fs.unlinkSync(photoPath); // deletes photo from the uploads directory
      }
    }
  } else {
    check = validateFiles(files, next); // validates the files
    if (typeof check !== "string") {
      const photoPath = path.join("uploads", files.name); // creates a path for the files
      files.mv("./uploads/" + files.name); // move photo to uploads directory

      const newPath = await uploader(photoPath); // returns the feedback from cloudinary
      const { url, ID } = newPath; // destructure the returned data from cloudinary feedback

      // pushes file details
      data.push({
        fileName: url,
        fileId: ID,
      });

      fs.unlinkSync(photoPath); // deletes photo from the uploads directory
    }
  }

  return check ? check : data; //returns the array of files
};

module.exports = filesUpload;
