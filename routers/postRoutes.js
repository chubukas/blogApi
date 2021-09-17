const express = require("express");
const postController = require("../controllers/postsController");

const router = express.Router();

router
  .route("/")
  .post(postController.createPost)
  .get(postController.getAllposts);

router
  .route("/:Id")
  .delete(postController.deletePost)
  .get(postController.getPost)
  .patch(postController.updatePost);

module.exports = router;
