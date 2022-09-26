import nc from "next-connect";
import auths from "@/lib/middlewares/auths";
import * as db from "../../../lib/db/dbFunctions";
const handler = nc();
import verify from "../../../lib/middlewares/verify";
handler.use(...auths, verify);
handler.get(async (req, res) => {
  const userinfo = await db.populateProfile(req.user._id);
  res.json({ user: userinfo });
});
handler.patch(async (req, res) => {
  const updates = req.body;
  const updatedUser = await db.updateProfile(req.user._id, updates);
  if (!updatedUser) {
    res.statusCode(500).end();
  } else {
    res.json({ user: updatedUser });
  }
});
handler.delete(async (req, res) => {
  await db.deleteAccout(req.user?._id);
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
