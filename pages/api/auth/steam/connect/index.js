import passport from "@/lib/auth/passport";
import nc from "next-connect";
import auths from "@/lib/middlewares/auths";
import verify from "@/lib/middlewares/verify";
import returnTo from "@/lib/middlewares/returnTo";
const path = "/api/auth/steam/connect";
const handler = nc();

handler.use(...auths, verify).get(
  path,
  returnTo,
  passport.authorize(
    "steam-connect",
    {
      failureRedirect: "/?auth=link-steam",
      failureMessage: true,
    },
    (err, user, options) => {
      console.log(`error: ${err}`);
    }
  )
);
export default handler;
