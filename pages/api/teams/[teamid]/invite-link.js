import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import auths from "@/lib/middlewares/auths";
import { nanoid } from "nanoid";
const handler = nc();

handler.use(...auths).get(verify, async (req, res) => {
  const { teamid } = req.query;
  const userid = req.user._id;
  try {
    const team = await db.findTeamById(teamid);
    console.log(team);
    if (!team) {
      res.status(404).json({ success: false, message: "Team not found" });
    } else if (team.drivers.includes(userid)) {
      const token = await db.createInviteToken(teamid, userid);
      const link = `${process.env.BASE_URL}join/${token.key}`;
      console.log(link);
      res.status(200).json({ success: true, link: link });
    } else {
      res.status(401).end();
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
