import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";
const handler = nc();

handler.use(...auths).post(verify, async (req, res) => {
  const { teamid } = req.query;
  const userid = req.user._id;
  const userToRemove = req.body.userToRemove;
  try {
    const team = await db.findTeamById(teamid);
    if (!team) {
      res.status(404).json({ success: false, message: "Team not found" });
    } else if (!team.owner.equals(userid)) {
      res.status(400).end();
    } else {
      const team = await db.removeDriverFromTeam(teamid, userToRemove);
      if (team) {
        res.status(200).json({ success: true, team: team });
      } else {
        res.status(400).end();
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
