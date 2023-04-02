import mongoose, { Mongoose } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
const TrackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  game: {
    type: String,
    required: true,
    enum: ["assetto-corsa", "iracing", "ams2", "acc", "rfactor2"],
  },
  inGameId: { type: String, required: true },
  isMod: { type: Boolean, required: true },
  isDLC: { type: Boolean, required: true },
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
});

TrackSchema.virtual("layouts", {
  ref: "Layout",
  localField: "_id",
  foreignField: "track",
  justOne: false,
  autopopulate: true,
});
TrackSchema.set("toJSON", { virtuals: true });
TrackSchema.set("toObject", { virtuals: true });
TrackSchema.plugin(mongooseAutopopulate);

module.exports = mongoose.models.Track || mongoose.model("Track", TrackSchema);
