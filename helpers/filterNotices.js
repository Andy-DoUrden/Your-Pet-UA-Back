const Notice = require("../models/notice");
const ageNotice = require("./ageNotice");

const filterNotices = async (category, age, sex, page = 1, limit = 12, query = "") => {
  const skip = (page - 1) * limit;

  let notices = await Notice.find({ $and: [{ category }, { title: { $regex: query } }] }, "", { skip, limit });

  if (age) {
    notices = notices.filter((notice) => ageNotice(notice, age));
  }

  if (sex) {
    notices = notices.filter((notice) => notice.sex === sex);
  }

  return notices;
};

module.exports = filterNotices;
