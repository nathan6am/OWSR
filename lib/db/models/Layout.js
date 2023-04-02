import mongoose, { Mongoose } from "mongoose";

const LayoutSchema = new mongoose.Schema({
  track: { type: mongoose.Types.ObjectId, ref: "Track" },
  name: { type: String, required: true },
  corners: Number,
  length: Number,
});

module.exports =
  mongoose.models.Layout || mongoose.model("Layout", LayoutSchema);
