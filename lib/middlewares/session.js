const MongoStore = require("connect-mongo");
import dbConnect, { getMongoClient } from "../db/dbConnect";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
const mongoStore = MongoStore.create({
  clientPromise: getMongoClient(),
  stringify: false,
});

const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
    path: "/",
    sameSite: "lax",
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  next();
}
export const getSessionProps = async (req, res) => {
  return await getSession(req, res);
};
