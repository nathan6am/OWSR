import passport from "@/lib/auth/passport";
import nc from "next-connect";
import auths from "@/lib/middlewares/auths";

const path = "/api/auth/steam/callback";
const handler = nc();

handler
  .use(
    ...auths,
    passport.authenticate("steam", { failureRedirect: "/?auth=sign-in" })
  )
  .get(path, (req, res) => {
    const returnTo = req.session.returnTo;
    req.session.returnTo = null;
    return res.redirect(returnTo || "/dashboard");
  });
export default handler;
