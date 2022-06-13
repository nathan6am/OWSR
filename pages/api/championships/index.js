import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler
  .use(...auths)
  .get(async (req, res) => {
    try {
      const championships = await db.getChampionships();
      res.status(200).json({ success: true, championships: championships });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .post(verifyAdmin, async (req, res) => {
    try {
      const created = await db.createChampionship(req.body);
      res.status(200).json({ success: true, data: created });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });
export default handler;
