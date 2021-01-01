const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", function (next) {
  const post = this;

  post.slug = slugify(post.title);

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
