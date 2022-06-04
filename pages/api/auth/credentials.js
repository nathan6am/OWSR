import auths from "../../../lib/middlewares/auths";
import passport from "../../../lib/auth/passport";
import nc from "next-connect";

const handler = nc();
handler.use(...auths);
handler.post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

export default handler;
