const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  movie: {
    type: String,
    ref: "Movie",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Director", directorSchema);
