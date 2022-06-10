import nc from "next-connect";

import User from "@/lib/db/models/User";
import bcrypt from "bcrypt";
import auths from "@/lib/middlewares/auths";
import filterUser from "@/lib/util/filterUser";
import * as db from "@/lib/db/dbFunctions";

const handler = nc();

handler.post(...auths, async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await db.newUserWithCredentials(email, password);
    if (!user) {
      res
        .status(403)
        .json({ error: { message: "Email address already in use" } });
      return;
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(201).json({
          user: user,
        });
      });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
});

export default handler;
