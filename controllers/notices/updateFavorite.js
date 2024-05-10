const User = require("../../models/user");
const Notice = require("../../models/notice");

const updateFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;

  const user = await User.findById(userId);
  const notice = await Notice.findById(noticeId);

  if (!user || !notice) {
    return res.status(404).json({ message: "User or notice not found" });
  }

  const isUserInFavorites = user.favoritesArr.includes(noticeId);
  const isNoticeInUserFavorites = notice.usersFavorite.includes(userId);

  if (isUserInFavorites && isNoticeInUserFavorites) {
    // User already in favorites, remove it
    await User.findByIdAndUpdate(userId, { $pull: { favoritesArr: noticeId } });
    await Notice.findByIdAndUpdate(noticeId, {
      $pull: { usersFavorite: userId },
    });
    res.status(200).json({ message: "Removed from favorites successfully" });
  } else {
    // User not in favorites, add it
    await User.findByIdAndUpdate(userId, {
      $addToSet: { favoritesArr: noticeId },
    });
    await Notice.findByIdAndUpdate(noticeId, {
      $addToSet: { usersFavorite: userId },
    });
    res.status(200).json({ message: "Added to favorites successfully" });
  }
};

module.exports = updateFavorite;
