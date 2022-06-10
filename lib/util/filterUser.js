export default function filterUser(user) {
  return {
    name: user.name,
    _id: user._id,
    country: user.country,
    registered: !user.name || !user.country ? false : true,
    linked: user.steamid ? true : false,
  };
}
