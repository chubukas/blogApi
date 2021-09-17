const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    post: {
      type: String,
      required: [true, "Post Id is required"],
      ref: "Posts",
    },
    commentMessage: {
      type: String,
      required: [true, "Comment Message is required"],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
