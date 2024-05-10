const Notice = require("../../models/notice");
const User = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const { requestError } = require("../../helpers");

const deleteNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw requestError(404, "Notice not found");
  }
  const ownerId = owner.toString();
  const noticeOwnerId = notice.owner.toString();

  if (noticeOwnerId !== ownerId) {
    throw requestError(403, "This notice is not yours");
  }

  const avatarsDir = path.join(__dirname, "../", "../", "public", notice.avatarURL);
  fs.unlink(avatarsDir);

  await User.updateMany(
    { _id: { $in: notice.usersFavorite } },
    { $pull: { favoritesArr: noticeId } }
  );
  const result = await Notice.findByIdAndRemove(noticeId);
  if (!result) {
    throw requestError(404);
  }

  return res.status(200).json(result);
};

module.exports = deleteNotice;
