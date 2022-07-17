const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const directorsRoutes = require("../api/routes/directors");
const moviesRoutes = require("../api/routes/movies");

app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE");
  }

  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Service is Up.",
    method: req.method,
  });
});

app.use("/directors", directorsRoutes);
app.use("/movies", moviesRoutes);

app.use((req, res, next) => {
  const err = new Error("HTTP Status: 404 Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});

mongoose.connect(process.env.mongoDBURL, (err) => {
  if (err) {
    console.error("Error: ", err.message);
  } else {
    console.log("MongoDB connection was successful");
  }
});

module.exports = app;
