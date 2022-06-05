import dbConnect from "./dbConnect";
import filterUser from "../util/filterUser";
import User from "@/lib/models/User";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcrypt";

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
