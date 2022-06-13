import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler.use(...auths).get(async (req, res) => {
  const { championshipid } = req.query;

  try {
    const championship = await db.getChampionshipById(championshipid);
    if (championship) {
      res.status(200).json({ success: true, championship: championship });
      return;
    }
    res.status(404).json({ success: false, message: "Championship not found" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
