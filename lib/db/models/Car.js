import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  image: String,
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
  game: {
    type: String,
    required: true,
    enum: ["assetto-corsa", "iracing", "ams2", "acc", "rfactor2"],
  },
  info: {},
});

module.exports = mongoose.models.Car || mongoose.model("Car", CarSchema);
