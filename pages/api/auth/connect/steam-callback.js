import passport from "../../../../lib/auth/passport";
import nc from "next-connect";
import auths from "../../../../lib/middlewares/auths";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../lib/models/User";
const path = "/api/auth/connect/steam-callback";
const handler = nc();

handler
  .use(
    ...auths,
    passport.authorize("steam-connect", { failureRedirect: "/?auth=sign-in" })
  )
  .get(path, async (req, res) => {
    console.log(req.user);
    res.redirect("/dashboard");
  });
export default handler;
