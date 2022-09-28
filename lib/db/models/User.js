import mongoose from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
const UserSchema = new mongoose.Schema({
  email: String,
  hashedPassword: String,
  name: String,
  steamid: String,
  discordid: String,
  country: String,
  admin: Boolean,
  //registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  completedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

UserSchema.virtual("registeredEvents", {
  ref: "Event",
  localField: "_id",
  foreignField: "registeredDrivers",
  justOne: false,
  autopopulate: true,
});
UserSchema.virtual("teams", {
  ref: "Team",
  localField: "_id",
  foreignField: "drivers",
  justOne: false,
  autopopulate: true,
});
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });
UserSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
