import mongoose from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
const colorExp = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, unique: false },
    colors: {
      primary: { type: String, required: true, validate: colorExp },
      secondary: { type: String, required: true, validate: colorExp },
    },
    logo: { type: String, required: false },
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    drivers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    liveries: [{ type: mongoose.Types.ObjectId, ref: "Livery" }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

TeamSchema.virtual("tokens", {
  ref: "Token",
  localField: "_id",
  foreignField: "teamRef",
  justOne: false,
  autopopulate: true,
});
TeamSchema.plugin(mongooseAutopopulate);
module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
