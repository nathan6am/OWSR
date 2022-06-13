import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  hashedPassword: String,
  name: String,
  steamid: String,
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
});
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
