import auths from "@/lib/middlewares/auths";
import passport from "@/lib/auth/passport";
import nc from "next-connect";
import filterUser from "@/lib/util/filterUser";
const handler = nc();
handler.use(...auths);
handler.post(passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.json({ user: req.user });
});

export default handler;
