const Post = require("../models/Posts");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../middlewares/appError");
const validateInputs = require("../utils/validateInputs");
const appSuccess = require("../utils/appSuccess");
const filesUpload = require("../utils/filesUpload");
const cloudinary = require("../utils/cloudinary");

// CREATE POST
exports.createPost = catchAsync(async (req, res, next) => {
  // CREATE THE NEW POST
  let data = await new Post({
    ...req.body,
  });

  // CHECK IF FILES ARE IN THE POST
  if (!req.files) {
    data = await data.save(); // SAVE THE POST
  } else {
    // CHECK IF FILES ARE MORE THAN TWO
    if (req.files.postPictures.length > 2)
      return next(new AppError("You can not upload more than two files!", 400));
    // SAVE THE FILES TO CLOUDINARY AND SAVE ITS RETURN IT URL AND ID
    const postPictures = await filesUpload(req.files.postPictures, next);

    if (typeof postPictures === "string")
      return next(new AppError(postPictures, 404)); // check if there is error and return it

    data.postPictures = postPictures; // ATTACH THE RETURED ARRAY TO THE POST
    data = await data.save(); // SAVE THE POST
  }

  appSuccess(200, "Posts created successfully", res, data);
});
