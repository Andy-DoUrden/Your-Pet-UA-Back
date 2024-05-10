const { Schema, model } = require("mongoose");

const friendsSchema = new Schema(
  {
    title: String,
    url: String,
    addressUrl: String,
    imageUrl: String,
    address: String,
    workDays: [{isOpen:String,from: String,to:String}],
    phone: String,
    email: String,
    },
);

const Friend = model("Friend", friendsSchema);

module.exports = Friend;