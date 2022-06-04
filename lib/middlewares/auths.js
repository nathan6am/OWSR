import passport from "../auth/passport"
import session from "./session"


const auths = [session, passport.initialize(), passport.session()];

export default auths