import dbConnect from "./dbConnect";
import filterUser from "../util/filterUser";
import User from "@/lib/db/models/User";
import Event from "@/lib/db/models/Event";
import Car from "@/lib/db/models/Car";
import Track from "@/lib/db/models/Track";
import Token from "@/lib/db/models/Token";
import Team from "@/lib/db/models/Team";
import Livery from "@/lib/db/models/Livery";
import League from "@/lib/db/models/League";
import { nanoid } from "nanoid";
import Championship from "@/lib/db/models/Championship";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcrypt";

// USER FUNCTIONS

//Returns null if user exists or filtered user
export async function newUserWithCredentials(email, password) {
  const emailUsed = await findUserWithEmail(email);

  if (emailUsed) return null;
  const normalizedEmail = normalizeEmail(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!normalizedEmail || !hashedPassword) throw new Error("invalid args");
  try {
    await dbConnect();
    const user = await User.create({
      email: email,
      hashedPassword: hashedPassword,
    });
    if (!user) throw new Error("Error creating user");
    return filterUser(user);
  } catch (e) {
    throw new Error(e.message);
  }
}

//Returns user with email or null
export async function findUserWithEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  try {
    await dbConnect();
    const user = await User.findOne({ email: normalizedEmail }).exec();
    if (!user) return null;
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//
export async function findUserWithSteam(steamid) {
  try {
    await dbConnect();
    const user = await User.findOne({ steamid: steamid }).exec();
    if (!user) return null;
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function findOrCreateUserWithSteam(steamid) {
  try {
    await dbConnect();
    const user = await User.findOne({ steamid: steamid }).exec();
    if (!user) {
      const newUser = await User.create({ steamid: steamid }).exec();
      return filterUser(newUser);
    }
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function findOrCreateUserWithDiscord(discordid) {
  try {
    await dbConnect();
    const user = await User.findOne({ discordid: discordid }).exec();
    if (!user) {
      const newUser = await User.create({ discordid: discordid });
      return filterUser(newUser);
    }
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function linkSteam(userid, steamid) {
  try {
    await dbConnect();
    const steamUsed = await findUserWithSteam(steamid);
    if (steamUsed)
      throw new Error(
        "A profile has already been linked to this steam account."
      );
    const user = await User.findByIdAndUpdate(
      userid,
      {
        steamid: steamid,
      },
      { new: true }
    ).exec();
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//Returns user if credentials are valid
export async function verifyCredentials(email, password) {
  const normalizedEmail = normalizeEmail(email);
  try {
    await dbConnect();
    const user = await User.findOne({ email: normalizedEmail }).exec();
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) return null;
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//Takes second param filtered, if false, full user object will be returned
export async function findUserById(id, filtered = true) {
  try {
    await dbConnect();
    const user = await User.findById(id, "-hashedPassword").exec();
    if (!user) return null;
    if (filtered) return filterUser(user);
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function populateProfile(id) {
  try {
    await dbConnect();
    const user = await User.findById(id, "-hashedPassword")
      .lean({ autopopulate: true })
      .exec();
    if (!user) return null;
    console.log(user.teams);
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function updateProfile(id, updates) {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true }
    ).exec();
    console.log(user);
    if (!user) return null;
    return filterUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function deleteAccout(id) {
  try {
    await dbConnect();
    const removed = await User.findByIdAndDelete(id);
    if (!removed) throw new Error("User does not exist");
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function verifyAdmin(id) {
  try {
    await dbConnect();
    const user = await User.findById(id).exec();
    if (user && user.admin) return true;
    return false;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//EVENT FUNCTIONS
export async function getEvents(filters, page = 1, limit = 6) {
  try {
    let sort = { date: 1 };
    const query = { date: { $gte: new Date() } };

    if (filters) {
      query.game = { $in: filters.game };
      if (filters.mods === "in-game-only") {
        query.modsRequired = { $ne: true };
      } else if (filters.mods === "free") {
        query.paidContent = { $ne: true };
      }
      query.type = { $in: filters.eventType };
      if (filters.setup.length < 2) {
        query["details.fixedSetup"] = { $eq: filters.setup[0] === "fixed" };
      }
      if (filters.sort === "popular") {
        sort = { registerCount: "desc" };
      }
    }
    const options = {
      page: page,
      limit: limit,
      sort: sort,
    };
    await dbConnect();
    const events = await Event.paginate(query, options);
    return events;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function findEventById(eventid) {
  try {
    await dbConnect();
    const event = await Event.findById(eventid)
      .populate(["sessions", "cars", "track"])
      .exec();
    return event;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createEvent(eventDetails) {
  try {
    await dbConnect();
    const event = await Event.create(eventDetails);
    return event;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
export async function deleteEvent(eventid) {
  try {
    await dbConnect();
    const event = await Event.findByIdAndRemove(eventid);
    return event;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function updateEvent(eventid, updates) {
  try {
    await dbConnect();
    const event = await Event.findByIdAndUpdate(eventid, updates, {
      new: true,
      runValidators: true,
    });
    return event;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//CARS/TRACKS CONTENT

export async function getAllCars() {
  try {
    await dbConnect();
    const cars = await Car.find({});
    return cars;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createCar(car) {
  try {
    await dbConnect();
    const created = await Car.create(car);
    return created;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getAllTracks() {
  try {
    await dbConnect();
    const tracks = await Track.find({});
    return tracks;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createTrack(track) {
  try {
    await dbConnect();
    const created = await Track.create(track);
    return created;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function registerForEvent(userid, eventid) {
  try {
    await dbConnect();
    const user = await User.findById(userid).exec();
    if (!user) return false;
    const event = await Event.findById(eventid);
    if (!event) return false;
    if (event.isFull) {
      event.waitlist.push(user._id);
      await event.save();
      return {
        registered: false,
        waitlist: true,
      };
    } else if (event.registeredDrivers.includes(user._id)) {
      return false;
    } else {
      event.registeredDrivers.push(user._id);
      event.registerCount += 1;
      await event.save();
      return {
        registered: true,
      };
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function cancelRegistration(userid, eventid) {
  try {
    await dbConnect();
    const user = await User.findById(userid).exec();
    if (!user) return false;
    const event = await Event.findById(eventid);
    if (!event) return false;
    await Event.updateOne(
      { _id: event.id },
      { $pull: { registeredDrivers: user._id }, $inc: { registerCount: -1 } }
    );
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
export async function getEventsByUser(userid) {
  try {
    await dbConnect();
    const user = await User.findById(userid)
      .populate(["registeredEvents", "completedEvents"])
      .exec();
    if (!user) throw new Error("User does not exist");
    const events = {
      registeredEvents: user.registeredEvents,
      completedEvents: user.completedEvents,
    };
    return events;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createChampionship(championship) {
  try {
    await dbConnect();
    const created = await Championship.create(championship);
    return created;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
export async function getChampionships(includeEvents) {
  try {
    await dbConnect();
    if (includeEvents) {
      const result = await Championship.find({}).populate("events");
      return result;
    } else {
      const result = await Championship.find({});
      return result;
    }
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getChampionshipById(id) {
  try {
    await dbConnect();
    const result = await Championship.findById(id).populate("events");
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function checkForTeamName(name) {
  try {
    await dbConnect();
    const exists = await Team.findOne({
      name: new RegExp(`^${name}$`, "i"),
    }).exec();

    return exists;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function getAllTeams() {
  try {
    await dbConnect();
    const teams = await Team.find({});
    return teams;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createTeam(team) {
  try {
    await dbConnect();
    // Team.syncIndexes();
    const created = await Team.create(team);
    return created;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function findTeamById(teamid) {
  try {
    await dbConnect();
    const team = await Team.findById(teamid);
    return team;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function createInviteToken(teamid, userid) {
  try {
    await dbConnect();
    const tokenString = nanoid(12);
    const token = await Token.create({
      creator: userid,
      key: tokenString,
      teamRef: teamid,
    });
    return token;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function validateInviteToken(tokenKey) {
  try {
    await dbConnect();
    const token = await Token.findOne({ key: tokenKey })
      .lean()
      .populate("teamRef")
      .populate("creator", "name")
      .exec();
    return token;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

export async function addDriverToTeam(teamid, userid) {
  try {
    await dbConnect();
    const team = await Team.findByIdAndUpdate(teamid, {
      $push: { drivers: userid },
    }).exec();
    return team;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
