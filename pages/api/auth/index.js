import nc from "next-connect";
import auths from "@/lib/middlewares/auths";

const handler = nc();

/*  Use get to fetch an abbreviated version of the authenticated user, delete to signout and destroy session. 
    Full version of current user is at api/auth/me
 */

handler.use(...auths);
handler.get(async (req, res) => res.json({ user: req.user }));
handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
