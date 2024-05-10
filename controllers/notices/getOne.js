const Notice = require("../../models/notice");
const User = require("../../models/user");

const { requestError } = require("../../helpers");

const getOne = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw requestError(404, "Notice not found");
  }
  const owner = await User.findById(notice.owner, {
    token: 0,
    favoritesArr: 0,
    password: 0,
    __v: 0,
  });

  res.status(200).json({ notice, owner });
};

module.exports = getOne;
