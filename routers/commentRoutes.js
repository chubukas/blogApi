const express = require("express");
const commentController = require("../controllers/commentsController");

const router = express.Router();

router.post("/:postId", commentController.createComment);

router
  .route("/:Id")
  .get(commentController.getComment)
  .patch(commentController.updateComment);

router.get("/post/:postId", commentController.getAllComment);

module.exports = router;
