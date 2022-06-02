import dbConnect from "../../../lib/dbConnect";
import Event from "../../../lib/models/Event";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({});
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
