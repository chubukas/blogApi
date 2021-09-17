const express = require("express");
const commentController = require("../controllers/commentsController");

const router = express.Router();

router.post("/:postId", commentController.createComment);

router.route("/:Id").get(commentController.getComment);

router.get("/post/:postId", commentController.getAllComment);

module.exports = router;
