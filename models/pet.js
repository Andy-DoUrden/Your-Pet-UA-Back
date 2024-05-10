const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    name: String,
    date: String,
    type: String,
    comments: String,
    avatarURL: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

module.exports = Pet;
