export default function returnTo(req, res, next) {
  const referer = req.headers.referer;
  if (referer.startsWith(`${process.env.BASE_URL}join`)) {
    const returnTo = referer.split("?")[0];
    req.session.returnTo = returnTo;
  }
  next();
}
