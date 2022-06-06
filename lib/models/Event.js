import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  featured: { type: Boolean },
  type: {
    type: String,
    required: "true",
    enum: ["championship", "weekly", "special", "hotlap", "other"],
    default: "other",
  },
  series: String, //TODO link to championship series schema
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  track: String,
  date: { type: Date, required: true },
  game: String,
  image: String,
  type: String,
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
