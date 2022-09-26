import mongoose from "mongoose";

const colorExp = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true, validate: colorExp },
  logo: { type: String, required: false },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  drivers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  liveries: [{ type: mongoose.Types.ObjectId, ref: "Livery" }],
});

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
