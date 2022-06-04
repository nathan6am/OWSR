import auths from "../../../lib/middlewares/auths";
import passport from "../../../lib/auth/passport";
import nc from "next-connect";

const handler = nc();
handler
  .use(
    ...auths,
    passport.authenticate("steam", { failureRedirect: "/?auth=sign-in" })
  )
  .get((req, res) => {
    console.log(req.user);
    res.redirect("/");
  });

export default handler;
