import passport from "@/lib/auth/passport";
import nc from "next-connect";
import auths from "@/lib/middlewares/auths";

const path = "/api/auth/steam/connect/callback";
const handler = nc();

//TODO: Change redirect if Steam profile is already linked to another account
handler.use(...auths).get(path, async (req, res, next) => {
  passport.authorize(
    "steam-connect",
    {
      failureRedirect: "/?auth=link-steam",
      failureMessage: true,
    },
    (err, user, options) => {
      if (options) {
        res.redirect(`/?auth=link-steam-failed`);
      } else {
        res.redirect("/dashboard");
      }
    }
  )(req, res, next);
});
export default handler;
