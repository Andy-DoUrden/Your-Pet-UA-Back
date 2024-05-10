const News = require("../../models/news");
const getNews = async (req, res, next) => {
  const { query = "", page, limit } = req.query;
  const skip = (page - 1) * limit;
  const news = await News.find(
    { title: { $regex: query, $options: "i" } },
    "",
    {
      limit,
      skip,
    }
  );
  const totalCount = await News.countDocuments({
    title: { $regex: query, $options: "i" },
  });
  res.json({ news, totalCount });
};
module.exports = getNews;
