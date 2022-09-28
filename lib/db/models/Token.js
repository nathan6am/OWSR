import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teamRef: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  expireAt: { type: Date, expires: 120, default: Date.now() },
});

module.exports = mongoose.models.Token || mongoose.model("Token", TokenSchema);
