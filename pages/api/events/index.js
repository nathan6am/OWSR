import * as db from "@/lib/db/dbFunctions";
import auths from "@/lib/middlewares/auths";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";

const handler = nc();
handler.use(...auths);
handler
  .get(async (req, res) => {
    const { page, limit } = req.query;
    try {
      if (req.body?.filters) {
        const result = await db.getEvents(req.body?.filters, page, limit);
        res.status(200).json({ success: true, events: result.docs });
      } else {
        const result = await db.getEvents(null, page, limit);
        res.status(200).json({ success: true, events: result.docs });
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ success: false });
    }
  })
  .post(verifyAdmin, async (req, res) => {
    try {
      const event = await db.createEvent(req.body);
      res.status(201).json({ success: true, event: event });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  });

export default handler;
