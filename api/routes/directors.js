const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Directors - GET",
  });
});

router.post("/", (req, res, next) => {
  res.json({
    message: "Directors - POST",
  });
});

router.get("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
  res.json({
    message: "Directors - GET",
    id: directorId
  });
});

router.patch("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
  res.json({
    message: "Directors - PATCH",
    id: directorId
  });
});

router.delete("/:directorId", (req, res, next) => {
    const directorId = req.params.directorId;
  res.json({
    message: "Directors - DELETE",
    id: directorId
  });
});

module.exports = router;
