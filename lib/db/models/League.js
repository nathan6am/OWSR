import mongoose from "mongoose";

const LeagueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rounds: { type: Number, required: true },
  image: { type: String, required: true },
  game: {
    type: String,
    required: true,
    enum: ["assetto-corsa", "iracing", "ams2", "acc", "rfactor2"],
  },
  frequency: {
    type: String,
    required: true,
    enum: ["weekly", "bi-weekly", "monthly"],
    default: "weekly",
  },
  longDescription: String,
  timeSlot: {
    day: String,
    timeUtc: String,
  },
  rules: {},
  entries: {
    drivers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    teams: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
  },
  standings: {
    drivers: [
      {
        driver: { type: mongoose.Types.ObjectId, ref: "User" },
        points: Number,
      },
    ],
    teams: [
      {
        team: { type: mongoose.Types.ObjectId, ref: "Team" },
        points: Number,
      },
    ],
  },
});

LeagueSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "league",
  justOne: false,
});
LeagueSchema.set("toObject", { virtuals: true });
LeagueSchema.set("toJSON", { virtuals: true });
module.exports =
  mongoose.models.League || mongoose.model("League", LeagueSchema);
