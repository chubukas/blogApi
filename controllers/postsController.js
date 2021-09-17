const Post = require("../models/Posts");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../middlewares/appError");
const validateInputs = require("../utils/validateInputs");
const appSuccess = require("../utils/appSuccess");
const filesUpload = require("../utils/filesUpload");
const cloudinary = require("../utils/cloudinary");
const Comment = require("../models/Comments");
const getPagination = require("../utils/getPagination");

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

// GET ALL POSTS WITH COMMENTS
exports.getAllposts = catchAsync(async (req, res, next) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  const customLabels = {
    totalDocs: "allPostTotal",
    limit: "pageSize",
    page: "currentPage",
    pagingCounter: "slNo",
    docs: "posts",
  };

  const customOptions = {
    offset,
    limit,
    customLabels,
    populate: "comments",
  };

  // GET ALL THE POST IN THE DATABASE
  let data = await Post.paginate({}, { ...customOptions });

  // SEND RESPONSE
  appSuccess(200, "successful", res, data);
});

// DELETE SINGLE POST
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.Id,
  });

  //   CHECK IF THE POST IS AVAILABLE
  if (!post)
    return next(
      new AppError(
        "Either this post have been deleted OR You are not the owner of this post!",
        400
      )
    );

  for (const ids of post.postPictures) {
    await cloudinary.deleteFromCloud(ids?.fileId);
  }
  // DELETE ALL COMMENTS UNDER THE POST
  await Comment.deleteMany({ post: post._id });

  appSuccess(200, "This post is deleted successfully", res);
});
