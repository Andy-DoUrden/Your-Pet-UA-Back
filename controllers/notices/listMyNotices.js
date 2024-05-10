const Notice = require("../../models/notice");
const { ageNotice } = require("../../helpers");

const listMyNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const { _id: owner } = req.user;
  const skip = (page - 1) * limit;
  const queryObject = { $and: [{ owner }, { title: { $regex: query, $options: "i" } }] };

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

module.exports = listMyNotices;
