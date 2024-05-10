const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    imgUrl: String,
    title: String,
    text: String,
    date: String,
    url: String,
    id: String,
  },
  { versionKey: false, timestamps: true }
);

const News = model("news", newsSchema);

module.exports = News;
