export default async function verify(req, res, next) {
  if (!req.user) {
    res.status(401).end();
    return;
  }
  next();
}
