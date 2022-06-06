import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler
  .use(...auths)
  .get(async (req, res) => {
    const { eventid } = req.query;
    try {
      const event = await db.findEventById(eventid);
      if (!event) {
        res.status(404).json({ success: false, message: "Event not found" });
        return;
      }
      res.status(200).json({ success: true, data: event });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })

  .delete(verifyAdmin, async (req, res) => {
    const { eventid } = req.query;
    try {
      const deletedEvent = db.deleteEvent(eventid);
      if (!deletedEvent) {
        res.status(404).json({ success: false, message: "Event not found" });
        return;
      }
      res.satus(200).json({ success: true, data: "deletedEvent" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })

  .patch(verifyAdmin, async (req, res) => {
    const { eventid } = req.query;
    try {
      const updated = await db.updateEvent(eventid, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: "Event not found" });
        return;
      }
      res.satus(200).json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

export default handler;
