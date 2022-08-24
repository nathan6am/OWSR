import passport from "@/lib/auth/passport";
import nc from "next-connect";
import auths from "@/lib/middlewares/auths";

const path = "/api/auth/discord/callback";
const handler = nc();

handler
  .use(
    ...auths,
    passport.authenticate("discord", { failureRedirect: "/?auth=sign-in" })
  )
  .get(path, (req, res) => {
    return res.redirect("/dashboard");
  });
export default handler;
