const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

postSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
