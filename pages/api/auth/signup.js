import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../lib/models/User";
import bcrypt from "bcrypt";
import auths from "../../../lib/middlewares/auths";
const handler = nc();

handler.post(...auths, async (req, res) => {
  await dbConnect();
  const { name, password, email, country } = req.body;

  const userExists = await User.exists({ email: email });
  if (userExists) {
    res.status(403).send("The email has already been used.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    name: name,
    hashedPassword: hashedPassword,
    country: country,
  };
  const newUser = await User.create(user);
  user._id = newUser._id;
  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    res.status(201).json({
      user: { _id: newUser._id, name: newUser._name, incomplete: ["steam"] },
    });
  });
});
export default handler;
