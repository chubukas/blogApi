const express = require("express");
const postController = require("../controllers/postsController");

const router = express.Router();

router
  .route("/")
  .post(postController.createPost)
  .get(postController.getAllposts);

module.exports = router;
