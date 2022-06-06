import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  type: String,
  imageUrl: String,
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
  info: {},
});

module.exports = mongoose.models.Car || mongoose.model("Car", CarSchema);
