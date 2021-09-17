const Comment = require("../models/Comments");
const Post = require("../models/Posts");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../middlewares/appError");
const validateInputs = require("../utils/validateInputs");
const appSuccess = require("../utils/appSuccess");

//CREATE A COMMENT UNDER A POST
exports.createComment = catchAsync(async (req, res, next) => {
  const { commentMessage } = req.body;
  const { postId } = req.params;

  // SELECTE THE POST WITH THE ID
  const post = await Post.findById(postId);

  //   CHECK IF THE POST IS AVAILABLE
  if (!post)
    return next(
      new AppError(
        "The post with the id is unavailable or have been deleted!",
        400
      )
    );

  // CREATE THE COMMENT
  let comments = await new Comment({
    post: postId,
    commentMessage,
  });

  // SAVE THE COMMENT
  comments = await comments.save();

  // UPDATE THE POST WITH THE ID OF THE COMMENT AND INCREASE THE TOTAL BY 1
  await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: comments._id }, $inc: { totalComments: 1 } },
    { new: true, runValidators: true }
  );

  // REMOVE UNWANTED FILEDS BEFORE SENDING
  comments.post = undefined;
  comments.createdAt = undefined;

  // SEND THE RESULT TO THE CLIENT
  appSuccess(200, "Comments created successfully", res, comments);
});

// GET A SINGLE COMMENT
exports.getComment = catchAsync(async (req, res, next) => {
  const { Id } = req.params;

  // SELETE COMMENT FROM DATABASE
  const comment = await Comment.findById(Id);

  //   CHECK IF THE POST IS AVAILABLE
  if (!comment)
    return next(
      new AppError("This comment is unavailable or have been delete!", 400)
    );

  // REMOVE UNWANTED FILEDS BEFORE SENDING
  comment.post = undefined;
  comment.createdAt = undefined;

  //SEND TO THE CLIENT
  appSuccess(200, "successfully", res, comment);
});

// GET ALL COMMENTS ON A POST
exports.getAllComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  // SELETE COMMENT FROM DATABASE
  const comment = await Comment.find(
    { post: postId },
    {},
    { select: { post: 0, createdAt: 0, updatedAt: 0 } }
  );

  //   CHECK IF THE POST IS AVAILABLE
  if (comment.length < 1)
    return next(new AppError("There is no comment under this post!", 400));

  // REMOVE UNWANTED FILEDS BEFORE SENDING
  comment.post = undefined;
  comment.createdAt = undefined;

  //SEND TO THE CLIENT
  appSuccess(200, "successfully", res, comment);
});

// UPDATE COMMENT
exports.updateComment = catchAsync(async (req, res, next) => {
  const datas = req.body;

  validateInputs(datas, next); // CHECK FROM EMPTY FIELDS AND DELETE THEM

  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.Id },
    datas,
    { new: true, runValidators: true }
  );

  //   CHECK IF THE POST IS AVAILABLE
  if (!comment)
    return next(
      new AppError(
        "Either this comment have been deleted OR You are not the owner of this comment!",
        400
      )
    );

  // REMOVE UNWANTED FILEDS BEFORE SENDING
  comment.post = undefined;
  comment.createdAt = undefined;

  //SEND TO THE CLIENT
  appSuccess(200, "comment updated successfully", res, comment);
});
