const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  passwordIssueTime: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiredAt: {
    type: Date,
  },
});

// hashing password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  //   hash password with a cost of 12
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

// comparing password for login
userSchema.methods.comparePassword = async function (
  candidatePassword,
  storedPassword
) {
  return await bcrypt.compare(candidatePassword, storedPassword);
};

// checking if password changed after jwt issued time

userSchema.methods.passwordChagedAfterJWT = function (JWTIssueTime) {
  const user = this;
  if (user.passwordIssueTime) {
    const passwordIssueTime = parseInt(
      user.passwordIssueTime.getTime() / 1000,
      10
    );
    return passwordIssueTime > JWTIssueTime;
  }

  return false;
};

// creating password reset Token
userSchema.methods.createPasswordResetToken = function () {
  const user = this;
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetTokenExpiredAt = Date.now() + 10 * 60 * 1000;

  console.log(resetToken, user.passwordResetToken);

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
