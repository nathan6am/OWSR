import mongoose from "mongoose";

const LiverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  file: { type: String, required: true },
  car: { type: mongoose.Types.ObjectId, ref: "Car" },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports =
  mongoose.models.Livery || mongoose.model("Livery", LiverySchema);
