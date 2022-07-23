const express = require("express");
const mongoose = require("mongoose");
const director = require("../models/director");
const router = express.Router();
const messages = require("../../messages/messages");

router.get("/", (req, res, next) => {
  director
    .findOne({
      name: req.body.name,
    })
    .then((result) => {
      res.status(200).json({
        name: result.name,
        movie: result.movie,
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
  const newDirector = new director({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    movie: req.body.movie,
  });
  newDirector
    .save()
    .then((result) => {
      res.status(201).json({
        message: messages.directorSaved,
        director: {
          name: result.name,
          movie: result.movie,
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

router.get("/:directorId", (req, res, next) => {
  const directorId = req.params.directorId;
  director
    .findOne({
      id: directorId,
    })
    .select("name _id movie")
    .exec()
    .then((director) => {
      if (!director) {
        console.log(director);
        return res.json(404).json({
          message: messages.directorNotFound,
        });
      }
      res.status(200).json({
        director: director,
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

router.patch("/:directorId", (req, res, next) => {
  const directorId = req.params.directorId;
  const updatedDirector = {
    name: req.body.name,
    movie: req.body.movie,
  };

  director
    .updateOne(
      {
        _id: directorId,
      },
      {
        $set: updatedDirector,
      }
    )
    .then((result) => {
      console.log(result)
      res.status(200).json({
        message: messages.directorUpdated,
        director: {
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

router.delete("/:directorId", (req, res, next) => {
  const directorId = req.params.directorId;

  director
    .deleteOne({
      _id: directorId,
    })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: messages.directorDeleted,
        acknowledged: result.acknowledged,
        deletedCount: res.deletedCount,
        metadata: {
          method: req.method,
          url: `http://localhost:3000/directors/${directorId}`,
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
