const { Schema, model } = require("mongoose");

const requestError = require("../helpers/requestError");
function createUserModel() {
  const userSchema = new Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Ім'я має містити мінімум 2 символи"],
      maxlength: [16, "Ім'я має містити максимум 16 символів"],
      validate: {
        validator: /^([А-ЩЬЮЯҐЄIЇІІа-щьюяґєіїьі]+\s?){1,}$/iu,
        message: "Ім'я має містити лише літери та пробіли",
      },
    },
    email: {
      type: String,
      required: [true, "Імейл обов'язковий"],
      unique: true,
      validate: {
        validator: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: "Не правильний формат імейлу",
      },
    },
    password: {
      type: String,
      required: [true, "Вкажіть пароль"],
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
