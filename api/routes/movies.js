const express = require("express");
const mongoose = require("mongoose");
const messages = require("../../messages/messages");
const router = express.Router();
const Movie = require("../models/movie");

router.get("/", (req, res, next) => {
  Movie.findOne({
    title: req.body.title,
  })
    .then((result) => {
      res.status(200).json({
        title: result.title,
        director: result.director,
        genre: result.genre,
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.post("/", (req, res, next) => {
  const newMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
  });
  newMovie
    .save()
    .then((result) => {
      res.status(201).json({
        message: messages.movieSaved,
        movie: {
          title: result.title,
          director: result.director,
          genre: result.genre,
          id: result._id,
          metadata: {
            method: req.method,
            host: req.hostname,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findOne({
    id: movieId,
  })
    .then((result) => {
      res.status(200).json({
        title: result.title,
        director: result.director,
        genre: result.genre,
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  const updatedMovie = {
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
  };

  Movie.updateOne(
    {
      _id: movieId,
    },
    {
      $set: updatedMovie,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: messages.movieUpdated,
        movie: {
          acknowledged: result.acknowledged,
          modifiedCount: result.modifiedCount,
          upsertedId: result.upsertedId,
          upsertedCount: result.upsertedCount,
          matchedCount: result.matchedCount,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.delete("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.deleteOne({
    _id: movieId,
  })
    .then((result) => {
      res.status(200).json({
        message: messages.movieDeleted,
        movie: {
          acknowledged: result.acknowledged,
          deletedCount: res.deletedCount,
        },
        metadata: {
          host: req.hostname,
          method: req.method,
        },
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = router;
