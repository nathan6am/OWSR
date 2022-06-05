import passport from "passport";
import bcrypt from "bcrypt";
import dbConnect from "../db/dbConnect";
import * as db from "../db/dbFunctions";
import User from "../models/User";
import { Strategy as LocalStrategy } from "passport-local";
import SteamStrategy from "passport-steam";

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (req, id, done) => {
  const user = await db.findUserById(id, true);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (_, email, password, done) => {
      try {
        const user = await db.verifyCredentials(email, password);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, {
            error: { message: "Email or password is incorrect" },
          });
        }
      } catch (e) {
        return done(null, false, {
          error: { message: "Login Failed" },
        });
      }
    }
  )
);

passport.use(
  new SteamStrategy(
    {
      returnURL: `http://localhost:3000/api/auth/steam/callback`,
      realm: `http://localhost:3000`,
      apiKey: `${process.env.STEAM_API_KEY}`,
      passReqToCallback: true,
    },
    async (_, identifier, profile, done) => {
      try {
        const user = await db.findOrCreateUserWithSteam(profile.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        return done(null, false, e);
      }
    }
  )
);

passport.use(
  "steam-connect",
  new SteamStrategy(
    {
      returnURL: `http://localhost:3000/api/auth/steam/connect/callback`,
      realm: `http://localhost:3000`,
      apiKey: `${process.env.STEAM_API_KEY}`,
      passReqToCallback: true,
    },
    async (req, identifier, profile, done) => {
      const userid = req.session?.passport?.user;
      const steamid = profile.id;
      if (!userid) {
        return done(null, false, {
          message: "Unauthorized",
          unauthorized: true,
        });
      }
      try {
        const steamUsed = await db.findUserWithSteam(steamid);
        if (steamUsed) {
          return done(null, false, {
            message: "A profile has already been linked to this steam account.",
            steamInUse: true,
          });
        }
        const user = await db.linkSteam(userid, steamid);
        console.log(user);
        return done(null, user);
      } catch (e) {
        return done(null, false, { message: e.message });
      }
    }
  )
);

export default passport;
