import * as db from "@/lib/db/dbFunctions";
import nc from "next-connect";
import verifyAdmin from "@/lib/middlewares/verifyAdmin";
import auths from "@/lib/middlewares/auths";

const handler = nc();

handler.use(...auths).get(async (req, res) => {
  const { key } = req.query;
  try {
    const token = await db.validateInviteToken(key);
    if (!token) {
      res
        .status(404)
        .json({ success: false, message: "Token has expired or is invalid" });
    } else {
      res.status(200).json({ success: true, data: token });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default handler;
