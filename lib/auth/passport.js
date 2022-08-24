import passport from "passport";
import * as db from "../db/dbFunctions";
import { Strategy as LocalStrategy } from "passport-local";
import SteamStrategy from "passport-steam";
var DiscordStrategy = require("passport-discord").Strategy;
//import DiscordStrategy from "passport-discord";

var scopes = ["identify", "email", "guilds", "guilds.join"];

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (req, id, done) => {
  const user = await db.findUserById(id, true);
  done(null, user);
});

//Email/password strategy
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

//Strategy for steam login - use "steam-connect" for linking profiles
passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}/api/auth/steam/callback`,
      realm: `${process.env.BASE_URL}`,
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
  "discord",
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/discord/callback`,
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const discordid = profile.id;
        const user = await db.findOrCreateUserWithDiscord(discordid);
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

//Steam connect strategy - error message/options can be accessed in cutom callback in /api/auth/steam/connect/callback
passport.use(
  "steam-connect",
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}/api/auth/steam/connect/callback`,
      realm: `${process.env.BASE_URL}`,
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
