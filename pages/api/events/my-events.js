import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";

const handler = nc();
handler.use(...auths).get(verify, async (req, res) => {
  try {
    const userid = req.user?._id;
    const events = await db.getEventsByUser(userid);
    res.status(200).json({ success: true, events: events });
  } catch (e) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default handler;
