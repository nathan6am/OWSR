import passport from "../auth/passport";
import session from "./session";

//Combine auths middlewares
const auths = [session, passport.initialize(), passport.session()];

export default auths;
