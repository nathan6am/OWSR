import auths from "@/lib/middlewares/auths";
import passport from "@/lib/auth/passport";
import nc from "next-connect";
import returnTo from "@/lib/middlewares/returnTo";
const handler = nc();
handler
  .use(...auths)
  .get(
    returnTo,
    passport.authenticate("discord", { failureRedirect: "/?auth=sign-in" })
  );

export default handler;
