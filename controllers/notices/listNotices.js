const Notice = require("../../models/notice");
const { requestError } = require("../../helpers");

const { ageNotice } = require("../../helpers");

const listNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const { category } = req.params;
  const skip = (page - 1) * limit;
  const acceptedCategories = ["sell", "in-good-hands", "lost-found"];

  if (!category) {
    throw requestError(404, "Missing field category");
  }

  if (!acceptedCategories.includes(category)) {
    throw requestError(404, "Category not found");
  }

  const queryObject = {
    $and: [{ category }, { title: { $regex: query, $options: "i" } }],
  };

  if (age === "to-1-from-2") {
    queryObject.$or = [{ age: { $lt: 1 } }, { age: { $gte: 2 } }];
  } else if (age) {
    const ageObj = ageNotice(age);
    queryObject.$and.push({ age: ageObj });
  }

  if (sex) {
    queryObject.$and.push({ sex });
  }

  const totalCount = await Notice.countDocuments(queryObject);

  const notices = await Notice.find(queryObject, "", {
    limit,
    skip,
  });

  res.json({ notices, totalCount });
};

module.exports = listNotices;
