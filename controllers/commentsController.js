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
