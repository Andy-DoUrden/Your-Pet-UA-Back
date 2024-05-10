const Friend = require("../../models/friend");

const listFriend = async (req, res, next) => {
  const result = await Friend.find();
  return res.status(200).json(result);
};

module.exports = listFriend;