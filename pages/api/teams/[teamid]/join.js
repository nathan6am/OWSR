import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";
const handler = nc();

handler.use(...auths).post(verify, async (req, res) => {
  const { teamid } = req.query;
  const userid = req.user._id;
  try {
    const team = await db.findTeamById(teamid);
    console.log(team);
    if (!team) {
      res.status(404).json({ success: false, message: "Team not found" });
    } else if (team.drivers.includes(userid)) {
      res.status(200).json({
        success: false,
        message: "You are already a member of this team",
      });
    } else {
      const team = await db.addDriverToTeam(teamid, userid);
      if (team) {
        res.status(200).json({ success: true, team: team });
      } else {
        res.status(400).jend();
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
