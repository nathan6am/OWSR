import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  game: {
    type: String,
    required: true,
    enum: ["assetto-corsa", "iracing", "ams2", "acc", "rfactor2"],
  },
  isMod: { type: Boolean, required: true },
  link: {
    type: String,
    required: function () {
      return this.isMod;
    },
  },
  isFree: {
    type: Boolean,
    required: function () {
      return this.isMod;
    },
  },
  corners: Number,
  length: Number,
});

module.exports = mongoose.models.Track || mongoose.model("Track", TrackSchema);
