import mongoose from "mongoose";

const ChampionshipSchema = new mongoose.Schema({
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
  standings: [
    {
      driver: { type: mongoose.Types.ObjectId, ref: "user" },
      points: Number,
    },
  ],
});

ChampionshipSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "championship",
  justOne: false,
});
ChampionshipSchema.set("toObject", { virtuals: true });
ChampionshipSchema.set("toJSON", { virtuals: true });
module.exports =
  mongoose.models.Championship ||
  mongoose.model("Championship", ChampionshipSchema);
