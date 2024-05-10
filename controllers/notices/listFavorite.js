const Notice = require("../../models/notice");
const User = require("../../models/user");
const { ageNotice } = require("../../helpers");

const listFavorite = async (req, res) => {
  const { _id } = req.user;
  const { query = "", age, sex, page, limit } = req.query;
  const skip = (page - 1) * limit;
  const user = await User.findById(_id);

  const queryObject = {
    $and: [
      { _id: { $in: user.favoritesArr } },
      { title: { $regex: query, $options: "i" } },
    ],
  };

  if (age === "to-1-from-2") {
    queryObject.$or = [{ age: { $lt: 1 } }, { age: { $gte: 2 } }];
  } else if (age) {
    const ageObj = ageNotice(age);
    queryObject.$and.push({ age: ageObj });
  }

  if (sex) {
    queryObject.sex = sex;
  }

  const notices = await Notice.find(queryObject, "", {
    limit,
    skip,
  });

  const totalCount = await Notice.countDocuments(queryObject);

  res.json({ notices, totalCount });
};

module.exports = listFavorite;
