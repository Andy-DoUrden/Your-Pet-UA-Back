const { Schema, model } = require("mongoose");

const requestError = require("../helpers/requestError");
function createUserModel() {
  const userSchema = new Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [16, "Name can be at most 16 characters long"],
      validate: {
        validator: /^[a-zA-Z\s]+$/,
        message: "Name must contain only letters and spaces",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    avatarURL: String,
    date: String,
    phone: String,
    city: String,
    token: String,
    favoritesArr: [{ type: Schema.Types.ObjectId, ref: "notice" }],
  });

  userSchema.post("save", requestError);

  const User = model("user", userSchema);
  return User;
}

const User = createUserModel();

module.exports = User;
