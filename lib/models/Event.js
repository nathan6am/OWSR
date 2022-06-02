import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  featured: Boolean,
  series: String,
  title: { type: String, required: true },
  description: String,
  track: String,
  date: Date,
  game: String,
  image: String,
  type: String,
});

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);

/*
"featured": true,
    "type": "special",
    "series": "OWSR Special Event",
    "title": "Miami Grand Prix",
    "description": "RSS FH22 @ Miami International Autodrome",
    "track": "Miami International Autodrome",
    "date": "2022-06-05T21:00:00.000Z",
    "game": "asseto-corsa",
    "image": "/images/miamigp.jpg"
*/
