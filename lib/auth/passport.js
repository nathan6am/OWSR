import passport from "passport";
import bcrypt from "bcrypt";
import dbConnect from "../dbConnect";
import User from "../models/User";
import { Strategy as LocalStrategy } from "passport-local";
import SteamStrategy from "passport-steam";

function filterUser(user) {
  return {
    name: user.name,
    _id: user._id,
    registered: !user.name || !user.country ? false : true,
    linked: user.steamid ? true : false,
  };
}

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (req, id, done) => {
  await dbConnect();
  const unfilteredUser = await User.findById(id);
  const user = filterUser(unfilteredUser);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      await dbConnect();
      const unfilteredUser = await User.findOne({ email: email }).exec();
      if (
        unfilteredUser &&
        (await bcrypt.compare(password, unfilteredUser.hashedPassword))
      ) {
        const user = filterUser(unfilteredUser);
        done(null, user);
      } else done(null, false, { message: "Email or password is incorrect" });
    }
  )
);

passport.use(
  new SteamStrategy(
    {
      returnURL: `http://localhost:3000/api/auth/steam-callback`,
      realm: `http://localhost:3000`,
      apiKey: `${process.env.STEAM_API_KEY}`,
      passReqToCallback: true,
    },
    async (req, identifier, profile, done) => {
      await dbConnect();
      const user = await User.findOne({ steamid: profile.id }).exec();
      if (!user) {
        const newUser = await User.create({
          steamid: profile.id,
        });
        return done(null, filterUser(newUser));
      } else {
        return done(null, filterUser(user));
      }
    }
  )
);

passport.use(
  "steam-connect",
  new SteamStrategy(
    {
      returnURL: `http://localhost:3000/api/auth/connect/steam-callback`,
      realm: `http://localhost:3000`,
      apiKey: `${process.env.STEAM_API_KEY}`,
      passReqToCallback: true,
    },
    async (req, identifier, profile, done) => {
      await dbConnect();
      const sessionUserId = req.session?.passport?.user;
      req.steamid = profile.id;
      const existingUser = await User.findOne({ steamid: profile.id }).exec();
      if (existingUser) {
        return done(null, false, {
          message: "A profile has already been linked to this steam account.",
        });
      } else {
        const user = User.findByIdAndUpdate(sessionUserId, {
          steamid: profile.id,
        }).exec();
        console.log(user);
        if (!user) {
          return done(null, false, {
            message: "Unauthenticated",
          });
        }
        return done(null, filterUser(user));
      }
    }
  )
);

export default passport;
