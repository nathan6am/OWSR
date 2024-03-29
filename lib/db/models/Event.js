import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAutopopulate from "mongoose-autopopulate";
const sessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    required: true,
    enum: ["practice", "qualifying", "race", "other"],
    default: "race",
  },
  duration: { type: Number, required: true },
  durationType: {
    type: String,
    enum: ["laps", "time"],
    required: function () {
      return this.type === "race";
    },
  },
  qualiType: {
    type: String,
    enum: ["fastest", "average"],
    required: function () {
      return this.type === "qualifying";
    },
  },
  pitStopsRequired: {
    type: Number,
    required: function () {
      return this.type === "race";
    },
  },
});
const EventSchema = new mongoose.Schema({
  featured: { type: Boolean },
  type: {
    type: String,
    required: "true",
    enum: ["league", "championship", "community", "hotlap", "special"],
    default: "community",
  },
  game: {
    type: String,
    required: true,
    enum: ["assetto-corsa", "iracing", "ams2", "acc", "rfactor2"],
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
  },
  championship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Championship",
  },
  registrationType: {
    type: String,
    required: true,
    enum: ["team", "driver", "dual"],
  },
  round: Number,
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  slug: { type: String, required: false, unique: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  headerImage: { type: String, required: true },
  fixedSetup: { type: Boolean, required: true, default: false },
  modsRequired: { type: Boolean, required: true, default: false },
  paidContent: { type: Boolean, required: true, default: false },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  track: { type: mongoose.Schema.Types.ObjectId, ref: "Track", required: true },
  layout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Layout",
    required: true,
  },
  registeredDrivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  registeredTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  registerCount: { type: Number, required: true, default: 0 },
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  serverIp: { type: String, required: true },
  serverApiPort: { type: Number, required: false },
  serverEventUUID: { type: String, required: false },
  serverJoinUrl: { type: String, required: false },
  configJSON: {},
  sessions: [sessionSchema],
  details: {
    gridSize: { type: Number, required: true, default: 20 },
    fixedSetup: { type: Boolean, required: true, default: false },
    damage: { type: Number, required: true, default: 0.5 },
    weather: {
      description: { type: String, required: true },
      temp: { type: Number, required: "true" },
      trackTemp: { type: Number, required: "true" },
      wind: { type: Number, required: "true" },
      windVariance: { type: Number, required: "true" },
    },
    trackState: {
      starting: { type: Number, required: true, default: 99 },
      development: String,
    },
  },
  results: {},
});

EventSchema.virtual("emptySlots").get(function () {
  return this.details.gridSize - this.registeredDrivers.length;
});
EventSchema.virtual("isFull").get(function () {
  return this.details.gridSize === this.registeredDrivers.length;
});
EventSchema.set("toObject", { virtuals: true });
EventSchema.set("toJSON", { virtuals: true });
EventSchema.plugin(mongoosePaginate);
EventSchema.plugin(mongooseAutopopulate);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
