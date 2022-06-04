import nc from "next-connect";
import auths from "../../../lib/middlewares/auths";

const handler = nc();
handler.use(...auths);
handler.get(async (req, res) => res.json({ user: req.user }));

export default handler;
