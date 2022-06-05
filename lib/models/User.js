import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  hashedPassword: String,
  name: String,
  steamid: String,
  country: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
