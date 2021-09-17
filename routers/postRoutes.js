const express = require("express");
const postController = require("../controllers/postsController");

const router = express.Router();

router.route("/").post(postController.createPost);

module.exports = router;
