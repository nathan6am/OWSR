import dbConnect from "./dbConnect";
import filterUser from "../util/filterUser";
import User from "@/lib/db/models/User";
import Event from "@/lib/db/models/Event";
import Car from "@/lib/db/models/Car";
import Track from "@/lib/db/models/Track";
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
export async function getAllEvents(query = {}) {
  try {
    await dbConnect();
    const events = await Event.find(query).sort({ date: 1 }).exec();
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
      user.registeredEvents.push(event._id);
      event.registeredDrivers.push(user._id);
      await event.save();
      await user.save();
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
    await Event.update(
      { _id: event.id },
      { $pull: { registeredDrivers: user._id } }
    );
    await User.update(
      { _id: user.id },
      { $pull: { registeredEvents: event._id } }
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
