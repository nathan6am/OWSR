export default async function verify(req, res, next) {
  if (!req.user) {
    console.log(unauthorized);
    req.status(401).end();
    return;
  }
  next();
}
