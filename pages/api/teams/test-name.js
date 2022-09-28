import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";

import auths from "@/lib/middlewares/auths";

const handler = nc();

handler.use(...auths).post(async (req, res) => {
  try {
    const name = req.body.name;
    const exists = await db.checkForTeamName(name);
    if (exists) {
      res.status(200).json({
        success: true,
        valid: false,
        message: "Team name already exists",
      });
    } else {
      res.status(200).json({ success: true, valid: true });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
