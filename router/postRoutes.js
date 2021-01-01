const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postcontroller");
const { protect, restrict } = require("../controllers/usercontroller");

const postRoutes = express.Router();

postRoutes.route("/").post(createPost).get(protect, getAllPosts);
postRoutes
  .route("/:id")
  .get(getSinglePost)
  .patch(updatePost)
  .delete(protect, restrict, deletePost);

module.exports = postRoutes;
