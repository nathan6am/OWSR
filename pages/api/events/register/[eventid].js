import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";
import axios from "axios";
const handler = nc();
handler
  .use(...auths)
  .post(verify, async (req, res) => {
    const { eventid } = req.query;
    const userid = req.user?._id;

    try {
      const event = await db.findEventById(eventid);
      if (!event) {
        res
          .status(404)
          .json({ success: false, message: "Event does not exists!" });
        return;
      }
      const user = await db.findUserById(userid, false);
      const guid = user.steamid;
      const name = user.name;
      const { car, skin } = req.body;
      if (!car || !skin) {
        res.status(400).send("Bad Request");
        return;
      }
      const { serverIp, serverApiPort, serverEventUUID } = event;
      const response = await axios.post(
        `http://${serverIp}:${serverApiPort}/events/${serverEventUUID}/entries`,
        { name, car, guid, skin }
      );
      console.log(response.status);
      console.log(response.data);
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
      const event = await db.findEventById(eventid);
      const user = await db.findUserById(userid, false);
      const guid = user.steamid;
      const { serverIp, serverApiPort, serverEventUUID } = event;
      const response = await axios.delete(
        `http://${serverIp}:${serverApiPort}/events/${serverEventUUID}/entries`,

        { data: { guid } }
      );
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
