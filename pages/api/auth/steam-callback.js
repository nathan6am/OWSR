import passport from "../../../lib/auth/passport";
import nc from "next-connect";
import auths from "../../../lib/middlewares/auths";

const path = "/api/auth/steam-callback";
const handler = nc();

handler
  .use(
    ...auths,
    passport.authenticate("steam", { failureRedirect: "/?auth=sign-in" })
  )
  .get(path, (req, res) => {
    console.log(req.user);
    return res.redirect("/dashboard");
  });
export default handler;
