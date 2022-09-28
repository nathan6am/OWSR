import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler.use(...auths).get(verify, async (req, res) => {
  const { teamid } = req.query;
  try {
    const team = await db.findTeamById(teamid);
    if (!team) {
      res.status(400).json({ success: false, message: "Team not found" });
      return;
    }
    res.status(200).json({ success: true, data: team });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
export default handler;
