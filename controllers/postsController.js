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
  let data;

  const { page, size } = req.query;
  // check if there is a query string
  if (page !== undefined || size !== undefined) {
    const { limit, offset } = getPagination(page, size);

    const customLabels = {
      totalDocs: "totalPost",
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

    // return posts with pagination
    data = await Post.paginate({}, { ...customOptions });
  } else {
    console.log("noquery string");
    const posts = await Post.find().populate({
      path: "comments",
      select: { post: 0, createdAt: 0 },
    });

    const totalPost = posts.length;

    // return posts without
    data = { totalPost, posts };
  }

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

// GET SINGLE POST
exports.getPost = catchAsync(async (req, res, next) => {
  let post = await Post.findById(req.params.Id).populate({
    path: "comments",
    select: { post: 0, createdAt: 0 },
  });

  //   CHECK IF THE POST IS AVAILABLE
  if (!post)
    return next(
      new AppError("This post is unavailable or have been delete!", 400)
    );

  const totalComments = post.comments.length;
  post = { totalComments, post };
  // SEND THE RESULT TO THE CLIENT
  appSuccess(200, "Post", res, post);
});

// UPDATE POST SINGLE POST
exports.updatePost = catchAsync(async (req, res, next) => {
  const datas = req.body;
  let post;
  validateInputs(datas, next); // CHECK FROM EMPTY FIELDS AND DELETE THEM

  // CHECK IF FILES ARE IN THE POST
  if (!req.files) {
    post = await Post.findOneAndUpdate({ _id: req.params.Id }, datas, {
      new: true,
      runValidators: true,
    }).populate({
      path: "comments",
      select: { post: 0, createdAt: 0 },
    });
  } else {
    // Return an error if images is among the update
    return next(new AppError("You can not update images", 404));
  }

  //CHECK IF THE POST IS AVAILABLE
  if (!post)
    return next(
      new AppError(
        "Either this post have been deleted OR You are not the owner of this post!",
        400
      )
    );

  const totalComments = post.comments.length;
  post = { totalComments, post };
  appSuccess(200, "Post updated successfully", res, post);
});
