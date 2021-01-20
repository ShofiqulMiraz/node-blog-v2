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

postRoutes.route("/").post(protect, createPost).get(getAllPosts);
postRoutes.route("/:slug").get(getSinglePost);
postRoutes
  .route("/:id")
  .patch(updatePost)
  .delete(protect, restrict, deletePost);

module.exports = postRoutes;
