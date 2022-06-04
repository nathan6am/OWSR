import passport from "../../../../lib/auth/passport";
import nc from "next-connect";
import auths from "../../../../lib/middlewares/auths";
import verify from "../../../../lib/middlewares/verify";
const path = "/api/auth/connect/steam";
const handler = nc();

handler
  .use(
    ...auths,
    verify,
    passport.authorize("steam-connect", { failureRedirect: "/?auth=sign-in" })
  )
  .get(path, (req, res) => res.redirect("/dashboard"));
export default handler;
