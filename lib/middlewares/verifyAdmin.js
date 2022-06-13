import * as dbFunctions from "../db/dbFunctions";

//Middleware to verify the current user has admin rights
export default async function verifyAdmin(req, res, next) {
  const admin = await dbFunctions.verifyAdmin(req.user._id);
  if (!admin) {
    res.status(401).end();
    return;
  }
  next();
}
