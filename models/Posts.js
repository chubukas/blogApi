const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postMessage: {
      type: String,
      required: [true, "Post massage is needed"],
    },
    comments: [
      {
        type: String,
        ref: "Comments",
      },
    ],
    totalComments: {
      type: Number,
      default: 0,
    },
    postPictures: [],
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
