import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verify from "@/lib/middlewares/verify";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler
  .use(...auths)
  .get(verifyAdmin, async (req, res) => {
    try {
      const teams = await db.getAllTeams();
      res.status(200).json({ success: true, data: teams });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .post(verify, async (req, res) => {
    try {
      const user = req.user;
      const team = {
        ...req.body,
        owner: user._id,
        drivers: [user._id],
      };
      const created = await db.createTeam(team);
      if (created) {
        const token = await db.createInviteToken(created._id, user._id);
        const link = `${process.env.BASE_URL}join/${token.key}`;
        res.status(200).json({ success: true, team: created, link: link });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Unable to create team" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
export default handler;
