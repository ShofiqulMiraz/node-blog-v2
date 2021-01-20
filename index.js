const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const postRoutes = require("./router/postRoutes");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const userRoutes = require("./router/userRoutes");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
var cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
var xss = require("xss-clean");
var hpp = require("hpp");

// middlewares
// helmet middleware
app.use(helmet());

// rate limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100,
  message: "Too Many Request, Please try again after 1 hour",
});
app.use("/api/", apiLimiter);

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(cors());

// express-mongo-sanitize
app.use(mongoSanitize());

// XSS clean
app.use(xss());

// hpp for prevent parameter pollution
app.use(hpp());

// DB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

// route middlewares
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      `This route ${req.originalUrl} is not defined on our server. Check URL again.`
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
