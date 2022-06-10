import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";

const handler = nc();
handler
  .use(...auths)
  .post(verify, async (req, res) => {
    const { eventid } = req.query;
    const userid = req.user?._id;
    try {
      const registration = await db.registerForEvent(userid, eventid);
      if (!registration) {
        res
          .status(404)
          .json({ success: false, message: "Unable to register!" });
        return;
      }
      res.status(200).json({ success: true, registration: registration });
    } catch (err) {
      res.status(400).json({ success: false, message: "Unable to register!" });
    }
  })
  .delete(verify, async (req, res) => {
    const { eventid } = req.query;
    const userid = req.user?._id;
    try {
      const canceled = await db.cancelRegistration(userid, eventid);
      if (!canceled) {
        res
          .status(400)
          .json({ success: false, message: "Unable to cancel registration" });
        return;
      }
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

export default handler;
