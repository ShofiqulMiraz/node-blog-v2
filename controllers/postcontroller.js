const Post = require("../models/postmodels");
const APIFeature = require("../utils/apiFeature");

// adding create Post Validation by Joi
const Joi = require("joi");

const CreatePostValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const createPost = async (req, res) => {
  // validation before Post save
  const { error } = CreatePostValidation.validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send("Something went wrong, try again!");
  }
};

const getAllPosts = async (req, res) => {
  const features = new APIFeature(Post.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  try {
    const posts = await features.query;
    res.send(posts);
  } catch (error) {
    res.status(404).send("something went wrong, try again");
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.send("Post not found!");
    }
    res.send(post);
  } catch (error) {
    res.status(404).send("Post not found!");
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const updates = Object.keys(req.body);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(404).send("Post not found!");
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.send("Post not found!");
    }
    res.send("Post Successfully Deleted");
  } catch (error) {
    res.status(404).send("Post not found!");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
