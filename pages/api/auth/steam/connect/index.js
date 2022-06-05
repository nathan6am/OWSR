import passport from "@/lib/auth/passport";
import nc from "next-connect";
import auths from "@/lib/middlewares/auths";
import verify from "@/lib/middlewares/verify";
const path = "/api/auth/steam/connect";
const handler = nc();

handler
  .use(
    ...auths,
    verify,
    passport.authorize(
      "steam-connect",
      {
        failureRedirect: "/?auth=link-steam",
        failureMessage: true,
      },
      (err, user, options) => {
        console.log(`error: ${err}`);
        console.log(`error: ${options}`);
      }
    )
  )
  .get(path, (req, res) => res.redirect("/dashboard"));
export default handler;
