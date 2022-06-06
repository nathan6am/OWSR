import * as db from "@/lib/db/dbFunctions";
import auths from "@/lib/middlewares/auths";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";

const handler = nc();
handler.use(...auths);
handler
  .get(async (req, res) => {
    try {
      const events = await db.getAllEvents();
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .post(verifyAdmin, async (req, res) => {
    try {
      const event = await db.createEvent(req.body);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  });

export default handler;
