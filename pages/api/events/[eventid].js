import dbConnect from "../../../lib/dbConnect";
import Event from "../../../lib/models/Event";

export default async function handler(req, res) {
  const { method } = req;

  const { eventid } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log(eventid);
        const event = await Event.findById(eventid);

        if (event) {
          res.status(200).json({ success: true, data: event });
        } else {
          res.status(404).json({ success: false, error: "event not found" });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const event = await Event.findByIdAndUpdate(eventid, req.body, {
          new: true,
          runValidators: true,
        });
        if (event) {
          res.status(200).json({ success: true, data: event });
        } else {
          res.status(404).json({ success: false, error: "event not found" });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const event = await Event.findByIdAndRemove(eventid);
        if (event) {
          res.status(200).json({ success: true, data: event });
        } else {
          res.status(404).json({ success: false, error: "event not found" });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
