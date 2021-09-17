const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const fileUpload = require("express-fileupload");

// Import Routes
const postRoutes = require("./routers/postRoutes");
const commentsRoutes = require("./routers/commentRoutes");

const globalErrorHandler = require("./middlewares/globalErrorHandler");

const AppError = require("./middlewares/appError");

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.static("uploads"));

app.use(express.json());

// console.log(process.env.NODE_ENV);

// set security http headers
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// $ CORS
app.use(cors());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 50, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: "100kb" }));
// app.use(express.json());

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
  console.log("this is a middleware");
  next();
});

app.get("/api/v1/", (req, res, next) => {
  res.send("Welcome to the first version of ChukwuEbuka Blog Platform API");
  next();
});

// routes
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentsRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
