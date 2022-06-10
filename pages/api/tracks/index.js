import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler
  .use(...auths)
  .get(async (req, res) => {
    try {
      const tracks = await db.getAllTracks();
      res.status(200).json({ success: true, data: tracks });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .post(verifyAdmin, async (req, res) => {
    try {
      console.log(req.body);
      const track = await db.createTrack(req.body);
      res.status(200).json({ success: true, data: track });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
export default handler;
