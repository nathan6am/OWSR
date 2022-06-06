import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  type: String,
  imageUrl: String,
  isMod: { type: Boolean, required: true },
  links: {
    type: [String],
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
  info: {},
});

module.exports = mongoose.models.Track || mongoose.model("Track", TrackSchema);
